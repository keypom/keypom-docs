---
id: "FCData"
title: "Interface: FCData"
sidebar_label: "FCData"
sidebar_position: 0
custom_edit_url: null
---

Information pertaining to all Function-Call drops. This should be passed in if the drop will be a Function-Call drop.

## Properties

### config

 `Optional` **config**: [`FCConfig`](FCConfig.md)

Specific configurations for the Function-Call drop.

#### Defined in

[src/lib/types/fc.ts:78](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/fc.ts#L78)

___

### methods

 **methods**: `Maybe`<[`Method`](Method.md)[]\>[]

The top level array indicates a different set of methods that can be called for every key use. It is possible that for a given key use, no methods are called thus acting as a "free" key use whereby the use is reflected on-chain but no assets are transferred. 
If a given key use does not have an undefined set of methods, when it is used, all the methods in the set will be called.

#### Defined in

[src/lib/types/fc.ts:74](https://github.com/keypom/keypom-js/blob/5eb1fcc/src/lib/types/fc.ts#L74)
