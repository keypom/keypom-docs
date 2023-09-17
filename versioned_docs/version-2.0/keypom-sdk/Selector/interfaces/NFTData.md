---
id: "NFTData"
title: "Interface: NFTData"
sidebar_label: "NFTData"
sidebar_position: 0
custom_edit_url: null
---

General structure of a Non-Fungible Token drop. This should be passed into `createDrop` if you wish to have an NFT drop.

## Properties

### contractId

 **contractId**: `string`

The account ID that the NFT contract is deployed to. This contract is where all the NFTs for the specific drop must come from.

#### Defined in

[lib/types/nft.ts:6](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/nft.ts#L6)

___

### senderId

 `Optional` **senderId**: `string`

By default, anyone can fund your drop with NFTs. This field allows you to set a specific account ID that will be locked into sending the NFTs.

#### Defined in

[lib/types/nft.ts:8](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/nft.ts#L8)

___

### tokenIds

 `Optional` **tokenIds**: `string`[]

If there are any token IDs that you wish to be automatically sent to the Keypom contract in order to register keys as part of `createDrop`, specify them here.
A maximum of 2 token IDs can be sent as part of the transaction. If you wish to register more keys by sending more NFTs, you must do this in a separate call by invoking
the `nftTransferCall` method separately.

#### Defined in

[lib/types/nft.ts:14](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/nft.ts#L14)
