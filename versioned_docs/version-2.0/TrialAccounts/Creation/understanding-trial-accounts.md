---
sidebar_label: 'Understanding Trial Accounts'
---

# Basis of Trial Accounts

A Trial Account is simply an account on NEAR that has a set of pre-defined restrictions that limit the methods that it can call. This is achieved by deploying a very small no-std Rust smart contract on it (~25 kb or 0.25 $NEAR) that acts as a proxy, or middleman, for any outbound calls it makes.

The contract deployed to the account exposes a method `execute` that takes a set of actions as arguments, checks whether the actions are allowed, and then executes them. To achieve this middleman behavior, the Trial Account cannot have any full access keys (otherwise it could bypass the `execute` method, and in turn, the restrictions). The account should *only* have one limited access key that can call the `execute` method on its own contract.

Whenever a Trial Account wants to call a method on an external contract, say `nft_mint` on the `nft.examples.testnet` account, it needs to call `execute` and pass in the desired function call as arguments. The contract will then check whether those actions are allowed and if they are, it will execute the desired behavior.

To help illustrate this behavior, the follow diagram shows the above scenario.

<p align="center">
  <img src={require("/static/img/docs/trial-accounts/trial-account-execute-flow.png").default} width="40%" height="15%" alt="ticketing"/>
</p>

## Keypom Drops

From the above, a Trial Account can be created by deployed a valid contract to an account that only has a limited access key on it with the correct permissions. This can all be achieved with a [Function Call drop](../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/fc-drops.md).

In order to create accounts ending with `.near` or `.testnet`, you'll need the `near` and `testnet` accounts to create sub-accounts. This is done by calling the `create_account` function on their contracts (the code is found [here](https://github.com/near/near-linkdrop/blob/49279e529c254fa7736465b4a39d05cb8f1e5443/src/lib.rs#L130)). This is exactly how regular linkdrops work, including [Keypom](https://github.com/keypom/keypom/blob/7a654aa847f2ce9dedf65755c6a08817eece4666/contract/src/stage3/claim.rs#L129).

By calling `create_account`, a new sub-account is created with a full access key. This is close to the behavior we want for Trial Accounts but not exactly. In order to create a new account that has a limited access key and a contract deployed, you can call the `create_account_advanced` function instead of `create_account`, code found [here](https://github.com/near/near-linkdrop/blob/49279e529c254fa7736465b4a39d05cb8f1e5443/src/lib.rs#L156). This function can accept `wasm` for a contract, and limited access key arguments.

A Keypom function call drop can then be programmed to:
- Call the `create_account_advanced` function.
- Pass in user provided args for the new account ID.
- Pass in the `wasm` for the contract to be deployed.
- Pass in the limited access key arguments to create a key that can call `execute` on the newly created account.
- Once the account is created, Keypom will automatically call a setup method on the new account that will set the restrictions.

Keypom has abstracted away all these complexities using a simple ready-made function [createTrialAccountDrop](../../keypom-sdk/Core/modules.md#createtrialaccountdrop).

## Understanding Trial Restrictions

There are 3 different restrictions that can be applied to a Trial Account:
- Callable contracts
- Callable methods
- Attached Deposits

### Callable Contracts

As a trial funder, you have complete control over exactly which contracts a trial account can call. This can be any number of contracts and should be passed in using an array. For example, if you wanted the trial to only call methods on the `v2.keypom.testnet` and `nft.examples.testnet` contracts, you would pass in the following:

```js
const callableContracts = [
  "v2.keypom.testnet",
  "nft.examples.testnet"
]
```

### Callable Methods

Not only do you have full control over the contracts that a trial account can call, but you can also specify individual methods on a per-contract basis. In the above example, if you wanted the account to be able to call any method on the `v2.keypom.testnet` contract, but only the `nft_mint` and `nft_transfer` methods on the `nft.examples.testnet` contract, you would pass in the following:

```js
const callableMethods = [
  ["*"],
  ["nft_mint", "nft_transfer"]
]
```

:::note
The `*` symbol is used to represent no restrictions on methods for a given contract.
:::

### Max Attachable Deposit

The last restriction that you can set on a given trial account is the maximum amount of $NEAR that can be attached to function calls for a given contract. In the above scenario, say you wanted to limit an account to the following restrictions:
- Attaching up to 5 $NEAR to any method on the `v2.keypom.testnet` contract.
- Only attaching 1 yoctoNEAR to methods on the `nft.examples.testnet` contract.

You would pass in the following:

```js
const maxAttachableDeposit = [
  "5000000000000000000000000",
  "1"
]
```

## Exit Conditions

The final thing to understand about trial accounts is how they can be exited. While the account is in the trial state, it has restrictions and isn't usable in the wider ecosystem. As a funder, you can specify conditions that need to be met in order for the account to exit the trial state.

### Trial Over Floor

The main condition that dictates how long an account will be in the trial state before it must exit is the trial floor. This is an amount of $NEAR that must be spent before the account is eligible to exit. The amount consists of both gas burnt as well as deposits to successful function calls.

For example, if an account attached 1 $NEAR to a function call and also burnt 75 TGas, it would be `1.0075 $NEAR` closer to the floor. Overtime, as an account executes more and more transactions, it will come closer to the floor. Once the floor has been reached, the account will be eligible to exit.

:::note
It's important to note that once the floor has been met, the account can continue to execute transactions. Reaching the floor simply means that the account *can* exit the trial state (assuming all other conditions have been met).
:::

### Repay Conditions

If the funder chooses to, they can also specify a repay condition. This is an amount of $NEAR that must be paid back to them in order for the account to exit the trial state. 

This process happens automatically when the exit method is called but it will throw an error if the  account doesn't possess enough funds to repay the funder. This amount can be 0 $NEAR meaning that once the account reaches the floor, it can immediately exit without needing to repay.

The $NEAR needed to repay the funder can be gained in one of three ways:
1. Gained during the trial (e.g selling an NFT you minted, winning an on-chain lottery etc.).
3. Sent by another account.
2. Sent with an on-ramp (similar to how accounts are funded currently).

While there is still friction in the last case, the user has **experienced your application first** and the onboarding is pushed until after their trial is over. Currently, people need to go through the complicated onboarding process first and only experience the app afterwards.

As an example, let's say you're building a roulette app and you want to give users a trial account to experience what you're building in the hope that they will continue to use it afterwards. You give someone 10 $NEAR and set a repay condition of 5 $NEAR. During their trial, they could have won 20 $NEAR from the roulette app by putting all their money on red.

This would satisfy the repay condition and they would be able to keep the rest of the $NEAR that they won.

### What Happens On Exit?

When regular accounts are created on NEAR, they start with a full access key and don't have any smart contract deployed to them. This behavior should be the same for trial accounts except they keep any assets they had during the trial state. When the account exits, the following will happen:

- The limited access key is removed from the account.
- The trial contract is removed from the account.
- Any state that was set on the trial contract is removed.
- The full access key is added to the account.
- Any repay conditions are paid out.
- Any $NEAR that was *not* gained during the trial is returned to the funder. This includes the bytes freed from deleting the contract and is meant to be a way to resist Sybil attacks.

This means that the account will act as a fresh NEAR account with a set of starting assets such as NFTs or FTs that it gained during the trial. If the account wanted to, it could deploy a contract such as multi-sig, nETH etc.

When a trial account exits, it will be given a full access key and the restrictions will be removed. This means that the account will be able to call any method on any contract and attach any amount of $NEAR to function calls.

## Conclusion

In this tutorial, you learnt the basics of how trial accounts operate and what is needed to create them. You also learnt about the different restrictions that can be applied to trial accounts, how they can be exited and what happens when they exit.

In the next tutorial, you'll learn how to create a simple trial account drop that will be used to instantly sign a user into the guest-book application.