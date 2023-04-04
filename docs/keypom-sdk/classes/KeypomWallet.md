---
id: "KeypomWallet"
title: "Class: KeypomWallet"
sidebar_label: "KeypomWallet"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- `InstantLinkWalletBehaviour`

## Constructors

### constructor

**new KeypomWallet**(`«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |

#### Defined in

[src/lib/selector/core/wallet.ts:31](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L31)

## Properties

### keyStore

 **keyStore**: `BrowserLocalStorageKeyStore`

#### Defined in

[src/lib/selector/core/wallet.ts:22](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L22)

___

### modal

 **modal**: `KeypomTrialModal`

#### Defined in

[src/lib/selector/core/wallet.ts:29](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L29)

___

### near

 **near**: `Near`

#### Defined in

[src/lib/selector/core/wallet.ts:21](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L21)

___

### networkId

 **networkId**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:18](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L18)

___

### signInContractId

 **signInContractId**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:19](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L19)

___

### trialAccountId

 `Optional` **trialAccountId**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:26](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L26)

___

### trialBaseUrl

 **trialBaseUrl**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:23](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L23)

___

### trialSecretKey

 `Optional` **trialSecretKey**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:27](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L27)

___

### trialSplitDelim

 **trialSplitDelim**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:24](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L24)

## Methods

### assertSignedIn

`Private` **assertSignedIn**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/selector/core/wallet.ts:280](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L280)

___

### checkValidTrialInfo

**checkValidTrialInfo**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/selector/core/wallet.ts:232](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L232)

___

### getAccountId

**getAccountId**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/selector/core/wallet.ts:58](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L58)

___

### getAccounts

**getAccounts**(): `Promise`<`Account`[]\>

#### Returns

`Promise`<`Account`[]\>

#### Implementation of

InstantLinkWalletBehaviour.getAccounts

#### Defined in

[src/lib/selector/core/wallet.ts:247](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L247)

___

### getAvailableBalance

**getAvailableBalance**(`id?`): `Promise`<`BN`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id?` | `string` |

#### Returns

`Promise`<`BN`\>

#### Defined in

[src/lib/selector/core/wallet.ts:242](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L242)

___

### getContractId

**getContractId**(): `string`

#### Returns

`string`

#### Implementation of

InstantLinkWalletBehaviour.getContractId

#### Defined in

[src/lib/selector/core/wallet.ts:54](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L54)

___

### internalSignIn

`Private` **internalSignIn**(`accountId`, `secretKey`): `Promise`<`Account`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountId` | `any` |
| `secretKey` | `any` |

#### Returns

`Promise`<`Account`[]\>

#### Defined in

[src/lib/selector/core/wallet.ts:260](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L260)

___

### isSignedIn

**isSignedIn**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/lib/selector/core/wallet.ts:63](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L63)

___

### parseUrl

`Private` **parseUrl**(): `undefined` \| { `accountId`: `string` ; `secretKey`: `string`  }

#### Returns

`undefined` \| { `accountId`: `string` ; `secretKey`: `string`  }

#### Defined in

[src/lib/selector/core/wallet.ts:207](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L207)

___

### showModal

**showModal**(`modalType?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `modalType` | `Object` | `undefined` |
| `modalType.id` | `string` | `MODAL_TYPE_IDS.TRIAL_OVER` |

#### Returns

`void`

#### Defined in

[src/lib/selector/core/wallet.ts:227](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L227)

___

### signAndSendTransaction

**signAndSendTransaction**(`params`): `Promise`<`FinalExecutionOutcome`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `any` |

#### Returns

`Promise`<`FinalExecutionOutcome`\>

#### Implementation of

InstantLinkWalletBehaviour.signAndSendTransaction

#### Defined in

[src/lib/selector/core/wallet.ts:150](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L150)

___

### signAndSendTransactions

**signAndSendTransactions**(`params`): `Promise`<`FinalExecutionOutcome`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `any` |

#### Returns

`Promise`<`FinalExecutionOutcome`[]\>

#### Implementation of

InstantLinkWalletBehaviour.signAndSendTransactions

#### Defined in

[src/lib/selector/core/wallet.ts:173](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L173)

___

### signIn

**signIn**(): `Promise`<`Account`[]\>

#### Returns

`Promise`<`Account`[]\>

#### Implementation of

InstantLinkWalletBehaviour.signIn

#### Defined in

[src/lib/selector/core/wallet.ts:67](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L67)

___

### signOut

**signOut**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

InstantLinkWalletBehaviour.signOut

#### Defined in

[src/lib/selector/core/wallet.ts:140](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L140)

___

### switchAccount

**switchAccount**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/selector/core/wallet.ts:256](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L256)

___

### verifyOwner

**verifyOwner**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

InstantLinkWalletBehaviour.verifyOwner

#### Defined in

[src/lib/selector/core/wallet.ts:236](https://github.com/keypom/keypom-js/blob/44ee5c18/src/lib/selector/core/wallet.ts#L236)
