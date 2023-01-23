---
id: "CreateOrAddReturn"
title: "Interface: CreateOrAddReturn"
sidebar_label: "CreateOrAddReturn"
sidebar_position: 0
custom_edit_url: null
---

Information returned when creating a drop or adding keys via `createDrop` and `addKeys` respectively.

## Properties

### dropId

 **dropId**: `string`

The drop ID for the drop that is being interacted with.

#### Defined in

[src/lib/types/params.ts:23](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/params.ts#L23)

___

### keys

 `Optional` **keys**: `Maybe`<[`GeneratedKeyPairs`](GeneratedKeyPairs.md)\>

Any keys that were automatically generated.

#### Defined in

[src/lib/types/params.ts:21](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/params.ts#L21)

___

### requiredDeposit

 `Optional` **requiredDeposit**: `string`

The required deposit that should be attached to the transaction.

#### Defined in

[src/lib/types/params.ts:19](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/params.ts#L19)

___

### responses

 `Optional` **responses**: `any`

The responses to any transactions that were signed and sent to the network.

#### Defined in

[src/lib/types/params.ts:15](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/params.ts#L15)

___

### transactions

 `Optional` **transactions**: `Transaction`[]

Information about the transactions if `returnTransactions` is specified in the arguments. This will result in the information being returned instead of signed and sent.

#### Defined in

[src/lib/types/params.ts:17](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/params.ts#L17)
