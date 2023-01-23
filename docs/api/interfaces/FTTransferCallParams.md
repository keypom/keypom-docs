---
id: "FTTransferCallParams"
title: "Interface: FTTransferCallParams"
sidebar_label: "FTTransferCallParams"
sidebar_position: 0
custom_edit_url: null
---

Parameters that should be passed in when calling `ftTransferCall` in order to transfer FTs to the Keypom contract for registering key uses.

## Properties

### absoluteAmount

• `Optional` **absoluteAmount**: `string`

Amount of tokens to transfer but considering the decimal amount (non human-readable).
 Example: transferring one wNEAR should be passed in as "1000000000000000000000000" and NOT "1"

#### Defined in

[src/lib/types/params.ts:177](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L177)

___

### account

• `Optional` **account**: `Account`

Account object that if passed in, will be used to sign the txn instead of the funder account.

#### Defined in

[src/lib/types/params.ts:169](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L169)

___

### amount

• `Optional` **amount**: `string`

Human readable format for the amount of tokens to transfer.
   * Example: transferring one wNEAR should be passed in as "1" and NOT "1000000000000000000000000"

#### Defined in

[src/lib/types/params.ts:182](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L182)

___

### contractId

• **contractId**: `string`

The fungible token contract ID.

#### Defined in

[src/lib/types/params.ts:173](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L173)

___

### dropId

• **dropId**: `string`

The drop ID to register the keys for.

#### Defined in

[src/lib/types/params.ts:184](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L184)

___

### returnTransaction

• `Optional` **returnTransaction**: `boolean`

If true, the transaction will be returned instead of being signed and sent.

#### Defined in

[src/lib/types/params.ts:186](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L186)

___

### wallet

• `Optional` **wallet**: `AnyWallet`

If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object.

#### Defined in

[src/lib/types/params.ts:171](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L171)
