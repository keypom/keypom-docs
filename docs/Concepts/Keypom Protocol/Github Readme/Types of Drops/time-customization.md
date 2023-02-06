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

## `start` 
*Default: none, Keys can be used anytime*
Start time is useful for any drops where you intend to restrict access until a certain time. Setting a start time effectively sets an activation time; a time where the keys become usable afterwards. Prior to that, if a user is to try and  `claim` the key or use `create_account_and_claim`, it will not work. 

### Use case
Let's say I am running a concert, and we want to give fans exclusive access using prefered and general admission tickets. Those with prefered admission tickets can enter anytime, even when the band is setting up! General admission, on the other hand, may only enter once the band is set up. 

In this case, I would hand out general admission tickets with a start time in the time configurations and another set of prefered admission tickets with and earlier start time in the time configurations.

To do this, I would need to create two drops, one for prefered admission and another for general admission. This is because, as covered in the [Drop Configurations](drop-customization.md) page, one set of configurations will apply to **all** keys in that drop. 

## `end` 
*Default: none, Keys can be used anytime*
Contrary to the start parameter, the end parameter acts as a de-activation time. This means that once the end time is reached, all the keys in the drop will be de-activated and can no longer be used. 

### Use case
Let's pretend that we are at NEARCON and I am an NFT marketplace looking to onboard users into my platform! My strategy is to offer an exclusive NFT to users that sign up during NEARCON. To do this, and to ensure that the users that sign up were actually at NEARCON, I can give out the keys in person and set an end time such that those that claim 

## `throttle` 
*Default: none, Keys can be used anytime*

### Use case

<!-- pending use case -->

## `interval` 
*Default: none, Keys can be used anytime*

### Use case

<!-- pending use case -->
