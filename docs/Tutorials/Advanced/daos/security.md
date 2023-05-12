---
sidebar_label: '⚠️ DAO Bot Exploit Solution'
---
# ⚠️ DAO Bot Exploit Solution
Up to this point, the DAO bot has a **major** security exploit. In this section, you'll be learning about the exploit, how to fix it and how you can prevent similar exploits when writing your contracts to interact with Keypom. 

---

## Breaking Down the Problem
To illustrate the exploit, a quick example can be analyzed: 

Moon is a Council member on his DAO, MoonDAO. Since MoonDAO has run auto-registration onboarding campaigns before, MoonDAO has the DAO bot sitting in its own role to auto-register users. 

EvilMoon is a malicious actor and intends on attacking the beloved MoonDAO. His plan is to flood MoonDAO with his malicious friends. To do this, he leverages a Keypom FC drops that calls the Keypom DAO bot. This call is to auto-register members into MoonDAO using the DAO bot's `new_auto_registration` function.

From the perspective of MoonDAO, this action is unwelcomed and thus the desired outcome would be that this action is blocked.

Recall that the DAO bot currently checks 2 things before performing the auto-registration:
1. The function call is coming from Keypom.  
2. The claiming account's `accountId` is injected using `accountIdField`.

:::danger
Since EvilMoon is using a Keypom drop to call MoonDAO, all of his function calls will show Keypom as the predecessor. This passes the first check. So long as EvilMoon structures the `accountIdField` properly when creating his drop,the second check would pass as well. 

This allows EvilMoon to orchestrate his takeover of MoonDAO by simply creating an FC drop to target MoonDAO. **This is a major exploit.**
:::

Currently with no additional checks in place, anybody can create an FC drop to call the DAO bot and add anyone they want into anybody else's DAO. 

For those that are interested, a more in depth test script can be found in the expandable section below. Note this is not the focus of this section and is only for your learning.
<details>
<summary>Additional Testing Code</summary>
<p>

One of the internal tests used to validate the DAO bot is to make sure other non-approved users cannot add new members to your DAO. The code for that is below.

For reference, `minqi` is on council here but `maliciousActor` is not. The expectation is that `maliciousActor` cannot add member's to `minqi`'s DAO but that is not the case with the DAO bot in its current form.

```rust reference
https://github.com/keypom/dao-bot/blob/2c3a7bac8b18e1134483f0736e2ca9e2152f8509/__tests__/auto-registration/auto-reg-tests.ava.ts#L162-L250
```

The result of this test will be a failure as `member1` will be take on the role of `new-onboardee-role` in the DAO.

</p>
</details>

---

## Solving the Exploit
In order to patch this exploit, an additional check can be added.

> The Keypom FC drop funder **must** hold a trusted role within the DAO. 

The FC drop funder can be obtained using the `keypom_args`. In this case, the `new_auto_registration` function will accept a funder that is automatically injected by Keypom using `keypom_args`. This works the same way as the `accountId` check from the [last section](./daobot.md#verification-of-function-call-and-arguments). 

This puts the power back in the hands of the DAO, as only their trusted members can facilitate these auto-registration campaigns. While the definition of "trusted role" can change between DAOs, for the purpose of simplicity this will be considered the Council role. 

![Example banner](./daobot-flow.svg)

:::note
If your DAO wishes to change the definition of a "trusted role", you are free to modify and deploy your own DAO bot contract as you see fit.
:::

### Approach

By looking at the [SputnikV2 contract](https://github.com/near-daos/sputnik-dao-contract/blob/main/sputnikdao2/src/policy.rs), you can see that each DAO's `Policy` has a `roles` vector.
```rust
pub struct Policy {
    /// List of roles and permissions for them in the current policy.
    pub roles: Vec<RolePermission>,
    ...
}
```

This vector contains information on all of the DAO's roles, including the name of the role, and the accounts belonging to the role.
```rust
pub struct RolePermission {
    /// Name of the role to display to the user.
    pub name: String,
    /// Kind of the role: defines which users this permissions apply.
    pub kind: RoleKind,
    ...
}

pub enum RoleKind {
    /// Matches everyone, who is not matched by other roles.
    Everyone,
    /// Member greater or equal than given balance. Can use `1` as non-zero balance.
    Member(U128),
    /// Set of accounts.
    Group(HashSet<AccountId>),
}
```

A sample DAO policy can be seen below:

<details>
<summary>Sample DAO policy</summary>
<p>

``` bash
View call: moondao.sputnikv2.testnet.get_policy()
{
  roles: [
    { name: 'all', kind: 'Everyone', permissions: [], vote_policy: {} },
    {
      name: 'council',
      kind: { Group: [ 'minqi.testnet' ] },
      permissions: [
        'add_member_to_role:VoteRemove',
        'upgrade_self:VoteRemove',
        'policy:VoteReject',
        'bounty_done:AddProposal',
        'policy:VoteRemove',
        'set_vote_token:VoteReject',
        'upgrade_remote:AddProposal',
        'remove_member_from_role:VoteApprove',
        'add_bounty:VoteRemove',
        'vote:VoteApprove',
        '*:Finalize',
        'bounty_done:VoteApprove',
        'transfer:VoteRemove',
        'add_bounty:VoteReject',
        'add_member_to_role:VoteReject',
        'set_vote_token:VoteRemove',
        'transfer:VoteApprove',
        'transfer:VoteReject',
        'config:VoteReject',
        'call:VoteReject',
        'remove_member_from_role:VoteReject',
        'policy:AddProposal',
        'bounty_done:VoteRemove',
        'set_vote_token:AddProposal',
        'upgrade_self:AddProposal',
        'set_vote_token:VoteApprove',
        'config:VoteApprove',
        'policy:VoteApprove',
        'add_bounty:VoteApprove',
        'remove_member_from_role:VoteRemove',
        'transfer:AddProposal',
        'upgrade_remote:VoteReject',
        'call:VoteApprove',
        'add_member_to_role:AddProposal',
        'call:AddProposal',
        'call:VoteRemove',
        'config:AddProposal',
        'remove_member_from_role:AddProposal',
        'upgrade_remote:VoteApprove',
        'upgrade_remote:VoteRemove',
        'upgrade_self:VoteApprove',
        'upgrade_self:VoteReject',
        'vote:VoteReject',
        'vote:VoteRemove',
        'vote:AddProposal',
        'add_member_to_role:VoteApprove',
        'config:VoteRemove',
        'add_bounty:AddProposal',
        'bounty_done:VoteReject'
      ],
      vote_policy: {
        add_member_to_role: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 2 ] },
        policy: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 2 ] },
        vote: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 2 ] },
        set_vote_token: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 2 ] },
        remove_member_from_role: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 2 ] },
        transfer: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 2 ] },
        add_bounty: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 2 ] },
        upgrade_self: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 2 ] },
        bounty_done: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 2 ] },
        call: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 2 ] },
        config: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 2 ] },
        upgrade_remote: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 2 ] }
      }
    },
    {
      name: 'Keypom DAO Bot',
      kind: { Group: [ 'keypom-dao-bot.testnet' ] },
      permissions: [
        'add_member_to_role:VoteApprove',
        'add_member_to_role:VoteRemove',
        'add_member_to_role:VoteReject',
        'add_member_to_role:AddProposal'
      ],
      vote_policy: {
        transfer: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 1 ] },
        upgrade_self: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 1 ] },
        remove_member_from_role: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 1 ] },
        set_vote_token: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 1 ] },
        bounty_done: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 1 ] },
        policy: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 1 ] },
        add_member_to_role: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 1 ] },
        call: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 1 ] },
        config: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 1 ] },
        upgrade_remote: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 1 ] },
        vote: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 1 ] },
        add_bounty: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 1 ] }
      }
    }
  ],
  default_vote_policy: { weight_kind: 'RoleWeight', quorum: '0', threshold: [ 1, 2 ] },
  proposal_bond: '100000000000000000000000',
  proposal_period: '604800000000000',
  bounty_bond: '100000000000000000000000',
  bounty_forgiveness_period: '604800000000000'
}
```

</p>
</details>

The goal here would be to find the `council` role in the DAO policy and check if the FC drop funder is included in the members within it. There are a few steps to this.

1. Verify that the drop `funder` being passed into `new_auto_registration` is coming from Keypom using `keypom_args`.  
2. Get the DAO's policy using the SputnikV2 DAO view function `get_policy`.  
3. Find the `council` role in the policy and determine if the funder is included as a members of that role.  

### Verifying Funder and Getting DAO Policy
The first step here is modifying the `new_auto_registration` function to accept a funder string. The legitimacy of this received funder can be verified by checking if the `funderIdField` within the `keypom_args` was set to `funder`. 

Once the funder has been verified, `new_auto_registration` will call `get_policy` on the DAO contract. After `get_policy` is called, a callback function is invoked to receive and parse the policy.

``` rust reference
https://github.com/keypom/dao-bot/blob/2c3a7bac8b18e1134483f0736e2ca9e2152f8509/src/lib.rs#L103-L119
```

### Ensuring Funder is Council
After the policy is received, the council role is found using a filter. The role's hashset is then searched to see if the received funder `accountId` exists in that set. If yes, then the auto-registration continues and `add_proposal` is called. 

```rust reference
https://github.com/keypom/dao-bot/blob/2c3a7bac8b18e1134483f0736e2ca9e2152f8509/src/lib.rs#L122-L164
```

---

## Full Code
The code for this can be seen below: 

```rust reference
https://github.com/keypom/dao-bot/blob/2c3a7bac8b18e1134483f0736e2ca9e2152f8509/src/lib.rs#L103-L164
```

---
## Lessons Learned
From this exploit, there is one concept you should carry through to any of your contracts that interact with Keypom:

**Assume people will create malicious FC drops to attack your contract**

This means you must consider how to verify incoming calls from FC drops as "legitimate" or not. A great tool for this job are the `keypom_args`. Use these to your advantage when developing your smart contracts. 

---

## Conclusion

By adding this new check into the DAO bot, only approved members (such as Council) can use Keypom FC drops to create auto-registration campaigns for your DAO. This helps ensure the integrity of your DAO as you bring on more new members. 

In the next section, you'll be reviewing all of your work so far by testing the whole auto-registration system.
