---
id: "InitKeypomParams"
title: "Interface: InitKeypomParams"
sidebar_label: "InitKeypomParams"
sidebar_position: 0
custom_edit_url: null
---

Parameters that should be passed in when initializing the Keypom SDK through `initKeypom`

## Properties

### funder

 `Optional` **funder**: [`Funder`](Funder.md)

The account that will sign transactions to create drops and interact with the Keypom contract. This account will be added to the KeyStore if provided.
   * If rootEntropy is provided for the funder, all access keys will be derived deterministically based off this string.

#### Defined in

[src/lib/types/params.ts:142](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L142)

___

### keypomContractId

 `Optional` **keypomContractId**: `string`

Instead of using the most up-to-date, default Keypom contract, you can specify a specific account ID to use. If an older version is specified, some features of the SDK might not be usable.

#### Defined in

[src/lib/types/params.ts:146](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L146)

___

### near

 `Optional` **near**: `Near`

The NEAR connection instance to use. If not passed in, it will create a new one.

#### Defined in

[src/lib/types/params.ts:135](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L135)

___

### network

 **network**: `string`

The network to connect to either `mainnet` or `testnet`.

#### Defined in

[src/lib/types/params.ts:137](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L137)
