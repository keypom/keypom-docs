---
sidebar_label: 'Fungible Token Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fungible Token Drop
Similar to the NFT Drop example, the two approaches share some common code to start. In this case, we are ensuring that the drop funder has enough of the desired Fungible Token to fund the drop. This can be done by quickly calling `ft_balance_of` using a `viewFunction` on the desired FT contract.

:::note
With our Fungible Token used in the example, it has a `decimal` parameter value of 24, making it equivalent to 1 $NEAR -> 10<sup>24</sup> Yocto NEAR. This allows us to use [`parseNearAmount`](https://docs.near.org/tools/near-api-js/utils) to convert between the two. Read more on the decimal parameter [here](https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals).
:::


```js
// Initiate connection to the NEAR blockchain.
console.log("Initiating NEAR connection");
let near = await initiateNearConnection("testnet");
const fundingAccount = await near.account("minqi.testnet");

//get amount to transfer and see if owner has enough balance to fund drop
let amountToTransfer = parseNearAmount("1")
let funderFungibleTokenBal = await fundingAccount.viewFunction(
	"ft.keypom.testnet", 
	'ft_balance_of',
	{
		account_id: "minqi.testnet"
	}
);
if (new BN(funderFungibleTokenBal).lte(new BN(amountToTransfer))){
	throw new Error('funder does not have enough Fungible Tokens for this drop. Top up and try again.');
}
```

Following the initialization and Fungible Token balance check, the two approaches diverge. 

With the Keypom-JS SDK, `createDrop` will be called again, this time with the appropriate Fungible Token data. This will automatically pay the Fungible Token contract storage deposit, create the drop, and transfer the Fungible Tokens to the Keypom contract.

Using NEAR-API-JS to create the drop means doing this manually, all with `functionCall`s to the Keypom contract.

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js
await initKeypom({
	near: near,
	funder: {
        accountId: "minqi.testnet", 
        secretKey: MY_PRVK
	}
});

// Creates the FT drop based on data from config file. Keys are automatically generated within the function based on `NUM_KEYS`. Since there is no entropy, all keys are completely random.
 await createDrop({
    numKeys: NUM_KEYS,
    depositPerUseNEAR: DEPOSIT_PER_USE_NEAR,
    metadata: DROP_METADATA,
    config: DROP_CONFIG,
    ftData: {
		contractId: "ft.keypom.testnet",
		senderId: "minqi.testnet",
		balancePerUse: parseNearAmount("1")
	},
});
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js
// Keep track of an array of the keyPairs we create
let keyPairs = [];
// Keep track of the public keys to pass into the contract
let pubKeys = [];
console.log("Creating keypairs");
for(var i = 0; i < NUM_KEYS; i++) {
	let keyPair = await KeyPair.fromRandom('ed25519'); 
	keyPairs.push(keyPair);   
	pubKeys.push(keyPair.publicKey.toString());   
}
// Create drop with FT data
try {
	await fundingAccount.functionCall(
		KEYPOM_CONTRACT, 
		'create_drop', 
		{
			public_keys: pubKeys,
			deposit_per_use: parseNearAmount("1"),
			ft: {
				contract_id: "ft.keypom.testnet",
				sender_id: "minqi.testnet",
				balance_per_use: parseNearAmount("1")
			}
		}, 
		"300000000000000",
		parseNearAmount("10")
	);
} catch(e) {
	console.log('error creating drop: ', e);
}

// Pay storage deposit and trasnfer FTs to Keypom contract.
try {
	await fundingAccount.functionCall(
		FT_CONTRACT_ID, 
		'storage_deposit',
		{
			account_id: "minqi.testnet",
		},
		"300000000000000",
		parseNearAmount("0.1")
	);
	let dropId = await getRecentDropId(fundingAccount, "minqi.testnet", "v1-3.keypom.testnet");
	console.log('dropId: ', dropId)
	await fundingAccount.functionCall(
		"ft.keypom.testnet", 
		'ft_transfer_call', 
		{
			receiver_id: "v1-3.keypom.testnet",
			amount: parseNearAmount((amountToTransfer.toString()),				
			msg: dropId.toString()
		},
		"300000000000000",
		"1"
	);
} catch(e) {
	console.log('error sending FTs', e);
}
```

</TabItem>
</Tabs>