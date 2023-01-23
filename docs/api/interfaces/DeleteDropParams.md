---
id: "DeleteDropParams"
title: "Interface: DeleteDropParams"
sidebar_label: "DeleteDropParams"
sidebar_position: 0
custom_edit_url: null
---

Parameters that should be passed in when calling `deleteDrop`.

## Properties

### account

• `Optional` **account**: `Account`

Account object that if passed in, will be used to sign the txn instead of the funder account.

#### Defined in

[src/lib/types/params.ts:103](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L103)

___

### dropIds

• `Optional` **dropIds**: `string`[]

Specify a set of drop IDs to delete.

#### Defined in

[src/lib/types/params.ts:109](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L109)

___

### drops

• `Optional` **drops**: [`ProtocolReturnedDrop`](ProtocolReturnedDrop.md)[]

If the set of drop information for the drops you want to delete (from `getDropInformation` or `getDrops`) is already known to the client, it can be passed in instead of the drop IDs to reduce computation.

#### Defined in

[src/lib/types/params.ts:107](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L107)

___

### wallet

• `Optional` **wallet**: `AnyWallet`

If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object.

#### Defined in

[src/lib/types/params.ts:105](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L105)

___

### withdrawBalance

• `Optional` **withdrawBalance**: `boolean`

Whether or not to withdraw any remaining balance on the Keypom contract.

#### Defined in

[src/lib/types/params.ts:111](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L111)
