---
sidebar_label: 'Solution Architecture'
---
# Solution Architecture
In this section, you'll break down the requirements for DAO auto-registration in order to better understand how to create a solution architecture. This means translating the features from the [introduction](introduction.md) into tangible goals for the specific Keypom drop and its configurations.

## Breaking Down the Problem
Recall from earlier, the following features are needed:

### No existing wallets are needed
> Prospective members don't need an existing wallet to join the DAO.  

To facilitate this, prospoective members will receive a [Function Call linkdrop](../../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/fc-drops.md) that communicates with the DAO. This allows members to create a new NEAR wallet and join the DAO in one seamless operation. 

### Each invitation can only be used by one person.
> Each invitation is unique, single use, and can only be used by one person. 

This can be done by adding multiple keys to the drop where all the keys are single-use. This means each prospective member can only claim their key once and in turn, only be added as a DAO member once. 

### Council voting is not required
> The invitations do not require council to vote and reach a quorum to approve the new member registrations  

With the most widely used DAO contract, SputnikV2, all member registrations require a 2 step process. 

1. An [`AddMemberToRole`](https://github.com/near-daos/sputnik-dao-contract#proposal-types) proposal is creaated.
2. A quorum of voting members, such as the DAO's council, must be reached to approve this proposal.

In order to do this automatically, Keypom can be added to the DAO in its own role. This role must be capable of auto-registering users by adding and voting to approve `AddMemberToRole` proposals. Since Keypom is the only member in that role, the quorum is automatically reached and the proposal is then approved. 

To do this all in one step, an FC drop can call [`add_proposal`](https://github.com/near-daos/sputnik-dao-contract#add-proposal) to create a new `AddMemberToRole` proposal and then [`act_proposal`](https://github.com/near-daos/sputnik-dao-contract#approve-proposal) to approve the proposal, all in one key use.

However, this approach introduces a technical problem. The `act_proposal` function requires a `proposal_id`. This is an issue for the following reasons: 
1. The function calls in Keypom FC drops are fire and forget. This means when `add_proposal` returns the `proposal_id`, this value cannot be stored and used for the following function call. 
2. SputnikV2 does not support custom `proposal_id`'s, meaning there is no way to hard code the `proposal_id` or inject the Keypom `drop_id` as the `proposal_id` ahead of time. 

This can be solved by introducing a middleman **Keypom DAO bot contract**, which is capable of receiving and using a `proposal_id`. More on the DAO bot will be discussed below. 

### Auto-registration cannot be used to attack the DAO
> The drop is exclusive to your DAO and cannot be used or replicated for malicious purposes.  

This will be discussed later in the [security vulnerability section](./security.md). For now, a simple working prototype will be made. 

## Full Solution Architecture
From above, here are the key features that need to be implmeneted. 
### Keypom Solution
On the Keypom side, an FC drop will be used to call the DAO bot. This FC drop must:
- Only call the DAO bot once, to prevent double registration or multiple people registering with the same key. 
- Send the claiming account's `accoundId` to the DAO bot when auto-registering them into the DAO. 

To do all these things, a single use FC drop will be created where `accountIdField` will be used to auto-inject the claimer `accountId`'s as arguments to the DAO bot. 

### DAO Bot Solution
The first aspect of the DAO bot is how it interfaces with the DAO.
 
First and foremost, the DAO bot needs to be added as a member of the DAO and have a role where its own vote can achieve a quorum. In this tutorial and for the sake of simplicity, this will mean its own role. Next, the DAO bot must make multiple cross contract calls to the DAO in succession: first to add the proposal, then to vote to approve the proposal.

The next aspect of the DAO bot is how it interacts with Keypom. Firstly, it must accept `keypom_args` in order to inject the claiming account's `accountId` into the `addMemberToRole` proposal. Next, it must ensure all calls to it originate from Keypom. To do this, the DAO bot can check the predessor `accountId`. 

![Example banner](./daobot-flow.svg)
