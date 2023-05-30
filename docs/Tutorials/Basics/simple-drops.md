---
sidebar_label: 'Simple Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Simple Drop

## Introduction
In this tutorial, you will learn how to create a simple $NEAR drop from scratch. By embedding $NEAR in a Web2 style link, the simple drop allows you to onboard both existing and new users. 

Being the simplest Keypom drop type, it acts as the foundation for the other 3 kinds of Keypom drops. Despite this, the simple drop opens the door to more complex use cases such as [subscription services](../../Tutorials/Advanced/subscriptions/introduction.md).

<p align="center"> <img src={require("/static/img/docs/basic-tutorials/simple/nw-claim.png").default} alt="Near Wallet claim" width="100%"/> </p>

To learn more about the Simple Drop, see the [concepts page](../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/simple-drops.md)

---

## Prerequisites
For the basic tutorials, you can choose to run the scripts on your own machine. To do so, you must have the following:

1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [NEAR-API-JS](https://docs.near.org/tools/near-api-js/quick-reference#install)  
3. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)

With this tutorial, you can either create your own script by following along, or view the completed script available in the [Keypom Documentation Examples](https://github.com/keypom/keypom-docs-examples) repo.

### Creating your Project
In this section, you're going to create your project and install the SDK to prepare for the tutorial. If you have a completed script and have installed the SDK, you can skip [forward](simple-drops.md#breaking-down-the-problem).

First, you need to give your project a home.
 
```bash
mkdir my-keypom-project && cd my-keypom-project
```

Next, you'll want to create a default `package.json` file using the following command. You can accept all default values.
```bash
npm init
```

At this point, your project structure should look like this. 
```bash
/my-keypom-project
├── package.json
```

If you open `package.json`, you should see this.

<details>
<summary>Default package.json</summary>
<p>

``` bash
{
  "name": "my-keypom-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

</p>
</details>

The next step is to create an empty JavaScript file.
<Tabs>
<TabItem value="Mac/Lnx" label="Mac OS/Linux">

```bash
touch simple-keypom.js
```

</TabItem>
<TabItem value="WNDS" label="Windows">

```bash
fsutil file createnew simple-keypom.js 0
```

</TabItem>
</Tabs>

Finally, the last step is to install the Keypom JS SDK.
```bash
npm install @keypom/core
```

After installing the SDK, your `package.json` file should now look slightly different.

<details>
<summary>package.json after installing the SDK</summary>
<p>

```bash
{
  "name": "my-keypom-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  # highlight-start
  "dependencies": {
    "@keypom/core": "^1.0.0"
  }
  # highlight-end
}
```

</p>
</details>

With these steps complete, your project folder should look like this. 

```bash
/my-keypom-project
├── simple-keypom.js
├── package.json
├── package-lock.json
├── node_modules
│   └── @keypom/core
│   └── ...
```

You are now ready to begin creating your drop!

---

## Breaking Down the Problem

Creating a simple drop is a four step process:  

1) Establish a connection to the NEAR blockchain.  
2) Create a set of access keys where the assets will be stored.  
3) Use the Keypom SDK to create the drop.  
4) Create linkdrops.  

The following skeleton code can be used as a starting point:
``` js
// Each of the two methods to create this drop will have their own unique set of imports

// Imports used in the Keypom SDK method:
const { initKeypom, createDrop, getEnv, formatLinkdropUrl } = require("@keypom/core");
const { UnencryptedFileSystemKeyStore } = require("@near-js/keystores-node");
const { connect, Near } = require("@near-js/wallet-account");
const path = require("path");
const homedir = require("os").homedir();

// Imports used in the NEAR-API-JS method:
const { parseNearAmount } = require("@near-js/utils");
const { KeyPair } = require("@near-js/crypto")
const { Near } = require("@near-js/wallet-account");
const { Account } = require("@near-js/accounts");
const { UnencryptedFileSystemKeyStore } = require("@near-js/keystores-node");
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
The first step to create a Keypom drop is connecting to the NEAR blockchain.

This is done with `NEAR-API-JS` and consists of the following steps:

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
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/simple-drop/simple-example.js#L10-L28
```

---

## Creating the Simple Drop
Now that the connection to the NEAR blockchain is set up, the next step is to create the Keypairs and the drop using the Keypom SDK.



`initKeypom` initializes the SDK to allow for interactions with the Keypom smart contracts. Without it, none of the other SDK functions would work as expected. If a NEAR connection is not already present, it will initialize a new one for you. More info on the `initKeypom` function can be found [here](../../keypom-sdk/Core/modules.md#initkeypom).

After `initKeypom` is called, the key generation and drop creation can be done. These two tasks are combined into one function, `createDrop`. This function can be either given a set of pre-created keypairs, **or** it can generate them automatically based on the `numKeys` parameter.

:::tip
Recall that the private keys being generated are used to store the assets. These keys are then embedded within a link.

In a Simple Drop, the assest is $NEAR.
:::

To see what the SDK is doing behind the scenes, a `NEAR-API-JS` equivalent NodeJS script has been provided.


<Tabs>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/simple-drop/simple-example.js#L30-L45
```

</TabItem>
<TabItem value="NRJS" label="💻 NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/simple-drop/simple-near-example.js#L34-L59
```

</TabItem>
</Tabs>

:::note
All function parameters and default values for the SDK and Keypom functions can be found in the [SDK Typedocs](../../keypom-sdk/Core/modules.md). For `NEAR-API-JS` functions, their arguments can be found [here](https://docs.near.org/tools/near-api-js/reference)
:::

---

## Creating Linkdrops
The last step in this process is to create the links themselves so that you can easily distribute the assets to people. This is done by embedding the private key, containing the $NEAR, into the link along with the Keypom contract ID.  

With the Keypom SDK, this is all neatly wrapped up in the function [`formatLinkdropUrl`](../../keypom-sdk/Core/modules.md#formatlinkdropurl). You just need to provide the base URL format and the private key you wish to embed.

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/simple-drop/simple-example.js#L47-L53
```

---

## Full Solution
Now that everything has been put together, the final code can be seen below.

<Tabs>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/simple-drop/simple-example.js#L1-L61
```

</TabItem>
<TabItem value="NRJS" label="💻 NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/simple-drop/simple-near-example.js#L1-L71
```

</TabItem>
</Tabs>

---

## Testing
### Running the Script
Here, you'll learn how to run the code that was just covered, and what to expect.

To view the completed code, clone the [Keypom Docs Examples](https://github.com/keypom/keypom-docs-examples) repository and navigate to the `basic-tutorials/simple-drop`.
``` bash
git clone https://github.com/keypom/keypom-docs-examples.git && cd keypom-docs-examples/basic-tutorials/simple-drop
```
From there, you can and open the `simple-example.js` file.

To run the code you just cloned, return to the `keypom-docs-examples` directory and install all the necessary packages. 
```bash
cd .. && cd .. && yarn
```

:::caution
Prior to running these scripts, ensure you replace all instances of `keypom-docs-demo.testnet` in the script with the credentials of your account found in your `~/.near-credentials` folder
:::

From there, you can run this Simple Drop script that was made in this tutorial using the following command:
``` bash
yarn basic:simple:keypom
```
:::note
The SDK script is being tested here; use `yarn basic:simple:naj` to test the `NEAR-API-JS` script instead.
:::
This should return a successful drop creation and console log a Public Key and Linkdrop: 
```bash
Public Keys:  [ 'ed25519:CsTpJ3pSZUkkcfVEsA6Fqkgz6BFgmhNfCGzPuqdj24wc' ]
Linkdrops:  [
  'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/CNbTQgJ83dLPvg4ibCQGH9Wi1sJhSQkh4YDXKxibXU3cn66oZP5eqLE83m5z5eTqBKxSvJzmDXH7gYTMXzMEfdk'
]
Keypom Contract Explorer Link: explorer.testnet.near.org/accounts/v2.keypom.testnet.com
```
To see the full console log from this drop creation, see the expandable section below.

<details>
<summary>Console Log of Test</summary>
<p>

``` bash
Receipts: GZegewWCTMfpKWZ8ffpVkRb3fLYjyfnyCvqRRmwRkKSt, 3tueZ12bwu86EYEgPVaMjQJuSUNfWcwnDENQGk6jGzmo
        Log [v2.keypom.testnet]: Current Block Timestamp: 1682352132162930850
        Log [v2.keypom.testnet]: 21 calls with 105000000000000 attached GAS. Pow outcome: 1.8602935. Required Allowance: 20248156910387200000000
        Log [v2.keypom.testnet]: Total required storage Yocto 11170000000000000000000
        Log [v2.keypom.testnet]: Current balance: 8.2496314, 
            Required Deposit: 1.0324181, 
            total_required_storage: 0.01117,
            Drop Fee: 0, 
            Key Fee: 0 Total Key Fee: 0,
            allowance: 0.0202481 total allowance: 0.0202481,
            access key storage: 0.001 total access key storage: 0.001,
            deposits less none FCs: 1 total deposits: 1 lazy registration: false,
            deposits for FCs: 0 total deposits for FCs: 0,
            uses per key: 1
            None FCs: 0,
            length: 1
            GAS to attach: 100000000000000
        Log [v2.keypom.testnet]: New user balance 7.2172133
        Log [v2.keypom.testnet]: Fees collected 0
Public Keys:  [ 'ed25519:CsTpJ3pSZUkkcfVEsA6Fqkgz6BFgmhNfCGzPuqdj24wc' ]
Linkdrops:  [
  'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/CNbTQgJ83dLPvg4ibCQGH9Wi1sJhSQkh4YDXKxibXU3cn66oZP5eqLE83m5z5eTqBKxSvJzmDXH7gYTMXzMEfdk'
]
Keypom Contract Explorer Link: explorer.testnet.near.org/accounts/v2.keypom.testnet.com
```

</p>
</details>

### Claiming and Explorer Transactions
Once you click the link, it will take you to the following NEAR Wallet page, where you will have the choice to claim with an existing account or create a new one.  
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/simple/nw-claim.png").default} alt="Near Wallet claim" width="80%"/> </p>

To check the transactions, click the final link in the console log when you run the script.
``` md
Keypom Contract Explorer Link: explorer.testnet.near.org/accounts/v2.keypom.testnet.com
```

From there, you should be able to see the [`create_drop`](https://explorer.testnet.near.org/transactions/6cQGRMJhmn16LCEDLKWYnFJrz3cAP7zSW36jhFwwk5sT) and [`claim`](https://explorer.testnet.near.org/transactions/BkNe1Dwzer22WW6vVBbCY75qHbkDitYYca7e4cjPTBsJ) transactions. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/simple/explorer.png").default} alt="explorer transactions" width="80%"/> </p>

---

## Conclusion
In this tutorial, you learned the basic steps of [creating a simple drop](simple-drops.md#introduction), steps to [initialize](simple-drops.md#getting-started---connecting-to-near) a NEAR blockchain connection, and how to [create](simple-drops.md#creating-the-simple-drop) the keys and drop. You also learned the purpose of the `initKeypom` function and when to use it. Once the drop was created, you constructed a valid linkdrop using the private keys in order to claim the assets.

In the next tutorial, you'll be learning how to create and fund an NFT drop using the Keypom SDK.
