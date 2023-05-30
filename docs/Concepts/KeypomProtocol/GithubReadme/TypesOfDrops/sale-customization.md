---
sidebar_label: 'Public Sale Configurations'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Public Sale Configurations
The public sale configuration gives the funder the ability to sell access keys in their drop with a variety of configurable behaviors such as the price, or a dedicated allowlist.  

## Use cases
Public sales of access keys allow for a wide range of easier to create and more interactive events. This is done by letting you:  
* Set up an extremely cheap, exclusive event. This event can host an infinite amount of people and the cost of ticketing would be ~0.05 $NEAR.
* Sell access to gated function calls. For example, you can have an exclusive guest-book contract where users that signed it gained access to a VIP meet and greet with a famous artist.  
* Introduce FIAT payments for your users when they purchase an access key; opening up your tickets, onboardings, and NFT drops to a whole new audience.  


The sale configurations are outlined below.

<Tabs>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```ts reference
https://github.com/keypom/keypom-js/blob/29c10f949f02f673d4a3cecc21b0f74bca600075/src/lib/types/drops.ts#L159-L187
```

</TabItem>
<TabItem value="KP" label="📚 Protocol">

```rust reference
https://github.com/keypom/keypom/blob/7a654aa847f2ce9dedf65755c6a08817eece4666/contract/src/models/json_types.rs#L86-L113
```

</TabItem>
</Tabs>              

---

## Maximum Number of Keys
*Default: None*  

The `max_num_keys` parameter dictates the maximum number of keys that can be added to a drop. By default, there is no limit. Using this can help create scarcity, or abide by venue capacities. 

### Use case
Pretend you are hosting an exclusive talk for your dApp and want to limit the attendance 1000 people. 

In this scenario, you could configure the drop to have `max_num_keys = 1000` in order to ensure any keys beyond 1000 cannot be bought and added to the drop.  

---

## Price per Key
*Default: None, the keys are free*  

This `price_per_key` parameter defines the price for purchasing a key. 

### Use case
This parameter can be changed based on your needs. For example, if you are running a charity event and want to bring in as many attendees as possible, you would leave both `price_per_key = 0` and  `max_num_keys` undefined. This would mean there is no limit on the number of *free* keys that can be added to the drop. 

Alternatively, if you are looking to earn money with your event, you can choose to set `price_per_key` to whatever you see fit. This value is expressed in yoctoNEAR.

---

## Allowlist 
*Default: None, anyone can add keys to the drop*  

`Allowlist` specifies a group of users that can add keys to the drop using their `accountID`. For example, if `allowlist = [benji.testnet, minqi.testnet]`, then only `benji.testnet` and `minqi.testnet` can add keys to the drop. 

If left undefined, anybody can add keys to the drop.

### Use case
In this example, pretend you are running a concert for only your closest friends. To do this, you would set `allowlist` to be a vector of their NEAR `accountID`'s. This way, you can take comfort in knowing that your friends will be the only ones with tickets to the event.  

---

## Blocklist
*Default: None, nobody is blocked*  

Contrary to the `allowlist`, the `blocklist` specifies those that are blocked from adding keys to the drop. This is empty by default, meaning nobody is blocked.

Note that the `blocklist` takes precedent over the `allowlist`. This means that if you are on both lists, you will be blocked. 

### Use case
Lets pretend that you are running a concert but there are known ticket scalpers in the community. To prevent keys from being scalped and ensure your true fans get tickets to your concert, you can add the NEAR `accountID`'s of the scalpers to the `blocklist` vector.   

---

## Auto-Withdraw Funds  
*Default: False, revenues go to funder's Keypom Balance*  

The `auto_withdraw_funds` parameter dictates where revenue from key sales will go. Every time a key is sold, the revenue will automatically be sent to one of two places:

1. the funder's Keypom balance  
2. the funder's NEAR wallet  

By default, the revenue will go to the funder's Keypom balance. If `auto_withdraw_funds = true`, the revenue generated will be sent to the funder's NEAR wallet. 

### Use case
Let's say you are an event promoter who is new to NEAR. You realize that you are only going to use Keypom for a single event.

In this scenario, rather than sending revenues to your Keypom balance and then needing to manually withdraw it once the event is over, you can set `auto_withdraw_funds = true` while creating the drop in order to guarantee that the revenues will go to your NEAR wallet automatically.  

---

## Start
*Default: None, keys can be added immediately*  

The `start` parameter dictates when keys can be purchased and added to the drop. Similar to [time configurations](time-customization.md), this is measured in non-leap-nanoseconds since January 1, 1970 0:00:00 UTC. A sample configuration is made available below. 

### Use case
Pretend you are an event coordinator for a popular event and have a limited capacity. To ensure fairness, you set a date and time for the sale to begin and let all your users know.

To do this, you can configure the `start` parameter.  

---

## End 
*Default: None, keys can be added indefinitely*  

The `end` parameter defines when keys can no longer be purchased and added to the drop. 

### Use case
For an upcoming event, you want to create a pre-sale of tickets for dedicated fans. To do this you can create a drop, separate from the main ticket sale, that begins early and ends before the general admission tickets go on sale. 

To do this, you can configure the `end` parameter.

---


## Example Public Sale Configuration

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


