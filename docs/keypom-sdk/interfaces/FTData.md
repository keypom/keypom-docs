---
id: "FTData"
title: "Interface: FTData"
sidebar_label: "FTData"
sidebar_position: 0
custom_edit_url: null
---

Information pertaining to all Fungible-Token drops. This should be passed in if the drop will be used to transfer any fungible tokens.

## Properties

### absoluteAmount

 `Optional` **absoluteAmount**: `string`

Amount of tokens to transfer but considering the decimal amount.
Example: transferring one wNEAR should be passed in as "1000000000000000000000000" and NOT "1"

#### Defined in

[src/lib/types/ft.ts:22](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/types/ft.ts#L22)

___

### amount

 `Optional` **amount**: `string`

Human readable format for the amount of tokens to transfer everytime the FT key is used.
Example: transferring one wNEAR should be passed in as "1" and NOT "1000000000000000000000000"

#### Defined in

[src/lib/types/ft.ts:17](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/types/ft.ts#L17)

___

### contractId

 **contractId**: `string`

Which contract do the FTs belong to?

#### Defined in

[src/lib/types/ft.ts:8](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/types/ft.ts#L8)

___

### senderId

 **senderId**: `string`

Which account ID will be sending the fungible tokens to the Keypom contract in order to register key uses?

#### Defined in

[src/lib/types/ft.ts:12](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/types/ft.ts#L12)
