---
sidebar_label: 'Time Configurations'
---
# Time Configurations
Time configurations are particularly useful in defining limits on ***when*** a key may be used. This can have a wide range of applications from [Subscriptions](../../../../Tutorials/Advanced/subscriptions/introduction.md) to [Ticketing](../../../../Tutorials/Advanced/ticketing/introduction.md).

```rust
pub struct TimeConfig {
    /// Minimum block timestamp before keys can be used. If None, keys can be used immediately
    /// Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.
    pub start: Option<u64>,

    /// Block timestamp that keys must be before. If None, keys can be used indefinitely
    /// Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.
    pub end: Option<u64>,

    /// Time interval between each key use. If None, there is no delay between key uses.
    /// Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.
    pub throttle: Option<u64>,

    /// Interval of time after the `start_timestamp` that must pass before a key can be used.
    /// If multiple intervals pass, the key can be used multiple times. This has nothing to do
    /// With the throttle timestamp. It only pertains to the start timestamp and the current
    /// timestamp. The last_used timestamp is not taken into account.
    /// Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.
    pub interval: Option<u64>,
}
```
:::tip
All these time parameters are measured in non-leap-nanoseconds and can be tricky to work with. An example struct has been provided [below](time-customization.md).
:::  


---

## Start 
*Default: none, Keys can be used anytime*  

`Start` time is useful for any drops where you intend to restrict access until a certain time. Setting a `start` time effectively sets an activation time; a time where the keys become usable afterwards. Before a `start` time is reached, if a user tries to `claim` the key or use `create_account_and_claim`, it will not work. 

### Use case
Let's say you are running a concert, and you want to give fans exclusive access using preferred and general admission tickets. Those with preferred admission tickets can enter anytime, even when the band is setting up. General admission, on the other hand, may only enter once the band is set up. 

In this case, you would hand out general admission tickets with a start time in the time configurations and another set of preferred admission tickets with an earlier start time in the time configurations.

To do this, you would need to create two drops, one for preferred admission and another for general admission. This is because, as covered in the [Drop Configurations Introduction](customization-homepage.md), one set of configurations will apply to **all** keys in that drop. 

---

## End
*Default: none, Keys can be used anytime*  

The end parameter acts as a deactivation time. This means that once the end time is reached, all the keys in the drop will be deactivated and can no longer be used. 

### Use case
Let's pretend that you are at NEARCON representing an NFT marketplace looking to onboard users onto your platform. Your strategy is to offer an exclusive NFT to users that sign up during NEARCON. 

To do this, you hand out QR codes with an NFT drop embedded in the QR code during the event. To ensure that the users sign up *during* NEARCON, you set the drop configuration's `end` parameter to be the end of NEARCON. 

---

## Throttle
*Default: none, Keys can be used anytime*  

The `throttle` parameter controls how much time must pass between key uses. This works great if you want to control how frequently somebody is able to claim their assets. 

### Use case
Pretend you are running an NFT raffle for your latest creation, the MoonNFT. For this raffle, the 20th person claiming their key will be the winner and will receive their own personalized MoonNFT. 

To protect again spam and ensure a fair playing field, you can configure the drop to have a 5 minute cooldown using the `throttle` parameter. This way, a contestant cannot spam claim the key to increase their odds of winning. 

---

## Interval
*Default: none, Keys can be used anytime*  

The `interval` parameter is similar to the `throttle` parameter but uses the  `start` time as a constant reference. This means if `interval` is every week, the key will become useable on the same day every week, regardless of when the last key use was. 

### Use case
Pretend you have a subscription to Moon's **weekly** dog biscuit delivery service that charges you every Monday. Due to all the horror stories of data breaches and identity theft, you now no longer give out your credit card information. For this reason, you wish to pay with $NEAR but the current linkdrop standard does not allow for a subscription model. 

With Keypom, you can give Moon a multi-use simple drop with a `throttle` parameter set to 2 weeks. This way, Moon will only be able to claim every week, making it a subscription. This is also beneficial in giving a sense of security to Moon, as they can claim later than Monday and know that they will be able to claim again next Monday. 

If, for one week, Moon forgets to claim, he would be able to claim twice the next week.


The massive benefit here is that you can have a subscription service in the NEAR ecosystem and never need to expose any of your private information.


---

## Example Time Configuration

```ts
const ONE_SECOND_NS = 1e9;

time: {
    // Start time is 30 seconds from now
    start: (Date.now() * 1000000) + ONE_SECOND_NS * 30,

    // End time is 5 minutes from start time
    end: (Date.now() * 1000000) + ONE_SECOND_NS * 330,

    // Time between use is 15 seconds
    throttle: ONE_SECOND_NS * 15,

    // Time after start for first use is 15 seconds
    interval: ONE_SECOND_NS * 15,
}
```


