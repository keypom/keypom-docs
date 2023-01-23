---
id: "NFTTransferCallParams"
title: "Interface: NFTTransferCallParams"
sidebar_label: "NFTTransferCallParams"
sidebar_position: 0
custom_edit_url: null
---

Parameters that should be passed in when calling `nftTransferCall` in order to transfer NFTs to the Keypom contract for registering key uses.

## Properties

### account

• `Optional` **account**: `Account`

Account object that if passed in, will be used to sign the txn instead of the funder account.

#### Defined in

[src/lib/types/params.ts:194](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L194)

___

### contractId

• **contractId**: `string`

The non-fungible token contract ID.

#### Defined in

[src/lib/types/params.ts:198](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L198)

___

### dropId

• **dropId**: `string`

The drop ID to register the keys for.

#### Defined in

[src/lib/types/params.ts:202](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L202)

___

### returnTransactions

• `Optional` **returnTransactions**: `boolean`

If true, the transaction will be returned instead of being signed and sent.

#### Defined in

[src/lib/types/params.ts:204](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L204)

___

### tokenIds

• **tokenIds**: `string`[]

A set of token IDs that should be sent to the Keypom contract in order to register keys.

#### Defined in

[src/lib/types/params.ts:200](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L200)

___

### wallet

• `Optional` **wallet**: `AnyWallet`

If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object.

#### Defined in

[src/lib/types/params.ts:196](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L196)
