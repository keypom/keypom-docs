---
sidebar_label: 'Non Fungible Token Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Non Fungible Token Drop
When creating an NFT drop, it is important to ensure that the NFT is minted and belongs to you first. To do this, a simple `functionCall` using the NEAR-API-JS to mint the NFT will suffice. This code is shared between the Keypom-JS-SDK approach and the NEAR-API-JS approach.

We will start with initializing the NEAR connection and then make the function call. We will only be minting 1 NFT in this example.

```js
// Init keypom, this takes care of the new NEAR connection
console.log("Initiating NEAR connection");
let near = await initiateNearConnection("testnet");
const fundingAccount = await near.account("minqi.testnet");

// Mint 1 NFT for the funder from the NFT contract outlined in the NFT_DATA
await fundingAccount.functionCall(
	"nft.examples.testnet", 
	'nft_mint', 
	{
		receiver_id: "minqi.testnet",
		metadata: {
		    title: "My Keypom NFT",
		    description: "Keypom is lit fam :D",
		    media: "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
		},
		token_id: "my-token",
	},
	"300000000000000",
	parseNearAmount("0.1")
);
```

The next step is where we create the drop and transfer the newly minted NFT to the Keypom smart contract. Recall from [NFT drop concepts](/Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/nftdrops.md), the funder must transfer the NFT to the Keypom contract in order for the NFT to be added to the drop. This is where the two approaches diverge. 

With NEAR-API-JS, this must be done manually. Conversely, with the Keypom-JS SDK, this is done automatically when calling `createDrop`, as seen in the code snipped below. 

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
// Create drop, this generates the keys based on the number of keys passed in and uses funder's keypom balance if funderBalance is true (otherwise will sign a txn with an attached deposit)
await createDrop({
    numKeys: 1,
    depositPerUseNEAR: "1",
    nftData: {
	    // NFT Contract Id that the tokens will come from
	    contractId: "nft.examples.testnet",
	    // Who will be sending the NFTs to the Keypom contract
	    senderId: "minqi.testnet",
	    // List of tokenIDs
	    tokenIds: ["my-token"]
	}
});
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js
// Keep track of an array of the keyPairs we create
let keyPairs = [];
// Keep track of the public keys to pass into the contract
let pubKeys = [];
console.log("Creating keypair");
let keyPair = await KeyPair.fromRandom('ed25519'); 
keyPairs.push(keyPair);   
pubKeys.push(keyPair.publicKey.toString());   

try {
	await fundingAccount.functionCall(
		"v1-3.keypom.testnet", 
		'create_drop', 
		{
			public_keys: pubKeys,
			deposit_per_use: parseNearAmount("1"),
			nft: {
				sender_id: "minqi.testnet",
				contract_id: "nft.examples.testnet"
			}
		}, 
		"300000000000000",
		parseNearAmount("1")
	);

	let dropId = await getRecentDropId(fundingAccount, FUNDING_ACCOUNT_ID, KEYPOM_CONTRACT);

	await fundingAccount.functionCall(
		"nft.examples.testnet", 
		'nft_transfer_call', 
		{
			receiver_id: "v1-3.keypom.testnet",
			token_id: "my-token",
			msg: dropId.toString()
		},
		"300000000000000",
		"1"
	);
} catch(e) {
	console.log('error creating drop: ', e);
}
```

</TabItem>
</Tabs>