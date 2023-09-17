---
id: "GeneratedKeyPairs"
title: "Interface: GeneratedKeyPairs"
sidebar_label: "GeneratedKeyPairs"
sidebar_position: 0
custom_edit_url: null
---

For each generated KeyPair (either through `createDrop`, `addKeys` or `generateKeys`), the public and private keys are returned.
In addition, the actual KeyPair objects are returned as well.

## Properties

### keyPairs

 **keyPairs**: `KeyPair`[]

Actual KeyPair objects that can be used to sign messages, verify signatures, and get the public and private keys

#### Defined in

[lib/types/general.ts:20](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L20)

___

### publicKeys

 **publicKeys**: `string`[]

Set of public keys that were generated

#### Defined in

[lib/types/general.ts:22](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L22)

___

### secretKeys

 **secretKeys**: `string`[]

Set of private keys that were generated

#### Defined in

[lib/types/general.ts:24](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/general.ts#L24)
