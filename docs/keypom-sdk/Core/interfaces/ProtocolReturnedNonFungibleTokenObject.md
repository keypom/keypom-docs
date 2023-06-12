---
id: "ProtocolReturnedNonFungibleTokenObject"
title: "Interface: ProtocolReturnedNonFungibleTokenObject"
sidebar_label: "ProtocolReturnedNonFungibleTokenObject"
sidebar_position: 0
custom_edit_url: null
---

General structure of a Non-Fungible Token object as per official NEP-171 standard (https://github.com/near/NEPs/blob/master/neps/nep-0171.md).

## Properties

### approved\_account\_ids

 `Optional` **approved\_account\_ids**: `Map`<`string`, `number`\>

Map of account IDs to approval IDs as per official NEP-178 standard (https://github.com/near/NEPs/blob/master/neps/nep-0178.md).

#### Defined in

[lib/types/nft.ts:28](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/nft.ts#L28)

___

### metadata

 `Optional` **metadata**: [`ProtocolReturnedNonFungibleTokenMetadata`](ProtocolReturnedNonFungibleTokenMetadata.md)

Metadata for the token

#### Defined in

[lib/types/nft.ts:26](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/nft.ts#L26)

___

### owner\_id

 **owner\_id**: `string`

Account ID of the owner

#### Defined in

[lib/types/nft.ts:24](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/nft.ts#L24)

___

### royalty

 `Optional` **royalty**: `Map`<`string`, `number`\>

A mapping of NEAR accounts to the amount each should be paid out as per official NEP-199 standard (https://github.com/near/NEPs/blob/master/neps/nep-0199.md).

#### Defined in

[lib/types/nft.ts:30](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/nft.ts#L30)

___

### token\_id

 **token\_id**: `string`

String ID for the token

#### Defined in

[lib/types/nft.ts:22](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/nft.ts#L22)
