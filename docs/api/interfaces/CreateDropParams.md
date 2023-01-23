---
id: "CreateDropParams"
title: "Interface: CreateDropParams"
sidebar_label: "CreateDropParams"
sidebar_position: 0
custom_edit_url: null
---

Parameters that should be passed in when creating a drop.

## Properties

### account

• `Optional` **account**: `Account`

Account object that if passed in, will be used to sign the txn instead of the funder account.

#### Defined in

[src/lib/types/params.ts:21](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L21)

___

### basePassword

• `Optional` **basePassword**: `string`

For doing password protected drops, this is the base password that will be used to generate all the passwords. It will be double hashed with the public keys. If specified, by default, all key uses will have their own unique password unless passwordProtectedUses is passed in.

#### Defined in

[src/lib/types/params.ts:52](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L52)

___

### config

• `Optional` **config**: [`DropConfig`](DropConfig.md)

Allows specific drop behaviors to be configured such as the number of uses each key / link will have.

#### Defined in

[src/lib/types/params.ts:38](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L38)

___

### depositPerUseNEAR

• `Optional` **depositPerUseNEAR**: `Number`

How much $NEAR should be contained in each link. Unit in $NEAR (i.e `1` = 1 $NEAR)

#### Defined in

[src/lib/types/params.ts:32](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L32)

___

### depositPerUseYocto

• `Optional` **depositPerUseYocto**: `string`

How much $yoctoNEAR should be contained in each link. Unit in yoctoNEAR (1 yoctoNEAR = 1e-24 $NEAR)

#### Defined in

[src/lib/types/params.ts:34](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L34)

___

### dropId

• `Optional` **dropId**: `string`

Specify a custom drop ID rather than using the incrementing nonce on the contract.

#### Defined in

[src/lib/types/params.ts:36](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L36)

___

### fcData

• `Optional` **fcData**: [`FCData`](FCData.md)

For creating a function call drop, this contains necessary configurable information about the drop.

#### Defined in

[src/lib/types/params.ts:48](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L48)

___

### ftData

• `Optional` **ftData**: [`FTData`](FTData.md)

For creating a fungible token drop, this contains necessary configurable information about the drop.

#### Defined in

[src/lib/types/params.ts:44](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L44)

___

### metadata

• `Optional` **metadata**: `string`

String of metadata to attach to the drop. This can be whatever you would like and is optional. Often this is stringified JSON.

#### Defined in

[src/lib/types/params.ts:40](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L40)

___

### nftData

• `Optional` **nftData**: [`NFTData`](NFTData.md)

For creating a non-fungible token drop, this contains necessary configurable information about the drop.

#### Defined in

[src/lib/types/params.ts:46](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L46)

___

### numKeys

• **numKeys**: `number`

Specify how many keys should be generated for the drop. If the funder has rootEntropy set OR rootEntropy is passed in, the keys will be
   * deterministically generated using the drop ID, key nonce, and entropy. Otherwise, each key will be generated randomly.

#### Defined in

[src/lib/types/params.ts:28](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L28)

___

### passwordProtectedUses

• `Optional` **passwordProtectedUses**: `number`[]

For doing password protected drops, specifies exactly which uses will be password protected. The uses are NOT zero indexed (i.e 1st use = 1). Each use will have a different, unique password generated via double hashing the base password + public key + key use.

#### Defined in

[src/lib/types/params.ts:54](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L54)

___

### publicKeys

• `Optional` **publicKeys**: `string`[]

Pass in a custom set of publicKeys to add to the drop. If this is not passed in, keys will be generated based on the numKeys parameter.

#### Defined in

[src/lib/types/params.ts:30](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L30)

___

### returnTransactions

• `Optional` **returnTransactions**: `boolean`

If true, the transaction will be returned instead of being signed and sent. This is useful for getting the requiredDeposit from the return value without actually signing the transaction.

#### Defined in

[src/lib/types/params.ts:58](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L58)

___

### rootEntropy

• `Optional` **rootEntropy**: `string`

Specify an entropy to use for generating keys (will overload the funder's rootEntropy if applicable). This parameter only matters if the publicKeys variable is not passed in.

#### Defined in

[src/lib/types/params.ts:50](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L50)

___

### simpleData

• `Optional` **simpleData**: [`SimpleData`](SimpleData.md)

For creating a simple drop, this contains necessary configurable information about the drop.

#### Defined in

[src/lib/types/params.ts:42](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L42)

___

### useBalance

• `Optional` **useBalance**: `boolean`

If the account has a balance within the Keypom contract, set this to true to avoid the need to attach a deposit. If the account doesn't have enough balance, an error will throw.

#### Defined in

[src/lib/types/params.ts:56](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L56)

___

### wallet

• `Optional` **wallet**: `AnyWallet`

If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object.

#### Defined in

[src/lib/types/params.ts:23](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L23)
