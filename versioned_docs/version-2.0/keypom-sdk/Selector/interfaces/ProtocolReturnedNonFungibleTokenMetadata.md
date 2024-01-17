---
id: "ProtocolReturnedNonFungibleTokenMetadata"
title: "Interface: ProtocolReturnedNonFungibleTokenMetadata"
sidebar_label: "ProtocolReturnedNonFungibleTokenMetadata"
sidebar_position: 0
custom_edit_url: null
---

General structure of Non-Fungible Token Metadata as per official NEP-177 standard (https://github.com/near/NEPs/blob/master/neps/nep-0177.md).

## Properties

### copies

 `Optional` **copies**: `number`

number of copies of this set of metadata in existence when token was minted.

#### Defined in

[lib/types/nft.ts:46](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/nft.ts#L46)

___

### description

 `Optional` **description**: `string`

free-form description

#### Defined in

[lib/types/nft.ts:40](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/nft.ts#L40)

___

### expires\_at

 `Optional` **expires\_at**: `number`

When token expires, Unix epoch in milliseconds

#### Defined in

[lib/types/nft.ts:50](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/nft.ts#L50)

___

### extra

 `Optional` **extra**: `string`

anything extra the NFT wants to store on-chain. Can be stringified JSON.

#### Defined in

[lib/types/nft.ts:56](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/nft.ts#L56)

___

### issued\_at

 `Optional` **issued\_at**: `number`

When token was issued or minted, Unix epoch in milliseconds

#### Defined in

[lib/types/nft.ts:48](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/nft.ts#L48)

___

### media

 `Optional` **media**: `string`

URL to associated media, preferably to decentralized, content-addressed storage

#### Defined in

[lib/types/nft.ts:42](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/nft.ts#L42)

___

### media\_hash

 `Optional` **media\_hash**: `string`

Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.

#### Defined in

[lib/types/nft.ts:44](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/nft.ts#L44)

___

### reference

 `Optional` **reference**: `string`

URL to an off-chain JSON file with more info.

#### Defined in

[lib/types/nft.ts:58](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/nft.ts#L58)

___

### reference\_hash

 `Optional` **reference\_hash**: `string`

Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.

#### Defined in

[lib/types/nft.ts:60](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/nft.ts#L60)

___

### starts\_at

 `Optional` **starts\_at**: `number`

When token starts being valid, Unix epoch in milliseconds

#### Defined in

[lib/types/nft.ts:52](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/nft.ts#L52)

___

### title

 `Optional` **title**: `string`

ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"

#### Defined in

[lib/types/nft.ts:38](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/nft.ts#L38)

___

### updated\_at

 `Optional` **updated\_at**: `number`

When token was last updated, Unix epoch in milliseconds

#### Defined in

[lib/types/nft.ts:54](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/nft.ts#L54)
