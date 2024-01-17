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
| › `instantSignInSpecs?` | `InstantSignInSpecs` |
| › `networkId` | `string` |
| › `signInContractId` | `string` |
| › `trialAccountSpecs?` | `TrialSignInSpecs` |

#### Defined in

[core/wallet.ts:33](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L33)

## Properties

### accountId

 `Optional` **accountId**: `string`

#### Defined in

[core/wallet.ts:19](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L19)

___

### instantSignInSpecs

 `Optional` **instantSignInSpecs**: `InternalInstantSignInSpecs`

#### Defined in

[core/wallet.ts:29](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L29)

___

### keyStore

 **keyStore**: `BrowserLocalStorageKeyStore`

#### Defined in

[core/wallet.ts:26](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L26)

___

### modal

 `Optional` **modal**: `KeypomTrialModal`

#### Defined in

[core/wallet.ts:31](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L31)

___

### moduleId

 `Optional` **moduleId**: `string`

#### Defined in

[core/wallet.ts:21](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L21)

___

### near

 **near**: `Near`

#### Defined in

[core/wallet.ts:25](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L25)

___

### secretKey

 `Optional` **secretKey**: `string`

#### Defined in

[core/wallet.ts:20](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L20)

___

### signInContractId

 **signInContractId**: `string`

#### Defined in

[core/wallet.ts:23](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L23)

___

### trialAccountSpecs

 `Optional` **trialAccountSpecs**: `InternalTrialSignInSpecs`

#### Defined in

[core/wallet.ts:28](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L28)

## Methods

### assertSignedIn

`Private` **assertSignedIn**(): `void`

#### Returns

`void`

#### Defined in

[core/wallet.ts:337](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L337)

___

### checkValidTrialInfo

**checkValidTrialInfo**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/wallet.ts:287](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L287)

___

### getAccountId

**getAccountId**(): `string`

#### Returns

`string`

#### Defined in

[core/wallet.ts:63](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L63)

___

### getAccounts

**getAccounts**(): `Promise`<`Account`[]\>

#### Returns

`Promise`<`Account`[]\>

#### Implementation of

InstantLinkWalletBehaviour.getAccounts

#### Defined in

[core/wallet.ts:306](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L306)

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

[core/wallet.ts:301](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L301)

___

### getContractId

**getContractId**(): `string`

#### Returns

`string`

#### Implementation of

InstantLinkWalletBehaviour.getContractId

#### Defined in

[core/wallet.ts:59](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L59)

___

### internalSignIn

`Private` **internalSignIn**(`accountId`, `secretKey`, `moduleId`): `Promise`<`Account`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountId` | `any` |
| `secretKey` | `any` |
| `moduleId` | `any` |

#### Returns

`Promise`<`Account`[]\>

#### Defined in

[core/wallet.ts:319](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L319)

___

### isSignedIn

**isSignedIn**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

[core/wallet.ts:68](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L68)

___

### setSpecsFromKeypomParams

`Private` **setSpecsFromKeypomParams**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `instantSignInSpecs?` | `InstantSignInSpecs` |
| › `shouldSetupModal` | `boolean` |
| › `trialAccountSpecs?` | `TrialSignInSpecs` |

#### Returns

`void`

#### Defined in

[core/wallet.ts:343](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L343)

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

[core/wallet.ts:282](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L282)

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

[core/wallet.ts:201](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L201)

___

### signAndSendTransactions

**signAndSendTransactions**(`params`): `Promise`<`FinalExecutionOutcome`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.transactions` | `Transaction`[] |

#### Returns

`Promise`<`FinalExecutionOutcome`[]\>

#### Implementation of

InstantLinkWalletBehaviour.signAndSendTransactions

#### Defined in

[core/wallet.ts:225](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L225)

___

### signIn

**signIn**(): `Promise`<`Account`[]\>

#### Returns

`Promise`<`Account`[]\>

#### Implementation of

InstantLinkWalletBehaviour.signIn

#### Defined in

[core/wallet.ts:147](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L147)

___

### signInInstantAccount

**signInInstantAccount**(`accountId`, `secretKey`, `moduleId`): `Promise`<`Account`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountId` | `any` |
| `secretKey` | `any` |
| `moduleId` | `any` |

#### Returns

`Promise`<`Account`[]\>

#### Defined in

[core/wallet.ts:128](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L128)

___

### signInTrialAccount

**signInTrialAccount**(`accountId`, `secretKey`): `Promise`<`Account`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountId` | `any` |
| `secretKey` | `any` |

#### Returns

`Promise`<`Account`[]\>

#### Defined in

[core/wallet.ts:72](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L72)

___

### signOut

**signOut**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

InstantLinkWalletBehaviour.signOut

#### Defined in

[core/wallet.ts:191](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L191)

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

[core/wallet.ts:315](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L315)

___

### verifyOwner

**verifyOwner**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

InstantLinkWalletBehaviour.verifyOwner

#### Defined in

[core/wallet.ts:295](https://github.com/keypom/keypom-js/blob/9a866ee41/packages/selector/src/core/wallet.ts#L295)
