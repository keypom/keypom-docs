---
id: "ProtocolReturnedDrop"
title: "Interface: ProtocolReturnedDrop"
sidebar_label: "ProtocolReturnedDrop"
sidebar_position: 0
custom_edit_url: null
---

Drop information returned from the Protocol. This interface is exactly the same as the `Drop`, except all the fields are
snake cased instead of camel cased due to what the Protocol returns.

## Properties

### config

 `Optional` **config**: [`ProtocolReturnedDropConfig`](ProtocolReturnedDropConfig.md)

All drops regardless of their type can have a suite of configurations such as how many uses each key has or how often a key can be used.

#### Defined in

[lib/types/protocol.ts:49](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L49)

___

### deposit\_per\_use

 **deposit\_per\_use**: `string`

How much $yoctoNEAR will be transferred anytime a key is used that is part of this drop.

#### Defined in

[lib/types/protocol.ts:39](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L39)

___

### drop\_id

 **drop\_id**: `string`

Drop ID for this specific drop.

#### Defined in

[lib/types/protocol.ts:35](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L35)

___

### fc

 `Optional` **fc**: [`ProtocolReturnedFCData`](ProtocolReturnedFCData.md)

For Function-Call drops, important information needs to be stored such as which methods, the attached deposit, args etc.

#### Defined in

[lib/types/protocol.ts:47](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L47)

___

### ft

 `Optional` **ft**: [`ProtocolReturnedFTData`](ProtocolReturnedFTData.md)

For Fungible Token drops, important information such as the amount of tokens to transfer, or contract need to be stored.

#### Defined in

[lib/types/protocol.ts:45](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L45)

___

### keys

 `Optional` **keys**: [`ProtocolReturnedKeyInfo`](ProtocolReturnedKeyInfo.md)[]

If calling `getDrops` or `getDropInformation` and `withKeys` is passed in as true, an extra view call will be done to get a set of keys that are currently on the drop.

#### Defined in

[lib/types/protocol.ts:59](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L59)

___

### metadata

 `Optional` **metadata**: `string`

Any extra information about the drop can be stored as metadata. This is up to the drop creator and can be stringified JSON, or any other string.

#### Defined in

[lib/types/protocol.ts:51](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L51)

___

### next\_key\_id

 **next\_key\_id**: `number`

What is the next unique ID that will be given to the next access key added to this drop.

#### Defined in

[lib/types/protocol.ts:57](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L57)

___

### nft

 `Optional` **nft**: [`ProtocolReturnedNFTData`](ProtocolReturnedNFTData.md)

For NFT drops, important information such as the token IDs, or contract need to be stored.

#### Defined in

[lib/types/protocol.ts:43](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L43)

___

### owner\_id

 **owner\_id**: `string`

Which account created this drop.

#### Defined in

[lib/types/protocol.ts:37](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L37)

___

### registered\_uses

 **registered\_uses**: `number`

How many key uses are registered for this drop? This is only applicable to simple drops with lazy registrations, FT drops, and NFT drops.

#### Defined in

[lib/types/protocol.ts:53](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L53)

___

### required\_gas

 **required\_gas**: `string`

In order to use an access key that's part of this drop, how much Gas *needs* to be attached to the call?

#### Defined in

[lib/types/protocol.ts:55](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L55)

___

### simple

 `Optional` **simple**: [`ProtocolReturnedSimpleData`](ProtocolReturnedSimpleData.md)

For simple drops, there are specific, optional configurations.

#### Defined in

[lib/types/protocol.ts:41](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L41)
