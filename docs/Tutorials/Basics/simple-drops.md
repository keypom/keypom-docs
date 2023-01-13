---
sidebar_label: 'Simple Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Simple Drops
*insert CLI stuff here*  

Using NEAR-API-JS, the first step is to initialize a NEAR connection. Then, the keys must be generated using the 'KeyPair' function from the API. Finally a function call, in this case 'create_drop', can be made to the Keypom contract.

Using our Keypom-JS SDK, the NEAR connection and Keypom contract are initialized in one call. The rest of the drop creation can be done in ONE function call and will create the keys for you. 

Note that MY_PRVK is the variable representing the ed25519 private key associated with minqi.testnet.

<Tabs>
<TabItem value="KPJS" label="💡Keypom-JS SDK">

```js
const { initKeypom, createDrop } = require("keypom-js");

initKeypom({
    network: 'testnet', 
    funder: {
        accountId: minqi.testnet, 
        secretKey: MY_PRVK
    }
});

createDrop({
    account: 'minqi.testnet.',
    numKeys: 10,
    depositPerUseNEAR: 1,
});
```

</TabItem>
<TabItem value="NRJS" label="☕️NEAR-API-JS">

```js
const { KeyPair } = require("near-api-js");

let near = await initiateNearConnection('testnet');
const fundingAccount = await near.account('minqi.testnet');

// arrays to keep track of keypairs and public keys we create
let keyPairs = [];
let pubKeys = [];
console.log("Creating keypairs");
for(var i = 0; i < 10; i++) {
	let keyPair = await KeyPair.fromRandom('ed25519'); 
	keyPairs.push(keyPair);   
	pubKeys.push(keyPair.publicKey.toString());   
}

try {
	await fundingAccount.functionCall(
		"v1-3.keypom.testnet", 
		'create_drop', 
		{
			public_keys: pubKeys,
			deposit_per_use: 1,
		}, 
		"300000000000000"
	);
} catch(e) {
	console.log('error creating drop: ', e);
}
```

</TabItem>
</Tabs>