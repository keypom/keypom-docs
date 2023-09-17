---
sidebar_label: 'Final Product'
---
# Final Product
Welcome to the last section of this DAO auto-registration tutorial! Here, you'll be seeing the full toolchain in action.

## Getting Started
To follow along on your own machine, you can clone the code from the [Keypom docs examples repository](https://github.com/keypom/keypom-docs-examples) and run the following command in the root folder `keypom-docs-examples`:

``` bash
cd advanced-tutorials/dao-onboarding && yarn
```

:::note
If you have been following along and wish to run your own code, run:

``` bash
cd advanced-tutorials/dao-onboarding-skeleton && yarn
```
:::

## Creating and Claiming the Drop

Before you create and claim your drop, you must ensure that the DAO bot (`dao-bot.keypom.near` or `keypom-dao-bot.testnet`) holds its own special role on your DAO. This role must have permissions to add and vote on `AddMemberToRole` proposals.

Additionally, as highlighted in the [drop creation](./drop.md#adding-proposal-and-injected-arguments) section, the role that you are planning to auto-register new members into must already exist.

:::info note
This demonstration will be done on mainnet using `createDaoDrop-mainnet`. This is to provide you with visuals on [BOS](https://near.org/hack.near/widget/DAO.Profile?daoId=keypom-test.sputnik-dao.near). 

<p align="center"> <img src={require("/static/img/docs/advanced-tutorials/dao-auto-reg/bos-showcase.png").default} alt="bos showcase" width="80%"/> </p>

:::

To execute the script, run the following command in the `advanced-tutorials/dao-onboarding` folder:

```bash
node createDaoDrop-mainnet
```

This should give you the following output:
```bash
Receipts: DFf4iY9S4vUiVEZJy2neq4EhcKJXFKyoQqsDb2rvZrHF, 3E7S1h6dBmRZ14BA91CatTzaTEUmj3zLxyYAMG36MZpz
      Log [v2.keypom.near]: Current Block Timestamp: 1685141815019548108
      Log [v2.keypom.near]: 21 calls with 105000000000000 attached GAS. Pow outcome: 1.8602935. Required Allowance: 20248156910387200000000
      Log [v2.keypom.near]: Total required storage Yocto 13850000000000000000000
      Log [v2.keypom.near]: Current balance: 1.223441, 
          Required Deposit: 0.2350981, 
          total_required_storage: 0.01385,
          Drop Fee: 0, 
          Key Fee: 0 Total Key Fee: 0,
          allowance: 0.0202481 total allowance: 0.0202481,
          access key storage: 0.001 total access key storage: 0.001,
          deposits less none FCs: 0.1 total deposits: 0.1 lazy registration: false,
          deposits for FCs: 0.1 total deposits for FCs: 0.1,
          uses per key: 1
          None FCs: 0,
          length: 1
          GAS to attach: 100000000000000
      Log [v2.keypom.near]: New user balance 0.9883428
      Log [v2.keypom.near]: Fees collected 0

    
  Auto-Registration Links: 
  
  https://wallet.near.org/linkdrop/v2.keypom.near/5JesG9FdfuFq3b3PA7p3NPY1SpZvi1DdtPs9ANumx9VRDE5iXyUsMT4Qcn132DFiDNiwjccFyoqAYGYP46UVuTVb
```

## Claiming the Drop and Viewing Changes

For this example, the drop will be claimed with [`keypom-dao-tutorial-member.near`](https://explorer.near.org/accounts/keypom-dao-tutorial-member.near). The aim will be to auto-register this account into [MoonDAO](https://near.org/hack.near/widget/DAO.Profile?daoId=keypom-test.sputnik-dao.near).

<p align="center"> <img src={require("/static/img/docs/advanced-tutorials/dao-auto-reg/claim.png").default} alt="explorer claim" width="80%"/> </p>

After claiming, you can check the DAO policy [here](https://near.org/hack.near/widget/DAO.Profile?daoId=keypom-test.sputnik-dao.near) in the *Policy* tab. 

<p align="center"> <img src={require("/static/img/docs/advanced-tutorials/dao-auto-reg/bos.png").default} alt="bos policy" width="80%"/> </p>

🎉 As you can see, `keypom-dao-tutorial-member.near` has automatically been registered into the DAO by simply claiming a linkdrop! 🎉

The transaction for this auto-registration can be found [here](https://explorer.near.org/transactions/2z9L9HcFKTJUANMcrQaSQMXsSbPihc472Lk83AgEtszH).

### Additional Viewing Methods

You can also view the proposal that was created and approved by the DAO bot by using the following:

```
near view keypom-test.sputnik-dao.near get_proposal '{"id":9}' 
```

<details>
<summary>Auto-Registration Proposal</summary>
<p>

``` bash
View call: keypom-test.sputnik-dao.near.get_proposal({"id":9})
{
  id: 9,
  proposer: 'dao-bot.keypom.near',
  description: 'mooooooooon',
  kind: {
    AddMemberToRole: {
      member_id: 'keypom-dao-tutorial-member.near',
      role: 'new-onboardee-role'
    }
  },
  status: 'Approved',
  vote_counts: { 'Keypom DAO Bot': [ 1, 0, 0 ] },
  votes: { 'dao-bot.keypom.near': 'Approve' },
  submission_time: '1685145461041750017'
}
```

</p>
</details>

The DAO policy can also be checked through the command line as well:
```
near view keypom-test.sputnik-dao.near get_policy' 
```

<details>
<summary>DAO Policy</summary>
<p>

``` bash
View call: keypom-test.sputnik-dao.near.get_policy()
{
  roles: [
    { name: 'all', kind: 'Everyone', permissions: [], vote_policy: {} },
    {
      name: 'new-onboardee-role',
      kind:{
        Group: [
          'keypom-dao-tutorial-member.near',
          'minlu.near',
          'mintlu.near'
        ]
      },
    },
    ...
    ...
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



## How You Can Use DAO Bot
This DAO bot contract you just made has been deployed to the account `keypom-dao-bot.testnet` and `dao-bot.keypom.near` and is open for you to use! You can create your own [FC drops](drop.md#final-code) to interface and experiment with it. 

:::caution
Prior to using the DAO Bot, ensure that it is given a role in your DAO capable of creating and approving `AddMemberToRole` proposals. For more info, see the [solution architecture](architecture.md#optimizing-the-approach)
:::

If you wish to make modifications to the DAO bot, the source code is found [here](https://github.com/keypom/dao-bot). You can modify to your liking and deploy the contract as you see fit. 

:::note
The following functions have been included in the DAO bot in case you created a drop using older versions of the Keypom contract, such as `v1-4.keypom.near`. Note that you will need to deploy the DAO bot and modify these values yourself.
``` rust
pub fn change_keypom_contract(&mut self, new_contract: AccountId)
pub fn view_keypom_contract(&self) -> AccountId
```
:::

## Conclusion

In this tutorial, you learned how you can use a [Keypom FC drop](drop.md) and a newly created [DAO bot](daobot.md) to automatically register new users into your DAO and get the onboarding process started right away. You also learned how to [use `keypom_args` to validate authenticity](security.md) of incoming calls from Keypom drops. 

This allows new members to focus on topics and discussions that are DAO specific rather than needing to worry about creating an account and learning the technical jargon of the NEAR blockchain. This onboarding flow also frees up the voting members to focus on the DAOs actual tasks rather than voting to approve new members.