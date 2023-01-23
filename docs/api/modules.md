---
id: "modules"
title: "keypom-js"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Interfaces

- [AddKeyParams](interfaces/AddKeyParams.md)
- [AddToBalanceParams](interfaces/AddToBalanceParams.md)
- [ContractSourceMetadata](interfaces/ContractSourceMetadata.md)
- [CreateDropParams](interfaces/CreateDropParams.md)
- [CreateDropProtocolArgs](interfaces/CreateDropProtocolArgs.md)
- [CreateOrAddReturn](interfaces/CreateOrAddReturn.md)
- [DeleteDropParams](interfaces/DeleteDropParams.md)
- [DeleteKeyParams](interfaces/DeleteKeyParams.md)
- [Drop](interfaces/Drop.md)
- [DropConfig](interfaces/DropConfig.md)
- [EnvVars](interfaces/EnvVars.md)
- [EstimatorParams](interfaces/EstimatorParams.md)
- [ExecuteParams](interfaces/ExecuteParams.md)
- [FCConfig](interfaces/FCConfig.md)
- [FCData](interfaces/FCData.md)
- [FTData](interfaces/FTData.md)
- [FTTransferCallParams](interfaces/FTTransferCallParams.md)
- [Funder](interfaces/Funder.md)
- [GenerateKeysParams](interfaces/GenerateKeysParams.md)
- [GeneratedKeyPairs](interfaces/GeneratedKeyPairs.md)
- [GetDropParams](interfaces/GetDropParams.md)
- [InitKeypomParams](interfaces/InitKeypomParams.md)
- [KeyInfo](interfaces/KeyInfo.md)
- [Method](interfaces/Method.md)
- [NFTData](interfaces/NFTData.md)
- [NFTTransferCallParams](interfaces/NFTTransferCallParams.md)
- [PasswordPerUse](interfaces/PasswordPerUse.md)
- [ProtocolReturnedDrop](interfaces/ProtocolReturnedDrop.md)
- [ProtocolReturnedDropConfig](interfaces/ProtocolReturnedDropConfig.md)
- [ProtocolReturnedFCConfig](interfaces/ProtocolReturnedFCConfig.md)
- [ProtocolReturnedFCData](interfaces/ProtocolReturnedFCData.md)
- [ProtocolReturnedFTData](interfaces/ProtocolReturnedFTData.md)
- [ProtocolReturnedKeyInfo](interfaces/ProtocolReturnedKeyInfo.md)
- [ProtocolReturnedMethod](interfaces/ProtocolReturnedMethod.md)
- [ProtocolReturnedNFTData](interfaces/ProtocolReturnedNFTData.md)
- [ProtocolReturnedSimpleData](interfaces/ProtocolReturnedSimpleData.md)
- [ProtocolReturnedTimeConfig](interfaces/ProtocolReturnedTimeConfig.md)
- [ProtocolReturnedUsageConfig](interfaces/ProtocolReturnedUsageConfig.md)
- [SimpleData](interfaces/SimpleData.md)
- [TimeConfig](interfaces/TimeConfig.md)
- [UsageConfig](interfaces/UsageConfig.md)
- [WithdrawBalanceParams](interfaces/WithdrawBalanceParams.md)

## Type Aliases

### NearKeyPair

Ƭ **NearKeyPair**: `KeyPair`

#### Defined in

[src/lib/types/general.ts:5](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/types/general.ts#L5)

## Variables

### nearAPI

• `Const` **nearAPI**: `__module` = `nearAPI`

#### Defined in

[src/lib/keypom-utils.ts:24](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/keypom-utils.ts#L24)

## Functions

### KeypomContextProvider

▸ **KeypomContextProvider**(`props`, `context?`): ``null`` \| `ReactElement`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |
| `props.children` | `ReactNode` |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`<`any`, `any`\>

#### Defined in

node_modules/@types/react/index.d.ts:521

___

### addKeys

▸ **addKeys**(`«destructured»`): `Promise`<[`CreateOrAddReturn`](interfaces/CreateOrAddReturn.md)\>

Add keys to a specific drop

**`Example`**

Create a basic empty simple drop and add 10 keys. Each key is completely random:
```js
// Initialize the SDK for the given network and NEAR connection. No entropy passed in so any auto generated keys will
// be completely random unless otherwise overwritten.
await initKeypom({
	network: "testnet",
	funder: {
		accountId: "benji_demo.testnet",
		secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
	}
});

// Create an empty simple drop with no keys.
const {dropId} = await createDrop({
	depositPerUseNEAR: 1,
});

// Add 10 completely random keys. The return value `keys` contains information about the generated keys
const {keys} = await addKeys({
	dropId,
	numKeys: 10
})

console.log('public keys: ', keys.publicKeys);
console.log('private keys: ', keys.secretKeys);
```

**`Example`**

Init funder with root entropy, create empty drop and add generate deterministic keys. Compare with manually generated keys:
```js
// Initialize the SDK for the given network and NEAR connection. Root entropy is passed into the funder account so any generated keys
// Will be based off that entropy.
await initKeypom({
	network: "testnet",
	funder: {
		accountId: "benji_demo.testnet",
		secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1",
		rootEntropy: "my-global-secret-password"
	}
});

// Create a simple drop with no keys
const { dropId } = await createDrop({
	depositPerUseNEAR: 1,
});

// Add 5 keys to the empty simple drop. Each key will be derived based on the rootEntropy of the funder, the drop ID, and key nonce.
const {keys: keysFromDrop} = await addKeys({
	dropId,
	numKeys: 5
})

// Deterministically Generate the Private Keys:
const nonceDropIdMeta = Array.from({length: 5}, (_, i) => `${dropId}_${i}`);
const manualKeys = await generateKeys({
	numKeys: 5,
	rootEntropy: "my-global-secret-password",
	metaEntropy: nonceDropIdMeta
})

// Get the public and private keys from the keys generated by addKeys
const {publicKeys, secretKeys} = keysFromDrop;
// Get the public and private keys from the keys that were manually generated
const {publicKeys: pubKeysGenerated, secretKeys: secretKeysGenerated} = manualKeys;
// These should match!
console.log('secretKeys: ', secretKeys)
console.log('secretKeysGenerated: ', secretKeysGenerated)

// These should match!
console.log('publicKeys: ', publicKeys)
console.log('pubKeysGenerated: ', pubKeysGenerated)
```

**`Example`**

Create an empty drop and add manually created keys:
```js
// Initialize the SDK for the given network and NEAR connection. No entropy passed in so any auto generated keys will
// be completely random unless otherwise overwritten.
await initKeypom({
	network: "testnet",
	funder: {
		accountId: "benji_demo.testnet",
		secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
	}
});

// Create an empty simple drop using the keys that were generated. Since keys are passed in, the return value won't contain information about the keys.
const {dropId} = await createDrop({
	publicKeys,
	depositPerUseNEAR: 1,
});

// Generate 10 random keys
const {publicKeys} = await generateKeys({
	numKeys: 10
});

// Add keys to the drop using the keys that were generated. Since keys are passed in, the return value won't contain information about the keys.
await addKeys({
	publicKeys,
	dropId
})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`AddKeyParams`](interfaces/AddKeyParams.md) |

#### Returns

`Promise`<[`CreateOrAddReturn`](interfaces/CreateOrAddReturn.md)\>

Object containing: the drop ID, the responses of the execution, as well as any auto generated keys (if any).

#### Defined in

[src/lib/keys.ts:144](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/keys.ts#L144)

___

### addToBalance

▸ **addToBalance**(`«destructured»`): `Promise`<`any`\>

Deposit some amount of $NEAR or yoctoNEAR$ into the Keypom contract. This amount can then be used to create drops or add keys without
Having to explicitly attach a deposit everytime. It can be thought of like a bank account.

**`Example`**

Add 1 $NEAR to the account balance
```js
// Initialize the SDK on testnet
await initKeypom({
	network: "testnet",
	funder: {
		accountId: "benji_demo.testnet",
		secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
	}
});

await addToBalance({
    amount: "1",
)};
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`AddToBalanceParams`](interfaces/AddToBalanceParams.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/balances.ts:34](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/balances.ts#L34)

___

### claim

▸ **claim**(`«destructured»`): `Promise`<`any`\>

Allows a specific Keypom drop to be claimed via the secret key.

**`Example`**

Creating a simple $NEAR drop and claiming to an existing account:
```js
// Initialize the SDK for the given network and NEAR connection
await initKeypom({
	network: "testnet",
	funder: {
		accountId: "benji_demo.testnet",
		secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
	}
});

// create 1 keys with no entropy (random key)
const {publicKeys, secretKeys} = await generateKeys({
	numKeys: 1
});

// Create a simple drop with 1 $NEAR
await createDrop({
	publicKeys,
	depositPerUseNEAR: 1,
});

// Claim the drop to the passed in account ID
await claim({
	secretKey: secretKeys[0],
	accountId: "benjiman.testnet"
})
```

**`Example`**

Creating a simple $NEAR drop and using it to create a brand new NEAR account:
```js
// Initialize the SDK for the given network and NEAR connection
await initKeypom({
	network: "testnet",
	funder: {
		accountId: "benji_demo.testnet",
		secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
	}
});

// create 2 keys with no entropy (all random). The first will be used for the drop and the second
// will be used as the full access key for the newly created account
const {publicKeys, secretKeys} = await generateKeys({
	numKeys: 2
});

// Create a simple drop with 1 $NEAR
await createDrop({
	publicKeys: [publicKeys[0]],
	depositPerUseNEAR: 1,
});

// Claim the drop and create a new account
await claim({
	secretKey: secretKeys[0],
	newAccountId: "my-newly-creating-account.testnet",
	newPublicKey: publicKeys[1]
})
```

**`Example`**

Creating a drop and adding a password to it. Generate the password using the hash function and pass it into claim the drop:
```js
// Initialize the SDK for the given network and NEAR connection
await initKeypom({
	network: "testnet",
	funder: {
		accountId: "benji_demo.testnet",
		secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
	}
});

const basePassword = "my-cool-password123";
// Create a simple drop with 1 $NEAR and pass in a base password to create a unique password for each use of each key
const {keys} = await createDrop({
	numKeys: 1,
	depositPerUseNEAR: 1,
	basePassword
});

// Create the password to pass into claim which is a hash of the basePassword, public key and whichever use we are on
let currentUse = 1;
let passwordForClaim = await hashPassword(basePassword + keys.publicKeys[0] + currentUse.toString());

// Claim the drop to the passed in account ID and use the password we generated above.
await claim({
	secretKey: keys.secretKeys[0],
	accountId: "benjiman.testnet",
	password: passwordForClaim
})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/claims.ts:112](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/claims.ts#L112)

___

### createDrop

▸ **createDrop**(`«destructured»`): `Promise`<[`CreateOrAddReturn`](interfaces/CreateOrAddReturn.md)\>

Creates a new drop based on parameters passed in.

**`Example`**

Create a basic simple drop containing 10 keys each with 1 $NEAR. Each key is completely random:
```js
// Initialize the SDK for the given network and NEAR connection. No entropy passed in so any auto generated keys will
// be completely random unless otherwise overwritten.
await initKeypom({
	network: "testnet",
	funder: {
		accountId: "benji_demo.testnet",
		secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
	}
});

// Create a drop with 10 completely random keys. The return value `keys` contains information about the generated keys
const {keys} = await createDrop({
	numKeys: 10,
	depositPerUseNEAR: 1,
});

console.log('public keys: ', keys.publicKeys);
console.log('private keys: ', keys.secretKeys);
```

**`Example`**

Init funder with root entropy and generate deterministic keys for a drop. Compare with manually generated keys:
```js
// Initialize the SDK for the given network and NEAR connection. Root entropy is passed into the funder account so any generated keys
// Will be based off that entropy.
await initKeypom({
	network: "testnet",
	funder: {
		accountId: "benji_demo.testnet",
		secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1",
		rootEntropy: "my-global-secret-password"
	}
});

// Create a simple drop with 5 keys. Each key will be derived based on the rootEntropy of the funder, the drop ID, and key nonce.
const { keys: keysFromDrop, dropId } = await createDrop({
	numKeys: 5,
	depositPerUseNEAR: 1,
});

// Deterministically Generate the Private Keys:
const nonceDropIdMeta = Array.from({length: 5}, (_, i) => `${dropId}_${i}`);
const manualKeys = await generateKeys({
	numKeys: 5,
	rootEntropy: "my-global-secret-password",
	metaEntropy: nonceDropIdMeta
})

// Get the public and private keys from the keys generated by the drop
const {publicKeys, secretKeys} = keysFromDrop;
// Get the public and private keys from the keys that were manually generated
const {publicKeys: pubKeysGenerated, secretKeys: secretKeysGenerated} = manualKeys;
// These should match!
console.log('secretKeys: ', secretKeys)
console.log('secretKeysGenerated: ', secretKeysGenerated)

// These should match!
console.log('publicKeys: ', publicKeys)
console.log('pubKeysGenerated: ', pubKeysGenerated)
```

**`Example`**

Use manually generated keys to create a drop:
```js
// Initialize the SDK for the given network and NEAR connection. No entropy passed in so any auto generated keys will
// be completely random unless otherwise overwritten.
await initKeypom({
	network: "testnet",
	funder: {
		accountId: "benji_demo.testnet",
		secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
	}
});

// Generate 10 random keys
const {publicKeys} = await generateKeys({
	numKeys: 10
});

// Create a drop using the keys that were generated. Since keys are passed in, the return value won't contain information about the keys.
await createDrop({
	publicKeys,
	depositPerUseNEAR: 1,
});
```

**`Example`**

Create a simple drop with 1 key and 1 use per key. This 1 use-key should be password protected based on a base-password:
```js
// Initialize the SDK for the given network and NEAR connection
await initKeypom({
	network: "testnet",
	funder: {
		accountId: "benji_demo.testnet",
		secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
	}
});

const basePassword = "my-cool-password123";
// Create a simple drop with 1 $NEAR and pass in a base password to create a unique password for each use of each key
const {keys} = await createDrop({
	numKeys: 1,
	depositPerUseNEAR: 1,
	basePassword
});

// Create the password to pass into claim which is a hash of the basePassword, public key and whichever use we are on
let currentUse = 1;
let passwordForClaim = await hashPassword(basePassword + keys.publicKeys[0] + currentUse.toString());
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`CreateDropParams`](interfaces/CreateDropParams.md) |

#### Returns

`Promise`<[`CreateOrAddReturn`](interfaces/CreateOrAddReturn.md)\>

Object containing: the drop ID, the responses of the execution, as well as any auto generated keys (if any).

#### Defined in

[src/lib/drops.ts:161](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/drops.ts#L161)

___

### deleteDrops

▸ **deleteDrops**(`«destructured»`): `Promise`<(`void` \| `FinalExecutionOutcome`[])[][]\>

Delete a set of drops and optionally withdraw any remaining balance you have on the Keypom contract.

**`Example`**

Create 5 drops and delete each of them:
```js
// Initialize the SDK for the given network and NEAR connection
await initKeypom({
	network: "testnet",
	funder: {
		accountId: "benji_demo.testnet",
		secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
	}
});

// loop to create 5 simple drops each with 5 more keys than the next
for(var i = 0; i < 5; i++) {
	// create 10 keys with no entropy (all random)
	const {publicKeys} = await generateKeys({
		numKeys: 5 * (i+1) // First drop will have 5, then 10, then 15 etc..
	});

	// Create the simple 
	await createDrop({
		publicKeys,
		depositPerUseNEAR: 1,
	});
}

let drops = await getDrops({accountId: "benji_demo.testnet"});
console.log('drops: ', drops)

await deleteDrops({
	drops
})
	
	// Get the number of drops the account has after deletion (should be zero)
	const numDrops = await getDropSupply({
		accountId: "benjiman.testnet"
});
console.log('numDrops: ', numDrops)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`DeleteDropParams`](interfaces/DeleteDropParams.md) |

#### Returns

`Promise`<(`void` \| `FinalExecutionOutcome`[])[][]\>

#### Defined in

[src/lib/drops.ts:435](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/drops.ts#L435)

___

### deleteKeys

▸ **deleteKeys**(`«destructured»`): `Promise`<`any`\>

Delete a set of keys from a drop and optionally withdraw any remaining balance you have on the Keypom contract.

**`Example`**

Create a drop with 5 keys and delete the first one:
```js
// Initialize the SDK for the given network and NEAR connection
await initKeypom({
	network: "testnet",
	funder: {
		accountId: "benji_demo.testnet",
		secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
	}
});

// Create the simple drop with 5 random keys
const {keys, dropId} = await createDrop({
	numKeys: 5,
	depositPerUseNEAR: 1,
});

await deleteKeys({
	dropId,
	publicKeys: keys.publicKeys[0] // Can be wrapped in an array as well
})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`DeleteKeyParams`](interfaces/DeleteKeyParams.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/keys.ts:336](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/keys.ts#L336)

___

### estimateRequiredDeposit

▸ **estimateRequiredDeposit**(`«destructured»`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`EstimatorParams`](interfaces/EstimatorParams.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/lib/keypom-utils.ts:616](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/keypom-utils.ts#L616)

___

### execute

▸ **execute**(`args`): `Promise`<`void` \| (`void` \| `FinalExecutionOutcome`)[] \| `FinalExecutionOutcome`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `any` |

#### Returns

`Promise`<`void` \| (`void` \| `FinalExecutionOutcome`)[] \| `FinalExecutionOutcome`[]\>

#### Defined in

[src/lib/keypom.ts:76](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/keypom.ts#L76)

___

### formatNearAmount

▸ **formatNearAmount**(`balance`, `fracDigits?`): `string`

Convert account balance value from internal indivisible units to NEAR. 1 NEAR is defined by NEAR_NOMINATION.
Effectively this divides given amount by NEAR_NOMINATION.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `balance` | `string` | decimal string representing balance in smallest non-divisible NEAR units (as specified by NEAR_NOMINATION) |
| `fracDigits?` | `number` | number of fractional digits to preserve in formatted string. Balance is rounded to match given number of digits. |

#### Returns

`string`

Value in Ⓝ

#### Defined in

node_modules/near-api-js/lib/utils/format.d.ts:18

___

### ftTransferCall

▸ **ftTransferCall**(`«destructured»`): `Promise`<`Transaction` \| `Promise`<`void` \| `FinalExecutionOutcome`[]\>\>

For FT Drops, keys need to be registered before they can be used. This is done via the `ft_transfer_call` method on the FT contract.
This is a convenience method to make that process easier.

**`Example`**

Send FTs using the funder account (not passing in any accounts into the call):
```js
// Initialize the SDK on testnet
await initKeypom({
	network: "testnet",
	funder: {
		accountId: "benji_demo.testnet",
		secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
	}
});

await ftTransferCall({
    contractId: "ft.keypom.testnet",
    amount: "1",
    dropId: "1231231",
)};
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`FTTransferCallParams`](interfaces/FTTransferCallParams.md) |

#### Returns

`Promise`<`Transaction` \| `Promise`<`void` \| `FinalExecutionOutcome`[]\>\>

#### Defined in

[src/lib/keypom-utils.ts:317](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/keypom-utils.ts#L317)

___

### generateKeys

▸ **generateKeys**(`«destructured»`): `Promise`<[`GeneratedKeyPairs`](interfaces/GeneratedKeyPairs.md)\>

Generate ed25519 KeyPairs that can be used for Keypom linkdrops, or full access keys to claimed accounts. These keys can optionally be derived from some entropy such as a root password and metadata pertaining to each key (user provided password etc.). 
Entropy is useful for creating an onboarding experience where in order to recover a keypair, the client simply needs to provide the meta entropy (could be a user's password) and the secret root key like a UUID).

**`Example`**

Generating 10 unique random keypairs with no entropy:
```js
// Generate 10 keys with no entropy (all random)
let keys = await generateKeys({
    numKeys: 10,
})

let pubKey1 = keys.publicKeys[0];
let secretKey1 = keys.secretKeys[0];

console.log('1st Public Key: ', pubKey1);
console.log('1st Secret Key: ', secretKey1)
```

**`Example`**

Generating 1 keypair based on entropy:
```js
// Generate 1 key with the given entropy
let keys = await generateKeys({
    numKeys: 1,
    entropy: {
        rootKey: "my-global-password",
        meta: "user-password-123",
    } // In this case, since there is only 1 key, the entropy can be an array of size 1 as well.
})

let pubKey = keys.publicKeys[0];
let secretKey = keys.secretKeys[0];

console.log('Public Key: ', pubKey);
console.log('Secret Key: ', secretKey)
```

**`Example`**

Generating 2 keypairs each with their own entropy:
```js
// Generate 2 keys each with their own unique entropy
let keys = await generateKeys({
    numKeys: 2,
    entropy: [
        {
            rootKey: "my-global-password",
            meta: "first-password",
            nonce: 1
        },
        {
            rootKey: "my-global-password",
            meta: "second-password",
            nonce: 2
        }
    ]
})

console.log('Pub Keys ', keys.publicKeys);
console.log('Secret Keys ', keys.secretKeys);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`GenerateKeysParams`](interfaces/GenerateKeysParams.md) |

#### Returns

`Promise`<[`GeneratedKeyPairs`](interfaces/GeneratedKeyPairs.md)\>

- An object containing an array of KeyPairs, Public Keys and Secret Keys.

#### Defined in

[src/lib/keypom-utils.ts:138](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/keypom-utils.ts#L138)

___

### getContractSourceMetadata

▸ **getContractSourceMetadata**(): `Promise`<[`ContractSourceMetadata`](interfaces/ContractSourceMetadata.md)\>

Returns the source metadata for the Keypom contract that the SDK has been initialized on. This includes valuable information
such as which specific version the contract is on and link to exactly which GitHub commit is deployed.

**`Example`**

Query for the current Keypom contract's source metadata:
```js
// Initialize the SDK on testnet. No funder is passed in since we're only doing view calls.
await initKeypom({
network: "testnet",
});

// Query for the Keypom contract's source metadata
const metadata = await getContractSourceMetadata();

console.log('metadata: ', metadata)
```

#### Returns

`Promise`<[`ContractSourceMetadata`](interfaces/ContractSourceMetadata.md)\>

The contract's source metadata

#### Defined in

[src/lib/views.ts:604](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/views.ts#L604)

___

### getDropInformation

▸ **getDropInformation**(`«destructured»`): `Promise`<[`ProtocolReturnedDrop`](interfaces/ProtocolReturnedDrop.md)\>

Get information about a specific drop given its drop ID.

**`Example`**

Create a simple drop and retrieve information about it::
```js
// Initialize the SDK on testnet.
await initKeypom({
    network: "testnet",
    funder: {
        accountId: "benji_demo.testnet",
        secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
    }
});

// Create a drop with 1 key automatically created. That key will be completely random since there is no entropy.
const {dropId} = await createDrop({
    numKeys: 1,
    depositPerUseNEAR: 1
});

// Query for the drop information and also return the key information as well
const dropInfo = await getDropInformation({
    dropId,
    withKeys: true
})

console.log('dropInfo: ', dropInfo)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `dropId` | `string` |
| › `withKeys?` | `boolean` |

#### Returns

`Promise`<[`ProtocolReturnedDrop`](interfaces/ProtocolReturnedDrop.md)\>

Drop information which may or may not have a keys field of type `KeyInfo` depending on if withKeys is specified as true.

#### Defined in

[src/lib/views.ts:243](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/views.ts#L243)

___

### getDropSupplyForOwner

▸ **getDropSupplyForOwner**(`accountId`): `Promise`<`number`\>

Returns the total supply of active drops for a given account ID

**`Example`**

Create a drop and check how many the owner has:
```js
// Initialize the SDK on testnet.
await initKeypom({
    network: "testnet",
    funder: {
        accountId: "benji_demo.testnet",
        secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
    }
});

// Create a drop with no keys
await createDrop({
    depositPerUseNEAR: 1
});

// Query for the amount of drops owned by the account
const dropSupply = await getDropSupplyForOwner({
    accountId: "benji_demo.testnet"
})

console.log('dropSupply: ', dropSupply)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountId` | `Object` | The account that the drops belong to. |
| `accountId.accountId` | `string` | - |

#### Returns

`Promise`<`number`\>

Amount of drops

#### Defined in

[src/lib/views.ts:398](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/views.ts#L398)

___

### getDrops

▸ **getDrops**(`«destructured»`): `Promise`<[`ProtocolReturnedDrop`](interfaces/ProtocolReturnedDrop.md)[]\>

Paginate through drops owned by an account. If specified, information for the first 50 keys in each drop can be returned as well.

**`Example`**

Get drop information for the last 5 drops owned by a given account:
```js
// Initialize the SDK on testnet. No funder is passed in since we're only doing view calls.
await initKeypom({
	network: "testnet",
});

// Get the number of drops the account has.
const numDrops = await getDropSupply({
	accountId: "benjiman.testnet"
});

// Query for drop information for the last 5 drops and their respective keys
const dropsAndKeys = await getDrops({
	accountId: "benjiman.testnet",
	start: numDrops - 5,
	withKeys: true
})

console.log('dropsAndKeys: ', dropsAndKeys)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`GetDropParams`](interfaces/GetDropParams.md) |

#### Returns

`Promise`<[`ProtocolReturnedDrop`](interfaces/ProtocolReturnedDrop.md)[]\>

#### Defined in

[src/lib/views.ts:440](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/views.ts#L440)

___

### getEnv

▸ **getEnv**(): [`EnvVars`](interfaces/EnvVars.md)

#### Returns

[`EnvVars`](interfaces/EnvVars.md)

The environment variables used by the Keypom library.

#### Defined in

[src/lib/keypom.ts:68](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/keypom.ts#L68)

___

### getKeyBalance

▸ **getKeyBalance**(`publicKey`): `Promise`<`string`\>

Returns the balance associated with given key. This is used by the NEAR wallet to display the amount of the linkdrop

**`Example`**

Create a 1 $NEAR linkdrop and query for its balance:
```js
// Initialize the SDK on testnet.
await initKeypom({
    network: "testnet",
    funder: {
        accountId: "benji_demo.testnet",
        secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
    }
});

// Create a drop with 1 key automatically created. That key will be completely random since there is no entropy.
const {keys} = await createDrop({
    numKeys: 1,
    depositPerUseNEAR: 1
});

// Query for the amount of yoctoNEAR contained within the key
const keyBalance = await getKeyBalance({
    publicKey: keys.publicKeys[0]
})

console.log('keyBalance: ', keyBalance)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `Object` | The public key that contains a balance |
| `publicKey.publicKey` | `string` | - |

#### Returns

`Promise`<`string`\>

The amount of yoctoNEAR that is contained within the key

#### Defined in

[src/lib/views.ts:43](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/views.ts#L43)

___

### getKeyInformation

▸ **getKeyInformation**(`publicKey`): `Promise`<[`KeyInfo`](interfaces/KeyInfo.md)\>

Returns the KeyInfo corresponding to a specific public key

**`Example`**

Create a drop and query for the key information:
```js
// Initialize the SDK on testnet.
await initKeypom({
    network: "testnet",
    funder: {
        accountId: "benji_demo.testnet",
        secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
    }
});

// Create a drop with 1 key automatically created. That key will be completely random since there is no entropy.
const {keys} = await createDrop({
    numKeys: 1,
    depositPerUseNEAR: 1
});

// Query for the key information for the key that was created
const keyInfo = await getKeyInformation({
    publicKey: keys.publicKeys[0]
})

console.log('keyInfo: ', keyInfo)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `Object` | the public key to get information for. |
| `publicKey.publicKey` | `string` | - |

#### Returns

`Promise`<[`KeyInfo`](interfaces/KeyInfo.md)\>

Key information struct for that specific key.

#### Defined in

[src/lib/views.ts:153](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/views.ts#L153)

___

### getKeyInformationBatch

▸ **getKeyInformationBatch**(`publicKeys`): `Promise`<[`KeyInfo`](interfaces/KeyInfo.md)[]\>

Returns a vector of KeyInfo corresponding to a set of public keys passed in.

**`Example`**

Create a drop and query for the key information for all keys created:
```js
// Initialize the SDK on testnet.
await initKeypom({
    network: "testnet",
    funder: {
        accountId: "benji_demo.testnet",
        secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
    }
});

// Create a drop with 5 keys automatically created. That key will be completely random since there is no entropy.
const {keys} = await createDrop({
    numKeys: 5,
    depositPerUseNEAR: 1
});

// Query for the key information for the key that was created
const keyInfos = await getKeyInformationBatch({
    publicKeys: keys.publicKeys
})

console.log('keyInfos: ', keyInfos)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKeys` | `Object` | Array of public keys to get information about |
| `publicKeys.publicKeys` | `string`[] | - |

#### Returns

`Promise`<[`KeyInfo`](interfaces/KeyInfo.md)[]\>

Array of Key information structs for the keys passed in

#### Defined in

[src/lib/views.ts:197](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/views.ts#L197)

___

### getKeySupplyForDrop

▸ **getKeySupplyForDrop**(`dropId`): `Promise`<`number`\>

Returns the total supply of active keys for a given drop

**`Example`**

Create a drop with 5 keys and query for the key supply:
```js
// Initialize the SDK on testnet.
await initKeypom({
    network: "testnet",
    funder: {
        accountId: "benji_demo.testnet",
        secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
    }
});

// Create a drop with 5 keys automatically created. That key will be completely random since there is no entropy.
const {keys, dropId} = await createDrop({
    numKeys: 5,
    depositPerUseNEAR: 1
});

// Query for the key supply for the drop that was created
const keySupply = await getKeySupplyForDrop({
    dropId
})

console.log('keySupply: ', keySupply)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dropId` | `Object` | The drop ID for the specific drop that you want to get information about. |
| `dropId.dropId` | `string` | - |

#### Returns

`Promise`<`number`\>

Number of active keys

#### Defined in

[src/lib/views.ts:305](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/views.ts#L305)

___

### getKeyTotalSupply

▸ **getKeyTotalSupply**(): `Promise`<`number`\>

Query for the total supply of keys currently on the Keypom contract

**`Example`**

Query for the key supply on the `v1.keypom.testnet` contract:
```js
// Initialize the SDK on testnet. No funder is passed in since we're only doing view calls
await initKeypom({
    network: "testnet",
    keypomContractId: "v1.keypom.testnet"
});

// Query for the number of keys on the contract
const numKeys = await getKeyTotalSupply();

console.log('numKeys: ', numKeys)
```

#### Returns

`Promise`<`number`\>

The amount of keys.

#### Defined in

[src/lib/views.ts:74](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/views.ts#L74)

___

### getKeys

▸ **getKeys**(`«destructured»`): `Promise`<[`KeyInfo`](interfaces/KeyInfo.md)[]\>

Paginate through all active keys on the contract and return a vector of key info.

**`Example`**

Query for first 50 keys on the `v1.keypom.testnet` contract:
```js
// Initialize the SDK on testnet. No funder is passed in since we're only doing view calls
await initKeypom({
    network: "testnet",
    keypomContractId: "v1.keypom.testnet"
});

// Query for the first 50 keys on the contract
const keyInfo = await getKeys({
  start: 0,
  limit: 50
});

console.log('keyInfo: ', keyInfo)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `limit?` | `number` |
| › `start?` | `string` \| `number` |

#### Returns

`Promise`<[`KeyInfo`](interfaces/KeyInfo.md)[]\>

Vector of KeyInfo.

#### Defined in

[src/lib/views.ts:107](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/views.ts#L107)

___

### getKeysForDrop

▸ **getKeysForDrop**(`«destructured»`): `Promise`<[`KeyInfo`](interfaces/KeyInfo.md)[]\>

Paginate through all keys in a specific drop, returning an array of KeyInfo.

**`Example`**

Create a drop with 5 keys and return all the key info objects:
```js
// Initialize the SDK on testnet.
await initKeypom({
    network: "testnet",
    funder: {
        accountId: "benji_demo.testnet",
        secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
    }
});

// Create a drop with 5 keys automatically created. That key will be completely random since there is no entropy.
const {dropId} = await createDrop({
    numKeys: 5,
    depositPerUseNEAR: 1
});

// Query for the key supply for the drop that was created
const keyInfos = await getKeysForDrop({
    dropId
})

console.log('keyInfos: ', keyInfos)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `dropId` | `string` |
| › `limit?` | `number` |
| › `start?` | `string` \| `number` |

#### Returns

`Promise`<[`KeyInfo`](interfaces/KeyInfo.md)[]\>

Vector of KeyInfo objects returned from pagination

#### Defined in

[src/lib/views.ts:351](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/views.ts#L351)

___

### getNftSupplyForDrop

▸ **getNftSupplyForDrop**(`dropId`): `Promise`<`number`\>

Return the total supply of token IDs for a given NFT drop,

**`Example`**

Query for the supply of tokens on a specific drop:
```js
// Initialize the SDK on testnet. No funder is passed in since we're only doing view calls.
await initKeypom({
network: "testnet",
});

// Query for the amount of token IDs on the drop
const tokenSupply = await getNftSupplyForDrop({
  dropId: "1669840629120"
})

console.log('tokenSupply: ', tokenSupply)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dropId` | `Object` | The drop ID that the tokens belong to. |
| `dropId.dropId` | `string` | - |

#### Returns

`Promise`<`number`\>

The amount of token IDs on the drop

#### Defined in

[src/lib/views.ts:498](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/views.ts#L498)

___

### getNftTokenIDsForDrop

▸ **getNftTokenIDsForDrop**(`«destructured»`): `Promise`<`string`[]\>

Paginate through token IDs in an NFT drop to return a vector of token IDs.

**`Example`**

Query for a list of token IDs on a specific drop:
```js
// Initialize the SDK on testnet. No funder is passed in since we're only doing view calls.
await initKeypom({
network: "testnet",
});

// Query for a set of token IDs on the drop
const tokenList = await getNftTokenIDsForDrop({
  dropId: "1669840629120"
})

console.log('tokenList: ', tokenList)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `dropId` | `string` |
| › `limit?` | `number` |
| › `start?` | `string` \| `number` |

#### Returns

`Promise`<`string`[]\>

Vector of token IDs

#### Defined in

[src/lib/views.ts:534](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/views.ts#L534)

___

### getStorageBase

▸ **getStorageBase**(`«destructured»`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`CreateDropProtocolArgs`](interfaces/CreateDropProtocolArgs.md) |

#### Returns

``null`` \| `string`

#### Defined in

[src/lib/keypom-utils.ts:540](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/keypom-utils.ts#L540)

___

### getUserBalance

▸ **getUserBalance**(`accountId`): `Promise`<`string`\>

Query for a user's current balance on the Keypom contract

**`Example`**

Query for a user's current balance on the Keypom contract:
```js
// Initialize the SDK on testnet. No funder is passed in since we're only doing view calls.
await initKeypom({
network: "testnet",
});

// Query for the drop information for a specific drop
const dropInfo = await getDropInformation({
dropId: "1669840629120",
withKeys: true
})

console.log('dropInfo: ', dropInfo)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountId` | `Object` | The account ID of the user to retrieve the balance for. |
| `accountId.accountId` | `string` | - |

#### Returns

`Promise`<`string`\>

The user's current balance

#### Defined in

[src/lib/views.ts:573](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/views.ts#L573)

___

### hashPassword

▸ **hashPassword**(`str`, `fromHex?`): `Promise`<`string`\>

Generate a sha256 hash of a passed in string. If the string is hex encoded, set the fromHex flag to true.

**`Example`**

Generating the required password to pass into `claim` given a base password:
```js
	// Create the password to pass into claim which is a hash of the basePassword, public key and whichever use we are on
let currentUse = 1;
let passwordForClaim = await hashPassword(basePassword + publicKey + currentUse.toString());
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `str` | `string` | `undefined` | the string you wish to hash. By default, this should be utf8 encoded. If the string is hex encoded, set the fromHex flag to true. |
| `fromHex` | `boolean` | `false` | (OPTIONAL) - A flag that should be set if the string is hex encoded. Defaults to false. |

#### Returns

`Promise`<`string`\>

- The resulting hash

#### Defined in

[src/lib/keypom-utils.ts:64](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/keypom-utils.ts#L64)

___

### initKeypom

▸ **initKeypom**(`«destructured»`): `Promise`<``null``\>

Initializes the SDK to allow for interactions with the Keypom Protocol. By default, a new NEAR connection will be established but this can be overloaded by
passing in an existing connection object. In either case, if a funder is passed in, the credentials will be added to the keystore to sign transactions.

To update the funder account, refer to the `updateFunder` function. If you only wish to use view methods and not sign transactions, no funder account is needed.
If you wish to update the Keypom Contract ID being used, refer to the `updateKeypomContractId` function.

**`Example`**

Using a pre-created NEAR connection instance with an UnencryptedFileSystemKeyStore:
```js
const path = require("path");
const homedir = require("os").homedir();
const { KeyPair, keyStores, connect } = require("near-api-js");
const { initKeypom, getDrops } = require("keypom-js");

// Establish the network we wish to work on
const network = "testnet";
// Get the location where the credentials are stored for our KeyStore
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = (await path).join(homedir, CREDENTIALS_DIR);
(await path).join;
let keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

// Establish the configuration for the connection
let nearConfig = {
		networkId: network,
		keyStore,
		nodeUrl: `https://rpc.${network}.near.org`,
		walletUrl: `https://wallet.${network}.near.org`,
		helperUrl: `https://helper.${network}.near.org`,
		explorerUrl: `https://explorer.${network}.near.org`,
};
// Connect to the NEAR blockchain and get the connection instance
let near = await connect(nearConfig);

// Initialize the SDK for the given network and NEAR connection
await initKeypom({
		near,
		network
});

// Get the drops for the given owner
const dropsForOwner = await getDrops({accountId: "benjiman.testnet"});
```

**`Example`**

Creating an entirely new NEAR connection instance by using initKeypom and passing in a funder account:
```js
const { initKeypom, getDrops } = require("keypom-js");

// Initialize the SDK for the given network and NEAR connection
await initKeypom({
		network: "testnet",
		funder: {
			accountId: "benji_demo.testnet",
			secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
		}
});

// Get the drops for the given owner
const dropsForOwner = await getDrops({accountId: "benjiman.testnet"});
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`InitKeypomParams`](interfaces/InitKeypomParams.md) |

#### Returns

`Promise`<``null``\>

If a funder is passed in, its account object is returned. Otherwise, it null is returned.

#### Defined in

[src/lib/keypom.ts:158](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/keypom.ts#L158)

___

### nftTransferCall

▸ **nftTransferCall**(`«destructured»`): `Promise`<`Transaction`[] \| (`void` \| `FinalExecutionOutcome`[])[]\>

For NFT Drops, keys need to be registered before they can be used. This is done via the `nft_transfer_call` method on the NFT contract.
This is a convenience method to make that process easier.

**`Example`**

Send 3 NFTs using the funder account (not passing in any accounts into the call):
```js
// Initialize the SDK on testnet
await initKeypom({
	network: "testnet",
	funder: {
		accountId: "benji_demo.testnet",
		secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
	}
});

await nftTransferCall({
    contractId: "nft.keypom.testnet",
    tokenIds: ["1", "2", "3],
    dropId: "1231231",
)};
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`NFTTransferCallParams`](interfaces/NFTTransferCallParams.md) |

#### Returns

`Promise`<`Transaction`[] \| (`void` \| `FinalExecutionOutcome`[])[]\>

#### Defined in

[src/lib/keypom-utils.ts:392](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/keypom-utils.ts#L392)

___

### parseNearAmount

▸ **parseNearAmount**(`amt?`): `string` \| ``null``

Convert human readable NEAR amount to internal indivisible units.
Effectively this multiplies given amount by NEAR_NOMINATION.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amt?` | `string` | decimal string (potentially fractional) denominated in NEAR. |

#### Returns

`string` \| ``null``

The parsed yoctoⓃ amount or null if no amount was passed in

#### Defined in

node_modules/near-api-js/lib/utils/format.d.ts:26

___

### useKeypom

▸ **useKeypom**(): [`EnvVars`](interfaces/EnvVars.md)

#### Returns

[`EnvVars`](interfaces/EnvVars.md)

#### Defined in

[src/components/KeypomContext.tsx:40](https://github.com/keypom/keypom-js/blob/8c566df/src/components/KeypomContext.tsx#L40)

___

### withdrawBalance

▸ **withdrawBalance**(`«destructured»`): `Promise`<`any`\>

Withdraw all the $NEAR from your balance in the Keypom contract.

**`Example`**

Add 1 $NEAR to the account balance and then withdraw it
```js
// Initialize the SDK on testnet
await initKeypom({
	network: "testnet",
	funder: {
		accountId: "benji_demo.testnet",
		secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
	}
});

await addToBalance({
    amount: "1",
});

await withdrawBalance({});
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`WithdrawBalanceParams`](interfaces/WithdrawBalanceParams.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/balances.ts:96](https://github.com/keypom/keypom-js/blob/8c566df/src/lib/balances.ts#L96)
