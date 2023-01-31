---
sidebar_label: 'Usage Configurations'
---
# Usage Configurations
Usage configurations dictate the administrative aspects of the drop such as permissions given to the keys and what to do when all the keys in a drop are used. 

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

---

## Permissions
*Default: `claim` AND `create_account_and_claim`*  

The `permissions` parameter assigns which claim methods the user can call with the key you give them. They can either call both, or just one. 

### Use case
Pretend you are hosting a talk about your NEAR dApp, Kramerly, and are onboarding a bunch of new user from the audience. You wish to make sure that all these audience member who are onboarded onto your dApp have accounts that take the form `${YOUR_ACCOUNT}.kramerly.near` so that they can receive exclusive rewards when interacting with your dApp.

To do this, you can set the `permissions` parameter to `create_account_and_claim` and set the `root_account_id` parameter to `kramerly.near`. This way, you can ensure that everybody must create a new account with the form of `${YOUR_ACCOUNT}.kramerly.near` to interact with your dApp.  

---

## Refund Deposit
*Default: False*  

This `refund_deposit` parameter defines whether or not a storage deposit for creating a new wallet should be refunded to the drop owner if a new account is not created.

Part of funding a drop is covering the cost for creating a new named account. However, if the `claim` method is called, the deposit will be unused. If left as false, the deposit will be given to the user.

### Use case
This parameter is usually a helpful mechanism when onboarding large numbers of users into NEAR. Pretend you are onboarding 100,000 new users onto NEAR. Since they are new, you factor in the storage deposit needed to create all the new wallets into your funding costs. However, it turns out half of the users had existing wallets. 

If `refund_deposit` was true, you would be refunded the deposit for creating 50,000 new wallets. With a cost of 0.2 $NEAR, you would be refunded 10,000 $NEAR.   

---

## Auto-Delete Drop 
*Default: False*  

If `auto_delete_drop` is `true`, the drop to deleted once all the keys have been fully used (every key has used all of its `uses_per_key`).

### Use case
A great use case for auto-deleting a drop would be drops created for certain events. Pretend you are at NEARCON and create an NFT drop for [ticketing](../../../../Tutorials/Advanced/ticketing/concept.md). Once the event is over, there is no need for that particular drop anymore.

Rather than needing to make sure all the keys are used and then deleting it, this configuration will automatically delete it for you.  

---

## Auto-Withdraw
*Default: False*  

This parameter is used to automatically withdraw your Keypom balance once you delete your last drop.

### Use case
Pretend you are at NEARCON again, and you over-fund your Keypom balance. This is to allow you to create drops without needing to trasnfer NEAR to Keypom every time. After the event, you know you won't be using Keypom for a while😢 and wish to withdraw your Keypom balance into your NEAR wallet in order to stake your $NEAR. 

Rather than confirming all the drops are deleted before withdrawing your balance, you can create all the drops with `auto-withdraw` set to true and know that once everything is claimed and deleted, you will have your $NEAR to stake. 