---
sidebar_label: 'Simple Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Simple Drop
:::note
The code contained in the code blocks are not full scripts but instead excerpts from the DEPLOY scripts in our [Github](https://github.com/keypom/keypom/tree/main/deploy). To run these scripts yourself, see the [Getting Started](/Tutorials/Basics/getting-started.md) page.
:::


When interacting with the NEAR blockchain, the first thing that you must do is initialize a NEAR connection. This must be manually done with NEAR-API-JS but is done automatically with our Keypom-JS SDK through the use of the `initKeypom` function.

Next, keypairs must be generated. Similar to initializing a NEAR conection, this must be done manually with the NEAR-API-JS but is done automatically through our Keypom-JS SDK when creating a drop.

Finally, to create the drop we use `createDrop` with our Keypom JS SDK or `create_drop` in NEAR-API-JS. 

Note that with NEAR-API-JS, an attached deposit `parseNearAmount("1")` must be added to the `functionCall` in order to fund the drop.

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js
const { initKeypom, createDrop } = require("keypom-js");

initKeypom({
    network: 'testnet', 
    funder: {
        accountId: "minqi.testnet", 
        secretKey: MY_PRVK
    }
});

createDrop({
    account: 'minqi.testnet.',
    numKeys: 1,
    depositPerUseNEAR: "1",
});
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js
// Initiate connection to the NEAR blockchain.
console.log("Initiating NEAR connection");
let near = await initiateNearConnection('testnet');
const fundingAccount = await near.account('minqi.testnet');

// Keep track of an array of the keyPairs we create
let keyPairs = [];
// Keep track of the public keys to pass into the contract
let pubKeys = [];
console.log("Creating keypair");
let keyPair = await KeyPair.fromRandom('ed25519'); 
keyPairs.push(keyPair);   
pubKeys.push(keyPair.publicKey.toString());   

// Create drop with pub keys, deposit_per_use
try {
	await fundingAccount.functionCall(
		'v1-3.keypom.testnet', 
		'create_drop', 
		{
			public_keys: pubKeys,
			deposit_per_use: parseNearAmount('1'),
		}, 
		"300000000000000",
		// Change this deposit value to whatever is needed to fund your drop; this will be added to your balance...?
		parseNearAmount("1"),
	);
} catch(e) {
	console.log('error creating drop: ', e);
}
```

</TabItem>
</Tabs>

:::note
MY_PRVK is the variable representing the ed25519 private key associated with minqi.testnet. This can be found in your ~/.near-credentials folder
:::