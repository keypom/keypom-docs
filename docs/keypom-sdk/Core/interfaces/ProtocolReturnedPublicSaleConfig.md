---
id: "ProtocolReturnedPublicSaleConfig"
title: "Interface: ProtocolReturnedPublicSaleConfig"
sidebar_label: "ProtocolReturnedPublicSaleConfig"
sidebar_position: 0
custom_edit_url: null
---

Within the config, there are configurable options related to how keys can be sold and a funder can potentially make a profit.

## Properties

### allowlist

 `Optional` **allowlist**: `string`[]

Which accounts are allowed to add keys? If the allowlist is empty, anyone that is not in the blocklist can add keys.

#### Defined in

[lib/types/protocol.ts:173](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L173)

___

### auto\_withdraw\_funds

 `Optional` **auto\_withdraw\_funds**: `boolean`

Should the revenue generated be sent to the funder's account balance or
automatically withdrawn and sent to their NEAR wallet?

#### Defined in

[lib/types/protocol.ts:180](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L180)

___

### blocklist

 `Optional` **blocklist**: `string`[]

Which accounts are NOT allowed to add keys?

#### Defined in

[lib/types/protocol.ts:175](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L175)

___

### end

 `Optional` **end**: `number`

Block timestamp dictating the end of the public sale. If None, keys can be added indefinitely
Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.

#### Defined in

[lib/types/protocol.ts:190](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L190)

___

### max\_num\_keys

 `Optional` **max\_num\_keys**: `number`

Maximum number of keys that can be added to this drop. If None, there is no max.

#### Defined in

[lib/types/protocol.ts:166](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L166)

___

### price\_per\_key

 `Optional` **price\_per\_key**: `string`

Amount of $NEAR that the user needs to attach (if they are not the funder) on top of costs. This amount will be
Automatically sent to the funder's balance. If None, the keys are free to the public.

#### Defined in

[lib/types/protocol.ts:171](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L171)

___

### start

 `Optional` **start**: `number`

Minimum block timestamp before the public sale starts. If None, keys can be added immediately
Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.

#### Defined in

[lib/types/protocol.ts:185](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L185)
