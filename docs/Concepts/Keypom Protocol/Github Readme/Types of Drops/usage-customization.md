---
sidebar_label: 'Usage Configurations'
---
# Usage Configurations
Usage configurations are the nitty grity, they dictate more administrative aspects of the drop such as permissions given to the keys and what to do when all the keys in a drop are used. 

``` rust
pub struct UsageConfig {
    /// Can the access key only call the claim method_name? Default to both method_name callable
    pub permissions: Option<ClaimPermissions>,
    /// If claim is called, refund the deposit to the owner's balance. If None, default to false.
    pub refund_deposit: Option<bool>,
    /// Should the drop be automatically deleted when all the keys are used? This is defaulted to false and
    /// Must be overwritten
    pub auto_delete_drop: Option<bool>,
    /// When this drop is deleted and it is the owner's *last* drop, automatically withdraw their balance.
    pub auto_withdraw: Option<bool>,
}
```

## `permissions` 
*Default: `claim` AND `create_account_and_claim`*

### Use case

## `refund_deposit` 
*Default: False*

### Use case

## `auto_delete_drop` 
*Default: False*

### Use case

## `auto_withdraw` 
*Default: False*

### Use case