---
id: "ProtocolReturnedTimeConfig"
title: "Interface: ProtocolReturnedTimeConfig"
sidebar_label: "ProtocolReturnedTimeConfig"
sidebar_position: 0
custom_edit_url: null
---

Time Config information returned from the Protocol. This interface is exactly the same as the `TimeConfig`, except all the fields are
snake cased instead of camel cased due to what the Protocol returns.

## Properties

### end

 `Optional` **end**: `number`

Block timestamp that keys must be used before. If this isn't specified, keys can be used indefinitely.
Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.

#### Defined in

[src/lib/types/protocol.ts:98](https://github.com/keypom/keypom-js/blob/f5507ba/src/lib/types/protocol.ts#L98)

___

### interval

 `Optional` **interval**: `number`

Interval of time after the `start_timestamp` that must pass before a key can be used. If multiple intervals pass, the key can be used multiple times. 
This has nothing to do With the throttle timestamp. It only pertains to the start timestamp and the current timestamp. The last_used timestamp is not taken into account.
Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.

#### Defined in

[src/lib/types/protocol.ts:111](https://github.com/keypom/keypom-js/blob/f5507ba/src/lib/types/protocol.ts#L111)

___

### start

 `Optional` **start**: `number`

Minimum block timestamp before keys can be used. If this isn't specified, keys can be used immediately.
Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.

#### Defined in

[src/lib/types/protocol.ts:92](https://github.com/keypom/keypom-js/blob/f5507ba/src/lib/types/protocol.ts#L92)

___

### throttle

 `Optional` **throttle**: `number`

Amount of time that *must* pass in between each key use. If this isn't specified, there is no delay between key uses.
Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.

#### Defined in

[src/lib/types/protocol.ts:104](https://github.com/keypom/keypom-js/blob/f5507ba/src/lib/types/protocol.ts#L104)