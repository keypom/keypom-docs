---
id: "DropConfig"
title: "Interface: DropConfig"
sidebar_label: "DropConfig"
sidebar_position: 0
custom_edit_url: null
---

Configurable options for any drop regardless of type.

## Properties

### dropRoot

 `Optional` **dropRoot**: `string`

Override the global root account that all created sub-accounts will have (currently `near` or `testnet`). This allows users to drops that have a custom root.
For example, Fayyr could specify a root of `fayyr.near` By which all sub-accounts will then be `ACCOUNT.fayyr.near`. 
It's important to note that this root account *MUST* have a smart contract deployed that has a method `create_account`.

#### Defined in

[src/lib/types/drops.ts:78](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/drops.ts#L78)

___

### time

 `Optional` **time**: [`TimeConfig`](TimeConfig.md)

Any information related to time-based configurations such as a starting date for keys etc.

#### Defined in

[src/lib/types/drops.ts:69](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/drops.ts#L69)

___

### usage

 `Optional` **usage**: [`UsageConfig`](UsageConfig.md)

Any information related to how access keys are used such as which methods they can call or whether an empty drop should be automatically deleted etc.

#### Defined in

[src/lib/types/drops.ts:72](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/drops.ts#L72)

___

### usesPerKey

 `Optional` **usesPerKey**: `number`

How many uses can each key have before it's deleted. If this isn't specified, it defaults to 1 use per key.

#### Defined in

[src/lib/types/drops.ts:66](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/drops.ts#L66)
