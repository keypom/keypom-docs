---
sidebar_label: 'What are Drop Configurations?'
---
# What are Drop Configurations?

What sets Keypom apart from the basic [NEAR Linkdrop](https://github.com/near/near-linkdrop)? One major aspect is that Keypom allows for LOADS of customization!

This can allow for your to create linkdrops where the keys can become multi-use and controlled by start time, time between uses and much more! With these tools and Keypom's 4 drop types, you can create everything from [unique onboardings](../../../../Tutorials/Advanced/customized-onboarding/concept.md) to [tiered and exclusive tickets](../../../../Tutorials/Advanced/ticketing/concept.md). 

This is all done through **Drop Configurations**.

:::info
The three objects used to customize your drops are **DropConfig**, **TimeConfig**, and **UsageConfig**.

Any customization will apply to ALL keys in that drop.
:::

[**DropConfig**](drop-customization.md) - Top level configurations, dictates major parameters such as number of uses per key.  

[**TimeConfig**](time-customization.md) - All configurations related to time, such as time between uses.  

[**UsageConfig**](usage-customization.md) - Administrative configurations, such as whether to delete the drop when all keys are used.  

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
├── root_account_id
```