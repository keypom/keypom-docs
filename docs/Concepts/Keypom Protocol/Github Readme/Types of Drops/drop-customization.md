---
sidebar_label: 'General Drop Customization'
sidebar_position: 2
---
# Shared Drop Customization

While each *type* of drop has its own set of customizable features, there are some that are shared by **all drops**
These are outlined below.

```rust
/// Each time a key is used, how much $NEAR should be sent to the claiming account (can be 0).
pub deposit_per_use: u128,

/// How much Gas should be attached when the key is used. The default is 100 TGas as this is
/// what's used by the NEAR wallet.
pub required_gas: Gas,

/// The drop as a whole can have a config as well
pub config: Option<DropConfig>,

/// Metadata for the drop in the form of stringified JSON. The format is completely up to the
/// user and there are no standards for format.
pub metadata: LazyOption<DropMetadata>,
```

Within the config, there are a suite of features that can be customized as well:

```rust
/// How many uses can each key have before it's deleted. If None, default to 1.
pub uses_per_key: Option<u64>,

/// Minimum block timestamp before keys can be used. If None, keys can be used immediately
/// Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.
pub start_timestamp: Option<u64>,

/// Block timestamp that keys must be before. If None, keys can be used indefinitely
/// Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.
pub end_timestamp: Option<u64>,

/// How often can a key be used. This specifies the time between each use.
/// Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.
pub throttle_timestamp: Option<u64>,

/// Interval of time after the `start_timestamp` that must pass before a key can be used.
/// If multiple intervals pass, the key can be used multiple times. This has nothing to do
/// With the throttle timestamp. It only pertains to the start timestamp and the current 
/// timestamp. The last_used timestamp is not taken into account.
/// Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.
pub claim_interval: Option<u64>,

/// If claim is called, refund the `deposit_per_use` to the owner's account directly. If None,
/// default to false.
pub on_claim_refund_deposit: Option<bool>,

/// What permissions does the key have? Can it call both `claim` and `create_account_and_claim`
/// or just one of the two?
/// This defaults to the key being able to call both methods.
pub claim_permission: Option<ClaimPermissions>,

/// Override the global root account that sub-accounts will have (near or testnet). This allows
/// users to create specific drops that can create sub-accounts of a predefined root.
/// For example, Fayyr could specify a root of `fayyr.near` By which all sub-accounts will then
/// be `ACCOUNT.fayyr.near`
pub drop_root: Option<AccountId>,

/// Should the drop be automatically deleted when all the keys are used? This is defaulted to false and
/// Must be overwritten
pub delete_on_empty: Option<bool>,

/// When this drop is deleted and it is the owner's *last* drop, automatically withdraw their balance.
pub auto_withdraw: Option<bool>,