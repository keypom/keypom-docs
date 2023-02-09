---
sidebar_label: 'Usage Configurations'
---
# Usage Configurations
Usage configurations control behaviours surrounding *how* a key can be used. For example, dictating whether a key can be used to call only `claim`, or `create_account_and_claim`.  

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
    /// When calling `create_account` on the root account, which keypom args should be attached to the payload.
    pub account_creation_fields: Option<KeypomArgs>,
}
```  

---

## Permissions
*Default: `claim` AND `create_account_and_claim`*  

The `permissions` parameter assigns which claim methods the user can call with the key you give them. They can either call both, or just one. 

### Use case
Pretend you are hosting a talk about your NEAR dApp: `Kramerly`. Your only goal is to onboard as many *new* users from the audience as possible. If the user already has a NEAR wallet, they shouldn't be able to claim assets and onboard. This is similar to free-trials in Web2 whereby only new users are able to participate.

To do this, you can set the `permissions` parameter to `create_account_and_claim`.

---

## Refund Deposit
*Default: False*  

This `refund_deposit` parameter defines whether or not the `deposit_for_use` amount should be refunded to the drop owner if `claim` is called rather than `create_account_and_claim`.

Part of funding a drop is *optionally* covering the cost for creating a new named account. Sometimes, you might want to sponsor a small amount of $NEAR to cover that cost but it should only be used for account creation. If an account is *not* being created (through calling `create_account_and_claim`, the `deposit_per_use` should be sent back to the funder.

### Use case
This parameter is usually a helpful mechanism when onboarding large numbers of users onto NEAR. Pretend you are onboarding 100,000 new users. Since they are new, you factor in the storage deposit needed to create the new wallets into your funding costs. After the event, however, it turns out half of the users had existing wallets.  

If `refund_deposit` was true, you would be refunded the `deposit_per_use` that normally would have been sent to the existing NEAR wallets.  

---

## Auto-Delete Drop 
*Default: False*  

If `auto_delete_drop` is set to `true`, the drop will be deleted once all the keys have been used and deleted.

### Use case
A great use case is for one-off drops where you don't plan on adding more keys to. By setting `auto_delete_drop` to true, the drop will automatically be deleted once all the keys are used.   

---

## Auto-Withdraw
*Default: False*  

This parameter is used to automatically withdraw your Keypom balance once you delete your last drop.

### Use case
This parameter is useful for users that create 1-off drops and don't want to worry about deleting their drop once it's used or having to manually withdraw their Keypom balance.  

A funder could create a drop and give out keys without ever needing to return back to Keypom. Once the drop is exhausted, it is deleted and the funder's balance is automatically withdrawn. 

Note that this must be used together with `auto_delete_drop`.

## Account Creation Fields
*Default: None*

The `account_creation_fields` allows you to specify any arguments to be passed in to `create_account` when creating your account

### Use case
Pretend you are looking to use Keypom to onboard users and give them custom subaccounts. To ensure that only the people  using your drop can create a subaccount, you can add a secret `account_creation_fields` argument to your drop.

This way, if someone outside of the drop were to try to call `create_account` on your contract, they would need to pass in the secret `account_creation_field` that they would not know.   