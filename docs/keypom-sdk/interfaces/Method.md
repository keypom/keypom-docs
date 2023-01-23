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

#### Defined in

[src/lib/types/fc.ts:28](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/fc.ts#L28)

___

### args

 **args**: `string`

What arguments should be passed to the method. This should be in stringified JSON.

#### Defined in

[src/lib/types/fc.ts:19](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/fc.ts#L19)

___

### attachedDeposit

 **attachedDeposit**: `string`

How much yoctoNEAR should be attached to the call.

#### Defined in

[src/lib/types/fc.ts:23](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/fc.ts#L23)

___

### dropIdField

 `Optional` **dropIdField**: `string`

Specifies what field Keypom should auto-inject the drops ID into when calling the function.
As an example, if an NFT contract expected the Keypom drop ID to be passed in as the field `keypom_drop_id` in order to gate access to who can mint NFTs, then the `dropIdField` would be `keypom_drop_id`.

#### Defined in

[src/lib/types/fc.ts:33](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/fc.ts#L33)

___

### keyIdField

 `Optional` **keyIdField**: `string`

Specifies what field Keypom should auto-inject the key's ID into when calling the function.
As an example, if an NFT contract wanted to gate only users with an odd key ID to be able to mint an NFT and their parameter was called `keypom_key_id`, then the `keyIdField` would be `keypom_key_id`.

#### Defined in

[src/lib/types/fc.ts:38](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/fc.ts#L38)

___

### methodName

 **methodName**: `string`

The method that should be invoked on the `receiverId`'s contract.

#### Defined in

[src/lib/types/fc.ts:15](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/fc.ts#L15)

___

### receiverId

 **receiverId**: `string`

The account ID that the contract is deployed to that the method will be called on.

#### Defined in

[src/lib/types/fc.ts:11](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/fc.ts#L11)
