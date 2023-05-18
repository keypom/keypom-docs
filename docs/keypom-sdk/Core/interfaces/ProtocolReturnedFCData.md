---
id: "ProtocolReturnedFCData"
title: "Interface: ProtocolReturnedFCData"
sidebar_label: "ProtocolReturnedFCData"
sidebar_position: 0
custom_edit_url: null
---

FC Data returned from the Protocol. This interface is exactly the same as the `FCData`, except all the fields are
snake cased instead of camel cased due to what the Protocol returns.

## Properties

### methods

 **methods**: [`ProtocolReturnedMethod`](ProtocolReturnedMethod.md)[][]

The top level array indicates a different set of methods that can be called for every key use. It is possible that for a given key use, no methods are called thus acting as a "free" key use whereby the use is reflected on-chain but no assets are transferred.
If a given key use does not have an undefined set of methods, when it is used, all the methods in the set will be called.

#### Defined in

[lib/types/protocol.ts:300](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L300)
