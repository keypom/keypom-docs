---
id: "GenerateKeysParams"
title: "Interface: GenerateKeysParams"
sidebar_label: "GenerateKeysParams"
sidebar_position: 0
custom_edit_url: null
---

Parameters that should be passed in when generating keys using `generateKeys`.

## Properties

### metaEntropy

• `Optional` **metaEntropy**: `string` \| `string`[]

An array of entropies to use in conjunction with a base rootEntropy to deterministically generate the private keys. For single key generation, you can either pass in a string array with a single element, or simply 
pass in the string itself directly (not within an array).

#### Defined in

[src/lib/types/params.ts:161](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L161)

___

### numKeys

• **numKeys**: `number`

The number of keys to generate.

#### Defined in

[src/lib/types/params.ts:156](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L156)

___

### rootEntropy

• `Optional` **rootEntropy**: `string`

A root string that will be used as a baseline for all keys in conjunction with different metaEntropies (if provided) to deterministically generate a keypair. If not provided, the keypair will be completely random.

#### Defined in

[src/lib/types/params.ts:158](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L158)
