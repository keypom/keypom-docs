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

[src/lib/selector/core/wallet.ts:29](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L29)

## Properties

### accountId

 `Private` `Optional` **accountId**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:22](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L22)

___

### contractId

 `Readonly` **contractId**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:15](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L15)

___

### delimiter

 `Private` `Readonly` **delimiter**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:20](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L20)

___

### desiredUrl

 `Private` `Readonly` **desiredUrl**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:19](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L19)

___

### keyStore

 `Private` `Readonly` **keyStore**: `BrowserLocalStorageKeyStore`

#### Defined in

[src/lib/selector/core/wallet.ts:18](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L18)

___

### modal

 `Private` `Optional` **modal**: `KeypomTrialModal`

#### Defined in

[src/lib/selector/core/wallet.ts:27](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L27)

___

### modalOptions

 `Private` `Optional` `Readonly` **modalOptions**: `any`

#### Defined in

[src/lib/selector/core/wallet.ts:26](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L26)

___

### near

 `Private` `Readonly` **near**: `Near`

#### Defined in

[src/lib/selector/core/wallet.ts:17](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L17)

___

### networkId

 `Readonly` **networkId**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:14](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L14)

___

### publicKey

 `Private` `Optional` **publicKey**: `PublicKey`

#### Defined in

[src/lib/selector/core/wallet.ts:25](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L25)

___

### secretKey

 `Private` `Optional` **secretKey**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:23](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L23)

## Methods

### assertSignedIn

`Private` **assertSignedIn**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/selector/core/wallet.ts:141](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L141)

___

### checkValidTrialInfo

**checkValidTrialInfo**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/selector/core/wallet.ts:66](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L66)

___

### getAccountId

**getAccountId**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/selector/core/wallet.ts:57](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L57)

___

### getAccounts

**getAccounts**(): `Promise`<`Account`[]\>

#### Returns

`Promise`<`Account`[]\>

#### Implementation of

InstantLinkWalletBehaviour.getAccounts

#### Defined in

[src/lib/selector/core/wallet.ts:172](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L172)

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

[src/lib/selector/core/wallet.ts:167](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L167)

___

### getContractId

**getContractId**(): `string`

#### Returns

`string`

#### Implementation of

InstantLinkWalletBehaviour.getContractId

#### Defined in

[src/lib/selector/core/wallet.ts:53](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L53)

___

### isSignedIn

**isSignedIn**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/lib/selector/core/wallet.ts:147](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L147)

___

### parseUrl

**parseUrl**(): `undefined` \| { `trialAccountId`: `string` ; `trialSecretKey`: `string`  }

#### Returns

`undefined` \| { `trialAccountId`: `string` ; `trialSecretKey`: `string`  }

#### Defined in

[src/lib/selector/core/wallet.ts:104](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L104)

___

### showModal

**showModal**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/selector/core/wallet.ts:62](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L62)

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

[src/lib/selector/core/wallet.ts:263](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L263)

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

[src/lib/selector/core/wallet.ts:286](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L286)

___

### signIn

**signIn**(): `Promise`<`Account`[]\>

#### Returns

`Promise`<`Account`[]\>

#### Implementation of

InstantLinkWalletBehaviour.signIn

#### Defined in

[src/lib/selector/core/wallet.ts:185](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L185)

___

### signOut

**signOut**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

InstantLinkWalletBehaviour.signOut

#### Defined in

[src/lib/selector/core/wallet.ts:157](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L157)

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

[src/lib/selector/core/wallet.ts:181](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L181)

___

### transformTransactions

`Private` **transformTransactions**(`txns`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txns` | `any` |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/lib/selector/core/wallet.ts:70](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L70)

___

### tryInitFromLocalStorage

`Private` **tryInitFromLocalStorage**(`data`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`boolean`

#### Defined in

[src/lib/selector/core/wallet.ts:127](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L127)

___

### verifyOwner

**verifyOwner**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

InstantLinkWalletBehaviour.verifyOwner

#### Defined in

[src/lib/selector/core/wallet.ts:151](https://github.com/keypom/keypom-js/blob/98941bb9/src/lib/selector/core/wallet.ts#L151)
