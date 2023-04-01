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

[src/lib/selector/core/wallet.ts:30](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L30)

## Properties

### delimiter

 `Private` `Readonly` **delimiter**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:22](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L22)

___

### desiredUrl

 `Private` `Readonly` **desiredUrl**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:21](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L21)

___

### keyStore

 `Private` `Readonly` **keyStore**: `BrowserLocalStorageKeyStore`

#### Defined in

[src/lib/selector/core/wallet.ts:20](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L20)

___

### modal

 `Private` **modal**: `KeypomTrialModal`

#### Defined in

[src/lib/selector/core/wallet.ts:28](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L28)

___

### near

 `Private` `Readonly` **near**: `Near`

#### Defined in

[src/lib/selector/core/wallet.ts:19](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L19)

___

### networkId

 `Readonly` **networkId**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:16](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L16)

___

### publicKey

 `Private` `Optional` **publicKey**: `PublicKey`

#### Defined in

[src/lib/selector/core/wallet.ts:27](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L27)

___

### secretKey

 `Private` `Optional` **secretKey**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:25](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L25)

___

### signInContractId

 `Readonly` **signInContractId**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:17](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L17)

___

### trialAccountId

 `Private` `Optional` **trialAccountId**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:24](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L24)

## Methods

### assertSignedIn

`Private` **assertSignedIn**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/selector/core/wallet.ts:225](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L225)

___

### canExitTrial

`Private` **canExitTrial**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/lib/selector/core/wallet.ts:124](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L124)

___

### checkValidTrialInfo

**checkValidTrialInfo**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/selector/core/wallet.ts:67](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L67)

___

### getAccountId

**getAccountId**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/selector/core/wallet.ts:57](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L57)

___

### getAccounts

**getAccounts**(): `Promise`<`Account`[]\>

#### Returns

`Promise`<`Account`[]\>

#### Implementation of

InstantLinkWalletBehaviour.getAccounts

#### Defined in

[src/lib/selector/core/wallet.ts:256](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L256)

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

[src/lib/selector/core/wallet.ts:251](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L251)

___

### getContractId

**getContractId**(): `string`

#### Returns

`string`

#### Implementation of

InstantLinkWalletBehaviour.getContractId

#### Defined in

[src/lib/selector/core/wallet.ts:53](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L53)

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

[src/lib/selector/core/wallet.ts:105](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L105)

___

### isSignedIn

**isSignedIn**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/lib/selector/core/wallet.ts:231](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L231)

___

### parseUrl

**parseUrl**(): `undefined` \| { `accountId`: `string` ; `secretKey`: `string`  }

#### Returns

`undefined` \| { `accountId`: `string` ; `secretKey`: `string`  }

#### Defined in

[src/lib/selector/core/wallet.ts:205](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L205)

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

[src/lib/selector/core/wallet.ts:62](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L62)

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

[src/lib/selector/core/wallet.ts:343](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L343)

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

[src/lib/selector/core/wallet.ts:366](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L366)

___

### signIn

**signIn**(): `Promise`<`Account`[]\>

#### Returns

`Promise`<`Account`[]\>

#### Implementation of

InstantLinkWalletBehaviour.signIn

#### Defined in

[src/lib/selector/core/wallet.ts:269](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L269)

___

### signOut

**signOut**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

InstantLinkWalletBehaviour.signOut

#### Defined in

[src/lib/selector/core/wallet.ts:241](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L241)

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

[src/lib/selector/core/wallet.ts:265](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L265)

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

[src/lib/selector/core/wallet.ts:71](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L71)

___

### validateTransactions

`Private` **validateTransactions**(`toValidate`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `toValidate` | `any` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/lib/selector/core/wallet.ts:150](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L150)

___

### verifyOwner

**verifyOwner**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

InstantLinkWalletBehaviour.verifyOwner

#### Defined in

[src/lib/selector/core/wallet.ts:235](https://github.com/keypom/keypom-js/blob/decaa9d1/src/lib/selector/core/wallet.ts#L235)
