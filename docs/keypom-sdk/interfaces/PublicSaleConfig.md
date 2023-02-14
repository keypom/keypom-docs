---
id: "PublicSaleConfig"
title: "Interface: PublicSaleConfig"
sidebar_label: "PublicSaleConfig"
sidebar_position: 0
custom_edit_url: null
---

Within the config, there are configurable options related to how keys can be sold and a funder can potentially make a profit.

## Properties

### allowlist

 `Optional` **allowlist**: `string`[]

Which accounts are allowed to add keys? If the allowlist is empty, anyone that is not in the blocklist can add keys.

#### Defined in

[src/lib/types/drops.ts:170](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/drops.ts#L170)

___

### autoWithdrawFunds

 `Optional` **autoWithdrawFunds**: `boolean`

Should the revenue generated be sent to the funder's account balance or
automatically withdrawn and sent to their NEAR wallet?

#### Defined in

[src/lib/types/drops.ts:177](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/drops.ts#L177)

___

### blocklist

 `Optional` **blocklist**: `string`[]

Which accounts are NOT allowed to add keys?

#### Defined in

[src/lib/types/drops.ts:172](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/drops.ts#L172)

___

### end

 `Optional` **end**: `number`

Block timestamp dictating the end of the public sale. If None, keys can be added indefinitely
Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.

#### Defined in

[src/lib/types/drops.ts:187](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/drops.ts#L187)

___

### maxNumKeys

 `Optional` **maxNumKeys**: `number`

Maximum number of keys that can be added to this drop. If None, there is no max.

#### Defined in

[src/lib/types/drops.ts:162](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/drops.ts#L162)

___

### pricePerKeyNEAR

 `Optional` **pricePerKeyNEAR**: `number`

Amount of $NEAR that the user needs to attach (if they are not the funder) on top of costs. This amount will be
Automatically sent to the funder's balance. If None, the keys are free to the public.

#### Defined in

[src/lib/types/drops.ts:167](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/drops.ts#L167)

___

### pricePerKeyYocto

 `Optional` **pricePerKeyYocto**: `string`

#### Defined in

[src/lib/types/drops.ts:168](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/drops.ts#L168)

___

### start

 `Optional` **start**: `number`

Minimum block timestamp before the public sale starts. If None, keys can be added immediately
Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.

#### Defined in

[src/lib/types/drops.ts:182](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/drops.ts#L182)
