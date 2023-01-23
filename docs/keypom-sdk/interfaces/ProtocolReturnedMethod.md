---
id: "ProtocolReturnedMethod"
title: "Interface: ProtocolReturnedMethod"
sidebar_label: "ProtocolReturnedMethod"
sidebar_position: 0
custom_edit_url: null
---

Method information returned from the Protocol. This interface is exactly the same as the `Method`, except all the fields are
snake cased instead of camel cased due to what the Protocol returns.

## Properties

### account\_id\_field

 `Optional` **account\_id\_field**: `string`

Specifies what field Keypom should auto-inject the account that claimed the drop's ID into when calling the function.
As an example, if the methodName was `nft_mint` and it expected a field `receiver_id` to be passed in, indicating who should receive the token, then the `accountIdField` would be `receiver_id`.

#### Defined in

[src/lib/types/protocol.ts:199](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/protocol.ts#L199)

___

### args

 **args**: `string`

What arguments should be passed to the method. This should be in stringified JSON.

#### Defined in

[src/lib/types/protocol.ts:190](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/protocol.ts#L190)

___

### attached\_deposit

 **attached\_deposit**: `string`

How much yoctoNEAR should be attached to the call.

#### Defined in

[src/lib/types/protocol.ts:194](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/protocol.ts#L194)

___

### drop\_id\_field

 `Optional` **drop\_id\_field**: `string`

Specifies what field Keypom should auto-inject the drops ID into when calling the function.
As an example, if an NFT contract expected the Keypom drop ID to be passed in as the field `keypom_drop_id` in order to gate access to who can mint NFTs, then the `dropIdField` would be `keypom_drop_id`.

#### Defined in

[src/lib/types/protocol.ts:204](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/protocol.ts#L204)

___

### key\_id\_field

 `Optional` **key\_id\_field**: `string`

Specifies what field Keypom should auto-inject the key's ID into when calling the function.
As an example, if an NFT contract wanted to gate only users with an odd key ID to be able to mint an NFT and their parameter was called `keypom_key_id`, then the `keyIdField` would be `keypom_key_id`.

#### Defined in

[src/lib/types/protocol.ts:209](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/protocol.ts#L209)

___

### method\_name

 **method\_name**: `string`

The method that should be invoked on the `receiverId`'s contract.

#### Defined in

[src/lib/types/protocol.ts:186](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/protocol.ts#L186)

___

### receiver\_id

 **receiver\_id**: `string`

The account ID that the contract is deployed to that the method will be called on.

#### Defined in

[src/lib/types/protocol.ts:182](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/protocol.ts#L182)
