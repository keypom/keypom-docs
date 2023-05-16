---
sidebar_label: 'Solution Architecture'
---
# Solution Architecture
In this section, you'll break down the requirements for the DAO auto-registration experience in order to create a solution architecture. This means translating the features from the [introduction](introduction.md) into tangible goals for the specific Keypom drop and its configurations.

The two major requirements for the auto-registration experience are:
- Members don't need an existing wallet to join the DAO. 
- The invitations do not require a 2 step process where a council votes and reaches a quorum for every single registration.

## Seamless Wallet Creation

Since each experience will be given out via Keypom linkdrops, the wallet creation process is handled by whatever claim platform is used (MyNEARWallet, Meteor, FastAuth etc.). This means that there is no funding required from the user's perspective which eliminates KYC, exchanges and other barriers.

In all, the user needs to simply choose an account name and secure their wallet with whatever wallet they choose (iOS, seedphrase, biometrics etc.). It just so happens that the Keypom linkdrop is crafted such that as part of the account creation process, the new user will be automatically registered into a DAO.

## Single Step Registration

Most times, DAO's require a 2 step process for new members to join. The first step is to create a proposal to add the new member to the DAO. The second step is to vote on the proposal and reach a quorum. This requires that the DAO constantly monitor for incoming proposals and can lead to long wait times for people.

If DAOs want to register a lot of new users, this can be a massive bottleneck. Behind the scenes, what needs to happen is:

1. An [`AddMemberToRole`](https://github.com/near-daos/sputnik-dao-contract#proposal-types) proposal is created.
2. A quorum of voting members, such as the DAO's council, must be reached to approve this proposal.

In order for this process to be streamlined automatically, Keypom must be able to first add a proposal and then vote / approve it as part of the linkdrop claiming process.

First, Keypom must be given a role that is capable of creating proposals for adding new members.

For the proposal acceptance, Keypom must be given a role that can reach quorum when it votes. For the purpose of this tutorial, Keypom will be put into a special role with only 1 member. This way, whenever Keypom votes to accept the `AddMemberToRole` proposal, 100% of the members will have voted and it will be automatically accepted.

To do this all in one step, a FunctionCall drop can be created that first calls [`add_proposal`](https://github.com/near-daos/sputnik-dao-contract#add-proposal) and then [`act_proposal`](https://github.com/near-daos/sputnik-dao-contract#approve-proposal) to vote on and approve the new member joining the DAO.

While this works in theory, unfortunately, the `act_proposal` function requires a `proposal_id` that is returned from the `add_proposal` function. This is an issue for the following reasons: 
1. With Keypom FC drops, there is no way to get a return value and use it to call another function.
2. SputnikV2 does not support custom `proposal_id`'s, meaning there is no way to hard code the `proposal_id` or inject the Keypom `drop_id` as the `proposal_id` ahead of time. 

### Middleman Solution

Up until this point, the general flow for auto registering users is clear. An FC drop must be made that somehow invokes the `add_proposal` and `act_proposal` functions one after another. The problem with relying entirely on Keypom is that the return value for `add_proposal` must be known and used.

This can be fixed by introducing a middleman which can be referred to as the DAO bot contract. Rather than calling `add_proposal` and `act_proposal` directly through the FC drop, you can instead call a single function on the middleman contract. This middleman contract will then call `add_proposal`, parse the return value and call `act_proposal` in succession.

While Keypom is extremely versatile, there are cases where custom behaviour will be needed. By introducing a middleman, you can customize exactly what will happen when a key is used.

In summary, rather than having the FC drop look as follows:

```
Keypom FC Drop
1. add_proposal
    -> DAO Contract
    -> Returns proposal ID
2. act_proposal (I need proposal ID somehow)
    -> DAO Contract
```

The FC drop will instead do the following:
```
Keypom FC Drop
1. Call DAO bot contract
    1. add_proposal
        -> DAO Contract
        -> Returns proposal ID
    2. Parse return value and get proposal ID
    3. act_proposal
        -> DAO Contract
```

---

## Full Solution Architecture
From above, here are the key features that need to be implemented. 
### Keypom Solution
On the Keypom side, an FC drop will be used to call the DAO bot. This FC drop must:
- Only call the DAO bot once, to prevent double registration or multiple people registering with the same key. 
- Send the claiming account's `accoundId` to the DAO bot when auto-registering them into the DAO. 

To do all these things, a single use FC drop will be created where `accountIdField` will be used to auto-inject the claimer's `accountId` as an argument to the DAO bot. 

### DAO Bot Solution
The first aspect of the DAO bot is how it interfaces with the DAO. 

In order to be able to auto-register new members, it must be added as a DAO member in a role where its own vote can achieve a quorum. In this tutorial and for the sake of simplicity, this will mean its own role. Next, the DAO bot must make multiple cross contract calls to the DAO in succession: first to add the proposal, then to vote to approve the proposal.

The next aspect of the DAO bot is how it interacts with Keypom. Firstly, it must accept `keypom_args` to inject the claiming account's `accountId` into the `addMemberToRole` proposal. Next, it must ensure all calls to it originate from Keypom.These in conjunction will ensure that only Keypom FC drops can interact with the DAO bot. 

---

## Conclusion
In this section, you broke down the auto-registration process into tangible goals for both the FC drop and the newly created DAO bot. 

With these goals in mind, you can start to build out this solution!
