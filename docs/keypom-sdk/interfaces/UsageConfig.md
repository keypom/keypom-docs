---
id: "UsageConfig"
title: "Interface: UsageConfig"
sidebar_label: "UsageConfig"
sidebar_position: 0
custom_edit_url: null
---

Within the config, there are configurable options related to how keys can be used. What permissions they have, whether an empty drop should be automatically deleted etc.

## Properties

### autoDeleteDrop

 `Optional` **autoDeleteDrop**: `boolean`

When a key is used and deleted, if it results in the drop being empty, should the drop automatically be deleted? If this isn't specified, it defaults to false.

#### Defined in

[src/lib/types/drops.ts:150](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/types/drops.ts#L150)

___

### autoWithdraw

 `Optional` **autoWithdraw**: `boolean`

In the case where `autoDeleteDrop` is set to true and the drop is the owner's last, should their balance be automatically withdrawn? If this isn't specified, it defaults to false.

#### Defined in

[src/lib/types/drops.ts:154](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/types/drops.ts#L154)

___

### permissions

 `Optional` **permissions**: `string`

Specify which methods can be called by the access key (either `claim` or `create_account_and_claim`). If this isn't specified, both methods can be called.

#### Defined in

[src/lib/types/drops.ts:141](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/types/drops.ts#L141)

___

### refundDeposit

 `Optional` **refundDeposit**: `boolean`

If the method `claim` is called rather than `create_account_and_claim`, should the `deposit_per_use` be refunded to the owner's balance?
If this isn't specified, it defaults to false.

#### Defined in

[src/lib/types/drops.ts:146](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/types/drops.ts#L146)
