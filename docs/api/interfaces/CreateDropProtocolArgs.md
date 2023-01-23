---
id: "CreateDropProtocolArgs"
title: "Interface: CreateDropProtocolArgs"
sidebar_label: "CreateDropProtocolArgs"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### config

• `Optional` **config**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `root_account_id?` | `string` |
| `time?` | { `end?`: `number` ; `interval?`: `number` ; `start?`: `number` ; `throttle?`: `number`  } |
| `time.end?` | `number` |
| `time.interval?` | `number` |
| `time.start?` | `number` |
| `time.throttle?` | `number` |
| `usage?` | { `auto_delete_drop?`: `boolean` ; `auto_withdraw?`: `boolean` ; `permission?`: `string` ; `refund_deposit?`: `boolean`  } |
| `usage.auto_delete_drop?` | `boolean` |
| `usage.auto_withdraw?` | `boolean` |
| `usage.permission?` | `string` |
| `usage.refund_deposit?` | `boolean` |
| `uses_per_key?` | `number` |

#### Defined in

[src/lib/types/params.ts:316](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L316)

___

### deposit\_per\_use

• **deposit\_per\_use**: `string`

#### Defined in

[src/lib/types/params.ts:313](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L313)

___

### drop\_id

• `Optional` **drop\_id**: `string`

#### Defined in

[src/lib/types/params.ts:315](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L315)

___

### fc

• `Optional` **fc**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `config?` | { `attached_gas?`: `string`  } |
| `config.attached_gas?` | `string` |
| `methods` | `Maybe`<{ `account_id_field?`: `string` ; `args`: `string` ; `attached_deposit`: `string` ; `drop_id_field?`: `string` ; `key_id_field?`: `string` ; `method_name`: `string` ; `receiver_id`: `string`  }[]\>[] |

#### Defined in

[src/lib/types/params.ts:346](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L346)

___

### ft

• `Optional` **ft**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `balance_per_use?` | `string` |
| `contract_id?` | `string` |
| `sender_id?` | `string` |

#### Defined in

[src/lib/types/params.ts:337](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L337)

___

### metadata

• `Optional` **metadata**: `string`

#### Defined in

[src/lib/types/params.ts:332](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L332)

___

### nft

• `Optional` **nft**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contract_id?` | `string` |
| `sender_id?` | `string` |

#### Defined in

[src/lib/types/params.ts:342](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L342)

___

### passwords\_per\_use

• `Optional` **passwords\_per\_use**: `Maybe`<[`PasswordPerUse`](PasswordPerUse.md)[]\>[]

#### Defined in

[src/lib/types/params.ts:361](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L361)

___

### public\_keys

• `Optional` **public\_keys**: `string`[]

#### Defined in

[src/lib/types/params.ts:312](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L312)

___

### simple

• `Optional` **simple**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `lazy_register?` | `boolean` |

#### Defined in

[src/lib/types/params.ts:334](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/params.ts#L334)
