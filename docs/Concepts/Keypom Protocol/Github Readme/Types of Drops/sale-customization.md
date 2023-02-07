---
sidebar_label: 'Public Sale Configurations'
---
# Public Sale Configurations
Public sale configurations give the funder the ability to create a public sale for the access keys in a drop.
The funder can create a drop and let people add keys to it on an as-needed basis. The sale configurations are outlined below.

```rust
pub struct PublicSaleConfig {
    /// Maximum number of keys that can be added to this drop. If None, there is no max.
    pub max_num_keys: Option<u64>,
 
    /// Amount of $NEAR that the user needs to attach (if they are not the funder) on top of costs. This amount will be
    /// Automatically sent to the funder's balance. If None, the keys are free to the public.
    pub price_per_key: Option<u128>,
 
    /// Which accounts are allowed to add keys?
    pub allowlist: Option<LookupSet<AccountId>>,
 
    /// Which accounts are NOT allowed to add keys?
    pub blocklist: Option<LookupSet<AccountId>>,

    /// Should the revenue generated be sent to the funder's account balance or
    /// automatically withdrawn and sent to their NEAR wallet?
    /// If none or false, revenue is sent to the funder's account balance
    pub auto_withdraw_funds: Option<bool>,

    /// Minimum block timestamp before the public sale starts. If None, keys can be added immediately
    /// Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.
    pub start: Option<u64>,

    /// Block timestamp dictating the end of the public sale. If None, keys can be added indefinitely
    /// Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.
    pub end: Option<u64>,
}
```                

---

## Maximum Number of Keys
*Default: None*  

The `max_num_keys` parameter dictates 

### Use case
Pretend you are hosting a talk about your NEAR dApp, Kramerly, and are onboarding a bunch of new user from the audience. You wish to make sure that all these audience member who are onboarded onto your dApp have accounts that take the form `${YOUR_ACCOUNT}.kramerly.near` so that they can receive exclusive rewards when interacting with your dApp.

To do this, you can set the `permissions` parameter to `create_account_and_claim` and set the `root_account_id` parameter to `kramerly.near`. This way, you can ensure that everybody must create a new account with the form of `${YOUR_ACCOUNT}.kramerly.near` to interact with your dApp.  

---

## Price per Key
*Default: None, the keys are free*  

This `refund_deposit` parameter defines whether or not a storage deposit for creating a new wallet should be refunded to the drop owner if a new account is not created.

Part of funding a drop is covering the cost for creating a new named account. However, if the `claim` method is called, the deposit will be unused. If left as false, the deposit will be given to the user.

### Use case
This parameter is usually a helpful mechanism when onboarding large numbers of users into NEAR. Pretend you are onboarding 100,000 new users onto NEAR. Since they are new, you factor in the storage deposit needed to create all the new wallets into your funding costs. However, it turns out half of the users had existing wallets. 

If `refund_deposit` was true, you would be refunded the deposit for creating 50,000 new wallets. With a cost of 0.2 $NEAR, you would be refunded 10,000 $NEAR.   

---

## Allowlist 
*Default: None, anyone can add keys to the drop*  

If `auto_delete_drop` is `true`, the drop to deleted once all the keys have been fully used (every key has used all of its `uses_per_key`).

### Use case
A great use case for auto-deleting a drop would be drops created for certain events. Pretend you are at NEARCON and create an NFT drop for [ticketing](../../../../Tutorials/Advanced/ticketing/concept.md). Once the event is over, there is no need for that particular drop anymore.

Rather than needing to make sure all the keys are used and then deleting it, this configuration will automatically delete it for you.  

---

## Blocklist
*Default: None, nobody is blocked*  

This parameter is used to automatically withdraw your Keypom balance once you delete your last drop.

### Use case
Pretend you are at NEARCON again, and you over-fund your Keypom balance. This is to allow you to create drops without needing to trasnfer NEAR to Keypom every time. After the event, you know you won't be using Keypom for a while😢 and wish to withdraw your Keypom balance into your NEAR wallet in order to stake your $NEAR. 

Rather than confirming all the drops are deleted before withdrawing your balance, you can create all the drops with `auto-withdraw` set to true and know that once everything is claimed and deleted, you will have your $NEAR to stake. 

---

## Auto-Withdraw Funds  
*Default: False, revenues go to Keypom Balance*  

If `auto_delete_drop` is `true`, the drop to deleted once all the keys have been fully used (every key has used all of its `uses_per_key`).

### Use case
A great use case for auto-deleting a drop would be drops created for certain events. Pretend you are at NEARCON and create an NFT drop for [ticketing](../../../../Tutorials/Advanced/ticketing/concept.md). Once the event is over, there is no need for that particular drop anymore.

Rather than needing to make sure all the keys are used and then deleting it, this configuration will automatically delete it for you.  

---

## Start
*Default: False, keys can be added immidiately*  

If `auto_delete_drop` is `true`, the drop to deleted once all the keys have been fully used (every key has used all of its `uses_per_key`).

### Use case
A great use case for auto-deleting a drop would be drops created for certain events. Pretend you are at NEARCON and create an NFT drop for [ticketing](../../../../Tutorials/Advanced/ticketing/concept.md). Once the event is over, there is no need for that particular drop anymore.

Rather than needing to make sure all the keys are used and then deleting it, this configuration will automatically delete it for you.  

---

## End 
*Default: None, keys can be added indefinitely*  

If `auto_delete_drop` is `true`, the drop to deleted once all the keys have been fully used (every key has used all of its `uses_per_key`).

### Use case
A great use case for auto-deleting a drop would be drops created for certain events. Pretend you are at NEARCON and create an NFT drop for [ticketing](../../../../Tutorials/Advanced/ticketing/concept.md). Once the event is over, there is no need for that particular drop anymore.

Rather than needing to make sure all the keys are used and then deleting it, this configuration will automatically delete it for you.  


