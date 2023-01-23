---
id: "DeleteKeyParams"
title: "Interface: DeleteKeyParams"
sidebar_label: "DeleteKeyParams"
sidebar_position: 0
custom_edit_url: null
---

Parameters that should be passed in when calling `deleteKeys`.

## Properties

### account

• `Optional` **account**: `Account`

Account object that if passed in, will be used to sign the txn instead of the funder account.

#### Defined in

[src/lib/types/params.ts:119](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L119)

___

### dropId

• **dropId**: `string`

Which drop ID do the keys belong to?

#### Defined in

[src/lib/types/params.ts:125](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L125)

___

### publicKeys

• **publicKeys**: `string` \| `string`[]

Specify a set of public keys to delete. If deleting a single publicKey, the string can be passed in without wrapping it in an array.

#### Defined in

[src/lib/types/params.ts:123](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L123)

___

### wallet

• `Optional` **wallet**: `AnyWallet`

If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object.

#### Defined in

[src/lib/types/params.ts:121](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L121)

___

### withdrawBalance

• `Optional` **withdrawBalance**: `boolean`

Whether or not to withdraw any remaining balance on the Keypom contract.

#### Defined in

[src/lib/types/params.ts:127](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L127)
