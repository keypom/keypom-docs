---
sidebar_label: 'Creating the Drop'
---
# Creating the Drop

## Introduction
In this section you'll taking the first step to creating the ticketing experience by creating the drop. This drop will be designed according to the functionality and specifications found in the [Solution Architecture](architecture.md#keypom-solution).

Recall that the drop needs the following properties:

* The drop must have 2 key uses for each key.
* A function call drop must be used.
* The second key use should call `nft_mint`.
* the method `create_account_and_claim` must be made available.
* the first key use must be password protected.

Similar to creating a [function call drop](../../Basics/fc-drops.md), the process for creating this drop can be broken down into two stages.

1) Connect to the NEAR blockchain  
2) Create drop with function call data  
3) Make NFT series for POAPs

The following skeleton code can be used as a starting point:
``` js
// Imports:
const { initKeypom, createDrop, createNFTSeries, addToBalance } = require("keypom-js");
const { KeyPair, keyStores, connect } = require("near-api-js");
const { parseNearAmount } = require("near-api-js/lib/utils/format");
const path = require("path");
const homedir = require("os").homedir();


async function createTickDrop(){
// STEP 1: Initiate a NEAR connection.

// STEP 2: Create the drop with funciton call data.

// STEP 3: Make NFT series for POAPs.
}

createTickDrop()
```

## Getting Started
In this section, you'll be addressing the first step: connecting to NEAR. 

This is done with `NEAR-API-JS` and consists of:

1) Create a Keystore, which stores your access keys used to sign transactions   
  * select a network, either `testnet` or `mainnet`  
  * choose a location where the keypairs live, either a folder on your local machine, or in-memory      

2) Define a NEAR configuration using the Keystore  
3) Use the configuration to initialize a connection to NEAR  

More information about this process can be found [here](https://docs.near.org/tools/near-api-js/quick-reference#key-store).

:::note
For simplicity, this tutorial will choose a file-based keystore and point to the `~/.near-credentials` folder on your local machine since this is where most of your keys are stored. For more information about KeyStores, visit NEAR's [official docs](https://docs.near.org/tools/near-api-js/quick-reference#key-store).
:::

```js reference
https://github.com/keypom/keypom-js/blob/bc3221d1b95a88aa8bd660a4899df7667a0cfe45/docs-advanced-tutorials/ticketing/src/utils/createTickDrop.js#L8-L25
```

---

## Creating Drop with Function Call Data
In this section, you'll create the function call drop to meet the functional requirements defined earlier.

Recall that the drop needs the following properties:

* The drop must have 2 key uses for each key.
* The second key use should call `nft_mint`.
* the first key use must be password protected.

### Function Call Drop Basics
This process starts with calling the `initKeypom` function and will always be the first function you call to interact with the SDK. 

`initKeypom` initializes the SDK to allow for interactions with the Keypom smart contracts. Without it, none of the other SDK functions would work as expected. If a NEAR connection is not already present, it will initialize a new one for you. More info on the `initKeypom` function can be found [here](../../../keypom-sdk/modules#initkeypom).

After `initKeypom` is called, the FC Drop can be created by calling `createDrop` and adding an `fcData` parameter. 

:::tip
Recall that the private keys being generated using `createDrop` are used to store the assets. These keys are then embedded within a link.
:::

The primary task in creating the Function Call Drop is to define `fcData`. It is an object with the following properties.

```bash
fcData
├── methods
```

- `FCConfig`: [Specific configurations](../../../keypom-sdk/interfaces/FCConfig.md) for the FC Drop.  
- `methods`: A vector of all the functions to be called for each key use.  

In this example, only the `methods` parameter will be defined for the sake of simplicity.

`methods` is a 2D array. The outer array defines the vectors of functions to be called **per key use**. The inner array dictates the functions invoked on **each particular key use**. For more information on the `methods` parameter, please see the [TypeDocs](../../../keypom-sdk/interfaces/Method.md)

Each inner element of `methods` represents a function call and requires the following parameters:  

- `receiverId`: The contract receiving the function call.  
- `methodName`: The function to be called on the receiver contract.  
- `args`: A stringified JSON object of all the arguments to be passsed into `methodName`.  
- `attachedDeposit`: The yoctoNear deposit attached to the function call when the key is used.  

### Tailoring to Ticketing Requirements

To ensure each key has two key uses with a passwort protected first use, the following `config` can be added to `createDrop`.

```js
// 2 Uses per key
config: {
    usesPerKey: 2
},

// Create base password and ensure only first key use is password protected
basePassword: "event-password",
passwordProtectedUses: [1],
```

:::info
As disucssed in the [introduction](drop.md#introduction), the first key use should not call anything, and the second should call `nft_mint`. 

To do this, a value of `null` can be passed in to the first index of the `methods` array
:::

On top of the required `receiverId`, `methodName`, `args`, and `attachedDeposit` parameters, a few others will be used used in `methods` to better utilize the SDK. These parameters tell Keypom where to inject arguments. 

- `accountIdField`: Specifies what field Keypom should auto-inject the account that claimed the drop's ID into when calling the function.  
- `dropIdField`: Specifies what field Keypom should auto-inject the drops ID into when calling the function.  

These parameters will be used alongisde the `createNFTSeries` SDK method.  

```js reference
https://github.com/keypom/keypom-js/blob/bc3221d1b95a88aa8bd660a4899df7667a0cfe45/docs-advanced-tutorials/ticketing/src/utils/createTickDrop.js#L29-L60
```

## Making NFT Series
In this section, you'll be creating the series of NFTs to be used as POAPs.

The Keypom SDK provides a function to create an NFT series specifically for function call drops, called `createNFTSeries`. It requires the following parameters: 

- `dropId`: The drop ID for the drop that should have the NFT series associated with it.  
- `metadata`: 	The metadata that all minted NFTs will have.  

The `metadata` is an object with these properties:
* `title`: The title for the NFTs in the series
* `description`: Description for all NFTs in the series
* `media`: link to the media for the NFTs
* `copies`: Number of NFTs in the series

The code for creating the series is shown below. 

```js reference
https://github.com/keypom/keypom-js/blob/bc3221d1b95a88aa8bd660a4899df7667a0cfe45/docs-advanced-tutorials/ticketing/src/utils/createTickDrop.js#L63-L72
```

---

## Creating Linkdrops
The last step in this process is to create the links themselves so that you can easily distribute the assets to people. This is done by embedding the private key, containing the $NEAR, into the link along with the Keypom contract ID.  

Using the NEAR wallet, the linkdrop URL has the following standardized format:

```bash
wallet.${NETWORK}.near.org/linkdrop/${CONTRACT_ID}/${PRIVATE_KEY}
```

With this format, the following code can be written to generate a set of links for the drop.

```js 
pubKeys = keys.publicKeys

var dropInfo = {};
const {contractId: KEYPOM_CONTRACT} = getEnv()
// Creating list of pk's and linkdrops
for(var i = 0; i < keys.keyPairs.length; i++) {
    let linkdropUrl = `https://wallet.testnet.near.org/linkdrop/${KEYPOM_CONTRACT}/${keys.secretKeys[i]}`;
    dropInfo[pubKeys[i]] = linkdropUrl;
}
// Write file of all pk's and their respective linkdrops
console.log('Public Keys and Linkdrops: ', dropInfo)
```

---

## Full Code
Now that everything has been put together, the final code can be seen below.

```js reference
https://github.com/keypom/keypom-js/blob/bc3221d1b95a88aa8bd660a4899df7667a0cfe45/docs-advanced-tutorials/ticketing/src/utils/createTickDrop.js#L1-L85
```

---

## Running the Script
Here, you'll learn how to run the code that was just covered, and what to expect.

To view the completed code, clone the Keypom SDK repo and visit the examples directory:
``` bash
git clone https://github.com/keypom/keypom-js && cd keypom-js/docs-advanced-tutorial/
```
To run the code you just cloned, install all the necesasry packages. 
```bash
npm install
```

:::caution
Prior to running these scripts, ensure you replace all instances of `keypom-docs-demo.testnet` and its private key in the script with the credentials of your account found in your `~/.near-credentials` folder
:::

From there, you are able to run this FC Drop script that was made in this tutorial using the following command:
``` bash
npm run fc-keypom
```
:::note
The SDK script is being tested here; use `npm run fc-near` to test the `NEAR-API-JS` script instead.
:::
This should return a successful drop creation and console log a Public Key and Linkdrop

```bash
node src/utils/createTickDrop
```



```bash
Receipts: tWcTTDEULKaYnj8p2jXaqxJuUj4SNTJ2ZnRjWGGmXBf, HGXUzZTq2Sb88GCeBRn3X8WQ3aYvkTA8jh3VcuuGp2L9
        Log [v2.keypom.testnet]: Current Block Timestamp: 1677087279025680682
        Log [v2.keypom.testnet]: 20 calls with 100000000000000 attached GAS. Pow outcome: 1.8061103. Required Allowance: 18762630063718400000000
        Log [v2.keypom.testnet]: Total required storage Yocto 109950000000000000000000
        Log [v2.keypom.testnet]: Current balance: 2.6436194, 
            Required Deposit: 2.4952026, 
            total_required_storage: 0.10995,
            Drop Fee: 0, 
            Key Fee: 0 Total Key Fee: 0,
            allowance: 0.0375252 total allowance: 0.3752526,
            access key storage: 0.001 total access key storage: 0.01,
            deposits less none FCs: 0.1 total deposits: 1 lazy registration: false,
            deposits for FCs: 0.1 total deposits for FCs: 1,
            uses per key: 2
            None FCs: 1,
            length: 10
            GAS to attach: 100000000000000
        Log [v2.keypom.testnet]: New user balance 0.1484168
        Log [v2.keypom.testnet]: Fees collected 0
Public Keys and Linkdrops:  {
  'ed25519:ALok8t1PyC1k6GBC5Z3N1jKEMatFg1abJPpUQpFtQCzW': 'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/ws8gshPtT5zJBc6FfoiKXHfaQ2qey8q4n1Y91aW6q6m94UWFTMoL45NwMwtEZTXBrQ4BhLScB1K8JFVabgMj1mt',
  'ed25519:AgfdThFSgH4Zna8ovq8q97By1od2NXn6paYPiqvyEqp6': 'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/6DzXXf4mbCYgZiojP73js28wm6rhtWnnPduAiT5jzWQhCXaM7owvZLJKbsgYA8fZYvikHnxYXDH1zii9c1fzJPk',
  'ed25519:Hz5ppag9ezqFGFR7ZzUXHiCP8idsvqJGjAH6k1BHN7mE': 'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/38iHRqVW3YKobv5PQ37fFNtyQjH5CdC53c7FacCfFwb8HHvdcBJDZWRucnm75WY9PFEgA3DHrugtdFsgUMoo7LUC',
  'ed25519:7XTb2rFhEetv59NVYNz6jgfVXeHPG4Yq24nUdVGRG7CW': 'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/3VvdAgpv9u23CUeyb2MLud3qu3gzEPbLGHHG3iajPdnRp8b2RxgpwhVxzbrNDqA6yegi7oGbmdGYWa9cjiuTgPK8',
  'ed25519:7Sb5RrbC7hkcPZoH5eutyKYjj5jvdPd8WFonoAfRRzbS': 'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/5wkgUSKhe2YKNjBYK6njuJnwkVy2AUZvWiAfkUkutuPpsKb4iKmURnMMSB19qDhGih4a2CKp1vND8rDneSUh2MXn',
  'ed25519:BUpvErX7wXAd16ji76yUh14Mo9eFh1cNzd3nKipinFPN': 'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/bsC7zHMruhK8CJ6pxyj82AHvJH3har6Ubq28HNJj1xuLzVZiAhE3uTSREMdJwzygoK8ic6gsRU4yA2vspftnZgt',
  'ed25519:Baiqh6ezL6rJoUbJCSPWw9qXTMe2jaTzZF1DQTx1ScYj': 'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/2rzVcJ6CbfM23Cf6o6UTHPVdist2M745YZeJWf595yUipe2Yuya95ZBSoz8sMYquAGVsEy7HhFmXKXbBn1cnKHU7',
  'ed25519:58Q7NfdwHeDfSPEoUHiSeisQcTrgXZa25duKc18Re8Fc': 'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/21peaxNv5gpYy1s71VRUivkMLyM43DqBqpuZq99FQDFFWyJ3wzD7rP4VLCnQ2DLxfjVFsGEtzikZqaPGqw1gMdZL',
  'ed25519:9qwkPn7krvqEx3RqujPLqxJBdP3bmvzhjBCsjgZUhoer': 'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/2s9u1HttZwdgwbwYs3N61G3XnAxEz2NSSttz9usWVfxocHyQ1cid5mW1nMoDsd5j6iWXRNkJz7iymK4RSeTztkEv',
  'ed25519:Era5gnMWVoxbJWuGBSXN377w28qrs4niEZY1K7A7NnPs': 'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/2Sor9GN5xvwDPRWBnosg8Snn6hcxGm4Kf9gkpcDXZkXMu7SGcBj1vpoQ92pxX2ncdqs4bTCHx6H8qgB7Tm7dfXzy'
}
Keypom Contract Explorer Link: explorer.testnet.near.org/accounts/v2.keypom.testnet.com
```

---

## Conclusion

So far, you've learned how to set up your React app, as well as break down the ticketing system into functional requirments. You then took those requirements and wrote a script to create the drop.

In the next tutorial, the ticketing process will be broken down into stages. From there, the react app to reflect those states will be created.


