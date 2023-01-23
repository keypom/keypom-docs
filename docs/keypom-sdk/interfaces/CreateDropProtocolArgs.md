---
id: "CreateDropProtocolArgs"
title: "Interface: CreateDropProtocolArgs"
sidebar_label: "CreateDropProtocolArgs"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### config

 `Optional` **config**: `Object`

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

[src/lib/types/params.ts:48](https://github.com/keypom/keypom-js/blob/f1161c8/src/lib/types/params.ts#L48)

___

### deposit\_per\_use

 **deposit\_per\_use**: `string`

#### Defined in

[src/lib/types/params.ts:45](https://github.com/keypom/keypom-js/blob/f1161c8/src/lib/types/params.ts#L45)

___

### drop\_id

 `Optional` **drop\_id**: `string`

#### Defined in

[src/lib/types/params.ts:47](https://github.com/keypom/keypom-js/blob/f1161c8/src/lib/types/params.ts#L47)

___

### fc

 `Optional` **fc**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `config?` | { `attached_gas?`: `string`  } |
| `config.attached_gas?` | `string` |
| `methods` | `Maybe`<{ `account_id_field?`: `string` ; `args`: `string` ; `attached_deposit`: `string` ; `drop_id_field?`: `string` ; `key_id_field?`: `string` ; `method_name`: `string` ; `receiver_id`: `string`  }[]\>[] |

#### Defined in

[src/lib/types/params.ts:78](https://github.com/keypom/keypom-js/blob/f1161c8/src/lib/types/params.ts#L78)

___

### ft

 `Optional` **ft**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `balance_per_use?` | `string` |
| `contract_id?` | `string` |
| `sender_id?` | `string` |

#### Defined in

[src/lib/types/params.ts:69](https://github.com/keypom/keypom-js/blob/f1161c8/src/lib/types/params.ts#L69)

___

### metadata

 `Optional` **metadata**: `string`

#### Defined in

[src/lib/types/params.ts:64](https://github.com/keypom/keypom-js/blob/f1161c8/src/lib/types/params.ts#L64)

___

### nft

 `Optional` **nft**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contract_id?` | `string` |
| `sender_id?` | `string` |

#### Defined in

[src/lib/types/params.ts:74](https://github.com/keypom/keypom-js/blob/f1161c8/src/lib/types/params.ts#L74)

___

### passwords\_per\_use

 `Optional` **passwords\_per\_use**: `Maybe`<[`PasswordPerUse`](PasswordPerUse.md)[]\>[]

#### Defined in

[src/lib/types/params.ts:93](https://github.com/keypom/keypom-js/blob/f1161c8/src/lib/types/params.ts#L93)

___

### public\_keys

 `Optional` **public\_keys**: `string`[]

#### Defined in

[src/lib/types/params.ts:44](https://github.com/keypom/keypom-js/blob/f1161c8/src/lib/types/params.ts#L44)

___

### simple

 `Optional` **simple**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `lazy_register?` | `boolean` |

#### Defined in

[src/lib/types/params.ts:66](https://github.com/keypom/keypom-js/blob/f1161c8/src/lib/types/params.ts#L66)
