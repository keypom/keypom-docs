---
id: "TimeConfig"
title: "Interface: TimeConfig"
sidebar_label: "TimeConfig"
sidebar_position: 0
custom_edit_url: null
---

Within the config, there are configurable options related to timing such as how often a key can be used.

## Properties

### end

• `Optional` **end**: `number`

Block timestamp that keys must be used before. If this isn't specified, keys can be used indefinitely.
Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.

#### Defined in

[src/lib/types/drops.ts:95](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/drops.ts#L95)

___

### interval

• `Optional` **interval**: `number`

Interval of time after the `start_timestamp` that must pass before a key can be used. If multiple intervals pass, the key can be used multiple times. 
This has nothing to do With the throttle timestamp. It only pertains to the start timestamp and the current timestamp. The last_used timestamp is not taken into account.
Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.

#### Defined in

[src/lib/types/drops.ts:108](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/drops.ts#L108)

___

### start

• `Optional` **start**: `number`

Minimum block timestamp before keys can be used. If this isn't specified, keys can be used immediately.
Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.

#### Defined in

[src/lib/types/drops.ts:89](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/drops.ts#L89)

___

### throttle

• `Optional` **throttle**: `number`

Amount of time that *must* pass in between each key use. If this isn't specified, there is no delay between key uses.
Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.

#### Defined in

[src/lib/types/drops.ts:101](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/drops.ts#L101)