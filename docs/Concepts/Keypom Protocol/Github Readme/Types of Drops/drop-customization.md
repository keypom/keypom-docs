---
sidebar_label: 'Drop Configurations'
---
# Drop Configurations

Drop Customization via the `DropConfig` object can help cater the properties of the drop to exactly what you want! 

From changing the amount of $NEAR received by your users to being able to set up a subscription service, understanding the power of `DropConfig` is crucial to making the most of Keypom!

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
For now, the focus will be `uses_per_key` and `root_account_id`. [`TimeConfig`](time-customization.md) and [`UsageConfig`](usage-customization.md) are covered later.

---

## Uses per Key
*Default: 1*  

This parameter allows you to set the number of times your users can claim a key that you give them.

### Use cases
This parameter is incredibly versatile; it can be used in numerous ways. Some excellent examples are:  
1. A counter, similar to a loyalty program punch card
2. A tool to track progress of your users; like checkpoints in an [onboarding](../../../../Tutorials/Advanced/customized-onboarding/concept.md)
3. A method to accurately track retention, such as [Event Turnout](../../Github%20Readme/Types%20of%20Drops/fcdrops.md#nft-ticketing)
4. A set number of [Recurring Payments](../../Github%20Readme/Types%20of%20Drops/simpledrops.md#recurring-payments) for subscriptions or contracted/freelanced work


Used in tandem with [function call drops](fcdrops.md), some more complex use cases can be created, such as [Customizable Multi-Phase Onboardings](../../../../Tutorials/Advanced/customized-onboarding/concept.md) and [Auto DAO-Registration](../../../../Tutorials/Advanced/daos/concept.md)

---

## Root Account ID
*Default: "near" or "testnet"*  

The `root_account_id` parameter defines the root account for all subaccounts created through your drop. Changing the `root_account_id` parameter will change the root of all the accounts that users create through `create_account_and_claim` when using your drop.

### Use cases
Let's say you have an organization called Moonpom (totally not secretly run by our beloved Pomeranian, Moon) and you and your users want to proudly represent Moonpom! 

You set `root_account_id = "moonpom.near"` and now any account created using your linkdrops will take on the form `${YOUR_USERNAME}.moonpom.near`

