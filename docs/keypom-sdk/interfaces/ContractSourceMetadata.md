---
id: "ContractSourceMetadata"
title: "Interface: ContractSourceMetadata"
sidebar_label: "ContractSourceMetadata"
sidebar_position: 0
custom_edit_url: null
---

Information returned from `getContractSourceMetadata` about the deployed Keypom contract. This is part of [NEP-330](https://nomicon.io/Standards/SourceMetadata) and
can allow you to view exactly what code is deployed to the contract.

## Properties

### link

 **link**: `string`

Link to the specific commit and code on GitHub that is deployed to the Keypom account

#### Defined in

[src/lib/types/general.ts:91](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/types/general.ts#L91)

___

### version

 **version**: `string`

Versioning used by the Keypom developers to indicate which version of the contract is deployed.

#### Defined in

[src/lib/types/general.ts:89](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/types/general.ts#L89)
