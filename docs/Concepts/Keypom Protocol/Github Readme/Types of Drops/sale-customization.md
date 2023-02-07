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

The `max_num_keys` parameter dictates the maximum number of keys that can be added to a drop. By default, there is no maximum. Using this can help create scarcity, or abide by venue maximum capcities. 

### Use case
Pretend you are hosting an exclusive talk for your dApp and want to limit the attendance to the first 1000 people that get tickets. 

In this scenario, you could configure the drop to have `max_num_keys = 1000` in order to ensrue any keys beyond 1000 cannot be bought and added to the drop.  

---

## Price per Key
*Default: None, the keys are free*  

This `refund_deposit` parameter defines the price for purchasing a key. 

### Use case
This parameter can be changed based on your needs. For example, if you are running a charity event and want to garner as many attendees as possible, you would leave both `price_per_key = 0` and  `max_num_keys` undefined. This would mean there is no limit on the number of *free* keys that can be added to the drop. 

Alternatively, if you are looking to earn money with your event, you can choose to set `price_per_key` to whatever you see fit.  

---

## Allowlist 
*Default: None, anyone can add keys to the drop*  

`Allowlist` specifies specific people that can be added to the drop using their accountID. For example, if `allowlist =[benji.testnet, minqi.testnet]`, then only `benji.testnet` and `minqi.testnet` can add keys to the drop. 

If left undefinted, anybody can add keys to the drop.

### Use case
In this example, lets say you are running a concert for only you and your closest friends. In this scenario, you would set `allowlist` to be only your friends. This way, you can take comfort in knowing that your friends will be the only ones with tickets to the event and thus.  

---

## Blocklist
*Default: None, nobody is blocked*  

Contrary to the `allowlist`, the `blocklist` specifies those that are blocked from adding keys to the drop. This is empty by default, meaning nobody is blocked.

Note that the `blocklist` takes prescedent over the `allowlist`. This means that if you are on both lists, you will be blocked. 

### Use case
Lets pretend that you are running a concert but there are known ticket scalpers in the community. To prevent keys from being scalped and to ensure your true fans get tickets to your concert, you can add these scalpers to the `blocklist`.   

---

## Auto-Withdraw Funds  
*Default: False, revenues go to Keypom Balance*  

The `auto_withdraw_funds` parameter dictates where revenue from key sales will go. Every time a key is sold, the revenue will automatically be sent to one of two places.

1. the funder's Keypom balance  
2. the funder's NEAR wallet  

By default, the revenue will go to the funder's Keypom balance. If `auto_withdraw_funds = true`, the revenue generated will be sent to the funder's NEAR wallet. 

### Use case
Let's say you are an event promoter who is new to NEAR. You realize that you are only going to use Keypom for a single event.

In this scenario, rather than sending revenues to your Keypom balance amd then needing to manually withdraw it once the event is over, you can set `auto_withdraw_funds = true` while creating the drop, in order to guarenetee that teh revenues will go to your NEAR wallet automatically.  

---

## Start
*Default: False, keys can be added immidiately*  

The `start` parameter dictates when keys can be purhcased and added to the drop. Similar to [time configurations](time-customization.md), this is measured in non-leap-nanoseconds since January 1, 1970 0:00:00 UTC. A sample configuration is made available below. 

### Use case
Pretend you are an event coordinator for a popular event and only have a limited capacity. To ensure fairness, you set a date and time for the sale to begin and let all your users know.

To do this, you can configure the `start` parameter.  

---

## End 
*Default: None, keys can be added indefinitely*  

The `end` parameter defines when keys can no longer be purchased and added to the drop. 

### Use case
Pretend you are an event coordinator and want to create early bird tickets for dedicated fans. To do this, you can create a drop, sepearate from general admission, that begins early and ends before the general admission tickets go on sale. 

To do this, you can configure the `end` parameter.

---


# Example Public Sale Configuration

```ts
const ONE_SECOND_NS = 1e9;

pub_sale: {
    // Maximum of 100 Keys
    max_num_key: 100,

    // 1 $NEAR per key
    price_per_key: parseNearAmount("1"),

    // only allow benji.testnet and minqi.testnet to add keys
    allowlist: ["benji.testnet", "minqi.testnet"],

    // don't allow boogieman.testnet to add keys
    blocklist: ["boogieman.testnet"],

    // send revenue back to funder's NEAR wallet
    auto_withdraw_funds: true,

    // start 5 minutes from now
    start: (Date.now() * 1000000) + ONE_SECOND_NS * 300,

    // end 15 minutes from now
    end: (Date.now() * 1000000) + ONE_SECOND_NS * 900
}

```


