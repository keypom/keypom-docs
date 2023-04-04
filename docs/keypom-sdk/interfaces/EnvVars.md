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

[src/lib/types/general.ts:70](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/types/general.ts#L70)

___

### connection

 `Optional` **connection**: `Connection`

The connection instance that is part of the NEAR object

#### Defined in

[src/lib/types/general.ts:52](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/types/general.ts#L52)

___

### contractAccount

 `Optional` **contractAccount**: `Account`

The NEAR Account object for the Keypom contract being used. This lets you know the account ID for the contract and can be used to sign transactions for claiming linkdrops.

#### Defined in

[src/lib/types/general.ts:62](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/types/general.ts#L62)

___

### contractId

 `Optional` **contractId**: `string`

The account ID where the Keypom contract is deployed to.

#### Defined in

[src/lib/types/general.ts:72](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/types/general.ts#L72)

___

### error

 `Optional` **error**: `string`

#### Defined in

[src/lib/types/general.ts:76](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/types/general.ts#L76)

___

### execute

 `Optional` **execute**: `any`

#### Defined in

[src/lib/types/general.ts:80](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/types/general.ts#L80)

___

### fundingAccount

 `Optional` **fundingAccount**: `Account`

The NEAR Account object for the Funder

#### Defined in

[src/lib/types/general.ts:58](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/types/general.ts#L58)

___

### fundingAccountDetails

 `Optional` **fundingAccountDetails**: [`Funder`](Funder.md)

The details for the funder such as any `rootEntropy` or their `secretKey` etc.

#### Defined in

[src/lib/types/general.ts:60](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/types/general.ts#L60)

___

### gas

 `Optional` **gas**: `string`

The default amount of Gas that will be attached to transactions (200 TGas).

#### Defined in

[src/lib/types/general.ts:66](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/types/general.ts#L66)

___

### gas300

 `Optional` **gas300**: `string`

The max amount of Gas that will be attached to transactions (300 TGas).

#### Defined in

[src/lib/types/general.ts:68](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/types/general.ts#L68)

___

### getAccount

 `Optional` **getAccount**: `any`

#### Defined in

[src/lib/types/general.ts:78](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/types/general.ts#L78)

___

### keyStore

 `Optional` **keyStore**: `KeyStore`

Which type of KeyStore is used when locating keys and signing transactions throughout the SDK (In Memory, Unencrypted FileStore etc.)

#### Defined in

[src/lib/types/general.ts:54](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/types/general.ts#L54)

___

### near

 `Optional` **near**: `Near`

The specific NEAR object that contains important information such as the KeyStore and connection. This is used to interact with the chain and can either be manually passed in or will be automatically created during `initKeypom`

#### Defined in

[src/lib/types/general.ts:50](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/types/general.ts#L50)

___

### networkId

 `Optional` **networkId**: `string`

What network is the SDK using (`testnet` or `mainnet`)

#### Defined in

[src/lib/types/general.ts:56](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/types/general.ts#L56)

___

### receiverId

 `Optional` **receiverId**: `string`

#### Defined in

[src/lib/types/general.ts:74](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/types/general.ts#L74)

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

[src/lib/types/general.ts:82](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/types/general.ts#L82)

___

### viewAccount

 `Optional` **viewAccount**: `any`

#### Defined in

[src/lib/types/general.ts:64](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/types/general.ts#L64)

___

### viewCall

 `Optional` **viewCall**: `any`

Function that allows you to invoke a view method. This takes in a `receiverId`, `methodName`, and `args`.

#### Defined in

[src/lib/types/general.ts:84](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/types/general.ts#L84)
