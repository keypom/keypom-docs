---
sidebar_label: 'Solution Architecture'
---
# BE CAREFUL WITH MEMBER WORD USAGE
# Solution Architecture
In this section, you'll break down the requirements for DAO auto-registration in order to better understand how to create a solution architecture. This means translating the features from the [introduction](introduction.md) into tangible goals for the specific Keypom drop and its configurations.

## Breaking Down the Problem
Recall from earlier, the following features are needed:

### No existing wallets are needed
> Prospective members don't need an existing wallet to join the DAO.  

To facilitate this, prospoective members will receive a [Function Call linkdrop](../../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/fc-drops.md) that communicates with the DAO. This allows members to create a new NEAR wallet and join the DAO in one seamless operation. 

### Each invitation can only be used by one person.
> Each invitation is unique, single use, and can only be used by one person. 

This can be done by adding multiple keys to the drop where all the keys are single-use. This means each prospective member can only claim their key once and in turn, only be added once. 

### Council voting is not required
> The invitations do not require council to vote and reach a quorum to approve the registrations  

With the most widely used DAO contract, SputnikV2, all member registrations require a 2 step process. 

1. An [`AddMemberToRole`](https://github.com/near-daos/sputnik-dao-contract#proposal-types) proposal is creaated.
2. A quorum of voting members, such as council members, must be reached to approve this proposal.

In order to do this automatically, Keypom can be added to the DAO in its own role, capable of auto-registering users by adding and approving `AddMemberToRole` proposals. This means Keypom would be able to add proposals and then consequently vote to approve that proposal automatically. Since Keypom is the only member in that role, the quorum is automatically reached and the proposal is then approved. 

To do this all in one step, an FC drop can call [`add_proposal`](https://github.com/near-daos/sputnik-dao-contract#add-proposal) and then [`act_proposal`](https://github.com/near-daos/sputnik-dao-contract#approve-proposal) in one key use. 

However, this approach introduces a technical problem. The `act_proposal` function requires a `proposal_id`. This is an issue for the following reasons: 
1. The function calls in Keypom FC drops are fire and forget. This means when `add_proposal` returns the `proposal_id`, this value cannot be stored and used for the following function call. 
2. SputnikV2 does not support custom `proposal_id`'s, meaning there is no way to hard code the `proposal_id` or inject the Keypom `drop_id` as the `proposal_id` ahead of time. 

For now, this problem can be left alone as it will be solved by addressing more serious security issues outlined next.

### Auto-registration cannot be used to attack the DAO
> The drop is exclusive to your DAO and cannot be used or replicated for malicious purposes.  

It is important that only approved DAO members can distribute these auto-registration links, otherwise malicious actors can attack and flood your DAO. By giving Keypom the ability to automatically add new members to your DAO, a serious exploit is exposed. To dive deeper, the following example can be used:


EvilMoon is a malicious actor and intends on attacking the beloved MoonDAO. To do this, he creates an FC drop that calls the MoonDAO contract and adds and approved an `AddMemberToRole` proposal. The desired outcome would be that this action is blocked. 
:::danger
Since EvilMoon is using a Keypom drop to call MoonDAO, all of his function calls will show Keypom as the predecessor. If MoonDAO had given Keypom the ability to auto-register users, then EvilMoon's calls would succeed! 
:::

To remedy this, a Keypom DAO Bot can be used. This DAO bot would be added to its own role in the DAO and given the ability to auto-register users. The key difference is the DAO bot will check if the the calls made to it are legitamte, using [`keypom_args`](../../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/fc-drops#keypom-arguments). These auto-injected arguments can be used to ensure that the funder of the drop is an approved member, such as Council. This will prevent malicious actors from creating FC drops to target your DAO. 

Note that each DAO bot contract is limited to 1 DAO. This is to ensure a Council member from a different DAO cannot fund an FC drop and use the DAO bot to attack your DAO. 

## Full Solution Architecture
From above, here are the key features that need to be implmeneted. 
### Keypom Solution
On the Keypom side, an FC drop will be used to call the DAO bot. This FC drop must:
- Only call the DAO bot once, to prevent double registration or multiple people registering with the same key. 
- Automatically inject the drop funder into the arguments passed onto the DAO bot to ensure the funder has the permission to auto-register users
- Send the claiming account's `accoundId` to the DAO bot when auto-registering them into the DAO. 

To do all these things, a single use FC drop will be created where `funderIdField` and `accountIdField` will be used to auto-inject the funder and claimer `accountId`'s as arguments to the DAO bot. 

### DAO Bot Solution
The first aspect of the DAO bot is how it interfaces with the DAO.
 
First and foremost, the DAO bot needs to be added as a member of the DAO and have a role where its own vote can achieve a quorum. In this tutorial and for the sake of simplicity, this will mean its own role. Next, the DAO bot must make multiple cross contract calls to the DAO in succession: first to check permissions of the funder, then to add the proposal, and finally to vote to approve the proposal.

The DAO bot must also be deployed to a single DAO. This means it must be store a `contract_id` whem initialized that cannot be changed later. It is up to the DAO's council/approved members to create deploy this DAO bot.

The next aspect of the DAO bot is how it interacts with Keypom. Firstly, it must accept `keypom_args` in order to validate the incoming function calls from Keypom FC Drops. 

**INSERT GRAPHIC HERE**
