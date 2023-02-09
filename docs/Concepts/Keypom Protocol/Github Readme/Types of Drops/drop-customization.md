---
sidebar_label: 'Drop Configurations'
---
# Drop Configurations
Drop Customizations via the `DropConfig` object passed into `create_drop` can help adjust the properties and behaviours of a drop to achieve specific use-cases.

From changing the amount of times a key can be used before it's deleted to setting a public sale and making profit from keys being added to your drop, understanding the power of the `DropConfig` is crucial to making the most of Keypom!

:::tip
A configuration applies to **ALL KEYS** accross a drop.  

This means that if you want keys with different configurations, you must create multiple drops with their respective configurations.
:::

# Understanding `DropConfig`
```rust
pub struct DropConfig {
    /// How many uses can each key have before it's deleted. If None, default to 1.
    pub uses_per_key: Option<u64>,

    // Any time based configurations
    pub time: Option<TimeConfig>,
    
    // Any usage specific configurations
    pub usage: Option<UsageConfig>,

    // Public sale config options
    pub pub_sale: Option<PublicSaleConfig>,

    /// Override the global root account that sub-accounts will have (near or testnet). This allows
    /// users to create specific drops that can create sub-accounts of a predefined root.
    pub root_account_id: Option<AccountId>,
}
```
For now, the focus will be `uses_per_key` and `root_account_id`. [`TimeConfig`](time-customization.md), [`UsageConfig`](usage-customization.md), and [`PublicSaleConfig`](sale-customization.md) are covered later.

---

## Uses per Key
*Default: 1*  

This parameter allows you to set the number of times a user can claim a key before it is deleted.

### Use cases
This parameter is incredibly versatile and can be used in numerous ways. Some excellent examples are:  

1. Rewards that progressively increase in value. For example, you could incentivize people to show up to all your talks at a conference. A link would be given out that needed to be physically scanned at your talk to unlock rewards. If you showed up to all the events, a jackpot prize could be claimed.  
2. A set number of [Recurring Payments](../../Github%20Readme/Types%20of%20Drops/simpledrops.md#recurring-payments) for subscriptions or contracted/freelanced work.  
3. A method to accurately track retention, such as [Event Turnout](../../Github%20Readme/Types%20of%20Drops/fcdrops.md#nft-ticketing)


When used with [function call drops](fcdrops.md), some more complex use cases can be created, such as [Customizable Multi-Phase Onboarding](../../../../Tutorials/Advanced/customized-onboarding/concept.md) and [Auto DAO-Registration](../../../../Tutorials/Advanced/daos/concept.md)

---

## Root Account ID
*Default: `near` or `testnet`*  

The `root_account_id` parameter determines which account the newly-created claiming account will be a sub-account of. For example, the default is `near` so all accounts would end in `.near` such as `benji.near`. Changing the `root_account_id` parameter will change the root of all the accounts that users create through `create_account_and_claim` when using your drop.  

### Use cases
Let's say you have an organization called Moonpom (secretly run by our beloved Pomeranian, Moon) and you want your users want to proudly represent Moonpom!

You set `root_account_id = "moonpom.near"` and now any account created using your linkdrops will take on the form `${YOUR_USERNAME}.moonpom.near`

:::caution Important
the `root_account_id` **must** have a contract deployed to it that exposes a method `create_account` to create the sub-account. A sample contract can be found [here](https://github.com/near/near-linkdrop)
:::

