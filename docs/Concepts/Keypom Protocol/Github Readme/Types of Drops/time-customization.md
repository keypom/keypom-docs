---
sidebar_label: 'Time Configurations'
---
# Time Configurations
Time configurations are particularly useful in defining limits on *when* a key may be used. This can have a wide range of applicaitons from [Subcriptions](../../../../Tutorials/Advanced/subscriptions/concept.md) to [Ticketing](../../../../Tutorials/Advanced/ticketing/concept.md)

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
Start time is useful for any drops where you intend to restrict access until a certain time. Setting a start time effectively sets an activation time; a time where the keys become usable afterwards. Prior to that, if a user is to try and  `claim` the key or use `create_account_and_claim`, it will not work. 

### Use case
Let's say you are running a concert, and you want to give fans exclusive access using prefered and general admission tickets. Those with prefered admission tickets can enter anytime, even when the band is setting up! General admission, on the other hand, may only enter once the band is set up. 

In this case, you would hand out general admission tickets with a start time in the time configurations and another set of prefered admission tickets with and earlier start time in the time configurations.

To do this, you would need to create two drops, one for prefered admission and another for general admission. This is because, as covered in [Drop Configurations Introduction](customization-homepage.md), one set of configurations will apply to ALL keys in that drop. 

---

## End
*Default: none, Keys can be used anytime*
The end parameter acts as a de-activation time. This means that once the end time is reached, all the keys in the drop will be de-activated and can no longer be used. 

### Use case
Let's pretend that you are at NEARCON representing an NFT marketplace looking to onboard users onto your platform! Your strategy is to offer an exclusive NFT to users that sign up during NEARCON. 

To do this, you hand out QR codes with an NFT drop embedded in the QR code during NEARCON. To ensure that the users sign up during NEARCON, you set the drop configuration's `end` parameter to be the end of NEARCON. 

---

## Throttle
*Default: none, Keys can be used anytime*
The `throttle` parameter controls the time between key uses. This works great if you want to control how frequently somebody is able to claim their assets. 

### Use case
Pretend you have a subscription to Moon's **bi-weekly** dog biscuit delivery service. Due to all the horror stories of data breaches and identity theft, you now no longer give out your credit card information. For this reason, you wish to pay with $NEAR but current linkdrop standard does not allow for a subscription model. 

With Keypom, you can give Moon a multi-use simple drop with a `throttle` parameter set to 2 weeks. This way, Moon will only be able to claim every 2 weeks, making it a subscription. 

The massive benefit here is that you never need to expose any of your private information. There is no need to trust Moon with any of your credit cards or private keys.

---

## Interval
*Default: none, Keys can be used anytime*
The `interval` parameter controls how much time must pass after a start before a key can be used. It is important to note that this works hand in hand with the `throttle` parameter but does not override it. 

The combination of the two can create the concept of an initial grace period.

### Use case
Let's return to the subscription example from above. If Moon says you can delay your first payment by 1 week, you can use AHHHHHHHHHHHHHH

---

# Example Time Struct

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


