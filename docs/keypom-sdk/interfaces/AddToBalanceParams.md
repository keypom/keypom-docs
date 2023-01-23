---
id: "AddToBalanceParams"
title: "Interface: AddToBalanceParams"
sidebar_label: "AddToBalanceParams"
sidebar_position: 0
custom_edit_url: null
---

Parameters that should be passed in when adding $NEAR to your Keypom balance via `addToBalance`.

## Properties

### absoluteAmount

 `Optional` **absoluteAmount**: `string`

Amount of tokens to add but considering the decimal amount (non human-readable).
Example: transferring one $NEAR should be passed in as "1000000000000000000000000" and NOT "1"

#### Defined in

[src/lib/types/params.ts:243](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L243)

___

### account

 `Optional` **account**: `Account`

Account object that if passed in, will be used to sign the txn instead of the funder account.

#### Defined in

[src/lib/types/params.ts:236](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L236)

___

### amount

 `Optional` **amount**: `string`

Human readable format for the amount of tokens to add.
Example: transferring one $NEAR should be passed in as "1" and NOT "1000000000000000000000000"

#### Defined in

[src/lib/types/params.ts:248](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L248)

___

### wallet

 `Optional` **wallet**: `AnyWallet`

If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object.

#### Defined in

[src/lib/types/params.ts:238](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L238)
