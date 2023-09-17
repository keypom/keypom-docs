---
sidebar_label: 'Solution Architecture'
---
# Solution Architecture
In this section, you'll break down the requirements for the onboarding experience in order to create a solution architecture. This means translating the features from the [introduction](introduction.md) into tangible goals for the specific Keypom drop and its configurations.

The two major requirements for the auto-registration experience are:
- Members don't need an existing wallet to join the DAO. 
- The invitations do not require a 2 step process where a council votes and reaches a quorum for every registration.

## Seamless Wallet Creation

Since each user will be given a Keypom linkdrop, the wallet creation is handled by whatever claim platform they choose (MyNEARWallet, Meteor, FastAuth etc.). This means that there is no funding required from the user's perspective, eliminating KYC, credit cards, exchanges and other barriers.

The end user experience is to simply enter an account name and secure the wallet with whatever method they choose (iOS app, seedphrase, biometrics etc.).

## Single Step Registration

DAOs require a 2 step process for members to join. The first step is to create a proposal for adding them to the DAO and the second is to vote on that proposal and reach a quorum. This means that the DAO must constantly monitor for incoming proposals, leading to long wait times for new users.

If DAOs want to mass register members, this process is very inefficient. From a technical stand-point, what happens is:

1. An [`AddMemberToRole`](https://github.com/near-daos/sputnik-dao-contract#proposal-types) proposal is created.
2. A quorum of voting members, such as the DAO's council, must be reached to approve this proposal.

### Optimizing the Approach

In order for this process to be streamlined and completed automatically, Keypom must be able to first add a proposal and then **also** approve it as **part of the linkdrop claiming process**.

First, Keypom must be given a role that is capable of creating and approving proposals for adding new members.

Second, Keypom must be given a role that automatically reaches quorum whenever it votes. For this tutorial, that role will only have 1 member so that whenever Keypom votes to accept the `AddMemberToRole` proposal, 100% of the members will have voted and it will be automatically accepted.

To combine both these features into one step, a FunctionCall drop can be created that first calls [`add_proposal`](https://github.com/near-daos/sputnik-dao-contract#add-proposal) and then [`act_proposal`](https://github.com/near-daos/sputnik-dao-contract#approve-proposal) to vote on and approve the new member joining the DAO.

While this works in theory, unfortunately, the `act_proposal` function requires a `proposal_id` that is returned from the `add_proposal` function. This is an issue for the following reasons: 
1. With Keypom FC drops, there is no way to get a return value and use it to call another function.
2. SputnikV2 does not support custom `proposal_id`'s, meaning there is no way to hard code the `proposal_id` or inject the Keypom `drop_id` as the `proposal_id` ahead of time. 

### Middleman Solution

Up until this point, the general flow for auto registering users is clear. An FC drop must be made that somehow invokes the `add_proposal` and `act_proposal` functions one after another. The problem with relying entirely on Keypom is that the return value for `add_proposal` must be known and used.

This can be fixed by introducing a middleman contract. Rather than calling `add_proposal` and `act_proposal` directly through the FC drop, you can instead call **a single function on the middleman contract**. Once invoked, this middleman contract will then call `add_proposal`, parse the return value and call `act_proposal` in succession.

While Keypom is extremely versatile, there are cases where custom behavior will be needed. By introducing a middleman, you can customize exactly what will happen when a key is used.

In summary, rather than having the FC drop look as follows:

```
add_proposal
    -> DAO Contract
    -> Returns proposal ID
act_proposal (I need proposal ID somehow)
    -> DAO Contract
```

The FC drop will instead do the following:
```
Call middleman contract
    add_proposal
        -> DAO Contract
        -> Returns proposal ID
    Parse return value and get proposal ID
    act_proposal
        -> DAO Contract
```

---

## Full Solution Architecture
From above, here are the key features that need to be implemented. 
### Keypom Solution
On the Keypom side, an FC drop will be used to call the middleman. This FC drop must:
- Only call the DAO bot once, to prevent double registration or multiple people registering with the same key.
- Send the DAO bot the `AddMemberToRole` proposal object *and* the desired DAO. 
- Attach the wallet address for the account that will be onboarded to the middleman contract when auto-registering them into the DAO. 

### DAO Bot Solution

The middleman contract that relays the add and act proposal functions can be referred to as the DAO bot.

Recall that Keypom would need to be in its own special role. This was because Keypom was the `predecessor` for the `add_proposal` and `act_proposal` calls to the DAO contract. Now that the middleman is introduced, Keypom is no longer the predecessor. For this reason, the middleman DAO bot must have the special role instead.

The middleman must:
- Ensure all incoming calls are made by Keypom and have a sufficient attached deposit. 
- Take in a proposal object for adding a new member to a DAO (which includes the account ID of the new member).
- Take in a desired DAO contract and call `add_proposal` with the proposal object.
- Parse the return value which should be the proposal ID and then call `act_proposal` to automatically register the new member into the DAO.

---

## Conclusion

In this section, you explored and expanded on all the requirements for the auto-registration process. This started with using a Keypom linkdrop to facilitate [seamless wallet creation](#seamless-wallet-creation). Then, the onboarding process was automated and streamlined by introducing a [single-step registration](#optimizing-the-approach). This was done using a FunctionCall drop that would create and approve `AddMemberToRole` proposals as part of the linkdrop claiming process. 

However, you also saw the limitations of relying entirely on Keypom; that the `add_proposal` return value must be known and used. You solved this by introducing a [middleman contract](#middleman-solution) which would receive function calls from Keypom and execute the auto-registration. 

From this analysis, you set [concrete goals](#full-solution-architecture) for the Keypom FunctionCall drop and the middleman DAO bot contract. With these goals in mind, you can start to build out this solution!
