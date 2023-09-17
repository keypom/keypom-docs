---
id: "NonFungibleTokenMetadata"
title: "Interface: NonFungibleTokenMetadata"
sidebar_label: "NonFungibleTokenMetadata"
sidebar_position: 0
custom_edit_url: null
---

General structure of Non-Fungible Token Metadata (in camelCase) as per official NEP-177 standard (https://github.com/near/NEPs/blob/master/neps/nep-0177.md).

## Properties

### copies

 `Optional` **copies**: `number`

number of copies of this set of metadata in existence when token was minted.

#### Defined in

[lib/types/nft.ts:76](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/nft.ts#L76)

___

### description

 `Optional` **description**: `string`

free-form description

#### Defined in

[lib/types/nft.ts:70](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/nft.ts#L70)

___

### expiresAt

 `Optional` **expiresAt**: `number`

When token expires, Unix epoch in milliseconds

#### Defined in

[lib/types/nft.ts:80](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/nft.ts#L80)

___

### extra

 `Optional` **extra**: `string`

anything extra the NFT wants to store on-chain. Can be stringified JSON.

#### Defined in

[lib/types/nft.ts:86](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/nft.ts#L86)

___

### issuedAt

 `Optional` **issuedAt**: `number`

When token was issued or minted, Unix epoch in milliseconds

#### Defined in

[lib/types/nft.ts:78](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/nft.ts#L78)

___

### media

 `Optional` **media**: `string`

URL to associated media, preferably to decentralized, content-addressed storage

#### Defined in

[lib/types/nft.ts:72](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/nft.ts#L72)

___

### mediaHash

 `Optional` **mediaHash**: `string`

Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.

#### Defined in

[lib/types/nft.ts:74](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/nft.ts#L74)

___

### reference

 `Optional` **reference**: `string`

URL to an off-chain JSON file with more info.

#### Defined in

[lib/types/nft.ts:88](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/nft.ts#L88)

___

### referenceHash

 `Optional` **referenceHash**: `string`

Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.

#### Defined in

[lib/types/nft.ts:90](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/nft.ts#L90)

___

### startsAt

 `Optional` **startsAt**: `number`

When token starts being valid, Unix epoch in milliseconds

#### Defined in

[lib/types/nft.ts:82](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/nft.ts#L82)

___

### title

 `Optional` **title**: `string`

ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"

#### Defined in

[lib/types/nft.ts:68](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/nft.ts#L68)

___

### updatedAt

 `Optional` **updatedAt**: `number`

When token was last updated, Unix epoch in milliseconds

#### Defined in

[lib/types/nft.ts:84](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/nft.ts#L84)
