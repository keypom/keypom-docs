---
id: "KeypomWallet"
title: "Class: KeypomWallet"
sidebar_label: "KeypomWallet"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- `KeypomWalletProtocol`

## Constructors

### constructor

**new KeypomWallet**(`«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |

#### Defined in

[src/lib/selector/core/wallet.ts:23](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L23)

## Properties

### accountId

 `Private` `Optional` **accountId**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:17](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L17)

___

### connection

 `Private` `Readonly` **connection**: `Connection`

#### Defined in

[src/lib/selector/core/wallet.ts:14](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L14)

___

### desiredUrl

 `Private` `Readonly` **desiredUrl**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:15](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L15)

___

### keyPair

 `Private` `Optional` **keyPair**: `KeyPair`

#### Defined in

[src/lib/selector/core/wallet.ts:21](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L21)

___

### near

 `Private` `Readonly` **near**: `Near`

#### Defined in

[src/lib/selector/core/wallet.ts:13](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L13)

___

### networkId

 `Readonly` **networkId**: `string`

#### Implementation of

KeypomWalletProtocol.networkId

#### Defined in

[src/lib/selector/core/wallet.ts:12](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L12)

___

### publicKey

 `Private` `Optional` **publicKey**: `PublicKey`

#### Defined in

[src/lib/selector/core/wallet.ts:20](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L20)

___

### secretKey

 `Private` `Optional` **secretKey**: `string`

#### Defined in

[src/lib/selector/core/wallet.ts:18](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L18)

## Methods

### assertSignedIn

**assertSignedIn**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/selector/core/wallet.ts:117](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L117)

___

### getAccountId

**getAccountId**(): `string`

#### Returns

`string`

#### Implementation of

KeypomWalletProtocol.getAccountId

#### Defined in

[src/lib/selector/core/wallet.ts:162](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L162)

___

### getAccounts

**getAccounts**(): `Promise`<`Account`[]\>

#### Returns

`Promise`<`Account`[]\>

#### Implementation of

KeypomWalletProtocol.getAccounts

#### Defined in

[src/lib/selector/core/wallet.ts:153](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L153)

___

### getAvailableBalance

**getAvailableBalance**(`id?`): `Promise`<`BN`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id?` | `string` |

#### Returns

`Promise`<`BN`\>

#### Implementation of

KeypomWalletProtocol.getAvailableBalance

#### Defined in

[src/lib/selector/core/wallet.ts:148](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L148)

___

### isSignedIn

**isSignedIn**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Implementation of

KeypomWalletProtocol.isSignedIn

#### Defined in

[src/lib/selector/core/wallet.ts:129](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L129)

___

### parseUrl

**parseUrl**(): `undefined` \| { `trialAccountId`: `string` ; `trialSecretKey`: `string`  }

#### Returns

`undefined` \| { `trialAccountId`: `string` ; `trialSecretKey`: `string`  }

#### Defined in

[src/lib/selector/core/wallet.ts:79](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L79)

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

KeypomWalletProtocol.signAndSendTransaction

#### Defined in

[src/lib/selector/core/wallet.ts:250](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L250)

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

KeypomWalletProtocol.signAndSendTransactions

#### Defined in

[src/lib/selector/core/wallet.ts:273](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L273)

___

### signIn

**signIn**(): `Promise`<`Account`[]\>

#### Returns

`Promise`<`Account`[]\>

#### Implementation of

KeypomWalletProtocol.signIn

#### Defined in

[src/lib/selector/core/wallet.ts:171](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L171)

___

### signOut

**signOut**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

KeypomWalletProtocol.signOut

#### Defined in

[src/lib/selector/core/wallet.ts:139](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L139)

___

### switchAccount

**switchAccount**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

#### Implementation of

KeypomWalletProtocol.switchAccount

#### Defined in

[src/lib/selector/core/wallet.ts:167](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L167)

___

### transformTransactions

**transformTransactions**(`txns`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txns` | `any` |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/lib/selector/core/wallet.ts:45](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L45)

___

### tryInitFromLocalStorage

**tryInitFromLocalStorage**(`data`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`boolean`

#### Defined in

[src/lib/selector/core/wallet.ts:102](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L102)

___

### verifyOwner

**verifyOwner**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

KeypomWalletProtocol.verifyOwner

#### Defined in

[src/lib/selector/core/wallet.ts:133](https://github.com/keypom/keypom-js/blob/ba635c9/src/lib/selector/core/wallet.ts#L133)
