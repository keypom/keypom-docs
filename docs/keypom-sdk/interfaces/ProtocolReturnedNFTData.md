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

[src/lib/types/protocol.ts:169](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/types/protocol.ts#L169)

___

### sender\_id

 **sender\_id**: `string`

The account ID that will be sending any NFTs to the Keypom contract for the specific drop. Most times, this is simply the funder / drop owner.

#### Defined in

[src/lib/types/protocol.ts:171](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/types/protocol.ts#L171)
