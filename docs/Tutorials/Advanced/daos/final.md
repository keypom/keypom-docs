---
sidebar_label: 'Final Product'
---
# Final Product
Welcome to the last section of this DAO auto-registration tutorial! Here, you'll be seeing the full toolchain in action.

## Getting Started
To follow along on your own machine, you can clone the code from the [Keypom SDK repository](TODO) and run the following command in the root folder  TODO-js/`:

``` bash
cd docs-advanced-tutorials/dao-onboarding && yarn TODO
```

:::note
If you have been following along and wish to run your own code, run:

``` bash
cd docs-advanced-tutorials/dao-onboarding-skeleton && yarn TODO
```
:::

## Creating and Claiming the Drop

TODO: add a section about giving the BOT the necessary roles

:::note
As highlighted in the [drop creation](./drop.md#adding-proposal-and-injected-arguments) section, the role that you are planning to auto-register new members into must already exist.
:::

To execute the script, run the following command in the root folder of the project:

```bash
node createDaoDrop
```

This should give you the following output:
```bash
Receipts: 2j3w4N9NGPjgxJFzasUbiasXneyUG8wMthYhsKQF6a2A, 2FoYmTYgCu5fXVxFi2fBgyQ5TEEnYqH2mB4cPnNwJne5
Log [v2.keypom.testnet]: Current Block Timestamp: 1683829257186655893
Log [v2.keypom.testnet]: 21 calls with 105000000000000 attached GAS. Pow outcome: 1.8602935. Required Allowance: 20248156910387200000000
Log [v2.keypom.testnet]: Total required storage Yocto 13870000000000000000000
Log [v2.keypom.testnet]: Current balance: 4.4626456, 
    Required Deposit: 0.2351181, 
    total_required_storage: 0.01387,
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
Log [v2.keypom.testnet]: New user balance 4.2275275
Log [v2.keypom.testnet]: Fees collected 0

    
Ticket Links:  TODO: fix not say Ticket links
    
https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/4bvyJT7pXZdHGhpFUd5STwj5cUSNC4hk5ENRJSu14HwyLBqT6fooiX87aLLFfnALhLmZLG9b6YvtHFvg4JuYUXUx
```

## Claiming the Drop and Viewing Changes
For this example, the drop will be claimed with `new-moon-dao-member.testnet`.
<p align="center"> <img src={require("/static/img/docs/advanced-tutorials/dao-auto-reg/claim.png").default} alt="explorer claim" width="80%"/> </p>

After claiming, you can check the DAO policy in your Command Line using the `get_policy` SputnikV2 function. 
```bash
near view moondao.sputnikv2.testnet get_policy
```
This is the output, trimmed to only show the `new-onboardee-role`'s members. The account ID 
```bash
roles:[
    { name: 'all', kind: 'Everyone', permissions: [], vote_policy: {} },
    {
      name: 'new-onboardee-role',
      kind:{
        Group: [
          'new-moon-dao-member.testnet',
        ]
      },
    },
    ...
]
```
As you can see, `new-moon-dao-member-2.testnet` has automatically been registered into MoonDAO by simply claiming a linkdrop! The transaction for this auto-registration can be found [here](https://explorer.testnet.near.org/transactions/HpMkFZ21vYw7aqxBoi6P6hgrN7yatxqy9FLxH31zKcxd).


## How You Can Use DAO Bot
This DAO bot contract you just made has been deployed to the account `keypom-dao-bot.testnet` and `dao-bot.keypom.near` and is open for you to use! You can create your own FC drops to interface and experiment with it. 

If you wish to make modifications to the DAO bot, the source code is found [here](https://github.com/keypom/dao-bot). You can modify to your liking and deploy the contract as you see fit. 

TODO: add a quick note about setter for keypom contract

## Conclusion

TODO: hyperlinks

In this tutorial, you learned how you can use a Keypom FC drop and a newly created DAO bot to automatically register new users into your DAO and get the onboarding process started right away. 

This allows new members to focus on topics and discussions that are DAO specific rather than needing to worry about creating an account and learning the technical jargon of the NEAR blockchain. This onboarding flow also frees up the voting members to focus on the DAOs actual tasks rather than voting to approve new members.