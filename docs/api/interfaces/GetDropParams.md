---
id: "GetDropParams"
title: "Interface: GetDropParams"
sidebar_label: "GetDropParams"
sidebar_position: 0
custom_edit_url: null
---

Parameters that should be passed in when getting information about drops via `getDrops`.

## Properties

### accountId

• **accountId**: `string`

The funding account that the drops belong to.

#### Defined in

[src/lib/types/params.ts:266](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L266)

___

### limit

• **limit**: `number`

How many drops to paginate through.

#### Defined in

[src/lib/types/params.ts:270](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L270)

___

### start

• **start**: `string` \| `number`

Where to start paginating through drops.

#### Defined in

[src/lib/types/params.ts:268](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L268)

___

### withKeys

• **withKeys**: `boolean`

Whether or not to include key information for the first 50 keys in each drop.

#### Defined in

[src/lib/types/params.ts:272](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L272)
