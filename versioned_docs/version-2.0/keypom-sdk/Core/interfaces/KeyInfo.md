---
id: "KeyInfo"
title: "Interface: KeyInfo"
sidebar_label: "KeyInfo"
sidebar_position: 0
custom_edit_url: null
---

Important information returned in many view calls regarding a specific access key.

## Properties

### allowance

 **allowance**: `number`

How much allowance does the key have left (measured in $yoctoNEAR). When the key is deleted, this is refunded to the funder's balance.

#### Defined in

[lib/types/drops.ts:25](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L25)

___

### curKeyUse

 **curKeyUse**: `number`

Which use is the key currently on? For single-use keys, this is always 1.

#### Defined in

[lib/types/drops.ts:16](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L16)

___

### dropId

 **dropId**: `string`

Drop ID for the specific drop that the key belongs to.

#### Defined in

[lib/types/drops.ts:11](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L11)

___

### keyId

 **keyId**: `number`

The unique ID associated to this key. IDs are *not* unique across drops but they are unique for any key in the drop.

#### Defined in

[lib/types/drops.ts:28](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L28)

___

### lastUsed

 **lastUsed**: `number`

At what timestamp was the key last used? Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.

#### Defined in

[lib/types/drops.ts:22](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L22)

___

### publicKey

 **publicKey**: `string`

Public key for this access key.

#### Defined in

[lib/types/drops.ts:13](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L13)

___

### remainingUses

 **remainingUses**: `number`

How many uses this key has left before it's deleted.

#### Defined in

[lib/types/drops.ts:19](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L19)
