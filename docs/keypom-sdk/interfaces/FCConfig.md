---
id: "FCConfig"
title: "Interface: FCConfig"
sidebar_label: "FCConfig"
sidebar_position: 0
custom_edit_url: null
---

Specific configurations for a Function-Call drop.

## Properties

### attachedGas

 `Optional` **attachedGas**: `string`

How much Gas should be attached to the function call. If this is specified, the key can *ONLY* be used to call `claim` and cannot be used to create a new account.
The amount of Gas cannot exceed 90 TGas.

#### Defined in

[src/lib/types/fc.ts:54](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/types/fc.ts#L54)
