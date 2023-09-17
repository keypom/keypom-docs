---
id: "FungibleTokenMetadata"
title: "Interface: FungibleTokenMetadata"
sidebar_label: "FungibleTokenMetadata"
sidebar_position: 0
custom_edit_url: null
---

General structure of Fungible Token Metadata as per official NEP-148 standard (https://github.com/near/NEPs/blob/master/neps/nep-0148.md).

## Properties

### decimals

 **decimals**: `number`

Used in frontends to show the proper significant digits of a token. This concept is explained well in this OpenZeppelin post (https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals).

#### Defined in

[lib/types/ft.ts:36](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/ft.ts#L36)

___

### icon

 `Optional` **icon**: `string`

A small image associated with this token. Must be a data URL, to help consumers display it quickly while protecting user data.
Recommendation: use optimized SVG, which can result in high-resolution images with only 100s of bytes of storage cost.
(Note that these storage costs are incurred to the token owner/deployer, but that querying these icons is a very cheap & cacheable read operation for all consumers of the contract and the RPC nodes that serve the data.)
Recommendation: create icons that will work well with both light-mode and dark-mode websites by either using middle-tone color schemes, or by embedding media queries in the SVG.

#### Defined in

[lib/types/ft.ts:43](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/ft.ts#L43)

___

### name

 **name**: `string`

The human-readable name of the token.

#### Defined in

[lib/types/ft.ts:32](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/ft.ts#L32)

___

### reference

 `Optional` **reference**: `string`

A link to a valid JSON file containing various keys offering supplementary details on the token. Example: /ipfs/QmdmQXB2mzChmMeKY47C43LxUdg1NDJ5MWcKMKxDu7RgQm, https://example.com/token.json, etc. If the information given in this document conflicts with the on-chain attributes, the values in reference shall be considered the source of truth.

#### Defined in

[lib/types/ft.ts:45](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/ft.ts#L45)

___

### reference\_hash

 `Optional` **reference\_hash**: `string`

The base64-encoded sha256 hash of the JSON file contained in the reference field. This is to guard against off-chain tampering.

#### Defined in

[lib/types/ft.ts:47](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/ft.ts#L47)

___

### spec

 **spec**: `string`

A string. Should be ft-1.0.0 to indicate that a Fungible Token contract adheres to the current versions of this Metadata and the Fungible Token Core specs. This will allow consumers of the Fungible Token to know if they support the features of a given contract.

#### Defined in

[lib/types/ft.ts:30](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/ft.ts#L30)

___

### symbol

 **symbol**: `string`

The abbreviation, like wETH or AMPL.

#### Defined in

[lib/types/ft.ts:34](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/ft.ts#L34)
