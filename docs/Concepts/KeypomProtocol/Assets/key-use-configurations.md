---
sidebar_label: 'Key Use Configurations'
---
import Admonition from '@theme/Admonition';

# Key Use Configurations

> For each set of key uses in your drop, different behaviours can be defined to create unique experiences!

:::info
These configurations apply to a set of key uses, for global configurations see [drop configurations](../drop-configurations.md)
:::

# What are Key Use Configurations?
Key use configuration defines the expected behaviour for a particular key use in the following aspects:

* [**Time Configuration**](#time-configuration): Umbrella configuration for all things related to timing, such as claim periods and intervals
* [**Claiming Permissions**](#claiming-permissions): Can/must a new account be created when claiming?
* [**Root Account ID**](#root-account-id): Should accounts created be subaccounts of a particular account?
* [**Account Creation Arguments**](#account-creation-arguments): Upon account creation, what information should Keypom send to the root account?

The specification for key use configurations can be seen below:

```rust reference
https://github.com/keypom/keypom/blob/8f9f8df397cb8cabbda30d1ddffdcddc4a733274/contract/src/models/config.rs#L16-L31
```
___

## Root Account ID
*Default: `near` or `testnet`*  

The `root_account_id` parameter determines which account the newly-created claiming account will be a sub-account of. For example, the default is `near` so all accounts would end in `.near` such as `benji.near`. Changing the `root_account_id` parameter will change the root of all the accounts that users create through `create_account_and_claim` when using your drop.  

### Use cases
Let's say you have an organization called Moonpom (secretly run by our beloved Pomeranian, Moon) and you want your users want to proudly represent Moonpom!

You set `root_account_id = "moonpom.near"` and now any account created using your linkdrops will take on the form `${YOUR_USERNAME}.moonpom.near`

:::caution Important
the `root_account_id` **must** have a contract deployed to it that exposes a method `create_account` to create the sub-account. A sample contract can be found [here](https://github.com/near/near-linkdrop/blob/49279e529c254fa7736465b4a39d05cb8f1e5443/src/lib.rs#L130)
:::

___ 


## Claiming Permissions
*Default: `claim` AND `create_account_and_claim`*  

The `permissions` parameter assigns which claim methods the user can call with the key you give them. They can either call both, or just one. 

### Use case
Pretend you are hosting a talk about your NEAR dApp: `Kramerly`. Your only goal is to onboard as many *new* users from the audience as possible. If the user already has a NEAR wallet, they shouldn't be able to claim assets and onboard. This is similar to free-trials in Web2 whereby only new users are able to participate.

To do this, you can set the `permissions` parameter to `create_account_and_claim`.

___

## Account Creation Arguments
*Default: `null`*  

`account_creation_keypom_args` specifies where certain Keypom arguments should be automatically injected by Keypom upon calling `create_account_and_claim`. This should be used when specifying a custom `root_account_id`, where you have control over the exposed `create_account` method.

Similar to function call [`keypom_args`](function-call.md#injecting-keypom-arguments), these arguments are immutable and can only be inserted by Keypom. This means that they can be used to validate incoming `create_account_and_claim` calls and prevent malicious attacks against your `root_account` contract.  
### Use Case
At NEARCON 2023, attendees used their Keypom keys as their tickets, and create4d accounts with a starting Fungible Token balance ($NCON) to participate in the on-the-ground economy. To do this, their keys called the NEARCON contract's exposed `create_account` method that instantiates a new account with a given starting $NCON balance.

Say a malicious actor, EvilMoon, wishes to collect $NCON to buy delicious treats. His plan is to create a drop to fraudulently create accounts using the NEARCON contract's exposed `create_account` method without a NEARCON ticket and then sending all the $NCON to himself.

In order to differentiate the official NEARCON tickets from EvilMoon's malicious drop, the NEARCON contract can leverage `account_creation_keypom_args` to receive the `dropId`, and compare it to the expected `dropId` of the official NEARCON tickets. 

```rust reference
https://github.com/keypom/nearcon-account-factory/blob/d4b0db55b02c37d574f194d91ddd4c5f2bb26576/contract/src/factory.rs#L28-L29
```

---

## Time Configuration
### What is it?
Time configurations dictate when and how frequently a key can be claimed. A deep dive on these configurations can be found in the [Time Configurations section](./time-customization.md). 
