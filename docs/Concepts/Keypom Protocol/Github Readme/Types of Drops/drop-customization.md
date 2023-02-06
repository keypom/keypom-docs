---
sidebar_label: 'Drop Configurations'
---
# Drop Configurations

Drop Customization via the `DropConfig` object can help adjust the properties of a drop to exactly what you want. From changing the amount of $NEAR received by your users, to being able to set up a subscription service, understanding the power of `DropConfig` is crucial to making the most of Keypom!

:::tip
A configuration applies to **ALL KEYS** accross a drop!  

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

    /// Override the global root account that sub-accounts will have (near or testnet). This allows
    /// users to create specific drops that can create sub-accounts of a predefined root.
    pub root_account_id: Option<AccountId>,
}
```
For now, lets focus on `uses_per_key` and `root_account_id`. [`TimeConfig`](time-customization.md) and [`UsageConfig`](usage-customization.md) are covered later.

## `uses_per_key`
*Default: 1*  
This parameter allows you to set the number of times your users can claim your linkdrop.

### Use cases
This parameter is incredibly versatile; it can be used in numerous ways. Some excellent examples are:  
1. A counter, similar to a loyalty program punch card or a set number of [Recurring Payments](../../Github%20Readme/Types%20of%20Drops/simpledrops.md#recurring-payments) 
2. A tool to track progress of your users; like checkpoints
3. A method to accurately track retention, such as [Event Turnout](../../Github%20Readme/Types%20of%20Drops/fcdrops.md#nft-ticketing)


Used in tandem with [function call drops](fcdrops.md), some more complex use cases can be created, such as [Customizable Multi-Phase Onboardings](../../../../Tutorials/Advanced/customized-onboarding/concept.md) and [Auto DAO-Registration](../../../../Tutorials/Advanced/daos/concept.md)


Note that this parameter changes the number of uses for all keys in your drop; this will change the upfront cost for the drop creator. As with all aspects of Keypom linkdrops, it is imparative for the drop owner to understand the needs of their drop in order to reduce upfront costs and avoid uneccesary complexity. 

## `root_account_id`
*Default: `near` or `testnet`*  
Changing the `root_account_id` parameter will change the root of any accounts that call `create_account_and_claim` on your linkdrops.

### Use cases
Let's say you have an organization called Moonpom (totally not secretly run by our beloved Pomeranian, Moon) and you and your users want to proudly represent Moonpom! 

You set `root_account_id = "moonpom.near"` and now any account created using your linkdrops will take on the form `$username.moonpom.near`

