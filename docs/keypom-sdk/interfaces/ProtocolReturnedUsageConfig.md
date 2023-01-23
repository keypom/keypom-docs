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

### auto\_delete\_drop

 `Optional` **auto\_delete\_drop**: `boolean`

When a key is used and deleted, if it results in the drop being empty, should the drop automatically be deleted? If this isn't specified, it defaults to false.

#### Defined in

[src/lib/types/protocol.ts:131](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/protocol.ts#L131)

___

### auto\_withdraw

 `Optional` **auto\_withdraw**: `boolean`

In the case where `autoDeleteDrop` is set to true and the drop is the owner's last, should their balance be automatically withdrawn? If this isn't specified, it defaults to false.

#### Defined in

[src/lib/types/protocol.ts:135](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/protocol.ts#L135)

___

### permissions

 `Optional` **permissions**: `string`

Specify which methods can be called by the access key (either `claim` or `create_account_and_claim`). If this isn't specified, both methods can be called.

#### Defined in

[src/lib/types/protocol.ts:122](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/protocol.ts#L122)

___

### refund\_deposit

 `Optional` **refund\_deposit**: `boolean`

If the method `claim` is called rather than `create_account_and_claim`, should the `deposit_per_use` be refunded to the owner's balance?
If this isn't specified, it defaults to false.

#### Defined in

[src/lib/types/protocol.ts:127](https://github.com/keypom/keypom-js/blob/bf39909/src/lib/types/protocol.ts#L127)
