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

[core/wallet.ts:33](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L33)

## Properties

### accountId

 `Optional` **accountId**: `string`

#### Defined in

[core/wallet.ts:19](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L19)

___

### instantSignInSpecs

 `Optional` **instantSignInSpecs**: `InternalInstantSignInSpecs`

#### Defined in

[core/wallet.ts:29](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L29)

___

### keyStore

 **keyStore**: `BrowserLocalStorageKeyStore`

#### Defined in

[core/wallet.ts:26](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L26)

___

### modal

 `Optional` **modal**: `KeypomTrialModal`

#### Defined in

[core/wallet.ts:31](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L31)

___

### moduleId

 `Optional` **moduleId**: `string`

#### Defined in

[core/wallet.ts:21](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L21)

___

### near

 **near**: `Near`

#### Defined in

[core/wallet.ts:25](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L25)

___

### secretKey

 `Optional` **secretKey**: `string`

#### Defined in

[core/wallet.ts:20](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L20)

___

### signInContractId

 **signInContractId**: `string`

#### Defined in

[core/wallet.ts:23](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L23)

___

### trialAccountSpecs

 `Optional` **trialAccountSpecs**: `InternalTrialSignInSpecs`

#### Defined in

[core/wallet.ts:28](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L28)

## Methods

### assertSignedIn

`Private` **assertSignedIn**(): `void`

#### Returns

`void`

#### Defined in

[core/wallet.ts:357](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L357)

___

### checkValidTrialInfo

**checkValidTrialInfo**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/wallet.ts:308](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L308)

___

### getAccountId

**getAccountId**(): `string`

#### Returns

`string`

#### Defined in

[core/wallet.ts:94](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L94)

___

### getAccounts

**getAccounts**(): `Promise`<`Account`[]\>

#### Returns

`Promise`<`Account`[]\>

#### Implementation of

InstantLinkWalletBehaviour.getAccounts

#### Defined in

[core/wallet.ts:326](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L326)

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

[core/wallet.ts:321](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L321)

___

### getContractId

**getContractId**(): `string`

#### Returns

`string`

#### Implementation of

InstantLinkWalletBehaviour.getContractId

#### Defined in

[core/wallet.ts:90](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L90)

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

[core/wallet.ts:339](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L339)

___

### isSignedIn

**isSignedIn**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

[core/wallet.ts:99](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L99)

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

[core/wallet.ts:303](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L303)

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

[core/wallet.ts:222](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L222)

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

[core/wallet.ts:246](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L246)

___

### signIn

**signIn**(): `Promise`<`Account`[]\>

#### Returns

`Promise`<`Account`[]\>

#### Implementation of

InstantLinkWalletBehaviour.signIn

#### Defined in

[core/wallet.ts:178](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L178)

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

[core/wallet.ts:159](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L159)

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

[core/wallet.ts:103](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L103)

___

### signOut

**signOut**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

InstantLinkWalletBehaviour.signOut

#### Defined in

[core/wallet.ts:212](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L212)

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

[core/wallet.ts:335](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L335)

___

### verifyOwner

**verifyOwner**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

InstantLinkWalletBehaviour.verifyOwner

#### Defined in

[core/wallet.ts:315](https://github.com/keypom/keypom-js/blob/53ee056a4/packages/selector/src/core/wallet.ts#L315)
