---
id: "Method"
title: "Interface: Method"
sidebar_label: "Method"
sidebar_position: 0
custom_edit_url: null
---

Outlines the information needed for any given method as part of a Function-Call drop.
Each individual key use can have an array of Methods that can be called.

## Properties

### accountIdField

 `Optional` **accountIdField**: `string`

Specifies what field Keypom should auto-inject the account that claimed the drop's ID into when calling the function.
As an example, if the methodName was `nft_mint` and it expected a field `receiver_id` to be passed in, indicating who should receive the token, then the `accountIdField` would be `receiver_id`.
To insert into nested objects, use periods to separate. For example, to insert into args.metadata.field, you would specify "metadata.field"

#### Defined in

[lib/types/fc.ts:34](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/fc.ts#L34)

___

### args

 **args**: `string`

What arguments should be passed to the method. This should be in stringified JSON.

#### Defined in

[lib/types/fc.ts:19](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/fc.ts#L19)

___

### attachedDeposit

 **attachedDeposit**: `string`

How much yoctoNEAR should be attached to the call.

#### Defined in

[lib/types/fc.ts:23](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/fc.ts#L23)

___

### attachedGas

 `Optional` **attachedGas**: `string`

How much gas to attach to this method call. If none, all the gas is split between the parallel method calls in a given claim.
If this is specified, the key can ONLY be used to call `claim` and no `deposit_per_use` can be specified. This leads the key to act like a method calling proxy instead of a linkdrop.

#### Defined in

[lib/types/fc.ts:28](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/fc.ts#L28)

___

### dropIdField

 `Optional` **dropIdField**: `string`

Specifies what field Keypom should auto-inject the drops ID into when calling the function.
As an example, if an NFT contract expected the Keypom drop ID to be passed in as the field `keypom_drop_id` in order to gate access to who can mint NFTs, then the `dropIdField` would be `keypom_drop_id`.
To insert into nested objects, use periods to separate. For example, to insert into args.metadata.field, you would specify "metadata.field"

#### Defined in

[lib/types/fc.ts:40](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/fc.ts#L40)

___

### funderIdField

 `Optional` **funderIdField**: `string`

Specifies what field Keypom should auto-inject the drop funder's account ID into when calling the function.
As an example, if an NFT contract wanted to gate only users that had a key coming from a specific funder's drops, it could expect a field called `keypom_funder_id` and the `funderIdField` would be `keypom_funder_id`.
To insert into nested objects, use periods to separate. For example, to insert into args.metadata.field, you would specify "metadata.field"

#### Defined in

[lib/types/fc.ts:52](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/fc.ts#L52)

___

### keyIdField

 `Optional` **keyIdField**: `string`

Specifies what field Keypom should auto-inject the key's ID into when calling the function.
As an example, if an NFT contract wanted to gate only users with an odd key ID to be able to mint an NFT and their parameter was called `keypom_key_id`, then the `keyIdField` would be `keypom_key_id`.
To insert into nested objects, use periods to separate. For example, to insert into args.metadata.field, you would specify "metadata.field"

#### Defined in

[lib/types/fc.ts:46](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/fc.ts#L46)

___

### methodName

 **methodName**: `string`

The method that should be invoked on the `receiverId`'s contract.

#### Defined in

[lib/types/fc.ts:15](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/fc.ts#L15)

___

### receiverId

 **receiverId**: `string`

The account ID that the contract is deployed to that the method will be called on.

#### Defined in

[lib/types/fc.ts:11](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/fc.ts#L11)

___

### receiverToClaimer

 `Optional` **receiverToClaimer**: `boolean`

If set to true, the claiming account ID will be the receiver ID of the method call.
This receiver must be a valid account and non-malicious (cannot be set to the keypom contract)

#### Defined in

[lib/types/fc.ts:57](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/fc.ts#L57)

___

### userArgsRule

 `Optional` **userArgsRule**: ``"AllUser"`` \| ``"FunderPreferred"`` \| ``"UserPreferred"``

What permissions does the user have when providing custom arguments to the function call?
By default, the user cannot provide any custom arguments

#### Defined in

[lib/types/fc.ts:62](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/fc.ts#L62)
