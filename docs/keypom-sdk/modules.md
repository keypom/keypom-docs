---
id: "modules"
title: "keypom-js - v1.1.7-rc.1"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Interfaces

- [ContractSourceMetadata](interfaces/ContractSourceMetadata.md)
- [CreateDropProtocolArgs](interfaces/CreateDropProtocolArgs.md)
- [CreateOrAddReturn](interfaces/CreateOrAddReturn.md)
- [Drop](interfaces/Drop.md)
- [DropConfig](interfaces/DropConfig.md)
- [EnvVars](interfaces/EnvVars.md)
- [FCConfig](interfaces/FCConfig.md)
- [FCData](interfaces/FCData.md)
- [FTData](interfaces/FTData.md)
- [Funder](interfaces/Funder.md)
- [GeneratedKeyPairs](interfaces/GeneratedKeyPairs.md)
- [KeyInfo](interfaces/KeyInfo.md)
- [Method](interfaces/Method.md)
- [NFTData](interfaces/NFTData.md)
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

## Type Aliases

### AnyWallet

 **AnyWallet**: `BrowserWalletBehaviour` \| `Wallet` \| `Promise`<`Wallet`\>

#### Defined in

[src/lib/types/params.ts:9](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/types/params.ts#L9)

___

### NearKeyPair

 **NearKeyPair**: `KeyPair`

#### Defined in

[src/lib/types/general.ts:5](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/types/general.ts#L5)

## Variables

### nearAPI

 `Const` **nearAPI**: `__module` = `nearAPI`

#### Defined in

[src/lib/keypom-utils.ts:28](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/keypom-utils.ts#L28)

## Keypom SDK Environment

### KeypomContextProvider

**KeypomContextProvider**(`props`, `context?`): ``null`` \| `ReactElement`<`any`, `any`\>

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

### getEnv

**getEnv**(): [`EnvVars`](interfaces/EnvVars.md)

#### Returns

[`EnvVars`](interfaces/EnvVars.md)

The environment variables used by the Keypom library.

#### Defined in

[src/lib/keypom.ts:82](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/keypom.ts#L82)

___

### initKeypom

**initKeypom**(`«destructured»`): `Promise`<``null``\>

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `funder?` | [`Funder`](interfaces/Funder.md) | The account that will sign transactions to create drops and interact with the Keypom contract. This account will be added to the KeyStore if provided. * If rootEntropy is provided for the funder, all access keys will be derived deterministically based off this string. |
| › `keypomContractId?` | `string` | Instead of using the most up-to-date, default Keypom contract, you can specify a specific account ID to use. If an older version is specified, some features of the SDK might not be usable. |
| › `near?` | `Near` | The NEAR connection instance to use. If not passed in, it will create a new one. |
| › `network` | `string` | The network to connect to either `mainnet` or `testnet`. |

#### Returns

`Promise`<``null``\>

If a funder is passed in, its account object is returned. Otherwise, it null is returned.

#### Defined in

[src/lib/keypom.ts:168](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/keypom.ts#L168)

___

### updateFunder

**updateFunder**(`funder`): `Promise`<``null``\>

Once the SDK is initialized, this function allows the current funder account to be updated. Having a funder is only necessary if you wish to sign transactions on the Keypom Protocol.

**`Example`**

After initializing the SDK, the funder is updated.
```js
const path = require("path");
const homedir = require("os").homedir();
const { KeyPair, keyStores, connect } = require("near-api-js");
const { initKeypom, updateFunder, getDrops } = require("keypom-js");

	// Initialize the SDK for the given network and NEAR connection
	await initKeypom({
		network: "testnet",
	});

	// Update the current funder account
	await updateFunder({
		funder: {
			accountId: "benji_demo.testnet",
			secretKey: "ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1"
		}
	})

	// Get the drops for the given owner
	const dropsForOwner = await getDrops({accountId: "benjiman.testnet"});
	console.log('dropsForOwner: ', dropsForOwner)

	return;
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funder` | `Object` | The account that will sign transactions to create drops and interact with the Keypom contract. This account will be added to the KeyStore if provided. If rootEntropy is provided for the funder, all access keys will be derived deterministically based off this string. |
| `funder.funder` | [`Funder`](interfaces/Funder.md) | - |

#### Returns

`Promise`<``null``\>

The funder's account object is returned.

#### Defined in

[src/lib/keypom.ts:267](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/keypom.ts#L267)

___

### updateKeypomContractId

**updateKeypomContractId**(`keypomContractId`): `Promise`<``null``\>

This allows the desired Keypom contract ID to be set. By default, the most up-to-date Keypom contract for the given network is set during initKeypom.

**`Example`**

After initializing the SDK, the Keypom contract ID is updated.
```js
const path = require("path");
const homedir = require("os").homedir();
const { KeyPair, keyStores, connect } = require("near-api-js");
const { initKeypom, updateKeypomContractId, getDrops } = require("keypom-js");

	// Initialize the SDK for the given network and NEAR connection
	await initKeypom({
		network: "testnet",
	});

	// Update the current Keypom contract ID
	await updateKeypomContractId({
		keypomContractId: "v1.keypom.testnet"
	})

	//Get the drops for the given owner
	const dropsForOwner = await getDrops({accountId: "benjiman.testnet"});
	console.log('dropsForOwner: ', dropsForOwner)

	return;
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keypomContractId` | `Object` | The account ID that should be used for the Keypom contract. |
| `keypomContractId.keypomContractId` | `string` | - |

#### Returns

`Promise`<``null``\>

#### Defined in

[src/lib/keypom.ts:318](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/keypom.ts#L318)

___

### useKeypom

**useKeypom**(): [`EnvVars`](interfaces/EnvVars.md)

#### Returns

[`EnvVars`](interfaces/EnvVars.md)

#### Defined in

[src/components/KeypomContext.tsx:42](https://github.com/keypom/keypom-js/blob/6117f24/src/components/KeypomContext.tsx#L42)

## Creating, And Claiming Drops

### addKeys

**addKeys**(`«destructured»`): `Promise`<[`CreateOrAddReturn`](interfaces/CreateOrAddReturn.md)\>

Add keys that are manually generated and passed in, or automatically generated to an existing drop. If they're
automatically generated, they can be based off a set of entropy. For NFT and FT drops, assets can automatically be sent to Keypom to register keys as part of the payload.
The deposit is estimated based on parameters that are passed in and the transaction can be returned instead of signed and sent to the network. This can allow you to get the 
required deposit from the return value and use that to fund the account's Keypom balance to avoid multiple transactions being signed in the case of a drop with many keys.

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| › `basePassword?` | `string` | For doing password protected drops, this is the base password that will be used to generate all the passwords. It will be double hashed with the public keys. If specified, by default, all key uses will have their own unique password unless passwordProtectedUses is passed in. |
| › `drop?` | [`ProtocolReturnedDrop`](interfaces/ProtocolReturnedDrop.md) | If the drop information from getDropInformation is already known to the client, it can be passed in instead of the drop ID to reduce computation. |
| › `dropId?` | `string` | Specify the drop ID for which you want to add keys to. |
| › `nftTokenIds?` | `string`[] | If the drop type is an NFT drop, the token IDs can be passed in so that the tokens are automatically sent to the Keypom contract rather * than having to do two separate transactions. A maximum of 2 token IDs can be sent during the `addKeys` function. To send more token IDs in order to register key uses, use the `nftTransferCall` function. |
| › `numKeys` | `number` | Specify how many keys should be generated for the drop. If the funder has rootEntropy set OR rootEntropy is passed in, the keys will be * deterministically generated using the drop ID, key nonce, and entropy. Otherwise, each key will be generated randomly. |
| › `passwordProtectedUses?` | `number`[] | For doing password protected drops, specifies exactly which uses will be password protected. The uses are NOT zero indexed (i.e 1st use = 1). Each use will have a different, unique password generated via double hashing the base password + public key + key use. |
| › `publicKeys?` | `string`[] | Pass in a custom set of publicKeys to add to the drop. If this is not passed in, keys will be generated based on the numKeys parameter. |
| › `returnTransactions?` | `boolean` | If true, the transaction will be returned instead of being signed and sent. This is useful for getting the requiredDeposit from the return value without actually signing the transaction. |
| › `rootEntropy?` | `string` | Specify an entropy to use for generating keys (will overload the funder's rootEntropy if applicable). This parameter only matters if the publicKeys variable is not passed in. |
| › `useBalance?` | `boolean` | If the account has a balance within the Keypom contract, set this to true to avoid the need to attach a deposit. If the account doesn't have enough balance, an error will throw. |
| › `wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<[`CreateOrAddReturn`](interfaces/CreateOrAddReturn.md)\>

Object containing: the drop ID, the responses of the execution, as well as any auto generated keys (if any).

#### Defined in

[src/lib/keys.ts:139](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/keys.ts#L139)

___

### claim

**claim**(`«destructured»`): `Promise`<`any`\>

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `accountId?` | `string` | The account ID of an existing account that will be used to claim the drop. |
| › `newAccountId?` | `string` | If passed in, a new account ID will be created and the drop will be claimed to that account. This must be an account that does not exist yet. |
| › `newPublicKey?` | `string` | If creating a new account, a public key must be passed in to be used as the full access key for the newly created account. |
| › `password?` | `string` | If a password is required to use the key, it can be passed in |
| › `secretKey` | `string` | The private key associated with the Keypom link. This can either contain the `ed25519:` prefix or not. |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/claims.ts:108](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/claims.ts#L108)

___

### createDrop

**createDrop**(`«destructured»`): `Promise`<[`CreateOrAddReturn`](interfaces/CreateOrAddReturn.md)\>

Creates a new drop based on parameters passed in. This drop can have keys that are manually generated and passed in, or automatically generated. If they're
automatically generated, they can be based off a set of entropy. For NFT and FT drops, assets can automatically be sent to Keypom to register keys as part of the payload.
The deposit is estimated based on parameters that are passed in and the transaction can be returned instead of signed and sent to the network. This can allow you to get the 
required deposit from the return value and use that to fund the account's Keypom balance to avoid multiple transactions being signed in the case of a drop with many keys.

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| › `basePassword?` | `string` | For doing password protected drops, this is the base password that will be used to generate all the passwords. It will be double hashed with the public keys. If specified, by default, all key uses will have their own unique password unless passwordProtectedUses is passed in. |
| › `config?` | [`DropConfig`](interfaces/DropConfig.md) | Allows specific drop behaviors to be configured such as the number of uses each key / link will have. |
| › `depositPerUseNEAR?` | `Number` | How much $NEAR should be contained in each link. Unit in $NEAR (i.e `1` = 1 $NEAR) |
| › `depositPerUseYocto?` | `string` | How much $yoctoNEAR should be contained in each link. Unit in yoctoNEAR (1 yoctoNEAR = 1e-24 $NEAR) |
| › `dropId?` | `string` | Specify a custom drop ID rather than using the incrementing nonce on the contract. |
| › `fcData?` | [`FCData`](interfaces/FCData.md) | For creating a function call drop, this contains necessary configurable information about the drop. |
| › `ftData?` | [`FTData`](interfaces/FTData.md) | For creating a fungible token drop, this contains necessary configurable information about the drop. |
| › `metadata?` | `string` | String of metadata to attach to the drop. This can be whatever you would like and is optional. Often this is stringified JSON. |
| › `nftData?` | [`NFTData`](interfaces/NFTData.md) | For creating a non-fungible token drop, this contains necessary configurable information about the drop. |
| › `numKeys` | `number` | Specify how many keys should be generated for the drop. If the funder has rootEntropy set OR rootEntropy is passed in, the keys will be * deterministically generated using the drop ID, key nonce, and entropy. Otherwise, each key will be generated randomly. |
| › `passwordProtectedUses?` | `number`[] | For doing password protected drops, specifies exactly which uses will be password protected. The uses are NOT zero indexed (i.e 1st use = 1). Each use will have a different, unique password generated via double hashing the base password + public key + key use. |
| › `publicKeys?` | `string`[] | Pass in a custom set of publicKeys to add to the drop. If this is not passed in, keys will be generated based on the numKeys parameter. |
| › `returnTransactions?` | `boolean` | If true, the transaction will be returned instead of being signed and sent. This is useful for getting the requiredDeposit from the return value without actually signing the transaction. |
| › `rootEntropy?` | `string` | Specify an entropy to use for generating keys (will overload the funder's rootEntropy if applicable). This parameter only matters if the publicKeys variable is not passed in. |
| › `simpleData?` | [`SimpleData`](interfaces/SimpleData.md) | For creating a simple drop, this contains necessary configurable information about the drop. |
| › `successUrl?` | `string` | When signing with a wallet, a success URl can be included that the user will be redirected to once the transaction has been successfully signed. |
| › `useBalance?` | `boolean` | If the account has a balance within the Keypom contract, set this to true to avoid the need to attach a deposit. If the account doesn't have enough balance, an error will throw. |
| › `wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<[`CreateOrAddReturn`](interfaces/CreateOrAddReturn.md)\>

Object containing: the drop ID, the responses of the execution, as well as any auto generated keys (if any).

#### Defined in

[src/lib/drops.ts:154](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/drops.ts#L154)

## User Balance Functions

### addToBalance

**addToBalance**(`«destructured»`): `Promise`<`any`\>

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `absoluteAmount?` | `string` | Amount of tokens to add but considering the decimal amount (non human-readable). **`Example`** ```ts Transferring one $NEAR should be passed in as "1000000000000000000000000" and NOT "1" ``` |
| › `account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| › `amount?` | `string` | Human readable format for the amount of tokens to add. **`Example`** ```ts Example: transferring one $NEAR should be passed in as "1" and NOT "1000000000000000000000000" ``` |
| › `wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/balances.ts:32](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/balances.ts#L32)

___

### withdrawBalance

**withdrawBalance**(`«destructured»`): `Promise`<`any`\>

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| › `wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/balances.ts:109](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/balances.ts#L109)

## Deleting State

### deleteDrops

**deleteDrops**(`«destructured»`): `Promise`<(`void` \| `FinalExecutionOutcome`[])[][]\>

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| › `dropIds?` | `string`[] | Specify a set of drop IDs to delete. |
| › `drops?` | [`ProtocolReturnedDrop`](interfaces/ProtocolReturnedDrop.md)[] | If the set of drop information for the drops you want to delete (from `getDropInformation` or `getDrops`) is already known to the client, it can be passed in instead of the drop IDs to reduce computation. |
| › `wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |
| › `withdrawBalance?` | `boolean` | Whether or not to withdraw any remaining balance on the Keypom contract. |

#### Returns

`Promise`<(`void` \| `FinalExecutionOutcome`[])[][]\>

#### Defined in

[src/lib/drops.ts:466](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/drops.ts#L466)

___

### deleteKeys

**deleteKeys**(`«destructured»`): `Promise`<`any`\>

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| › `dropId` | `string` | Which drop ID do the keys belong to? |
| › `publicKeys` | `string` \| `string`[] | Specify a set of public keys to delete. If deleting a single publicKey, the string can be passed in without wrapping it in an array. |
| › `wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |
| › `withdrawBalance?` | `boolean` | Whether or not to withdraw any remaining balance on the Keypom contract. |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/keys.ts:357](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/keys.ts#L357)

## Utility

### estimateRequiredDeposit

**estimateRequiredDeposit**(`«destructured»`): `Promise`<`string`\>

Initiate the connection to the NEAR blockchain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `attachedGas` | `number` | How much Gas will be attached to each key's use. |
| › `depositPerUse` | `string` | How much yoctoNEAR each key will transfer upon use. |
| › `fcData?` | [`FCData`](interfaces/FCData.md) | The FC data for the drop that is being created. |
| › `ftData?` | [`FTData`](interfaces/FTData.md) | The FT data for the drop that is being created. |
| › `keyStorage?` | ``null`` \| `string` | How much storage an individual key uses. |
| › `near` | `Near` | The NEAR connection instance used to interact with the chain. This can either the connection that the SDK uses from `getEnv` or a separate connection. |
| › `numKeys` | `number` | How many keys are being added to the drop. |
| › `storage?` | ``null`` \| `string` | The estimated storage costs (can be retrieved through `getStorageBase`). |
| › `usesPerKey` | `number` | How many uses each key has. |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/lib/keypom-utils.ts:668](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/keypom-utils.ts#L668)

___

### execute

**execute**(`args`): `Promise`<`void` \| (`void` \| `FinalExecutionOutcome`)[] \| `FinalExecutionOutcome`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `any` |

#### Returns

`Promise`<`void` \| (`void` \| `FinalExecutionOutcome`)[] \| `FinalExecutionOutcome`[]\>

#### Defined in

[src/lib/keypom.ts:91](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/keypom.ts#L91)

___

### formatNearAmount

**formatNearAmount**(`balance`, `fracDigits?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `balance` | `string` |
| `fracDigits?` | `number` |

#### Returns

`string`

#### Defined in

node_modules/near-api-js/lib/utils/format.d.ts:18

___

### generateKeys

**generateKeys**(`«destructured»`): `Promise`<[`GeneratedKeyPairs`](interfaces/GeneratedKeyPairs.md)\>

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `metaEntropy?` | `string` \| `string`[] | An array of entropies to use in conjunction with a base rootEntropy to deterministically generate the private keys. For single key generation, you can either pass in a string array with a single element, or simply pass in the string itself directly (not within an array). |
| › `numKeys` | `number` | The number of keys to generate. |
| › `rootEntropy?` | `string` | A root string that will be used as a baseline for all keys in conjunction with different metaEntropies (if provided) to deterministically generate a keypair. If not provided, the keypair will be completely random. |

#### Returns

`Promise`<[`GeneratedKeyPairs`](interfaces/GeneratedKeyPairs.md)\>

- An object containing an array of KeyPairs, Public Keys and Secret Keys.

#### Defined in

[src/lib/keypom-utils.ts:144](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/keypom-utils.ts#L144)

___

### getStorageBase

**getStorageBase**(`«destructured»`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`CreateDropProtocolArgs`](interfaces/CreateDropProtocolArgs.md) |

#### Returns

``null`` \| `string`

#### Defined in

[src/lib/keypom-utils.ts:592](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/keypom-utils.ts#L592)

___

### hashPassword

**hashPassword**(`str`, `fromHex?`): `Promise`<`string`\>

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

[src/lib/keypom-utils.ts:69](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/keypom-utils.ts#L69)

___

### parseNearAmount

**parseNearAmount**(`amt?`): `string` \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `amt?` | `string` |

#### Returns

`string` \| ``null``

#### Defined in

node_modules/near-api-js/lib/utils/format.d.ts:26

## Registering Key Uses

### ftTransferCall

**ftTransferCall**(`«destructured»`): `Promise`<`Transaction` \| `Promise`<`void` \| `FinalExecutionOutcome`[]\>\>

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `absoluteAmount?` | `string` | Amount of tokens to transfer but considering the decimal amount (non human-readable). Example: transferring one wNEAR should be passed in as "1000000000000000000000000" and NOT "1" |
| › `account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| › `amount?` | `string` | Human readable format for the amount of tokens to transfer. * Example: transferring one wNEAR should be passed in as "1" and NOT "1000000000000000000000000" |
| › `contractId` | `string` | The fungible token contract ID. |
| › `dropId` | `string` | The drop ID to register the keys for. |
| › `returnTransaction?` | `boolean` | If true, the transaction will be returned instead of being signed and sent. |
| › `wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<`Transaction` \| `Promise`<`void` \| `FinalExecutionOutcome`[]\>\>

#### Defined in

[src/lib/keypom-utils.ts:334](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/keypom-utils.ts#L334)

___

### nftTransferCall

**nftTransferCall**(`«destructured»`): `Promise`<`Transaction`[] \| (`void` \| `FinalExecutionOutcome`[])[]\>

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| › `contractId` | `string` | The non-fungible token contract ID. |
| › `dropId` | `string` | The drop ID to register the keys for. |
| › `returnTransactions?` | `boolean` | If true, the transaction will be returned instead of being signed and sent. |
| › `tokenIds` | `string`[] | A set of token IDs that should be sent to the Keypom contract in order to register keys. |
| › `wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<`Transaction`[] \| (`void` \| `FinalExecutionOutcome`[])[]\>

#### Defined in

[src/lib/keypom-utils.ts:430](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/keypom-utils.ts#L430)

## View Functions

### getContractSourceMetadata

**getContractSourceMetadata**(): `Promise`<[`ContractSourceMetadata`](interfaces/ContractSourceMetadata.md)\>

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

[src/lib/views.ts:629](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/views.ts#L629)

___

### getDropInformation

**getDropInformation**(`«destructured»`): `Promise`<[`ProtocolReturnedDrop`](interfaces/ProtocolReturnedDrop.md)\>

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

[src/lib/views.ts:251](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/views.ts#L251)

___

### getDropSupplyForOwner

**getDropSupplyForOwner**(`accountId`): `Promise`<`number`\>

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

[src/lib/views.ts:409](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/views.ts#L409)

___

### getDrops

**getDrops**(`«destructured»`): `Promise`<[`ProtocolReturnedDrop`](interfaces/ProtocolReturnedDrop.md)[]\>

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `accountId` | `string` | The funding account that the drops belong to. |
| › `limit` | `number` | How many drops to paginate through. |
| › `start` | `string` \| `number` | Where to start paginating through drops. |
| › `withKeys` | `boolean` | Whether or not to include key information for the first 50 keys in each drop. |

#### Returns

`Promise`<[`ProtocolReturnedDrop`](interfaces/ProtocolReturnedDrop.md)[]\>

#### Defined in

[src/lib/views.ts:452](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/views.ts#L452)

___

### getKeyBalance

**getKeyBalance**(`publicKey`): `Promise`<`string`\>

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

[src/lib/views.ts:46](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/views.ts#L46)

___

### getKeyInformation

**getKeyInformation**(`publicKey`): `Promise`<[`KeyInfo`](interfaces/KeyInfo.md)\>

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

[src/lib/views.ts:159](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/views.ts#L159)

___

### getKeyInformationBatch

**getKeyInformationBatch**(`publicKeys`): `Promise`<[`KeyInfo`](interfaces/KeyInfo.md)[]\>

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

[src/lib/views.ts:204](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/views.ts#L204)

___

### getKeySupplyForDrop

**getKeySupplyForDrop**(`dropId`): `Promise`<`number`\>

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

[src/lib/views.ts:314](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/views.ts#L314)

___

### getKeyTotalSupply

**getKeyTotalSupply**(): `Promise`<`number`\>

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

[src/lib/views.ts:78](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/views.ts#L78)

___

### getKeys

**getKeys**(`«destructured»`): `Promise`<[`KeyInfo`](interfaces/KeyInfo.md)[]\>

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `limit?` | `number` | (OPTIONAL) How many keys to paginate through. |
| › `start?` | `string` \| `number` | (OPTIONAL) Where to start paginating through keys. |

#### Returns

`Promise`<[`KeyInfo`](interfaces/KeyInfo.md)[]\>

Vector of KeyInfo.

#### Defined in

[src/lib/views.ts:112](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/views.ts#L112)

___

### getKeysForDrop

**getKeysForDrop**(`«destructured»`): `Promise`<[`KeyInfo`](interfaces/KeyInfo.md)[]\>

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

[src/lib/views.ts:361](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/views.ts#L361)

___

### getNftSupplyForDrop

**getNftSupplyForDrop**(`dropId`): `Promise`<`number`\>

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

[src/lib/views.ts:520](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/views.ts#L520)

___

### getNftTokenIDsForDrop

**getNftTokenIDsForDrop**(`«destructured»`): `Promise`<`string`[]\>

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

[src/lib/views.ts:557](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/views.ts#L557)

___

### getUserBalance

**getUserBalance**(`accountId`): `Promise`<`string`\>

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

[src/lib/views.ts:597](https://github.com/keypom/keypom-js/blob/6117f24/src/lib/views.ts#L597)
