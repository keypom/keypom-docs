---
id: "Drop"
title: "Interface: Drop"
sidebar_label: "Drop"
sidebar_position: 0
custom_edit_url: null
---

Information related to a specific drop.

## Properties

### config

 `Optional` **config**: [`DropConfig`](DropConfig.md)

All drops regardless of their type can have a suite of configurations such as how many uses each key has or how often a key can be used.

#### Defined in

[lib/types/drops.ts:50](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L50)

___

### depositPerUse

 **depositPerUse**: `string`

How much $yoctoNEAR will be transferred anytime a key is used that is part of this drop.

#### Defined in

[lib/types/drops.ts:40](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L40)

___

### dropId

 **dropId**: `string`

Drop ID for this specific drop.

#### Defined in

[lib/types/drops.ts:36](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L36)

___

### fc

 `Optional` **fc**: [`FCData`](FCData.md)

For Function-Call drops, important information needs to be stored such as which methods, the attached deposit, args etc.

#### Defined in

[lib/types/drops.ts:48](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L48)

___

### ft

 `Optional` **ft**: [`FTData`](FTData.md)

For Fungible Token drops, important information such as the amount of tokens to transfer, or contract need to be stored.

#### Defined in

[lib/types/drops.ts:46](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L46)

___

### metadata

 `Optional` **metadata**: `string`

Any extra information about the drop can be stored as metadata. This is up to the drop creator and can be stringified JSON, or any other string.

#### Defined in

[lib/types/drops.ts:52](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L52)

___

### nextKeyId

 **nextKeyId**: `number`

What is the next unique ID that will be given to the next access key added to this drop.

#### Defined in

[lib/types/drops.ts:58](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L58)

___

### nft

 `Optional` **nft**: [`NFTData`](NFTData.md)

For NFT drops, important information such as the token IDs, or contract need to be stored.

#### Defined in

[lib/types/drops.ts:44](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L44)

___

### ownerId

 **ownerId**: `string`

Which account created this drop.

#### Defined in

[lib/types/drops.ts:38](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L38)

___

### registeredUses

 **registeredUses**: `number`

How many key uses are registered for this drop? This is only applicable to simple drops with lazy registrations, FT drops, and NFT drops.

#### Defined in

[lib/types/drops.ts:54](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L54)

___

### requiredGas

 **requiredGas**: `string`

In order to use an access key that's part of this drop, how much Gas *needs* to be attached to the call?

#### Defined in

[lib/types/drops.ts:56](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L56)

___

### simple

 `Optional` **simple**: [`SimpleData`](SimpleData.md)

For simple drops, there are specific, optional configurations.

#### Defined in

[lib/types/drops.ts:42](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L42)
