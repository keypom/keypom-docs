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
To insert into nested objects, use periods to separate. For example, to insert into args.metadata.field, you would specify "metadata.field"

#### Defined in

[lib/types/protocol.ts:260](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L260)

___

### args

 **args**: `string`

What arguments should be passed to the method. This should be in stringified JSON.

#### Defined in

[lib/types/protocol.ts:245](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L245)

___

### attached\_deposit

 **attached\_deposit**: `string`

How much yoctoNEAR should be attached to the call.

#### Defined in

[lib/types/protocol.ts:249](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L249)

___

### attached\_gas

 `Optional` **attached\_gas**: `string`

How much gas to attach to this method call. If none, all the gas is split between the parallel method calls in a given claim.
If this is specified, the key can ONLY be used to call `claim` and no `deposit_per_use` can be specified. This leads the key to act like a method calling proxy instead of a linkdrop.

#### Defined in

[lib/types/protocol.ts:254](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L254)

___

### drop\_id\_field

 `Optional` **drop\_id\_field**: `string`

Specifies what field Keypom should auto-inject the drops ID into when calling the function.
As an example, if an NFT contract expected the Keypom drop ID to be passed in as the field `keypom_drop_id` in order to gate access to who can mint NFTs, then the `dropIdField` would be `keypom_drop_id`.
To insert into nested objects, use periods to separate. For example, to insert into args.metadata.field, you would specify "metadata.field"

#### Defined in

[lib/types/protocol.ts:266](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L266)

___

### funder\_id\_field

 `Optional` **funder\_id\_field**: `string`

Specifies what field Keypom should auto-inject the funder's account ID into when calling the function.
As an example, if an NFT contract wanted to gate only users with an odd key ID to be able to mint an NFT and their parameter was called `keypom_key_id`, then the `keyIdField` would be `keypom_key_id`.
To insert into nested objects, use periods to separate. For example, to insert into args.metadata.field, you would specify "metadata.field"

#### Defined in

[lib/types/protocol.ts:278](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L278)

___

### key\_id\_field

 `Optional` **key\_id\_field**: `string`

Specifies what field Keypom should auto-inject the key's ID into when calling the function.
As an example, if an NFT contract wanted to gate only users with an odd key ID to be able to mint an NFT and their parameter was called `keypom_key_id`, then the `keyIdField` would be `keypom_key_id`.
To insert into nested objects, use periods to separate. For example, to insert into args.metadata.field, you would specify "metadata.field"

#### Defined in

[lib/types/protocol.ts:272](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L272)

___

### method\_name

 **method\_name**: `string`

The method that should be invoked on the `receiverId`'s contract.

#### Defined in

[lib/types/protocol.ts:241](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L241)

___

### receiver\_id

 **receiver\_id**: `string`

The account ID that the contract is deployed to that the method will be called on.

#### Defined in

[lib/types/protocol.ts:237](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L237)

___

### receiver\_to\_claimer

 `Optional` **receiver\_to\_claimer**: `boolean`

If set to true, the claiming account ID will be the receiver ID of the method call.
This receiver must be a valid account and non-malicious (cannot be set to the keypom contract)

#### Defined in

[lib/types/protocol.ts:283](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L283)

___

### user\_args\_rule

 `Optional` **user\_args\_rule**: ``"AllUser"`` \| ``"FunderPreferred"`` \| ``"UserPreferred"``

What permissions does the user have when providing custom arguments to the function call?
By default, the user cannot provide any custom arguments

#### Defined in

[lib/types/protocol.ts:288](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L288)
