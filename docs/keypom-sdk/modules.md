---
id: "modules"
title: "keypom-js - v1.3.6-rc.1"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [KeypomWallet](classes/KeypomWallet.md)

## Interfaces

- [ContractSourceMetadata](interfaces/ContractSourceMetadata.md)
- [CreateDropProtocolArgs](interfaces/CreateDropProtocolArgs.md)
- [CreateOrAddReturn](interfaces/CreateOrAddReturn.md)
- [Drop](interfaces/Drop.md)
- [DropConfig](interfaces/DropConfig.md)
- [EnvVars](interfaces/EnvVars.md)
- [FCData](interfaces/FCData.md)
- [FTData](interfaces/FTData.md)
- [Funder](interfaces/Funder.md)
- [FungibleTokenMetadata](interfaces/FungibleTokenMetadata.md)
- [GeneratedKeyPairs](interfaces/GeneratedKeyPairs.md)
- [KeyInfo](interfaces/KeyInfo.md)
- [Method](interfaces/Method.md)
- [NFTData](interfaces/NFTData.md)
- [NonFungibleTokenMetadata](interfaces/NonFungibleTokenMetadata.md)
- [PasswordPerUse](interfaces/PasswordPerUse.md)
- [ProtocolReturnedDrop](interfaces/ProtocolReturnedDrop.md)
- [ProtocolReturnedDropConfig](interfaces/ProtocolReturnedDropConfig.md)
- [ProtocolReturnedFCData](interfaces/ProtocolReturnedFCData.md)
- [ProtocolReturnedFTData](interfaces/ProtocolReturnedFTData.md)
- [ProtocolReturnedKeyInfo](interfaces/ProtocolReturnedKeyInfo.md)
- [ProtocolReturnedMethod](interfaces/ProtocolReturnedMethod.md)
- [ProtocolReturnedNFTData](interfaces/ProtocolReturnedNFTData.md)
- [ProtocolReturnedNonFungibleTokenMetadata](interfaces/ProtocolReturnedNonFungibleTokenMetadata.md)
- [ProtocolReturnedNonFungibleTokenObject](interfaces/ProtocolReturnedNonFungibleTokenObject.md)
- [ProtocolReturnedPublicSaleConfig](interfaces/ProtocolReturnedPublicSaleConfig.md)
- [ProtocolReturnedSimpleData](interfaces/ProtocolReturnedSimpleData.md)
- [ProtocolReturnedTimeConfig](interfaces/ProtocolReturnedTimeConfig.md)
- [ProtocolReturnedUsageConfig](interfaces/ProtocolReturnedUsageConfig.md)
- [PublicSaleConfig](interfaces/PublicSaleConfig.md)
- [SimpleData](interfaces/SimpleData.md)
- [TimeConfig](interfaces/TimeConfig.md)
- [UsageConfig](interfaces/UsageConfig.md)

## Type Aliases

### AnyWallet

 **AnyWallet**: `BrowserWalletBehaviour` \| `Wallet` \| `Promise`<`Wallet`\>

#### Defined in

[src/lib/types/params.ts:9](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/types/params.ts#L9)

___

### NearKeyPair

 **NearKeyPair**: `KeyPair`

#### Defined in

[src/lib/types/general.ts:5](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/types/general.ts#L5)

## Variables

### nearAPI

 `Const` **nearAPI**: `__module` = `nearAPI`

#### Defined in

[src/lib/keypom-utils.ts:29](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom-utils.ts#L29)

___

### supportedLinkdropClaimPages

 `Const` **supportedLinkdropClaimPages**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `mainnet` | { `keypom`: `string` = "https://keypom.xyz/claim/CONTRACT\_ID#SECRET\_KEY"; `mynearwallet`: `string`  } |
| `mainnet.keypom` | `string` |
| `mainnet.mynearwallet` | `string` |
| `testnet` | { `keypom`: `string` = "https://testnet.keypom.xyz/claim/CONTRACT\_ID#SECRET\_KEY"; `mynearwallet`: `string` = "https://testnet.mynearwallet.com/linkdrop/CONTRACT\_ID/SECRET\_KEY" } |
| `testnet.keypom` | `string` |
| `testnet.mynearwallet` | `string` |

#### Defined in

[src/lib/keypom.ts:71](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom.ts#L71)

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

[src/lib/keypom.ts:104](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom.ts#L104)

___

### initKeypom

**initKeypom**(`??destructured??`): `Promise`<``null``\>

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
| `??destructured??` | `Object` | - |
| ?????`funder?` | [`Funder`](interfaces/Funder.md) | The account that will sign transactions to create drops and interact with the Keypom contract. This account will be added to the KeyStore if provided. * If rootEntropy is provided for the funder, all access keys will be derived deterministically based off this string. |
| ?????`keypomContractId?` | `string` | Instead of using the most up-to-date, default Keypom contract, you can specify a specific account ID to use. If an older version is specified, some features of the SDK might not be usable. |
| ?????`near?` | `Near` | The NEAR connection instance to use. If not passed in, it will create a new one. |
| ?????`network` | `string` | The network to connect to either `mainnet` or `testnet`. |

#### Returns

`Promise`<``null``\>

If a funder is passed in, its account object is returned. Otherwise, it null is returned.

#### Defined in

[src/lib/keypom.ts:198](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom.ts#L198)

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

[src/lib/keypom.ts:297](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom.ts#L297)

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

[src/lib/keypom.ts:348](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom.ts#L348)

___

### useKeypom

**useKeypom**(): [`EnvVars`](interfaces/EnvVars.md)

#### Returns

[`EnvVars`](interfaces/EnvVars.md)

#### Defined in

[src/components/KeypomContext.tsx:42](https://github.com/keypom/keypom-js/blob/9d8244ce/src/components/KeypomContext.tsx#L42)

## Utility

### accountExists

**accountExists**(`accountId`): `Promise`<`boolean`\>

Check whether or not a given account ID exists on the network.

**`Example`**

```js
const accountExists = await accountExists("benji.near");
console.log(accountExists); // true
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountId` | `any` | The account ID you wish to check |

#### Returns

`Promise`<`boolean`\>

- A boolean indicating whether or not the account exists

#### Defined in

[src/lib/keypom-utils.ts:85](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom-utils.ts#L85)

___

### createNFTSeries

**createNFTSeries**(`??destructured??`): `Promise`<`void` \| `FinalExecutionOutcome`[]\>

Creates a new NFT series on the official Keypom Series contracts. This is for lazy minting NFTs as part of an FC drop.

**`Example`**

Send 3 NFTs using the funder account (not passing in any accounts into the call):
```js
	await initKeypom({
		// near,
		network: 'testnet',
		funder: {
			accountId,
			secretKey,
		}
	})

	const {keys, dropId} = await createDrop({
		numKeys: 1,
		config: {
			usesPerKey: 100
		},
		metadata: "My Cool Drop Title!",
		depositPerUseNEAR: 0.5,
		fcData: {
			methods: [[
				{
					receiverId: `nft-v2.keypom.testnet`,
					methodName: "nft_mint",
					args: "",
					dropIdField: "mint_id",
					accountIdField: "receiver_id",
					attachedDeposit: parseNearAmount("0.1")
				}
			]]
		}
	})

	const res = await createNFTSeries({
		dropId,
		metadata: {
			title: "Moon NFT!",
			description: "A cool NFT for the best dog in the world.",
			media: "bafybeibwhlfvlytmttpcofahkukuzh24ckcamklia3vimzd4vkgnydy7nq",
			copies: 500
		}
	});
	console.log('res: ', res)

	const URLs = formatLinkdropUrl({
		baseUrl: "localhost:3000/claim",
		secretKeys: keys.secretKeys
	})
	console.log('URLs: ', URLs)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `??destructured??` | `Object` | - |
| ?????`account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| ?????`dropId` | `string` | The drop ID for the drop that should have a series associated with it. |
| ?????`metadata` | [`NonFungibleTokenMetadata`](interfaces/NonFungibleTokenMetadata.md) | The metadata that all minted NFTs will have. |
| ?????`royalty?` | `Map`<`string`, `number`\> | Any royalties associated with the series (as per official NEP-199 standard: https://github.com/near/NEPs/blob/master/neps/nep-0199.md) |
| ?????`wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<`void` \| `FinalExecutionOutcome`[]\>

#### Defined in

[src/lib/keypom-utils.ts:215](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom-utils.ts#L215)

___

### estimateRequiredDeposit

**estimateRequiredDeposit**(`??destructured??`): `Promise`<`string`\>

Initiate the connection to the NEAR blockchain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `??destructured??` | `Object` | - |
| ?????`attachedGas` | `number` | How much Gas will be attached to each key's use. |
| ?????`depositPerUse` | `string` | How much yoctoNEAR each key will transfer upon use. |
| ?????`fcData?` | [`FCData`](interfaces/FCData.md) | The FC data for the drop that is being created. |
| ?????`ftData?` | [`FTData`](interfaces/FTData.md) | The FT data for the drop that is being created. |
| ?????`keyStorage?` | ``null`` \| `string` | How much storage an individual key uses. |
| ?????`near` | `Near` | The NEAR connection instance used to interact with the chain. This can either the connection that the SDK uses from `getEnv` or a separate connection. |
| ?????`numKeys` | `number` | How many keys are being added to the drop. |
| ?????`storage?` | ``null`` \| `string` | The estimated storage costs (can be retrieved through `getStorageBase`). |
| ?????`usesPerKey` | `number` | How many uses each key has. |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/lib/keypom-utils.ts:992](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom-utils.ts#L992)

___

### execute

**execute**(`args`): `Promise`<`void` \| `FinalExecutionOutcome`[] \| (`void` \| `FinalExecutionOutcome`)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `any` |

#### Returns

`Promise`<`void` \| `FinalExecutionOutcome`[] \| (`void` \| `FinalExecutionOutcome`)[]\>

#### Defined in

[src/lib/keypom.ts:114](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom.ts#L114)

___

### formatLinkdropUrl

**formatLinkdropUrl**(`??destructured??`): `string`[]

Constructs a valid linkdrop URL for a given claim page or custom URL. To view the list of supported claim pages, see the exported `supportedLinkdropClaimPages` variable.

**`Example`**

Use the keypom claim page:
```js
await initKeypom({
    network: 'testnet',
    funder: {
        accountId,
        secretKey,
    }
})

const {keys} = await createDrop({
    numKeys: 1,
    depositPerUseNEAR: 1
});

const linkdropUrl = formatLinkdropUrl({
    claimPage: "keypom", 
    contractId: "v2.keypom.testnet",
    secretKeys: keys.secretKeys[0] // Can be either the array or individual secret key string
})

console.log('linkdropUrl: ', linkdropUrl)
```

**`Example`**

Use a custom claim page with ONLY the secret key
```js
await initKeypom({
    network: 'testnet',
    funder: {
        accountId,
        secretKey,
    }
})

const {keys} = await createDrop({
    numKeys: 1,
    depositPerUseNEAR: 1
});

const linkdropUrl = formatLinkdropUrl({
    customURL: "foobar/SECRET_KEY/barfoo", 
    contractId: "v2.keypom.testnet",
    secretKeys: keys.secretKeys[0] // Can be either the array or individual secret key string
})

console.log('linkdropUrl: ', linkdropUrl)
```

**`Example`**

Use a custom claim page with both the secret key and contract ID
```js
await initKeypom({
    network: 'testnet',
    funder: {
        accountId,
        secretKey,
    }
})

const {keys} = await createDrop({
    numKeys: 1,
    depositPerUseNEAR: 1
});

const linkdropUrl = formatLinkdropUrl({
    customURL: "foobar/SECRET_KEY/barfoo/CONTRACT_ID", 
    contractId: "v2.keypom.testnet",
    secretKeys: keys.secretKeys[0] // Can be either the array or individual secret key string
})

console.log('linkdropUrl: ', linkdropUrl)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `??destructured??` | `Object` |
| ?????`claimPage?` | `string` |
| ?????`contractId?` | `string` |
| ?????`customURL?` | `string` |
| ?????`networkId?` | `string` |
| ?????`secretKeys` | `string` \| `string`[] |

#### Returns

`string`[]

- An array of the linkdrop URLs

#### Defined in

[src/lib/keypom-utils.ts:360](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom-utils.ts#L360)

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

**generateKeys**(`??destructured??`): `Promise`<[`GeneratedKeyPairs`](interfaces/GeneratedKeyPairs.md)\>

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
let {publicKeys, secretKeys} = await generateKeys({
    numKeys: 1,
    rootEntropy: "my-global-password",
    metaEntropy: "user-password-123" // In this case, since there is only 1 key, the entropy can be an array of size 1 as well.
})

let pubKey = publicKeys[0];
let secretKey = secretKeys[0];

console.log('Public Key: ', pubKey);
console.log('Secret Key: ', secretKey)
```

**`Example`**

Generating 2 keypairs each with their own entropy:
```js
// Generate 2 keys each with their own unique entropy
let keys = await generateKeys({
    numKeys: 2,
    rootEntropy: "my-global-password",
    metaEntropy: [
       `first-password:0`,
       `second-password:1`
   ]
})

console.log('Pub Keys ', keys.publicKeys);
console.log('Secret Keys ', keys.secretKeys);
```
 *

**`Example`**

Generate 50 keys exactly how the auto key generation would in createDrop and addKeys:
```js
const dropId = '1676913490360';
const basePassword = "my-password";
// Generate 50 keys each with their own unique entropy
let keys = await generateKeys({
    numKeys: 50,
    rootEntropy: `${basePassword}-${dropId}`,
    autoMetaNonceStart: 0
})

console.log('Pub Keys ', keys.publicKeys);
console.log('Secret Keys ', keys.secretKeys);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `??destructured??` | `Object` | - |
| ?????`autoMetaNonceStart?` | `number` | - |
| ?????`metaEntropy?` | `string` \| `string`[] | An array of entropies to use in conjunction with a base rootEntropy to deterministically generate the private keys. For single key generation, you can either pass in a string array with a single element, or simply pass in the string itself directly (not within an array). |
| ?????`numKeys` | `number` | The number of keys to generate. |
| ?????`rootEntropy?` | `string` | A root string that will be used as a baseline for all keys in conjunction with different metaEntropies (if provided) to deterministically generate a keypair. If not provided, the keypair will be completely random. |

#### Returns

`Promise`<[`GeneratedKeyPairs`](interfaces/GeneratedKeyPairs.md)\>

- An object containing an array of KeyPairs, Public Keys and Secret Keys.

#### Defined in

[src/lib/keypom-utils.ts:500](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom-utils.ts#L500)

___

### getFTMetadata

**getFTMetadata**(`contractId`): `Promise`<[`FungibleTokenMetadata`](interfaces/FungibleTokenMetadata.md)\>

Get the FT Metadata for a given fungible token contract. This is used to display important information such as the icon for the token, decimal format etc.

**`Example`**

```js
const ft = await getFTMetadata({
   contractId: "ft.keypom.testnet"
});
console.log(ft);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `Object` | The contract ID of the FT contract |
| `contractId.contractId` | `string` | - |

#### Returns

`Promise`<[`FungibleTokenMetadata`](interfaces/FungibleTokenMetadata.md)\>

- The FT Metadata

#### Defined in

[src/lib/keypom-utils.ts:148](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom-utils.ts#L148)

___

### getNFTMetadata

**getNFTMetadata**(`??destructured??`): `Promise`<[`ProtocolReturnedNonFungibleTokenObject`](interfaces/ProtocolReturnedNonFungibleTokenObject.md)\>

Get the NFT Object (metadata, owner, approval IDs etc.) for a given token ID on a given contract.

**`Example`**

```js
const nft = await getNFTMetadata({
    contractId: "nft.keypom.testnet",
    tokenId: "1"
});
console.log(nft);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `??destructured??` | `Object` |
| ?????`contractId` | `string` |
| ?????`tokenId` | `string` |

#### Returns

`Promise`<[`ProtocolReturnedNonFungibleTokenObject`](interfaces/ProtocolReturnedNonFungibleTokenObject.md)\>

- The NFT Object

#### Defined in

[src/lib/keypom-utils.ts:118](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom-utils.ts#L118)

___

### getPubFromSecret

**getPubFromSecret**(`secretKey`): `Promise`<`string`\>

Get the public key from a given secret key.

**`Example`**

```js
const pubKey = await getPubFromSecret("ed25519:5yARProkcALbxaSQ66aYZMSBPWL9uPBmkoQGjV3oi2ddQDMh1teMAbz7jqNV9oVyMy7kZNREjYvWPqjcA6LW9Jb1");
console.log(pubKey);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretKey` | `string` | The secret key you wish to get the public key from |

#### Returns

`Promise`<`string`\>

- The public key

#### Defined in

[src/lib/keypom-utils.ts:66](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom-utils.ts#L66)

___

### getStorageBase

**getStorageBase**(`??destructured??`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `??destructured??` | [`CreateDropProtocolArgs`](interfaces/CreateDropProtocolArgs.md) |

#### Returns

``null`` \| `string`

#### Defined in

[src/lib/keypom-utils.ts:916](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom-utils.ts#L916)

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

[src/lib/keypom-utils.ts:418](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom-utils.ts#L418)

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

## Creating, And Claiming Drops

### addKeys

**addKeys**(`??destructured??`): `Promise`<[`CreateOrAddReturn`](interfaces/CreateOrAddReturn.md)\>

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
| `??destructured??` | `Object` | - |
| ?????`account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| ?????`basePassword?` | `string` | For doing password protected drops, this is the base password that will be used to generate all the passwords. It will be double hashed with the public keys. If specified, by default, all key uses will have their own unique password unless passwordProtectedUses is passed in. |
| ?????`drop?` | [`ProtocolReturnedDrop`](interfaces/ProtocolReturnedDrop.md) | If the drop information from getDropInformation is already known to the client, it can be passed in instead of the drop ID to reduce computation. |
| ?????`dropId?` | `string` | Specify the drop ID for which you want to add keys to. |
| ?????`extraDepositNEAR?` | `number` | For Public Sales, drops might require an additional fee for adding keys. This specifies the amount of $NEAR in human readable format (i.e `1.5` = 1.5 $NEAR) |
| ?????`extraDepositYocto?` | `string` | For Public Sales, drops might require an additional fee for adding keys. This specifies the amount of $NEAR in yoctoNEAR (i.e `1` = 1 $yoctoNEAR = 1e-24 $NEAR) |
| ?????`nftTokenIds?` | `string`[] | If the drop type is an NFT drop, the token IDs can be passed in so that the tokens are automatically sent to the Keypom contract rather * than having to do two separate transactions. A maximum of 2 token IDs can be sent during the `addKeys` function. To send more token IDs in order to register key uses, use the `nftTransferCall` function. |
| ?????`numKeys` | `number` | Specify how many keys should be generated for the drop. If the funder has rootEntropy set OR rootEntropy is passed in, the keys will be * deterministically generated using the drop ID, key nonce, and entropy. Otherwise, each key will be generated randomly. |
| ?????`passwordProtectedUses?` | `number`[] | For doing password protected drops, specifies exactly which uses will be password protected. The uses are NOT zero indexed (i.e 1st use = 1). Each use will have a different, unique password generated via double hashing the base password + public key + key use. |
| ?????`publicKeys?` | `string`[] | Pass in a custom set of publicKeys to add to the drop. If this is not passed in, keys will be generated based on the numKeys parameter. |
| ?????`returnTransactions?` | `boolean` | If true, the transaction will be returned instead of being signed and sent. This is useful for getting the requiredDeposit from the return value without actually signing the transaction. |
| ?????`rootEntropy?` | `string` | Specify an entropy to use for generating keys (will overload the funder's rootEntropy if applicable). This parameter only matters if the publicKeys variable is not passed in. |
| ?????`useBalance?` | `boolean` | If the account has a balance within the Keypom contract, set this to true to avoid the need to attach a deposit. If the account doesn't have enough balance, an error will throw. |
| ?????`wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<[`CreateOrAddReturn`](interfaces/CreateOrAddReturn.md)\>

Object containing: the drop ID, the responses of the execution, as well as any auto generated keys (if any).

#### Defined in

[src/lib/keys.ts:139](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keys.ts#L139)

___

### claim

**claim**(`??destructured??`): `Promise`<`any`\>

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
| `??destructured??` | `Object` | - |
| ?????`accountId?` | `string` | The account ID of an existing account that will be used to claim the drop. |
| ?????`fcArgs?` | `Maybe`<`string`\>[] | For FC drops, if `user_args_rule` is set by the funder, when claiming, custom arguments can be passed into the function. The number of args in the array need to match the number of methods being executed. |
| ?????`newAccountId?` | `string` | If passed in, a new account ID will be created and the drop will be claimed to that account. This must be an account that does not exist yet. |
| ?????`newPublicKey?` | `string` | If creating a new account, a public key must be passed in to be used as the full access key for the newly created account. |
| ?????`password?` | `string` | If a password is required to use the key, it can be passed in |
| ?????`secretKey` | `string` | The private key associated with the Keypom link. This can either contain the `ed25519:` prefix or not. |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/claims.ts:109](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/claims.ts#L109)

___

### claimTrialAccountDrop

**claimTrialAccountDrop**(`??destructured??`): `Promise`<`any`\>

Claim a Keypom trial account drop which will create a new account, deploy and initialize the trial account contract, and setup the account with initial conditions as specified in the drop.

**`Example`**

Creating a trial account with any callable methods, an amount of 0.5 $NEAR and 5 keys.
```js
const {keys: {secretKeys: trialSecretKeys, publicKeys: trialPublicKeys}} = await createTrialAccountDrop({
    contractBytes: [...readFileSync('./test/ext-wasm/trial-accounts.wasm')],
    trialFundsNEAR: 0.5,
    callableContracts: ['dev-1676298343226-57701595703433'],
    callableMethods: ['*'],
    amounts: ['0.5'],
    numKeys: 5,
    config: {
        dropRoot: "linkdrop-beta.keypom.testnet"
    }
})

const newAccountId = `${Date.now().toString()}.linkdrop-beta.keypom.testnet`
await claimTrialAccountDrop({
    secretKey: trialSecretKeys[0],
    desiredAccountId: newAccountId,
})

console.log(`

${JSON.stringify({
    account_id: newAccountId,
    public_key: trialPublicKeys[0],
    private_key: trialSecretKeys[0]
})}

`)

console.log(`http://localhost:1234/keypom-url/${newAccountId}#${trialSecretKeys[0]}`)

```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `??destructured??` | `Object` | - |
| ?????`desiredAccountId` | `string` | The account ID that will be created for the trial |
| ?????`secretKey` | `string` | The private key associated with the Keypom link. This can either contain the `ed25519:` prefix or not. |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/trial-accounts.ts:392](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/trial-accounts.ts#L392)

___

### createDrop

**createDrop**(`??destructured??`): `Promise`<[`CreateOrAddReturn`](interfaces/CreateOrAddReturn.md)\>

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
| `??destructured??` | `Object` | - |
| ?????`account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| ?????`basePassword?` | `string` | For doing password protected drops, this is the base password that will be used to generate all the passwords. It will be double hashed with the public keys. If specified, by default, all key uses will have their own unique password unless passwordProtectedUses is passed in. |
| ?????`config?` | [`DropConfig`](interfaces/DropConfig.md) | Allows specific drop behaviors to be configured such as the number of uses each key / link will have. |
| ?????`depositPerUseNEAR?` | `Number` | How much $NEAR should be contained in each link. Unit in $NEAR (i.e `1` = 1 $NEAR) |
| ?????`depositPerUseYocto?` | `string` | How much $yoctoNEAR should be contained in each link. Unit in yoctoNEAR (1 yoctoNEAR = 1e-24 $NEAR) |
| ?????`dropId?` | `string` | Specify a custom drop ID rather than using the incrementing nonce on the contract. |
| ?????`fcData?` | [`FCData`](interfaces/FCData.md) | For creating a function call drop, this contains necessary configurable information about the drop. |
| ?????`ftData?` | [`FTData`](interfaces/FTData.md) | For creating a fungible token drop, this contains necessary configurable information about the drop. |
| ?????`metadata?` | `string` | String of metadata to attach to the drop. This can be whatever you would like and is optional. Often this is stringified JSON. |
| ?????`nftData?` | [`NFTData`](interfaces/NFTData.md) | For creating a non-fungible token drop, this contains necessary configurable information about the drop. |
| ?????`numKeys` | `number` | Specify how many keys should be generated for the drop. If the funder has rootEntropy set OR rootEntropy is passed in, the keys will be * deterministically generated using the drop ID, key nonce, and entropy. Otherwise, each key will be generated randomly. |
| ?????`passwordProtectedUses?` | `number`[] | For doing password protected drops, specifies exactly which uses will be password protected. The uses are NOT zero indexed (i.e 1st use = 1). Each use will have a different, unique password generated via double hashing the base password + public key + key use. |
| ?????`publicKeys?` | `string`[] | Pass in a custom set of publicKeys to add to the drop. If this is not passed in, keys will be generated based on the numKeys parameter. |
| ?????`returnTransactions?` | `boolean` | If true, the transaction will be returned instead of being signed and sent. This is useful for getting the requiredDeposit from the return value without actually signing the transaction. |
| ?????`rootEntropy?` | `string` | Specify an entropy to use for generating keys (will overload the funder's rootEntropy if applicable). This parameter only matters if the publicKeys variable is not passed in. |
| ?????`simpleData?` | [`SimpleData`](interfaces/SimpleData.md) | For creating a simple drop, this contains necessary configurable information about the drop. |
| ?????`successUrl?` | `string` | When signing with a wallet, a success URl can be included that the user will be redirected to once the transaction has been successfully signed. |
| ?????`useBalance?` | `boolean` | If the account has a balance within the Keypom contract, set this to true to avoid the need to attach a deposit. If the account doesn't have enough balance, an error will throw. |
| ?????`wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<[`CreateOrAddReturn`](interfaces/CreateOrAddReturn.md)\>

Object containing: the drop ID, the responses of the execution, as well as any auto generated keys (if any).

#### Defined in

[src/lib/drops.ts:154](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/drops.ts#L154)

___

### createTrialAccountDrop

**createTrialAccountDrop**(`??destructured??`): `Promise`<[`CreateOrAddReturn`](interfaces/CreateOrAddReturn.md)\>

Creates a new trial account drop which can be used to instantly sign users into decentralized applications that support the Keypom wallet selector plugin.

The trial account is locked into certain behaviors depending on what is passed into `createTrialAccountDrop`. These behaviors include callable contracts, methods on
those contracts, the maximum amount of $NEAR that can be spent on each contract as well as an exit condition. Once the trial account has run out of funds, the only way to
retain any assets from the trial or continue using the account ID, is to repay the specific account ID for the amount of $NEAR specified.

**`Example`**

Creating a trial account with any callable methods, an amount of 0.5 $NEAR and 5 keys.
```js
const {keys: {secretKeys: trialSecretKeys, publicKeys: trialPublicKeys}} = await createTrialAccountDrop({
    contractBytes: [...readFileSync('./test/ext-wasm/trial-accounts.wasm')],
    trialFundsNEAR: 0.5,
    callableContracts: ['dev-1676298343226-57701595703433'],
    callableMethods: ['*'],
    amounts: ['0.5'],
    numKeys: 5,
    config: {
        dropRoot: "linkdrop-beta.keypom.testnet"
    }
})

const newAccountId = `${Date.now().toString()}.linkdrop-beta.keypom.testnet`
await claimTrialAccountDrop({
    secretKey: trialSecretKeys[0],
    desiredAccountId: newAccountId,
})

console.log(`

${JSON.stringify({
    account_id: newAccountId,
    public_key: trialPublicKeys[0],
    private_key: trialSecretKeys[0]
})}

`)

console.log(`http://localhost:1234/keypom-url/${newAccountId}#${trialSecretKeys[0]}`)

```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `??destructured??` | `Object` | - |
| ?????`account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| ?????`amounts` | `string`[] | The upper bound of $NEAR that trial account is able to attach to calls associated with each contract passed in. For no upper limit, pass in `*`. Units are in $NEAR (i.e `1` = 1 $NEAR). |
| ?????`callableContracts` | `string`[] | The contracts that the trial account should be able to call. |
| ?????`callableMethods` | `string`[] | The list of methods that the trial account should be able to call on each respective contract. For multiple methods on a contract, pass in a comma separated string with no spaces (`nft_mint,nft_transfer,nft_approve`). To allow any methods to be called on the receiver contract, pass in `*`. |
| ?????`config?` | [`DropConfig`](interfaces/DropConfig.md) | Allows specific drop behaviors to be configured such as the number of uses each key / link will have. |
| ?????`contractBytes` | `number`[] | Bytes of the trial account smart contract |
| ?????`dropId?` | `string` | Specify a custom drop ID rather than using the incrementing nonce on the contract. |
| ?????`metadata?` | `string` | String of metadata to attach to the drop. This can be whatever you would like and is optional. Often this is stringified JSON. |
| ?????`numKeys` | `number` | Specify how many keys should be generated for the drop. If the funder has rootEntropy set OR rootEntropy is passed in, the keys will be * deterministically generated using the drop ID, key nonce, and entropy. Otherwise, each key will be generated randomly. |
| ?????`publicKeys?` | `string`[] | Pass in a custom set of publicKeys to add to the drop. If this is not passed in, keys will be generated based on the numKeys parameter. |
| ?????`repayAmountNEAR?` | `Number` | How much $NEAR should be paid back to the specified funder in order to unlock the trial account. Unit in $NEAR (i.e `1` = 1 $NEAR) |
| ?????`repayAmountYocto?` | `string` | How much $NEAR should be paid back to the specified funder in order to unlock the trial account. Unit in yoctoNEAR (1 yoctoNEAR = 1e-24 $NEAR) |
| ?????`repayTo?` | `string` | The account that should receive the repayment of the trial account. If not specified, the drop funder will be used. |
| ?????`returnTransactions?` | `boolean` | If true, the transaction will be returned instead of being signed and sent. This is useful for getting the requiredDeposit from the return value without actually signing the transaction. |
| ?????`rootEntropy?` | `string` | Specify an entropy to use for generating keys (will overload the funder's rootEntropy if applicable). This parameter only matters if the publicKeys variable is not passed in. |
| ?????`successUrl?` | `string` | When signing with a wallet, a success URl can be included that the user will be redirected to once the transaction has been successfully signed. |
| ?????`trialFundsNEAR?` | `Number` | How much $NEAR should the trial account be able to spend before the trial is exhausted. Unit in $NEAR (i.e `1` = 1 $NEAR) |
| ?????`trialFundsYocto?` | `string` | How much $NEAR should the trial account be able to spend before the trial is exhausted. Unit in yoctoNEAR (1 yoctoNEAR = 1e-24 $NEAR) |
| ?????`useBalance?` | `boolean` | If the account has a balance within the Keypom contract, set this to true to avoid the need to attach a deposit. If the account doesn't have enough balance, an error will throw. |
| ?????`wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<[`CreateOrAddReturn`](interfaces/CreateOrAddReturn.md)\>

Object containing: the drop ID, the responses of the execution, as well as any auto generated keys (if any).

#### Defined in

[src/lib/trial-accounts.ts:75](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/trial-accounts.ts#L75)

## User Balance Functions

### addToBalance

**addToBalance**(`??destructured??`): `Promise`<`any`\>

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
| `??destructured??` | `Object` | - |
| ?????`account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| ?????`amountNear?` | `string` | Human readable format for the amount of tokens to add. **`Example`** ```ts Example: transferring one $NEAR should be passed in as "1" and NOT "1000000000000000000000000" ``` |
| ?????`amountYocto?` | `string` | Amount of tokens to add but considering the decimal amount (non human-readable). **`Example`** ```ts Transferring one $NEAR should be passed in as "1000000000000000000000000" and NOT "1" ``` |
| ?????`successUrl?` | `string` | When signing with a wallet, a success URl can be included that the user will be redirected to once the transaction has been successfully signed. |
| ?????`wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/balances.ts:32](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/balances.ts#L32)

___

### withdrawBalance

**withdrawBalance**(`??destructured??`): `Promise`<`any`\>

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
| `??destructured??` | `Object` | - |
| ?????`account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| ?????`wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/balances.ts:112](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/balances.ts#L112)

## Public Sale Functions

### addToSaleAllowlist

**addToSaleAllowlist**(`??destructured??`): `Promise`<`any`\>

Add a list of account IDs to a drop's sale allowlist. If the allowlist is empty, anyone can purchase keys. The sale object must exist in the drop's config for this to go through.

**`Example`**

```js
const {dropId} = await createDrop({
		numKeys: 0,
		depositPerUseNEAR: 0.1,
		config: {
			sale: {
				maxNumKeys: 2,
				pricePerKeyNEAR: 1
			}
		}
	});

	let canAddKeys = await canUserAddKeys({dropId, accountId: "foobar.testnet"});
	t.is(canAddKeys, true);

	await addToSaleAllowlist({dropId, accountIds: ["barfoo.testnet"]});
	canAddKeys = await canUserAddKeys({dropId, accountId: "foobar.testnet"});
	t.is(canAddKeys, false);
 ```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `??destructured??` | `Object` | - |
| ?????`account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| ?????`accountIds` | `string`[] | A list of account IDs that should be added to the sale allowlist |
| ?????`dropId` | `string` | The drop ID for the drop |
| ?????`wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/sales.ts:36](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/sales.ts#L36)

___

### addToSaleBlocklist

**addToSaleBlocklist**(`??destructured??`): `Promise`<`any`\>

Add a list of account IDs to a drop's sale blocklist. The sale object must exist in the drop's config for this to go through.

**`Example`**

```js
	const {dropId} = await createDrop({
		numKeys: 0,
		depositPerUseNEAR: 0.1,
		config: {
			sale: {
				maxNumKeys: 2,
				pricePerKeyNEAR: 1
			}
		}
	});

	let canAddKeys = await canUserAddKeys({dropId, accountId: "foobar.testnet"});
	t.is(canAddKeys, true);

	await addToSaleBlocklist({dropId, accountIds: ["foobar.testnet"]});
	canAddKeys = await canUserAddKeys({dropId, accountId: "foobar.testnet"});
	t.is(canAddKeys, false);
 ```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `??destructured??` | `Object` | - |
| ?????`account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| ?????`accountIds` | `string`[] | A list of account IDs that should be added to the sale blocklist |
| ?????`dropId` | `string` | The drop ID for the drop |
| ?????`wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/sales.ts:190](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/sales.ts#L190)

___

### removeFromSaleAllowlist

**removeFromSaleAllowlist**(`??destructured??`): `Promise`<`any`\>

Remove a list of account IDs from a drop's sale allowlist. If the allowlist is empty, anyone can purchase keys. The sale object must exist in the drop's config for this to go through.

**`Example`**

```js
	const {dropId} = await createDrop({
		numKeys: 0,
		depositPerUseNEAR: 0.1,
		config: {
			sale: {
				maxNumKeys: 2,
				pricePerKeyNEAR: 1,
				allowlist: ["foobar.testnet", "barfoo.testnet"]
			}
		}
	});

	let canAddKeys = await canUserAddKeys({dropId, accountId: "foobar.testnet"});
	t.is(canAddKeys, true);

	canAddKeys = await canUserAddKeys({dropId, accountId: "not_in_allowlist.testnet"});
	t.is(canAddKeys, false);

	await removeFromSaleAllowlist({dropId, accountIds: ["foobar.testnet"]});
	canAddKeys = await canUserAddKeys({dropId, accountId: "foobar.testnet"});
	t.is(canAddKeys, false);

	await removeFromSaleAllowlist({dropId, accountIds: ["barfoo.testnet"]});
	canAddKeys = await canUserAddKeys({dropId, accountId: "foobar.testnet"});
	t.is(canAddKeys, true);
 ```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `??destructured??` | `Object` | - |
| ?????`account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| ?????`accountIds` | `string`[] | A list of account IDs that should be removed from the sale's allowlist |
| ?????`dropId` | `string` | The drop ID for the drop |
| ?????`wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/sales.ts:117](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/sales.ts#L117)

___

### removeFromSaleBlocklist

**removeFromSaleBlocklist**(`??destructured??`): `Promise`<`any`\>

Remove a list of account IDs from a drop's sale blocklist. The sale object must exist in the drop's config for this to go through.

**`Example`**

```js
	const {dropId} = await createDrop({
		numKeys: 0,
		depositPerUseNEAR: 0.1,
		config: {
			sale: {
				maxNumKeys: 2,
				pricePerKeyNEAR: 1,
				blocklist: ["foobar.testnet"]
			}
		}
	});

	let canAddKeys = await canUserAddKeys({dropId, accountId: "foobar.testnet"});
	t.is(canAddKeys, false);

	canAddKeys = await canUserAddKeys({dropId, accountId: "not_in_blocklist.testnet"});
	t.is(canAddKeys, true);

	await removeFromSaleBlocklist({dropId, accountIds: ["foobar.testnet"]});
	canAddKeys = await canUserAddKeys({dropId, accountId: "foobar.testnet"});
	t.is(canAddKeys, true);
 ```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `??destructured??` | `Object` | - |
| ?????`account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| ?????`accountIds` | `string`[] | A list of account IDs that should be removed from the sale's allowlist |
| ?????`dropId` | `string` | The drop ID for the drop |
| ?????`wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/sales.ts:267](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/sales.ts#L267)

___

### updateSale

**updateSale**(`??destructured??`): `Promise`<`any`\>

Remove a list of account IDs from a drop's sale blocklist. The sale object must exist in the drop's config for this to go through.

**`Example`**

```js
	const {dropId} = await createDrop({
		numKeys: 0,
		depositPerUseNEAR: 0.1,
		config: {
			sale: {
				maxNumKeys: 2,
				pricePerKeyNEAR: 1
			}
		}
	});

	await updateSale({
		dropId,
		pricePerKeyNEAR: 2
	})
 ```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `??destructured??` | `Object` | - |
| ?????`account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| ?????`autoWithdrawFunds?` | `boolean` | Should the revenue generated be sent to the funder's account balance or automatically withdrawn and sent to their NEAR wallet? |
| ?????`dropId` | `string` | The drop ID for the drop |
| ?????`end?` | `number` | Block timestamp dictating the end of the public sale. If None, keys can be added indefinitely Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC. |
| ?????`maxNumKeys?` | `number` | Maximum number of keys that can be added to this drop. If None, there is no max. |
| ?????`pricePerKeyNEAR?` | `number` | Amount of $NEAR that the user needs to attach (if they are not the funder) on top of costs. This amount will be Automatically sent to the funder's balance. If None, the keys are free to the public. |
| ?????`pricePerKeyYocto?` | `string` | - |
| ?????`start?` | `number` | Minimum block timestamp before the public sale starts. If None, keys can be added immediately Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC. |
| ?????`wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/sales.ts:339](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/sales.ts#L339)

## View Functions

### canUserAddKeys

**canUserAddKeys**(`??destructured??`): `Promise`<`boolean`\>

Check if a given user can add keys to a drop. The only case where a user *other than the funder* could add keys is if the drop has a public sale running.

**`Example`**

```js	
await createDrop({
	numKeys: 0,
	depositPerUseNEAR: 0,
	config: {
		sale: {
			maxNumKeys: 2,
			pricePerKeyNEAR: 1
		}
	}
});

const canAddKeys = await canUserAddKeys({accountId: "foobar.testnet"});
t.is(canAddKeys, true);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `??destructured??` | `Object` |
| ?????`accountId` | `string` |
| ?????`dropId` | `string` |

#### Returns

`Promise`<`boolean`\>

Whether or not the user can add keys to the drop

#### Defined in

[src/lib/views.ts:795](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/views.ts#L795)

___

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

[src/lib/views.ts:833](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/views.ts#L833)

___

### getCurMethodData

**getCurMethodData**(`??destructured??`): `Promise`<`Maybe`<[`ProtocolReturnedMethod`](interfaces/ProtocolReturnedMethod.md)[]\>\>

Query for the current method data for a given key. This pertains to FC drops and the current method data is either null or an array of methods that will be invoked when the key is claimed next.

**`Example`**

```js
const fcData = {
	methods: [
		null,
		[
			{
				methodName: "nft_token",
				receiverId: "nft.examples.testnet",
				args: JSON.stringify({
					token_id: "1"
				}),
				attachedDeposit: "0"
			},
			{
				methodName: "nft_token",
				receiverId: "nft.examples.testnet",
				args: JSON.stringify({
					token_id: "2"
				}),
				attachedDeposit: "0"
			}
		],
		null
	]
}

const {keys: {publicKeys, secretKeys}} = await createDrop({
	numKeys: 1,
	depositPerUseNEAR: 0,
	fcData,
	config: {
		usesPerKey: 3
	}
});
const secretKey = secretKeys[0];

let curMethodData = await getCurMethodData({secretKey});
console.log('curMethodData (first): ', curMethodData)
t.is(curMethodData, null);

	curMethodData = await getCurMethodData({secretKey, keyUse: 1});
	t.is(curMethodData, null);
	curMethodData = await getCurMethodData({secretKey, keyUse: 2});
	t.true(curMethodData != null);
	curMethodData = await getCurMethodData({secretKey, keyUse: 3});
	t.is(curMethodData, null);

await claim({secretKey, accountId: 'foobar'})
curMethodData = await getCurMethodData({secretKey});
t.true(curMethodData != null);

await claim({secretKey, accountId: 'foobar'})
curMethodData = await getCurMethodData({secretKey});
console.log('curMethodData (third): ', curMethodData)
t.is(curMethodData, null);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `??destructured??` | `Object` |
| ?????`keyUse?` | `number` |
| ?????`publicKey?` | `string` |
| ?????`secretKey?` | `string` |

#### Returns

`Promise`<`Maybe`<[`ProtocolReturnedMethod`](interfaces/ProtocolReturnedMethod.md)[]\>\>

The current method data for the key

#### Defined in

[src/lib/views.ts:744](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/views.ts#L744)

___

### getDropInformation

**getDropInformation**(`??destructured??`): `Promise`<[`ProtocolReturnedDrop`](interfaces/ProtocolReturnedDrop.md)\>

Get information about a specific drop by passing in either a drop ID, public key, or secret key.

**`Example`**

Create a simple drop and retrieve information about it:
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

**`Example`**

Create a simple drop and get the drop information based on a public key and then the secret key:
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

// Query for the drop information and also return the key information as well
let dropInfo = await getDropInformation({
	   publicKey: keys.publicKeys[0],
    withKeys: true
})

console.log('dropInfo via public key: ', dropInfo)

// Query for the drop information and also return the key information as well
dropInfo = await getDropInformation({
	   secretKey: keys.secretKeys[0],
    withKeys: true
})

console.log('dropInfo via secret key: ', dropInfo)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `??destructured??` | `Object` |
| ?????`dropId?` | `string` |
| ?????`publicKey?` | `string` |
| ?????`secretKey?` | `string` |
| ?????`withKeys?` | `boolean` |

#### Returns

`Promise`<[`ProtocolReturnedDrop`](interfaces/ProtocolReturnedDrop.md)\>

Drop information which may or may not have a keys field of type `KeyInfo` depending on if withKeys is specified as true.

#### Defined in

[src/lib/views.ts:314](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/views.ts#L314)

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

[src/lib/views.ts:478](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/views.ts#L478)

___

### getDrops

**getDrops**(`??destructured??`): `Promise`<[`ProtocolReturnedDrop`](interfaces/ProtocolReturnedDrop.md)[]\>

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
| `??destructured??` | `Object` | - |
| ?????`accountId` | `string` | The funding account that the drops belong to. |
| ?????`limit` | `number` | How many drops to paginate through. |
| ?????`start` | `string` \| `number` | Where to start paginating through drops. |
| ?????`withKeys` | `boolean` | Whether or not to include key information for the first 50 keys in each drop. |

#### Returns

`Promise`<[`ProtocolReturnedDrop`](interfaces/ProtocolReturnedDrop.md)[]\>

#### Defined in

[src/lib/views.ts:521](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/views.ts#L521)

___

### getKeyBalance

**getKeyBalance**(`??destructured??`): `Promise`<`string`\>

Returns the balance associated a with given public key. If only the secret key is known, this can be passed in instead. This is used by the NEAR wallet to display the amount of the linkdrop

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

| Name | Type |
| :------ | :------ |
| `??destructured??` | `Object` |
| ?????`publicKey?` | `string` |
| ?????`secretKey?` | `string` |

#### Returns

`Promise`<`string`\>

The amount of yoctoNEAR that is contained within the key

#### Defined in

[src/lib/views.ts:48](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/views.ts#L48)

___

### getKeyInformation

**getKeyInformation**(`??destructured??`): `Promise`<[`ProtocolReturnedKeyInfo`](interfaces/ProtocolReturnedKeyInfo.md)\>

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

| Name | Type |
| :------ | :------ |
| `??destructured??` | `Object` |
| ?????`publicKey?` | `string` |
| ?????`secretKey?` | `string` |

#### Returns

`Promise`<[`ProtocolReturnedKeyInfo`](interfaces/ProtocolReturnedKeyInfo.md)\>

Key information struct for that specific key.

#### Defined in

[src/lib/views.ts:169](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/views.ts#L169)

___

### getKeyInformationBatch

**getKeyInformationBatch**(`??destructured??`): `Promise`<[`ProtocolReturnedKeyInfo`](interfaces/ProtocolReturnedKeyInfo.md)[]\>

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

| Name | Type |
| :------ | :------ |
| `??destructured??` | `Object` |
| ?????`publicKeys?` | `string`[] |
| ?????`secretKeys?` | `string`[] |

#### Returns

`Promise`<[`ProtocolReturnedKeyInfo`](interfaces/ProtocolReturnedKeyInfo.md)[]\>

Array of Key information structs for the keys passed in

#### Defined in

[src/lib/views.ts:222](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/views.ts#L222)

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

[src/lib/views.ts:383](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/views.ts#L383)

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

[src/lib/views.ts:87](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/views.ts#L87)

___

### getKeys

**getKeys**(`??destructured??`): `Promise`<[`ProtocolReturnedKeyInfo`](interfaces/ProtocolReturnedKeyInfo.md)[]\>

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
| `??destructured??` | `Object` | - |
| ?????`limit?` | `number` | (OPTIONAL) How many keys to paginate through. |
| ?????`start?` | `string` \| `number` | (OPTIONAL) Where to start paginating through keys. |

#### Returns

`Promise`<[`ProtocolReturnedKeyInfo`](interfaces/ProtocolReturnedKeyInfo.md)[]\>

Vector of KeyInfo.

#### Defined in

[src/lib/views.ts:121](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/views.ts#L121)

___

### getKeysForDrop

**getKeysForDrop**(`??destructured??`): `Promise`<[`ProtocolReturnedKeyInfo`](interfaces/ProtocolReturnedKeyInfo.md)[]\>

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
| `??destructured??` | `Object` |
| ?????`dropId` | `string` |
| ?????`limit?` | `number` |
| ?????`start?` | `string` \| `number` |

#### Returns

`Promise`<[`ProtocolReturnedKeyInfo`](interfaces/ProtocolReturnedKeyInfo.md)[]\>

Vector of KeyInfo objects returned from pagination

#### Defined in

[src/lib/views.ts:430](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/views.ts#L430)

___

### getNftSupplyForDrop

**getNftSupplyForDrop**(`dropId`): `Promise`<`number`\>

Return the total supply of token IDs for a given NFT drop.

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

[src/lib/views.ts:589](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/views.ts#L589)

___

### getNftTokenIDsForDrop

**getNftTokenIDsForDrop**(`??destructured??`): `Promise`<`string`[]\>

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
| `??destructured??` | `Object` |
| ?????`dropId` | `string` |
| ?????`limit?` | `number` |
| ?????`start?` | `string` \| `number` |

#### Returns

`Promise`<`string`[]\>

Vector of token IDs

#### Defined in

[src/lib/views.ts:626](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/views.ts#L626)

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
const userBal = await getUserBalance({
accountId: "benjiman.testnet",
})

console.log('userBal: ', userBal)
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

[src/lib/views.ts:665](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/views.ts#L665)

## Deleting State

### deleteDrops

**deleteDrops**(`??destructured??`): `Promise`<(`void` \| `FinalExecutionOutcome`[])[][]\>

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
| `??destructured??` | `Object` | - |
| ?????`account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| ?????`dropIds?` | `string`[] | Specify a set of drop IDs to delete. |
| ?????`drops?` | [`ProtocolReturnedDrop`](interfaces/ProtocolReturnedDrop.md)[] | If the set of drop information for the drops you want to delete (from `getDropInformation` or `getDrops`) is already known to the client, it can be passed in instead of the drop IDs to reduce computation. |
| ?????`wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |
| ?????`withdrawBalance?` | `boolean` | Whether or not to withdraw any remaining balance on the Keypom contract. |

#### Returns

`Promise`<(`void` \| `FinalExecutionOutcome`[])[][]\>

#### Defined in

[src/lib/drops.ts:479](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/drops.ts#L479)

___

### deleteKeys

**deleteKeys**(`??destructured??`): `Promise`<`any`\>

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
| `??destructured??` | `Object` | - |
| ?????`account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| ?????`dropId` | `string` | Which drop ID do the keys belong to? |
| ?????`publicKeys` | `string` \| `string`[] | Specify a set of public keys to delete. If deleting a single publicKey, the string can be passed in without wrapping it in an array. |
| ?????`wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |
| ?????`withdrawBalance?` | `boolean` | Whether or not to withdraw any remaining balance on the Keypom contract. |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/keys.ts:375](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keys.ts#L375)

## Registering Key Uses

### ftTransferCall

**ftTransferCall**(`??destructured??`): `Promise`<`Transaction` \| `Promise`<`void` \| `FinalExecutionOutcome`[]\>\>

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
| `??destructured??` | `Object` | - |
| ?????`absoluteAmount?` | `string` | Amount of tokens to transfer but considering the decimal amount (non human-readable). Example: transferring one wNEAR should be passed in as "1000000000000000000000000" and NOT "1" |
| ?????`account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| ?????`amount?` | `string` | Human readable format for the amount of tokens to transfer. * Example: transferring one wNEAR should be passed in as "1" and NOT "1000000000000000000000000" |
| ?????`contractId` | `string` | The fungible token contract ID. |
| ?????`dropId` | `string` | The drop ID to register the keys for. |
| ?????`returnTransaction?` | `boolean` | If true, the transaction will be returned instead of being signed and sent. |
| ?????`wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<`Transaction` \| `Promise`<`void` \| `FinalExecutionOutcome`[]\>\>

#### Defined in

[src/lib/keypom-utils.ts:661](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom-utils.ts#L661)

___

### nftTransferCall

**nftTransferCall**(`??destructured??`): `Promise`<`Transaction`[] \| (`void` \| `FinalExecutionOutcome`[])[]\>

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
| `??destructured??` | `Object` | - |
| ?????`account?` | `Account` | Account object that if passed in, will be used to sign the txn instead of the funder account. |
| ?????`contractId` | `string` | The non-fungible token contract ID. |
| ?????`dropId` | `string` | The drop ID to register the keys for. |
| ?????`returnTransactions?` | `boolean` | If true, the transaction will be returned instead of being signed and sent. |
| ?????`tokenIds` | `string`[] | A set of token IDs that should be sent to the Keypom contract in order to register keys. |
| ?????`wallet?` | `AnyWallet` | If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. |

#### Returns

`Promise`<`Transaction`[] \| (`void` \| `FinalExecutionOutcome`[])[]\>

#### Defined in

[src/lib/keypom-utils.ts:756](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/keypom-utils.ts#L756)

## Functions

### setupKeypom

**setupKeypom**(`??destructured??`): `WalletModuleFactory`<`KeypomWalletType`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `??destructured??` | `KeypomSetupParams` |

#### Returns

`WalletModuleFactory`<`KeypomWalletType`\>

#### Defined in

[src/lib/selector/core/setup.ts:23](https://github.com/keypom/keypom-js/blob/9d8244ce/src/lib/selector/core/setup.ts#L23)
