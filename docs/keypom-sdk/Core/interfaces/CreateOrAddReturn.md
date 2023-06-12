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

[lib/types/params.ts:34](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/params.ts#L34)

___

### keys

 `Optional` **keys**: [`GeneratedKeyPairs`](GeneratedKeyPairs.md)

Any keys that were automatically generated.

#### Defined in

[lib/types/params.ts:32](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/params.ts#L32)

___

### requiredDeposit

 `Optional` **requiredDeposit**: `string`

The required deposit that should be attached to the transaction.

#### Defined in

[lib/types/params.ts:30](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/params.ts#L30)

___

### responses

 `Optional` **responses**: `any`

The responses to any transactions that were signed and sent to the network.

#### Defined in

[lib/types/params.ts:26](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/params.ts#L26)

___

### transactions

 `Optional` **transactions**: `Transaction`[]

Information about the transactions if `returnTransactions` is specified in the arguments. This will result in the information being returned instead of signed and sent.

#### Defined in

[lib/types/params.ts:28](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/params.ts#L28)
