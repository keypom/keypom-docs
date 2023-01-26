---
id: "ProtocolReturnedFTData"
title: "Interface: ProtocolReturnedFTData"
sidebar_label: "ProtocolReturnedFTData"
sidebar_position: 0
custom_edit_url: null
---

FT Data returned from the Protocol. This interface is exactly the same as the `FTData`, except all the fields are
snake cased instead of camel cased due to what the Protocol returns.

## Properties

### balance\_per\_use

 `Optional` **balance\_per\_use**: `string`

Amount of tokens to transfer but considering the decimal amount.
Example: transferring one wNEAR should be passed in as "1000000000000000000000000" and NOT "1"

#### Defined in

[src/lib/types/protocol.ts:191](https://github.com/keypom/keypom-js/blob/fe2cd80/src/lib/types/protocol.ts#L191)

___

### contract\_id

 **contract\_id**: `string`

Which contract do the FTs belong to?

#### Defined in

[src/lib/types/protocol.ts:182](https://github.com/keypom/keypom-js/blob/fe2cd80/src/lib/types/protocol.ts#L182)

___

### sender\_id

 **sender\_id**: `string`

Which account ID will be sending the fungible tokens to the Keypom contract in order to register key uses?

#### Defined in

[src/lib/types/protocol.ts:186](https://github.com/keypom/keypom-js/blob/fe2cd80/src/lib/types/protocol.ts#L186)
