---
sidebar_label: 'What are Drop Configurations?'
---
# What are Drop Configurations?

What sets Keypom apart from the basic [NEAR Linkdrop](https://github.com/near/near-linkdrop)? One major aspect is that Keypom allows for LOADS of customization!

This can allow for your to create linkdrops where the keys can become multi-use and controlled by start time, time between uses and much more! With these tools and Keypom's 4 drop types, you can create everything from unique onboardings to [tiered and exclusive tickets](../../../../Tutorials/Advanced/ticketing/introduction.md). 

/Users/min/Documents/NEAR_Stuff/keypom-docs/docs/Tutorials/Advanced/ticketing/introduction.md

This is all done through **Drop Configurations**.

:::info
The three objects used to customize your drops are **DropConfig**, **TimeConfig**, and **UsageConfig**.

Any customization will apply to ALL keys in that drop.
:::

[**DropConfig**](drop-customization.md) - Top level configurations, dictates major parameters such as number of uses per key.  

[**TimeConfig**](time-customization.md) - All configurations related to time, such as time between uses.  

[**UsageConfig**](usage-customization.md) - Administrative configurations, such as whether to delete the drop when all keys are used.  

[**PublicSaleConfig**](sale-customization.md) - Configurations that allow the funder to create a public sale. Public sales are done by allowing users to add keys to the drop at a fee. 

The structure for all the configurations can be seen in the tree below.

## Drop Configuration Structure
``` bash
DropConfig
├── uses_per_key
│
├── TimeConfig
│   └── start
│   └── end
│   └── throttle
│   └── interval
│
├── UsageConfig
│   └── permissions
│   └── refund_deposit
│   └── auto_delete_drop
│   └── auto_withdraw
│
├── PublicSaleConfig
│   └── max_num_keys
│   └── price_per_key
│   └── allowlist
│   └── blocklist
│   └── auto_withdraw_funds
│   └── start
│   └── end
│
├── root_account_id
```