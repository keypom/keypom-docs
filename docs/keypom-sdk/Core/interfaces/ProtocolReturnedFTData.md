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

[lib/types/protocol.ts:226](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L226)

___

### contract\_id

 **contract\_id**: `string`

Which contract do the FTs belong to?

#### Defined in

[lib/types/protocol.ts:217](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L217)

___

### sender\_id

 `Optional` **sender\_id**: `string`

By default, anyone can fund your drop with FTs. This field allows you to set a specific account ID that will be locked into sending the FTs.

#### Defined in

[lib/types/protocol.ts:221](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/protocol.ts#L221)
