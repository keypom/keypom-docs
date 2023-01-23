---
id: "WithdrawBalanceParams"
title: "Interface: WithdrawBalanceParams"
sidebar_label: "WithdrawBalanceParams"
sidebar_position: 0
custom_edit_url: null
---

Parameters that should be passed in when withdrawing $NEAR from your Keypom balance via `withdrawBalance`.

## Properties

### account

• `Optional` **account**: `Account`

Account object that if passed in, will be used to sign the txn instead of the funder account.

#### Defined in

[src/lib/types/params.ts:256](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L256)

___

### wallet

• `Optional` **wallet**: `AnyWallet`

If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object.

#### Defined in

[src/lib/types/params.ts:258](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L258)
