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

### Use case

## `end` 
*Default: none, Keys can be used anytime*

### Use case

## `throttle` 
*Default: none, Keys can be used anytime*

### Use case

## `interval` 
*Default: none, Keys can be used anytime*

### Use case

