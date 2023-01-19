---
sidebar_label: 'Function Call Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Function Call Drop
Function call drops, relative to Fungible and Non Funcgible Token Drops, are relatively simple and bear a closer resemblance to [Simple Drops](simple-drops.md). As the function parameters are the only thing that require to be passed in, and there is no token transfering to the Keypom contract, both approaches can be done in a relatively short manner, 

Similar to Simple Drops, the only major difference between the two approaches is that using NEAR-API-JS requires you to generate the keys manually and call the Keypom by way of a `functionCall`. 

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js
console.log("Initiating NEAR connection");
await initKeypom({
    network: 'testnet', 
    funder: {
        accountId: "minqi.testnet", 
        secretKey: MY_PRVK
    }
});

await createDrop({
    numKeys: 1,
    depositPerUseNEAR: "1",
    fcData: {
	    methods: [
			[{
				receiverId: "nft.examples.testnet",
				methodName: "nft_mint",
				args: JSON.stringify({
	                token_id: "my-function-call-token",
	                receiver_id: "minqi.testnet",
	                metadata: {
					    title: "My Keypom NFT",
					    description: "Keypom is lit fam",
					    media: "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
					}
				}),
				attachedDeposit: parseNearAmount("1"),
			}]
		]
	},
});
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js
// Initiate connection to the NEAR blockchain.
console.log("Initiating NEAR connection");
let near = await initiateNearConnection("testnet");
const fundingAccount = await near.account("minqi.testnet");

// Keep track of an array of the keyPairs we create
let keyPairs = [];
// Keep track of the public keys to pass into the contract
let pubKeys = [];
console.log("Creating keypairs");
let keyPair = await KeyPair.fromRandom('ed25519'); 
keyPairs.push(keyPair);   
pubKeys.push(keyPair.publicKey.toString());   


// Create FC drop with pubkkeys from above and fc data
try {
	await fundingAccount.functionCall(
		"v1-3.keypom.testnet", 
		'create_drop', 
		{
			public_keys: pubKeys,
			deposit_per_use: parseNearAmount("1"),
			fc: {
				methods: [[{
					receiver_id: 'nft.examples.testnet',
					method_name: "nft_mint",
					args: JSON.stringify({
            		    token_id: "my-function-call-token",
            		    receiver_id: "minqi.testnet",
            		    metadata: {
						    title: "My Keypom NFT",
						    description: "Keypom is lit fam",
						    media: "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
						}
					}),,
					attached_deposit: parseNearAmount("1"),
				}]]
			}
		}, 
		"300000000000000",
		parseNearAmount("2")
	);
} catch(e) {
	console.log('error creating drop: ', e);
}
```

</TabItem>
</Tabs>

The data structure `methods` that is passed into the drop creation is a *2D vector*. Each individual key use can call multiple functions and these sets of functions can change between each key use. For more on this data structure and the incredibly powerful use cases this can unlock, see the [Function Call Drops Concepts page](/Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/fcdrops.md#key-uses).