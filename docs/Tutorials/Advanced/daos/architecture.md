---
sidebar_label: 'Solution Architecture'
---
# Solution Architecture
In this section, you'll break down the requirements for DAO auto-registration in order to create a solution architecture. This means translating the features from the [introduction](introduction.md) into tangible goals for the specific Keypom drop and its configurations.

---

## Breaking Down the Problem
Recall from earlier, the following features are needed:

### No existing wallets are needed
> Prospective members don't need an existing wallet to join the DAO.  

To facilitate this, prospoective members will receive a [Function Call linkdrop](../../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/fc-drops.md) that communicates with the DAO. This allows members to create a new NEAR wallet and join the DAO in one seamless operation. 

When claiming, the prospective member's `accountId` must be sent to the DAO for them to be auto-registered.This can be done using [`keypom_args`](../../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/fc-drops.md#keypom-arguments). 

### Each invitation can only be used by one person.
> Each invitation is unique, single use, and can only be used by one person. 

This can be done by adding multiple keys to the drop where all the keys are single-use. This means each prospective member can only claim their key once and in turn, only be added as a DAO member once. 

### Council voting is not required
> The invitations do not require council to vote and reach a quorum for every single registration. 

With SputnikV2, all member registrations require a 2 step process. 

1. An [`AddMemberToRole`](https://github.com/near-daos/sputnik-dao-contract#proposal-types) proposal is creaated.
2. A quorum of voting members, such as the DAO's council, must be reached to approve this proposal.

In order to do this automatically, Keypom must be able to replicate both these steps autonomously. This means Keypom must be added to the DAO in its own role. This role must be capable of auto-registering users by adding and voting to approve `AddMemberToRole` proposals. Since Keypom is the only member in that role, the quorum is automatically reached and the proposal is then approved. 

To do this all in one step, the FC drop can call [`add_proposal`](https://github.com/near-daos/sputnik-dao-contract#add-proposal) to create a new `AddMemberToRole` proposal and then [`act_proposal`](https://github.com/near-daos/sputnik-dao-contract#approve-proposal) to vote on and approve the proposal, all in one key use.

However, this approach introduces a technical problem. The `act_proposal` function requires a `proposal_id`. This is an issue for the following reasons: 
1. The function calls in Keypom FC drops are fire and forget. This means when `add_proposal` returns the newly created proposal's `proposal_id`, this value cannot be stored and used for the following function call. 
2. SputnikV2 does not support custom `proposal_id`'s, meaning there is no way to hard code the `proposal_id` or inject the Keypom `drop_id` as the `proposal_id` ahead of time. 

This means that there is no way to ensure with 100% certainty that the `act_proposal` will be called on the correct proposal. 

This can be solved by introducing a middleman **Keypom DAO bot contract**, which is capable of receiving and using a `proposal_id`. This DAO bot would sit in its own role in the DAO and when called by a Keypom FC drop, will automatically add an `AddMemberToRole` proposal and approve it. 

More on the DAO bot to come. 

### Auto-registration cannot be used to attack the DAO
> The drop cannot be used for malicious purposes. 

This will be discussed later in the [security vulnerability section](./security.md). For now, a simple working prototype will be made. 

---

## Full Solution Architecture
From above, here are the key features that need to be implmeneted. 
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
