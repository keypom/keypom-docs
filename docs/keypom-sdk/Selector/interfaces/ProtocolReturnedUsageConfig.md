---
id: "ProtocolReturnedUsageConfig"
title: "Interface: ProtocolReturnedUsageConfig"
sidebar_label: "ProtocolReturnedUsageConfig"
sidebar_position: 0
custom_edit_url: null
---

Usage Config information returned from the Protocol. This interface is exactly the same as the `UsageConfig`, except all the fields are
snake cased instead of camel cased due to what the Protocol returns.

## Properties

### account\_creation\_fields

 `Optional` **account\_creation\_fields**: `Object`

When calling `create_account` on the root account, which keypom args should be attached to the payload.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `account_id_field?` | `string` | Specifies what field Keypom should auto-inject the account that claimed the drop's ID into when calling the `create_account` function. |
| `drop_id_field?` | `string` | Specifies what field Keypom should auto-inject the drop's ID into when calling the `create_account` function. |
| `funder_id_field?` | `string` | Specifies what field Keypom should auto-inject the drop funder's account ID into when calling the `create_account` function. |
| `key_id_field?` | `string` | Specifies what field Keypom should auto-inject the key's ID into when calling the `create_account` function. |

#### Defined in

[lib/types/protocol.ts:141](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L141)

___

### auto\_delete\_drop

 `Optional` **auto\_delete\_drop**: `boolean`

When a key is used and deleted, if it results in the drop being empty, should the drop automatically be deleted? If this isn't specified, it defaults to false.

#### Defined in

[lib/types/protocol.ts:134](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L134)

___

### auto\_withdraw

 `Optional` **auto\_withdraw**: `boolean`

In the case where `autoDeleteDrop` is set to true and the drop is the owner's last, should their balance be automatically withdrawn? If this isn't specified, it defaults to false.

#### Defined in

[lib/types/protocol.ts:138](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L138)

___

### permissions

 `Optional` **permissions**: `string`

Specify which methods can be called by the access key (either `claim` or `create_account_and_claim`). If this isn't specified, both methods can be called.

#### Defined in

[lib/types/protocol.ts:125](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L125)

___

### refund\_deposit

 `Optional` **refund\_deposit**: `boolean`

If the method `claim` is called rather than `create_account_and_claim`, should the `deposit_per_use` be refunded to the owner's balance?
If this isn't specified, it defaults to false.

#### Defined in

[lib/types/protocol.ts:130](https://github.com/keypom/keypom-js/blob/68bf90396/packages/core/src/lib/types/protocol.ts#L130)
