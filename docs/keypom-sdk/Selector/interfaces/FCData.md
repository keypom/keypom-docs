---
id: "FCData"
title: "Interface: FCData"
sidebar_label: "FCData"
sidebar_position: 0
custom_edit_url: null
---

Information pertaining to all Function-Call drops. This should be passed in if the drop will be a Function-Call drop.

## Properties

### methods

 **methods**: [`Method`](Method.md)[][]

The top level array indicates a different set of methods that can be called for every key use. It is possible that for a given key use, no methods are called thus acting as a "free" key use whereby the use is reflected on-chain but no assets are transferred.
If a given key use does not have an undefined set of methods, when it is used, all the methods in the set will be called.

#### Defined in

[lib/types/fc.ts:73](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/fc.ts#L73)
