---
id: "ProtocolReturnedFCConfig"
title: "Interface: ProtocolReturnedFCConfig"
sidebar_label: "ProtocolReturnedFCConfig"
sidebar_position: 0
custom_edit_url: null
---

FC Config information returned from the Protocol. This interface is exactly the same as the `FCConfig`, except all the fields are
snake cased instead of camel cased due to what the Protocol returns.

## Properties

### attached\_gas

 `Optional` **attached\_gas**: `string`

How much Gas should be attached to the function call. If this is specified, the key can *ONLY* be used to call `claim` and cannot be used to create a new account.
The amount of Gas cannot exceed 90 TGas.

#### Defined in

[src/lib/types/protocol.ts:241](https://github.com/keypom/keypom-js/blob/fe2cd80/src/lib/types/protocol.ts#L241)
