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

• **keyPairs**: `KeyPair`[]

Actual KeyPair objects that can be used to sign messages, verify signatures, and get the public and private keys

#### Defined in

[src/lib/types/general.ts:13](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/general.ts#L13)

___

### publicKeys

• **publicKeys**: `string`[]

Set of public keys that were generated

#### Defined in

[src/lib/types/general.ts:15](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/general.ts#L15)

___

### secretKeys

• **secretKeys**: `string`[]

Set of private keys that were generated

#### Defined in

[src/lib/types/general.ts:17](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/general.ts#L17)
