---
id: "PasswordPerUse"
title: "Interface: PasswordPerUse"
sidebar_label: "PasswordPerUse"
sidebar_position: 0
custom_edit_url: null
---

Keeps track of the password for a given key use. This should be passed in as an array for each key that has passwords.

## Properties

### key\_use

• **key\_use**: `number`

Which use does the password belong to? These uses are *NOT* zero-indexed so the first use corresponds to `1` not `0`.

#### Defined in

[src/lib/types/drops.ts:142](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/drops.ts#L142)

___

### pw

• **pw**: `string`

The password for this given use

#### Defined in

[src/lib/types/drops.ts:140](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/drops.ts#L140)