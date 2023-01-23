---
id: "EstimatorParams"
title: "Interface: EstimatorParams"
sidebar_label: "EstimatorParams"
sidebar_position: 0
custom_edit_url: null
---

Parameters that should be passed in when estimating how much yoctoNEAR it will cost to interact with the protocol using the `estimateRequiredDeposit` function.

## Properties

### attachedGas

 **attachedGas**: `number`

How much Gas will be attached to each key's use.

#### Defined in

[src/lib/types/params.ts:220](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L220)

___

### depositPerUse

 **depositPerUse**: `string`

How much yoctoNEAR each key will transfer upon use.

#### Defined in

[src/lib/types/params.ts:214](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L214)

___

### fcData

 `Optional` **fcData**: [`FCData`](FCData.md)

The FC data for the drop that is being created.

#### Defined in

[src/lib/types/params.ts:226](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L226)

___

### ftData

 `Optional` **ftData**: [`FTData`](FTData.md)

The FT data for the drop that is being created.

#### Defined in

[src/lib/types/params.ts:228](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L228)

___

### keyStorage

 `Optional` **keyStorage**: ``null`` \| `string`

How much storage an individual key uses.

#### Defined in

[src/lib/types/params.ts:224](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L224)

___

### near

 **near**: `Near`

The NEAR connection instance used to interact with the chain. This can either the connection that the SDK uses from `getEnv` or a separate connection.

#### Defined in

[src/lib/types/params.ts:212](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L212)

___

### numKeys

 **numKeys**: `number`

How many keys are being added to the drop.

#### Defined in

[src/lib/types/params.ts:216](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L216)

___

### storage

 `Optional` **storage**: ``null`` \| `string`

The estimated storage costs (can be retrieved through `getStorageBase`).

#### Defined in

[src/lib/types/params.ts:222](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L222)

___

### usesPerKey

 **usesPerKey**: `number`

How many uses each key has.

#### Defined in

[src/lib/types/params.ts:218](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L218)
