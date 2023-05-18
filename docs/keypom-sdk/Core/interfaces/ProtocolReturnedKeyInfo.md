---
id: "ProtocolReturnedKeyInfo"
title: "Interface: ProtocolReturnedKeyInfo"
sidebar_label: "ProtocolReturnedKeyInfo"
sidebar_position: 0
custom_edit_url: null
---

Key information returned from the Protocol. This interface is exactly the same as the `KeyInfo`, except all the fields are
snake cased instead of camel cased due to what the Protocol returns.

## Properties

### allowance

 **allowance**: `number`

How much allowance does the key have left (measured in $yoctoNEAR). When the key is deleted, this is refunded to the funder's balance.

#### Defined in

[lib/types/protocol.ts:23](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L23)

___

### cur\_key\_use

 **cur\_key\_use**: `number`

Which use is the key currently on? For single-use keys, this is always 1.

#### Defined in

[lib/types/protocol.ts:14](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L14)

___

### drop\_id

 **drop\_id**: `string`

Drop ID for the specific drop that the key belongs to.

#### Defined in

[lib/types/protocol.ts:9](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L9)

___

### key\_id

 **key\_id**: `number`

The unique ID associated to this key. IDs are *not* unique across drops but they are unique for any key in the drop.

#### Defined in

[lib/types/protocol.ts:26](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L26)

___

### last\_used

 **last\_used**: `number`

At what timestamp was the key last used? Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.

#### Defined in

[lib/types/protocol.ts:20](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L20)

___

### public\_key

 **public\_key**: `string`

Public key for this access key.

#### Defined in

[lib/types/protocol.ts:11](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L11)

___

### remaining\_uses

 **remaining\_uses**: `number`

How many uses this key has left before it's deleted.

#### Defined in

[lib/types/protocol.ts:17](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L17)
