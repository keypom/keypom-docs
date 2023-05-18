---
id: "Funder"
title: "Interface: Funder"
sidebar_label: "Funder"
sidebar_position: 0
custom_edit_url: null
---

Outlines how the structure of the *funder* object should be passed into `initKeypom` or `updateFunder`. This contains important information such as the
secret key, account ID and any root entropy associated with the account.

**`Throws`**

if neither `secretKey` or `seedPhrase` are provided. One of these need to be passed in.

## Properties

### accountId

 **accountId**: `string`

The account ID of the funder that will be used to sign transactions.

#### Defined in

[lib/types/general.ts:35](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L35)

___

### fundingKeyPair

 `Optional` **fundingKeyPair**: `KeyPair`

#### Defined in

[lib/types/general.ts:48](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L48)

___

### rootEntropy

 `Optional` **rootEntropy**: `string`

When interacting with the SDK, there are several places where KeyPairs can be generated automatically rather than you having to pass them in.
For example, during `createDrop` and `addKeys`, if `publicKeys` isn't passed in, the SDK will generate `numKeys` number of keys automatically.
These generated keys can either be completely random or deterministically generated based off some entropy. If `rootEntropy` is provided, all the
keys that are auto-generated will be based off this entropy.

#### Defined in

[lib/types/general.ts:46](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L46)

___

### secretKey

 `Optional` **secretKey**: `string`

A valid private key associated with the funder's account. This can be function-call or full access (depending on what limitations and security measures are in place).

#### Defined in

[lib/types/general.ts:37](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L37)

___

### seedPhrase

 `Optional` **seedPhrase**: `string`

12 word seedphrase that can be used to derive the `secretKey`. If this is present, it will override the passed in `secretKey`.

#### Defined in

[lib/types/general.ts:39](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L39)
