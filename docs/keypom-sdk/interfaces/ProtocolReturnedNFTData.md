---
id: "ProtocolReturnedNFTData"
title: "Interface: ProtocolReturnedNFTData"
sidebar_label: "ProtocolReturnedNFTData"
sidebar_position: 0
custom_edit_url: null
---

NFT Data information returned from the Protocol. This interface is exactly the same as the `NFTData`, except all the fields are
snake cased instead of camel cased due to what the Protocol returns.

## Properties

### contract\_id

 **contract\_id**: `string`

The account ID that the NFT contract is deployed to. This contract is where all the NFTs for the specific drop must come from.

#### Defined in

[src/lib/types/protocol.ts:204](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/types/protocol.ts#L204)

___

### sender\_id

 `Optional` **sender\_id**: `string`

By default, anyone can fund your drop with NFTs. This field allows you to set a specific account ID that will be locked into sending the NFTs.

#### Defined in

[src/lib/types/protocol.ts:206](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/types/protocol.ts#L206)
