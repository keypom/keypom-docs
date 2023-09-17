---
id: "ProtocolReturnedDropConfig"
title: "Interface: ProtocolReturnedDropConfig"
sidebar_label: "ProtocolReturnedDropConfig"
sidebar_position: 0
custom_edit_url: null
---

Drop config returned from the Protocol. This interface is exactly the same as the `DropConfig`, except all the fields are
snake cased instead of camel cased due to what the Protocol returns.

## Properties

### root\_account\_id

 `Optional` **root\_account\_id**: `string`

Override the global root account that all created sub-accounts will have (currently `near` or `testnet`). This allows users to drops that have a custom root.
For example, Fayyr could specify a root of `fayyr.near` By which all sub-accounts will then be `ACCOUNT.fayyr.near`.
It's important to note that this root account *MUST* have a smart contract deployed that has a method `create_account`.

#### Defined in

[lib/types/protocol.ts:83](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L83)

___

### sale

 `Optional` **sale**: [`ProtocolReturnedPublicSaleConfig`](ProtocolReturnedPublicSaleConfig.md)

#### Defined in

[lib/types/protocol.ts:76](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L76)

___

### time

 `Optional` **time**: [`ProtocolReturnedTimeConfig`](ProtocolReturnedTimeConfig.md)

Any information related to time-based configurations such as a starting date for keys etc.

#### Defined in

[lib/types/protocol.ts:71](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L71)

___

### usage

 `Optional` **usage**: [`ProtocolReturnedUsageConfig`](ProtocolReturnedUsageConfig.md)

Any information related to how access keys are used such as which methods they can call or whether an empty drop should be automatically deleted etc.

#### Defined in

[lib/types/protocol.ts:74](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L74)

___

### uses\_per\_key

 `Optional` **uses\_per\_key**: `number`

How many uses can each key have before it's deleted. If this isn't specified, it defaults to 1 use per key.

#### Defined in

[lib/types/protocol.ts:68](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L68)
