---
id: "UsageConfig"
title: "Interface: UsageConfig"
sidebar_label: "UsageConfig"
sidebar_position: 0
custom_edit_url: null
---

Within the config, there are configurable options related to how keys can be used. What permissions they have, whether an empty drop should be automatically deleted etc.

## Properties

### accountCreationFields

 `Optional` **accountCreationFields**: `Object`

When calling `create_account` on the root account, which keypom args should be attached to the payload.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountIdField?` | `string` | Specifies what field Keypom should auto-inject the account that claimed the drop's ID into when calling the `create_account` function. |
| `dropIdField?` | `string` | Specifies what field Keypom should auto-inject the drop's ID into when calling the `create_account` function. |
| `funderIdField?` | `string` | Specifies what field Keypom should auto-inject the drop funder's account ID into when calling the `create_account` function. |
| `keyIdField?` | `string` | Specifies what field Keypom should auto-inject the key's ID into when calling the `create_account` function. |

#### Defined in

[lib/types/drops.ts:136](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L136)

___

### autoDeleteDrop

 `Optional` **autoDeleteDrop**: `boolean`

When a key is used and deleted, if it results in the drop being empty, should the drop automatically be deleted? If this isn't specified, it defaults to false.

#### Defined in

[lib/types/drops.ts:130](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L130)

___

### autoWithdraw

 `Optional` **autoWithdraw**: `boolean`

When the last key in this drop is used, in the case where `autoDeleteDrop` is set to true and the drop is the owner's last, should their balance be automatically withdrawn? If this isn't specified, it defaults to false.

#### Defined in

[lib/types/drops.ts:134](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L134)

___

### permissions

 `Optional` **permissions**: `string`

Specify which methods can be called by the access key (either `claim` or `create_account_and_claim`). If this isn't specified, both methods can be called.

#### Defined in

[lib/types/drops.ts:121](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L121)

___

### refundDeposit

 `Optional` **refundDeposit**: `boolean`

If the method `claim` is called rather than `create_account_and_claim`, should the `deposit_per_use` be refunded to the owner's balance?
If this isn't specified, it defaults to false.

#### Defined in

[lib/types/drops.ts:126](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/core/src/lib/types/drops.ts#L126)
