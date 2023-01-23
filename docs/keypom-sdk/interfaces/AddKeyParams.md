---
id: "AddKeyParams"
title: "Interface: AddKeyParams"
sidebar_label: "AddKeyParams"
sidebar_position: 0
custom_edit_url: null
---

Parameters that should be passed in when adding keys to a drop.

## Properties

### account

 `Optional` **account**: `Account`

Account object that if passed in, will be used to sign the txn instead of the funder account.

#### Defined in

[src/lib/types/params.ts:66](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L66)

___

### basePassword

 `Optional` **basePassword**: `string`

For doing password protected drops, this is the base password that will be used to generate all the passwords. It will be double hashed with the public keys. If specified, by default, all key uses will have their own unique password unless passwordProtectedUses is passed in.

#### Defined in

[src/lib/types/params.ts:89](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L89)

___

### drop

 `Optional` **drop**: [`ProtocolReturnedDrop`](ProtocolReturnedDrop.md)

If the drop information from getDropInformation is already known to the client, it can be passed in instead of the drop ID to reduce computation.

#### Defined in

[src/lib/types/params.ts:79](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L79)

___

### dropId

 `Optional` **dropId**: `string`

Specify the drop ID for which you want to add keys to.

#### Defined in

[src/lib/types/params.ts:77](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L77)

___

### nftTokenIds

 `Optional` **nftTokenIds**: `string`[]

If the drop type is an NFT drop, the token IDs can be passed in so that the tokens are automatically sent to the Keypom contract rather
   * than having to do two separate transactions. A maximum of 2 token IDs can be sent during the `addKeys` function. To send more token IDs in
order to register key uses, use the `nftTransferCall` function.

#### Defined in

[src/lib/types/params.ts:85](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L85)

___

### numKeys

 **numKeys**: `number`

Specify how many keys should be generated for the drop. If the funder has rootEntropy set OR rootEntropy is passed in, the keys will be
   * deterministically generated using the drop ID, key nonce, and entropy. Otherwise, each key will be generated randomly.

#### Defined in

[src/lib/types/params.ts:73](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L73)

___

### passwordProtectedUses

 `Optional` **passwordProtectedUses**: `number`[]

For doing password protected drops, specifies exactly which uses will be password protected. The uses are NOT zero indexed (i.e 1st use = 1). Each use will have a different, unique password generated via double hashing the base password + public key + key use.

#### Defined in

[src/lib/types/params.ts:91](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L91)

___

### publicKeys

 `Optional` **publicKeys**: `string`[]

Pass in a custom set of publicKeys to add to the drop. If this is not passed in, keys will be generated based on the numKeys parameter.

#### Defined in

[src/lib/types/params.ts:75](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L75)

___

### returnTransactions

 `Optional` **returnTransactions**: `boolean`

If true, the transaction will be returned instead of being signed and sent. This is useful for getting the requiredDeposit from the return value without actually signing the transaction.

#### Defined in

[src/lib/types/params.ts:95](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L95)

___

### rootEntropy

 `Optional` **rootEntropy**: `string`

Specify an entropy to use for generating keys (will overload the funder's rootEntropy if applicable). This parameter only matters if the publicKeys variable is not passed in.

#### Defined in

[src/lib/types/params.ts:87](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L87)

___

### useBalance

 `Optional` **useBalance**: `boolean`

If the account has a balance within the Keypom contract, set this to true to avoid the need to attach a deposit. If the account doesn't have enough balance, an error will throw.

#### Defined in

[src/lib/types/params.ts:93](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L93)

___

### wallet

 `Optional` **wallet**: `AnyWallet`

If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object.

#### Defined in

[src/lib/types/params.ts:68](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L68)
