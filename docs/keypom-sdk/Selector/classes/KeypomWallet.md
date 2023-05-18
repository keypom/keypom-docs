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
| › `modalOptions` | `ModalCustomizations` |
| › `networkId` | `string` |
| › `signInContractId` | `string` |
| › `trialAccountSpecs?` | `BaseSignInSpecs` |

#### Defined in

[core/wallet.ts:29](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L29)

## Properties

### accountId

 `Optional` **accountId**: `string`

#### Defined in

[core/wallet.ts:15](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L15)

___

### instantSignInSpecs

 `Optional` **instantSignInSpecs**: `InternalInstantSignInSpecs`

#### Defined in

[core/wallet.ts:25](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L25)

___

### keyStore

 **keyStore**: `BrowserLocalStorageKeyStore`

#### Defined in

[core/wallet.ts:22](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L22)

___

### modal

 **modal**: `KeypomTrialModal`

#### Defined in

[core/wallet.ts:27](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L27)

___

### moduleId

 `Optional` **moduleId**: `string`

#### Defined in

[core/wallet.ts:17](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L17)

___

### near

 **near**: `Near`

#### Defined in

[core/wallet.ts:21](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L21)

___

### secretKey

 `Optional` **secretKey**: `string`

#### Defined in

[core/wallet.ts:16](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L16)

___

### signInContractId

 **signInContractId**: `string`

#### Defined in

[core/wallet.ts:19](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L19)

___

### trialAccountSpecs

 `Optional` **trialAccountSpecs**: `TrialSignInSpecs`

#### Defined in

[core/wallet.ts:24](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L24)

## Methods

### assertSignedIn

`Private` **assertSignedIn**(): `void`

#### Returns

`void`

#### Defined in

[core/wallet.ts:331](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L331)

___

### checkValidTrialInfo

**checkValidTrialInfo**(): `boolean`

#### Returns

`boolean`

#### Defined in

[core/wallet.ts:282](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L282)

___

### getAccountId

**getAccountId**(): `string`

#### Returns

`string`

#### Defined in

[core/wallet.ts:69](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L69)

___

### getAccounts

**getAccounts**(): `Promise`<`Account`[]\>

#### Returns

`Promise`<`Account`[]\>

#### Implementation of

InstantLinkWalletBehaviour.getAccounts

#### Defined in

[core/wallet.ts:300](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L300)

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

[core/wallet.ts:295](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L295)

___

### getContractId

**getContractId**(): `string`

#### Returns

`string`

#### Implementation of

InstantLinkWalletBehaviour.getContractId

#### Defined in

[core/wallet.ts:65](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L65)

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

[core/wallet.ts:313](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L313)

___

### isSignedIn

**isSignedIn**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

[core/wallet.ts:74](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L74)

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

[core/wallet.ts:277](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L277)

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

[core/wallet.ts:196](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L196)

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

[core/wallet.ts:220](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L220)

___

### signIn

**signIn**(): `Promise`<`Account`[]\>

#### Returns

`Promise`<`Account`[]\>

#### Implementation of

InstantLinkWalletBehaviour.signIn

#### Defined in

[core/wallet.ts:153](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L153)

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

[core/wallet.ts:134](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L134)

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

[core/wallet.ts:78](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L78)

___

### signOut

**signOut**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

InstantLinkWalletBehaviour.signOut

#### Defined in

[core/wallet.ts:186](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L186)

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

[core/wallet.ts:309](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L309)

___

### verifyOwner

**verifyOwner**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

InstantLinkWalletBehaviour.verifyOwner

#### Defined in

[core/wallet.ts:289](https://github.com/keypom/keypom-js/blob/68bf90396/packages/selector/src/core/wallet.ts#L289)
