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

[src/lib/types/fc.ts:29](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/fc.ts#L29)

___

### args

 **args**: `string`

What arguments should be passed to the method. This should be in stringified JSON.

#### Defined in

[src/lib/types/fc.ts:19](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/fc.ts#L19)

___

### attachedDeposit

 **attachedDeposit**: `string`

How much yoctoNEAR should be attached to the call.

#### Defined in

[src/lib/types/fc.ts:23](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/fc.ts#L23)

___

### dropIdField

 `Optional` **dropIdField**: `string`

Specifies what field Keypom should auto-inject the drops ID into when calling the function.
As an example, if an NFT contract expected the Keypom drop ID to be passed in as the field `keypom_drop_id` in order to gate access to who can mint NFTs, then the `dropIdField` would be `keypom_drop_id`.
To insert into nested objects, use periods to separate. For example, to insert into args.metadata.field, you would specify "metadata.field"

#### Defined in

[src/lib/types/fc.ts:35](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/fc.ts#L35)

___

### funderIdField

 `Optional` **funderIdField**: `string`

Specifies what field Keypom should auto-inject the drop funder's account ID into when calling the function.
As an example, if an NFT contract wanted to gate only users that had a key coming from a specific funder's drops, it could expect a field called `keypom_funder_id` and the `funderIdField` would be `keypom_funder_id`.
To insert into nested objects, use periods to separate. For example, to insert into args.metadata.field, you would specify "metadata.field"

#### Defined in

[src/lib/types/fc.ts:47](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/fc.ts#L47)

___

### keyIdField

 `Optional` **keyIdField**: `string`

Specifies what field Keypom should auto-inject the key's ID into when calling the function.
As an example, if an NFT contract wanted to gate only users with an odd key ID to be able to mint an NFT and their parameter was called `keypom_key_id`, then the `keyIdField` would be `keypom_key_id`.
To insert into nested objects, use periods to separate. For example, to insert into args.metadata.field, you would specify "metadata.field"

#### Defined in

[src/lib/types/fc.ts:41](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/fc.ts#L41)

___

### methodName

 **methodName**: `string`

The method that should be invoked on the `receiverId`'s contract.

#### Defined in

[src/lib/types/fc.ts:15](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/fc.ts#L15)

___

### receiverId

 **receiverId**: `string`

The account ID that the contract is deployed to that the method will be called on.

#### Defined in

[src/lib/types/fc.ts:11](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/fc.ts#L11)

___

### userArgsRule

 `Optional` **userArgsRule**: ``"AllUser"`` \| ``"FunderPreferred"`` \| ``"UserPreferred"``

What permissions does the user have when providing custom arguments to the function call?
By default, the user cannot provide any custom arguments

#### Defined in

[src/lib/types/fc.ts:52](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/fc.ts#L52)
