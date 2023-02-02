---
sidebar_label: 'Simple Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Simple Drop

## Introduction
In this tutorial, you will learn how to create a Simple $NEAR Drop. This will allow you to onboard users using a simple Web2 style link. Alternatively, if the user has a wallet already, the assets can be sent there instead.

In a simple drop, the assets consist of $NEAR. 


<p align="center"> <img src={require("/static/img/docs/basic-tutorials/simple/nw-claim.png").default} alt="Near Wallet claim" width="100%"/> </p>

To learn more about the Simple Drop, see the [concepts page](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/simpledrops.md)

---

## Prerequisites
For the basic tutorials, you can choose to run the scripts on your own machine. To do so, you must have the following:

1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [`NEAR-API-JS`](https://docs.near.org/tools/near-api-js/quick-reference#install)  
3. To [install the SDK](https://github.com/keypom/keypom-js#installation), simply run the following in your command prompt.  
```bash
npm -i keypom-js
```

---

## Breaking Down the Problem

Creating a simple drop is a four step process:  

1) Establishing a connection to the NEAR blockchain.  
2) Create a set of access keys where the assets will be stored.  
3) Use the Keypom SDK to create the drop  
4) Create linkdrops  

The following skeleton code can be used as a starting point:
``` js
// Each of the two methods to create this drop will have their own unique set of imports

// Imports used in the Keypom SDK method:
const { initKeypom, createDrop } = require("keypom-js");
const { KeyPair, keyStores, connect } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

// Imports used in the NEAR-API-JS method:
const { parseNearAmount, formatNearAmount } = require("near-api-js/lib/utils/format");
const { KeyPair, keyStores, connect } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();


async function simpleDropKeypom(){
// STEP 1: Initiate a NEAR connection.

// STEP 2: Create a set of access keys 

// STEP 3: Create the drop.

// STEP 4: Create linkdrops
}

simpleDropKeypom()

```

---

## Getting Started - Connecting to NEAR
The first step of creating an Keypom drop is to connect to the NEAR blockchain.

This is done with `NEAR-API-JS` and consists of the following steps:

1) Create an Keystore, which stores your access keys used to sign transactions   
  * select a network, either `testnet` or `mainnet`  
  * choose a location for the Keystore, either a folder on your local machine, or an in-memory keystore   

2) Define a NEAR configuration using the Keystore  
3) Use the configuration to initialize a connection to NEAR  

More information about this process can be found [here](https://docs.near.org/tools/near-api-js/quick-reference#key-store).

:::note
For simplicity, this tutorial will choose a file-based keystore and point to the `~/.near-credentials` folder on your local machine since this is where most of your keys are stored. For more information about KeyStores, visit NEAR's [official docs](https://docs.near.org/tools/near-api-js/quick-reference#key-store).
:::


```js reference
https://github.com/keypom/keypom-js/blob/bbe4716ff64dd7a73a6d727a5aea518e8141f60f/docs-examples/keypom-js-sdk/simple-example.js#L8-L25
```

---

## Creating the Simple Drop
Now that the connection to the NEAR blockchain is set up, the next step is to create the Keypairs and the drop using the Keypom SDK.


In the SDK, this process starts with calling the `initKeypom` function. This function will always be the first function you need to call to interact with the SDK. 

`initKeypom` initializes the SDK to allow for interactions with the Keypom Protocol. Without it, none of the other SDK functions would work as expected. If a NEAR connection is not already present,it will initialize a new one for you. More info on the `initKeypom` function can be found [here](../../keypom-sdk/modules#initkeypom).

:::info
The `initKeypom` function is the first function you need to call in order to interact with the SDK.
:::

After `initKeypom` is called, the key generation and drop creation can be done. These two tasks are combined into one function, `createDrop`. This function can be either given a set of pre-created keypairs, **or** it can create them automatically with the `numKeys` parameter.

:::tip
Recall that the private keys being generated are used to store the assets. These keys are then embedded within a link.

In a Simple Drop, the assest consist of $NEAR.
:::

To see what the SDK is doing behind the scenes, a `NEAR-API-JS` equivalent NodeJS script has been provided.


<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/bbe4716ff64dd7a73a6d727a5aea518e8141f60f/docs-examples/keypom-js-sdk/simple-example.js#L27-L41
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/bbe4716ff64dd7a73a6d727a5aea518e8141f60f/docs-examples/near-api-js/simple-near-example.js#L26-L51
```

</TabItem>
</Tabs>

:::note
All function parameters and default values for the SDK and Keypom functions can be found in the [SDK Typedocs](../../keypom-sdk/modules.md). For `NEAR-API-JS` functions, their arguments can be found [here](https://docs.near.org/tools/near-api-js/reference)
:::

---

## Creating Linkdrops
The last step in this process is to create the links themselves so that you can share the drop you just created. This is done by embedding the private key, which containing the assets, into the link along with the Keypom contract ID.  

Using the NEAR wallet, the link for a linkdrop has the following standardized format:

```bash
wallet.${NETWORK}.near.org/linkdrop/${CONTRACT_ID}/${PRIVATE_KEY}
```

Using this format, the following code can be written to generate a set of links for the drop.

```js 
pubKeys = keys.publicKeys

var dropInfo = {};
const KEYPOM_CONTRACT = "v1-3.keypom.testnet"
// Creating list of pk's and linkdrops; copied from orignal simple-create.js
for(var i = 0; i < keys.keyPairs.length; i++) {
    let linkdropUrl = `https://wallet.testnet.near.org/linkdrop/${KEYPOM_CONTRACT}/${keys.secretKeys[i]}`;
    dropInfo[pubKeys[i]] = linkdropUrl;
}
// Write file of all pk's and their respective linkdrops
console.log('Public Keys and Linkdrops: ', dropInfo)
```

---

## Full Solution
Now that everything has been put together, the final code can be seen below.

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/bbe4716ff64dd7a73a6d727a5aea518e8141f60f/docs-examples/keypom-js-sdk/simple-example.js#L1-L57
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/bbe4716ff64dd7a73a6d727a5aea518e8141f60f/docs-examples/near-api-js/simple-near-example.js#L1-L63
```

</TabItem>
</Tabs>

---

## Testing
### Running the Script
Here, you'll learn how to run the code that was just covered, and what to expect.

To view the completed code, clone the Keypom SDK repo and visit the examples directory:
``` bash
git clone https://github.com/keypom/keypom-js && cd keypom-js/docs-examples/keypom-js-sdk/simple-example.js
```
To run the code you just cloned, install all the necesasry packages. 
```bash
npm install
```

:::caution
Prior to running these scripts, ensure you replace all instances of `keypom-docs-demo.testnet` in the script with the credentials of your account found in your `~/.near-credentials` folder
:::

From there, you are able to run this Simple Drop script that was made in this tutorial using the following command:
``` bash
npm run simple-keypom
```
:::note
The SDK script is being tested here; use `npm run simple-near` to test the `NEAR-API-JS` script instead.
:::
This should return a successful drop creation and console log a Public Key and Linkdrop: 
```bash
Public Keys and Linkdrops:  {
  'ed25519:8nCdZ32nRUdZRXs4dSgjq2FiJnsgMSJYpxNJ4cg7Z1iz': 'https://wallet.testnet.near.org/linkdrop/v1-3.keypom.testnet/5gzHZeLFDyDJHeCVtACwQxbMj8BRTeuu1WVd7eSNhjtc89uZjCoxXW3vh8R1RwEK44w3rb7sBAqMg5hR1MCHsC6e'
}
```
To see the full console log from this drop creation, see the expandable section below.

<details>
<summary>Console Log of Test</summary>
<p>

``` bash
yarn run v1.22.19
warning ../../../package.json: No license field
$ node docs-examples/keypom-js-sdk/simple-example.js
Receipts: AJ5so8mEDh9XEYNcB7vomTxUDV3BAMyLVA7QMguHuscA, 4YyHuHyMh1gZimE2Ep3Y4boasFj5cbXr9TmL2qkNkG6Z
        Log [v1-3.keypom.testnet]: Current Block Timestamp: 1674847726484923818
        Log [v1-3.keypom.testnet]: 20 calls with 100000000000000 attached GAS. Pow outcome: 1.8061103. Required Allowance: 18762630063718400000000
        Log [v1-3.keypom.testnet]: Total required storage Yocto 11110000000000000000000
        Log [v1-3.keypom.testnet]: Current balance: 1.2083208, 
            Required Deposit: 1.0308726, 
            total_required_storage: 0.01111,
            Drop Fee: 0, 
            Key Fee: 0 Total Key Fee: 0,
            allowance: 0.0187626 total allowance: 0.0187626,
            access key storage: 0.001 total access key storage: 0.001,
            deposits less none FCs: 1 total deposits: 1 lazy registration: false,
            deposits for FCs: 0 total deposits for FCs: 0,
            uses per key: 1
            None FCs: 0,
            length: 1
            GAS to attach: 100000000000000
        Log [v1-3.keypom.testnet]: New user balance 0.1774482
        Log [v1-3.keypom.testnet]: Fees collected 0
Public Keys and Linkdrops:  {
  'ed25519:8nCdZ32nRUdZRXs4dSgjq2FiJnsgMSJYpxNJ4cg7Z1iz': 'https://wallet.testnet.near.org/linkdrop/v1-3.keypom.testnet/5gzHZeLFDyDJHeCVtACwQxbMj8BRTeuu1WVd7eSNhjtc89uZjCoxXW3vh8R1RwEK44w3rb7sBAqMg5hR1MCHsC6e'
}
Keypom Contract Explorer Link: https://explorer.testnet.near.org/accounts/v1-3.keypom.testnet 
```

</p>
</details>

### Claiming and Explorer Transactions
Once you have the link, you are able to claim the linkdrop you've just created. Once clicked, it will take you to the following NEAR Wallet page, where you will have the choice to claim with an existing account or create a new one. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/simple/nw-claim.png").default} alt="Near Wallet claim" width="80%"/> </p>

To check the transactions, click the final link in the console log when you run the script.
``` md
Keypom Contract Explorer Link: https://explorer.testnet.near.org/accounts/v1-3.keypom.testnet
```

From there, you should be able to see the [`create_drop`](https://explorer.testnet.near.org/transactions/f5HHxMyUELD8oGFpMCQAKcYVhyLAfKyjmXAeFG68FCB#AJ5so8mEDh9XEYNcB7vomTxUDV3BAMyLVA7QMguHuscA) and [`claim`](https://explorer.testnet.near.org/transactions/BApV2YJh8yHUGJ5c4KUnBPNyjAt4znxAFUxPzDXognu5) transactions. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/simple/explorer.png").default} alt="explorer transactions" width="80%"/> </p>

---

## Conclusion
In this tutorial, you learned the basic steps of [creating a simple drop](simple-drops.md#introduction), how to [initialize](simple-drops.md#getting-started---connecting-to-near) a NEAR blockchain connection, and how to [create](simple-drops.md#creating-the-simple-drop) the keys and drop. You also learned the purpose of the `initKeypom` function and when to use it.

In the next tutorial, you'll be learning how to create and fund an NFT drop using the Keypom SDK.
