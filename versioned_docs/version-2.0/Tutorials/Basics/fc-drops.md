---
sidebar_label: 'Function Call Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Function Call Drop

## Introduction

In this tutorial, you are going to learn how to create a Function Call Drop from scratch. Similar to how the other drops can be claimed by both new and existing users, FC drops are a great onboarding tool. The difference, is that FC drops can invoke methods on external smart contracts when the link is claimed. This allows for a ton of flexibility and use-cases such as [auto-registering users into a DAO](../../Tutorials/Advanced/daos/introduction.md) as part of the onboarding process.

In this tutorial, the function call will be to Lazy Mint an NFT.

<p align="center"> <img src={require("/static/img/docs/basic-tutorials/nft/collectibles-claimed2.png").default} alt="NFT collectibles claim" width="65%"/> </p>

To learn more about what the FC drop, see the [concepts page](../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/fc-drops.md)


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
touch fc-keypom.js
```

</TabItem>
<TabItem value="WNDS" label="Windows">

```bash
fsutil file createnew fc-keypom.js 0
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
├── fc-keypom.js
├── package.json
├── package-lock.json
├── node_modules
│   └── keypom-js
│   └── ...
```

You are now ready to begin creating your drop!

---


## Breaking Down the Problem

A Function Call Drop is Keypom's most powerful drop type. A brief breakdown of how an FC drop works is as follows:

For every key-use, a set of functions is called in the order that they are defined. For multi-use keys, this set can vary across different key uses.

An example scenario for a multi-use key can be seen below.


| Key Use    | Functions called during n<sup>th</sup> Key Use |
| -----------| ---------------------------------------------- |
| Key Use 1  | `nft_mint`                                     |
| Key Use 2  | `sign_message`, `update_message`               |
| Key Use 3  | `mint_fungible_tokens`                         |

:::note
In this tutorial, the key will be single use and only call `nft_mint`.
:::

The process of creating an FC drop is similar to the other drop types:

1) Connect to the NEAR blockchain  
2) Create drop with function call data  

The following skeleton code can be used as a starting point:
``` js
// Each of the two methods to create this drop will have their own unique set of imports

// Imports used in the Keypom SDK method:
const { initKeypom, createDrop, getEnv, formatLinkdropUrl } = require("@keypom/core"); 
const { parseNearAmount } = require("@near-js/utils");
const { UnencryptedFileSystemKeyStore } = require("@near-js/keystores-node");
const { Near } = require("@near-js/wallet-account");
const { Account } = require("@near-js/accounts");
const path = require("path");
const homedir = require("os").homedir();

// Imports used in the NEAR-API-JS method:
const { parseNearAmount } = require("@near-js/utils");
const { KeyPair } = require("@near-js/crypto")
const { UnencryptedFileSystemKeyStore } = require("@near-js/keystores-node");
const { Near } = require("@near-js/wallet-account");
const { Account } = require("@near-js/accounts");
const path = require("path");
const homedir = require("os").homedir();


async function fcDropKeypom(){
// STEP 1: Initiate a NEAR connection.

// STEP 2: Create the drop with function call data.
}

fcDropKeypom()

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
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/function-call-drop/fc-example.js#L10-L30
```

## Creating Drop with Function Call Data
In this section, you'll learn about the process of creating an FC drop using the SDK. 

This process starts with calling the `initKeypom` function and will always be the first function you call to interact with the Keypom SDK. 

`initKeypom` initializes the SDK to allow for interactions with the Keypom smart contracts. Without it, none of the other SDK functions would work as expected. If a NEAR connection is not already present, it will initialize a new one for you. More info on the `initKeypom` function can be found [here](../../keypom-sdk/Core/modules.md#initkeypom).

After `initKeypom` is called, the FC Drop can be created by calling `createDrop` and adding an `fcData` parameter. 

:::tip
Recall that the private keys being generated using `createDrop` are used to store the assets. These keys are then embedded within a link.

In an FC Drop, the assets consist of a set of invokable methods and optional $NEAR.
:::

The primary task in creating the Function Call Drop is to define fcData. It is an object containing a methods field that outlines what methods should be called for a given key use:


```bash
fcData
└── methods
```

For multi-use keys, each specific use can have a different set of methods that will be called. These methods are executed sequentially and not in parallel. As an example, a key with 3 uses can be seen:

1. `nft_mint`
2. `null`
3. `create_account_advanced`, `setup`, `nft_mint` 

The first time the key is used, an NFT will be minted. The second use will simply advance the key and nothing will be called. The third time the key is used, it will first call `create_account_advanced`. Once that's finished it will call the `setup` method and then finally `nft_mint`.  

This is represented with a 2D array, where each inner is the set of methods per key use. The above example would be represented as:

```js
methods: [
  [
    "nft_mint"
  ], 
  null, 
  [
    "create_account_advanced", 
    "setup", 
    "nft_mint"
  ]
]
```

Every method listed represents a function call and requires the following parameters:   

- `receiverId`: The contract receiving the function call.  
- `methodName`: The function to be called on the receiver contract.  
- `args`: A stringified JSON object of all the arguments to be passed into `methodName`.  
- `attachedDeposit`: The yoctoNear deposit attached to the function call when the key is used.  

In this tutorial only one function call will be made: `nft_mint` in order to lazy mint an NFT.

Including the `fcData` parameter categorizes this as an FC drop. Without it, the Keypom Protocol would treat this drop as a Simple Drop. More information on the `fcData` parameter can be found [here](../../keypom-sdk/Core/interfaces/FCData.md).

To see what the SDK is doing behind the scenes, a `NEAR-API-JS` equivalent NodeJS script has been provided.

<Tabs>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/function-call-drop/fc-example.js#L32-L71
```

</TabItem>
<TabItem value="NRJS" label="💻 NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/function-call-drop/fc-near-example.js#L33-L82
```

</TabItem>
</Tabs>

---

## Creating Linkdrops
The last step in this process is to create the links themselves so that you can easily distribute the assets to people. This is done by embedding the private key, containing the $NEAR, into the link along with the Keypom contract ID.  

With the Keypom SDK, this is all neatly wrapped up in the function [`formatLinkdropUrl`](../../keypom-sdk/Core/modules.md#formatlinkdropurl). You just need to provide the base URL format and the private key you wish to embed.

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/function-call-drop/fc-example.js#L73-L79
```

---

## Complete Code
Now that everything has been put together, the final code can be seen below.

<Tabs>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/function-call-drop/fc-example.js#L1-L86
```

</TabItem>
<TabItem value="NRJS" label="💻 NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/function-call-drop/fc-near-example.js#L1-L95
```

</TabItem>
</Tabs>

---

## Testing
### Running the Script
Here, you'll learn how to run the code that was just covered, and what to expect.

To view the completed code, clone the [Keypom Docs Examples](https://github.com/keypom/keypom-docs-examples) repository and navigate to the `basic-tutorials/fc-drop`.
``` bash
git clone https://github.com/keypom/keypom-docs-examples.git && cd keypom-docs-examples/basic-tutorials/fc-drop
```
From there, you can and open the `fc-example.js` file.

To run the code you just cloned, return to the `keypom-docs-examples` directory and install all the necessary packages. 
```bash
cd .. && cd .. && yarn
```

:::caution
Prior to running these scripts, ensure you replace all instances of `keypom-docs-demo.testnet` in the script with the credentials of your account found in your `~/.near-credentials` folder
:::

From there, you can run this FC Drop script that was made in this tutorial using the following command:
``` bash
yarn basic:fc:keypom
```
:::note
The SDK script is being tested here; use `yarn basic:fc:naj` to test the `NEAR-API-JS` script instead.
:::
This should return a successful drop creation and console log a Public Key and Linkdrop
``` bash
Public Keys:  [ 'ed25519:55FkiRc4J3c1zLgzuTYxJMebVrpraXU3P7zPymDtbssN' ]
Linkdrops:  [
  'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/2BB8cx2xaKzY1ENBCoVz7bTFUgq8Gx6Ar27D5PbCv39NnZLfWxw3XqWr37HZ1xm3KdQ5uCt8hvt6ztF1eGBQC1Hi'
]
Keypom Contract Explorer Link: explorer.testnet.near.org/accounts/v2.keypom.testnet.com
```
To see the full console log from this drop creation, see the expandable section below.

<details>
<summary>Console Log of Test</summary>
<p>

``` bash
Receipts: 4MTrVP1cvemzA1XhmX4hHErYvmcgMCgfrXydwNTeez3Y, 8LDCtYSsN5ccFY5udxbYqoVzmxyubqZBRLvMR33FUREN
        Log [v2.keypom.testnet]: Current Block Timestamp: 1682352446955649219
        Log [v2.keypom.testnet]: 21 calls with 105000000000000 attached GAS. Pow outcome: 1.8602935. Required Allowance: 20248156910387200000000
        Log [v2.keypom.testnet]: Total required storage Yocto 14230000000000000000000
        Log [v2.keypom.testnet]: Current balance: 9.3089748, 
            Required Deposit: 2.0354781, 
            total_required_storage: 0.01423,
            Drop Fee: 0, 
            Key Fee: 0 Total Key Fee: 0,
            allowance: 0.0202481 total allowance: 0.0202481,
            access key storage: 0.001 total access key storage: 0.001,
            deposits less none FCs: 1 total deposits: 1 lazy registration: false,
            deposits for FCs: 1 total deposits for FCs: 1,
            uses per key: 1
            None FCs: 0,
            length: 1
            GAS to attach: 100000000000000
        Log [v2.keypom.testnet]: New user balance 7.2734966
        Log [v2.keypom.testnet]: Fees collected 0
Public Keys:  [ 'ed25519:55FkiRc4J3c1zLgzuTYxJMebVrpraXU3P7zPymDtbssN' ]
Linkdrops:  [
  'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/2BB8cx2xaKzY1ENBCoVz7bTFUgq8Gx6Ar27D5PbCv39NnZLfWxw3XqWr37HZ1xm3KdQ5uCt8hvt6ztF1eGBQC1Hi'
]
Keypom Contract Explorer Link: explorer.testnet.near.org/accounts/v2.keypom.testnet.com
```

</p>
</details>

### Claiming and Explorer Transactions
Once you click the link, it will take you to the following NEAR Wallet page, where you will have the choice to claim with an existing account or create a new one. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/fc/nw-claim.png").default} alt="NEAR Wallet claim" width="80%"/> </p>

To check the transactions, click the final link in the console log when you run the script.
```bash
Keypom Contract Explorer Link: https://explorer.testnet.near.org/accounts/v2.keypom.testnet 
```

From there, you should be able to see the [`create_drop`](https://explorer.testnet.near.org/transactions/DF6awbmts4hhACBTA8oBSGdt1oJh7FNCBkv36wZboZXR) and [`claim`](https://explorer.testnet.near.org/transactions/m2LJE2Xv1TMwpbEm5SVj2VGqZxBybkQphXouupJKMg8) transactions. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/fc/explorer.png").default} alt="explorer transactions" width="80%"/> </p>

Within the [`claim`](https://explorer.testnet.near.org/transactions/Cgckyr9EEC3o9MDiL8E2mvs6JYPuCApYqWjpgZvy3z6U) transaction, you can also see that `nft_mint` was called on the `nft.examples.testnet` contract. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/fc/nft-mint.png").default} alt="explorer transactions" width="80%"/> </p>

This can be confirmed by visiting the "Collectibles" tab in your NEAR wallet. You should see the newly minted NFT in your wallet.  
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/nft/collectibles-claimed2.png").default} alt="NFT collectibles claim" width="65%"/> </p>

---

## Conclusion
In this tutorial, you learned the how to [create a function call drop](fc-drops.md#creating-drop-with-function-call-data) using the `fcData` parameter. Once the drop was created, you constructed a valid linkdrop using the private keys in order to claim the assets.

Now that you've had a good introduction to creating all 4 Keypom drop types, feel free to modify the scripts created or move on to the [Advanced Tutorials](../Advanced/ticketing/introduction.md) for more challenging and practical examples.
