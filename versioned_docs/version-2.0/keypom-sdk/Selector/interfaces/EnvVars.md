---
id: "EnvVars"
title: "Interface: EnvVars"
sidebar_label: "EnvVars"
sidebar_position: 0
custom_edit_url: null
---

Important context that is used throughout the SDK. This is generated when `initKeypom` is called and can be retrieved by calling `useKeypom`.
All parameters will start off as undefined until the Keypom SDK is initialized.

## Properties

### attachedGas

 `Optional` **attachedGas**: `string`

The amount of Gas that will be attached to the `claim` and `create_account_and_claim` functions for claiming linkdrops (100 TGas).

#### Defined in

[lib/types/general.ts:77](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L77)

___

### connection

 `Optional` **connection**: `Connection`

The connection instance that is part of the NEAR object

#### Defined in

[lib/types/general.ts:59](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L59)

___

### contractAccount

 `Optional` **contractAccount**: `Account`

The NEAR Account object for the Keypom contract being used. This lets you know the account ID for the contract and can be used to sign transactions for claiming linkdrops.

#### Defined in

[lib/types/general.ts:69](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L69)

___

### contractId

 `Optional` **contractId**: `string`

The account ID where the Keypom contract is deployed to.

#### Defined in

[lib/types/general.ts:79](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L79)

___

### error

 `Optional` **error**: `string`

#### Defined in

[lib/types/general.ts:83](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L83)

___

### execute

 `Optional` **execute**: `any`

#### Defined in

[lib/types/general.ts:87](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L87)

___

### fundingAccount

 `Optional` **fundingAccount**: `Account`

The NEAR Account object for the Funder

#### Defined in

[lib/types/general.ts:65](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L65)

___

### fundingAccountDetails

 `Optional` **fundingAccountDetails**: [`Funder`](Funder.md)

The details for the funder such as any `rootEntropy` or their `secretKey` etc.

#### Defined in

[lib/types/general.ts:67](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L67)

___

### gas

 `Optional` **gas**: `string`

The default amount of Gas that will be attached to transactions (200 TGas).

#### Defined in

[lib/types/general.ts:73](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L73)

___

### gas300

 `Optional` **gas300**: `string`

The max amount of Gas that will be attached to transactions (300 TGas).

#### Defined in

[lib/types/general.ts:75](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L75)

___

### getAccount

 `Optional` **getAccount**: `any`

#### Defined in

[lib/types/general.ts:85](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L85)

___

### keyStore

 `Optional` **keyStore**: `KeyStore`

Which type of KeyStore is used when locating keys and signing transactions throughout the SDK (In Memory, Unencrypted FileStore etc.)

#### Defined in

[lib/types/general.ts:61](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L61)

___

### near

 `Optional` **near**: `Near`

The specific NEAR object that contains important information such as the KeyStore and connection. This is used to interact with the chain and can either be manually passed in or will be automatically created during `initKeypom`

#### Defined in

[lib/types/general.ts:57](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L57)

___

### networkId

 `Optional` **networkId**: `string`

What network is the SDK using (`testnet` or `mainnet`)

#### Defined in

[lib/types/general.ts:63](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L63)

___

### receiverId

 `Optional` **receiverId**: `string`

#### Defined in

[lib/types/general.ts:81](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L81)

___

### supportedKeypomContracts

 `Optional` **supportedKeypomContracts**: `Object`

Object containing the supported Keypom contracts for both mainnet and testnet

#### Type declaration

| Name | Type |
| :------ | :------ |
| `mainnet` | {} |
| `testnet` | {} |

#### Defined in

[lib/types/general.ts:89](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L89)

___

### viewAccount

 `Optional` **viewAccount**: `any`

#### Defined in

[lib/types/general.ts:71](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L71)

___

### viewCall

 `Optional` **viewCall**: `any`

Function that allows you to invoke a view method. This takes in a `receiverId`, `methodName`, and `args`.

#### Defined in

[lib/types/general.ts:91](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L91)
