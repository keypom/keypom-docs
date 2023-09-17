---
sidebar_label: 'Fungible Token Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fungible Token Drop

## Introduction
In this tutorial, you will learn how to create a fungible token drop from scratch. This allows you onboard users both with $NEAR and a set of FTs with the click of a link. An excellent use case can be seamlessly offering in-game currency to players.

<p align="center"> <img src={require("/static/img/docs/basic-tutorials/ft/ft.png").default} alt="ft claim" width="80%"/> </p>

To learn more about the FT drop, see the [concepts page](../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/ft-drops.md)


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
touch ft-keypom.js
```

</TabItem>
<TabItem value="WNDS" label="Windows">

```bash
fsutil file createnew ft-keypom.js 0
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
├── ft-keypom.js
├── package.json
├── package-lock.json
├── node_modules
│   └── @keypom/core
│   └── ...
```

You are now ready to begin creating your drop!

---


## Breaking Down the Problem

The process of creating an FT drop can be broken down into the following steps.  

1) Connect to the NEAR blockchain.  
2) Ensure the funder has enough FTs to fund the drop.  
3) Create the drop.    
4) Transfer  Keypom the necessary Fungible Tokens.  
5) Create linkdrops.   

The following skeleton code can be used as a starting point:
```js
// Each of the two methods to create this drop will have their own unique set of imports

// Imports used in the Keypom SDK method:
const { initKeypom, createDrop, getEnv, formatLinkdropUrl } = require("@keypom/core");
const { parseNearAmount } = require("@near-js/utils");
const { UnencryptedFileSystemKeyStore } = require("@near-js/keystores-node");
const { Near } = require("@near-js/wallet-account");
const { Account } = require("@near-js/accounts");
const { BN } = require("bn.js");
const path = require("path");
const homedir = require("os").homedir();

// Imports used in the NEAR-API-JS method:
const { parseNearAmount } = require("@near-js/utils");
const { KeyPair } = require("@near-js/crypto")
const { Near } = require("@near-js/wallet-account");
const { Account } = require("@near-js/accounts");
const { UnencryptedFileSystemKeyStore } = require("@near-js/keystores-node");
const { getRecentDropId } = require("../utils/general.js")
const { BN } = require("bn.js");
const path = require("path");
const homedir = require("os").homedir();


async function FTDropKeypom(){
// GETTING STARTED

//      STEP 1 Initialize NEAR blockchain connection.

//      STEP 2 Ensure the funder has enough FTs to fund the drop.

// CREATING DROP AND TRANSFERRING FTs

//      STEP 3 Create the drop.

//      STEP 4 Transfer Keypom the necessary Fungible Tokens.

// CREATING LINKDROPS

//      STEP 5 Create Linkdrops
}

FTDropKeypom()
```
Steps 1 and 2 will be covered in "[Getting Started](ft-drops.md#getting-Started)" and Steps 3, 4, and 5 will be under "[Creating FT drop and Transferring FTs](ft-drops.md#creating-drop-and-transferring-fts)". Step 6 will have its own section called "[Creating Linkrops](ft-drops.md#creating-linkdrops)".

---

## Getting Started
In this section, you'll be addressing the first two steps: connecting to NEAR and ensuring the funder has enough FTs for the drop. 

Connecting to the NEAR blockchain will be done using `NEAR-API-JS` and consists of the following steps: 

1) Create a Keystore, which stores your access keys used to sign transactions   
  * select a network, either `testnet` or `mainnet`  
  * choose a location where the keypairs live, either a folder on your local machine, or in-memory      

2) Define a NEAR configuration using the Keystore  
3) Use the configuration to initialize a connection to NEAR  

More information about this process can be found [here](https://docs.near.org/tools/near-api-js/quick-reference#key-store).

:::note
For simplicity, this tutorial will choose a file-based keystore and point to the `~/.near-credentials` folder on your local machine since this is where most of your keys are stored. For more information about KeyStores, visit NEAR's [official docs](https://docs.near.org/tools/near-api-js/quick-reference#key-store).
:::

To ensure the funder has enough FTs to fund the drop, a new concept is to be defined.

:::info
`amountToTransfer` = *FT per use* * *number of keys* * *uses per key*.
:::

Using `NEAR-API-JS`, a `viewFunction` to the FT contract can be made to call `ft_balance_of`. This will return the funder's FT balance, which can be compared with `amountToTransfer` to ensure the funder has enough FTs to fund the drop. 



The code for setting up the NEAR connection and ensuring sufficient funder FT balance is shown below. In the skeleton code, these are steps 1 and 2.

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/fungible-token-drop/ft-example.js#L11-L45
```
:::note
In the code, you may notice the balances defined using `BN`. These are simply *Big Numbers* and is a library built to handle numbers beyond JavaScript's [max safe integer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER). 

The FTs in this example have a `decimal` of 24. This is the same as 1 $NEAR -> 10<sup>24</sup> YoctoNEAR, which allows the use of [`parseNearAmount`](https://docs.near.org/tools/near-api-js/utils) to convert between the two. Read more on the decimal parameter [here](https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals).
:::

---

## Creating Drop and Transferring FTs
In this section of the tutorial, you'll be creating the drop and transferring the FTs to Keypom using the Keypom SDK. 

As outlined in to introduction, there are 2 tasks to complete in this section.  

- Create the drop  
- Transfer the FTs to Keypom  


This process starts with calling the `initKeypom` function and will always be the first function you call to interact with the SDK.  

`initKeypom` initializes the SDK to allow for interactions with the Keypom smart contracts. Without it, none of the other SDK functions would work as expected. If a NEAR connection is not already present, it will initialize a new one for you. More info on the `initKeypom` function can be found [here](../../keypom-sdk/Core/modules.md#initkeypom).

Following the `initKeypom` call, the FT Drop is created. This is done by calling `createDrop` and adding an `ftData` parameter. 

:::tip
Recall that the private keys being generated using `createDrop` are used to store the assets. These keys are then embedded within a link.

In an FT Drop, the assets consist of FTs and optional $NEAR.
:::


`ftData` is an object with the following properties.
```bash
ftData
├── contractId
├── senderId
├── amount
```


- `contractId`: The FT contract ID
- `senderId`: The account from which the FTs will be sent to Keypom.
- `amount`: This is the human readable amount of FT, based on the [decimals value](https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals) of the token

Including the `ftData` parameter categorizes this as an FT drop. Without it, the Keypom Protocol would treat this drop as a Simple Drop.

More information on the `ftData` parameter can be found [here](../../keypom-sdk/Core/interfaces/FTData.md).

:::info
So long as the funder has an adequate FT balance, all you need to do is call `createDrop` with `ftData` to create the drop.

The SDK will **automatically** register Keypom on the FT contract and transfer the FTs to Keypom for you. 
:::

To see what the SDK is doing behind the scenes, a `NEAR-API-JS` equivalent NodeJS script has been provided.

<Tabs>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/fungible-token-drop/ft-example.js#L47-L70
```

</TabItem>
<TabItem value="NRJS" label="💻 NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/fungible-token-drop/ft-near-example.js#L50-L115
```

</TabItem>
</Tabs>

---

## Creating Linkdrops
The last step in this process is to create the links themselves so that you can easily distribute the assets to people. This is done by embedding the private key, containing the $NEAR, into the link along with the Keypom contract ID.  

With the Keypom SDK, this is all neatly wrapped up in the function [`formatLinkdropUrl`](../../keypom-sdk/Core/modules.md#formatlinkdropurl). You just need to provide the base URL format and the private key you wish to embed.

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/fungible-token-drop/ft-example.js#L72-L78
```

---

## Full Code
Now that everything has been put together, the final code can be seen below.
<Tabs>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/fungible-token-drop/ft-example.js#L1-L86
```

</TabItem>
<TabItem value="NRJS" label="💻 NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/fungible-token-drop/ft-near-example.js#L1-L127
```

</TabItem>
</Tabs>

---

## Testing
### Running the Script
Here, you'll learn how to run the code that was just covered, and what to expect.

To view the completed code, clone the [Keypom Docs Examples](https://github.com/keypom/keypom-docs-examples) repository and navigate to the `basic-tutorials/ft-drop`.
``` bash
git clone https://github.com/keypom/keypom-docs-examples.git && cd keypom-docs-examples/basic-tutorials/ft-drop
```
From there, you can and open the `ft-example.js` file.

To run the code you just cloned, return to the `keypom-docs-examples` directory and install all the necessary packages. 
```bash
cd .. && cd .. && yarn
```

:::caution
Prior to running these scripts, ensure you replace all instances of `keypom-docs-demo.testnet` in the script with the credentials of your account found in your `~/.near-credentials` folder
:::

From there, you can run this FT Drop script that was made in this tutorial using the following command:
``` bash
yarn basic:ft:keypom
```
:::note
The SDK script is being tested here; use `yarn basic:ft:naj` to test the `NEAR-API-JS` script instead.
:::
This should return a successful drop creation and console log a Public Key and Linkdrop

```bash
Public Keys:  [ 'ed25519:DkvGVA8UuBRKtsXvBxnKkHs2aHzd221QSquinokfJ71a' ]
Linkdrops:  [
  'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/2H8i9Snk4v3wBBHeTxBFuzzi1SF5DL4nFHvMUp1nDz4ARSW3tB5b8z2Xxm6Y5rMzzVS3sDppPxM4jtRhyYkHfF2Y'
]
Keypom Contract Explorer Link: explorer.testnet.near.org/accounts/v2.keypom.testnet.com
```

To see the full console log from this drop creation, see the expandable section below.

<details>
<summary>Console Log of Test</summary>
<p>

``` bash
Receipts: AxiAwWNkKQsyvdcAhwBr2B2Qqc5gVCBw2MLrbL7dLq6d, 6QCHm8YtpfreHYQvw9VAHU7rJXGgfVv4T1TDcuXHEtvC, 5CTcWfQ1BC1nensRK6NhcNSv5NjxdSaVSwti4j34fCa3
        Log [v2.keypom.testnet]: Current Block Timestamp: 1682352345716601116
        Log [v2.keypom.testnet]: 21 calls with 105000000000000 attached GAS. Pow outcome: 1.8602935. Required Allowance: 20248156910387200000000
        Log [v2.keypom.testnet]: was_ft_registered: true
        Log [v2.keypom.testnet]: Total required storage Yocto 11980000000000000000000
        Log [v2.keypom.testnet]: Current balance: 8.2955772, 
            Required Deposit: 1.0332281, 
            total_required_storage: 0.01198,
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
        Log [v2.keypom.testnet]: New user balance 7.262349
        Log [v2.keypom.testnet]: Fees collected 0
        Log [v2.keypom.testnet]: Performing CCC to get storage from FT contract
Receipts: 4PPt4W1C9xYP2yc67CLVX6vvYshf1oCoDr9hBiZUniTZ, 8iSu5McdW8rvPApvYjbPhew6wGZ9raAPiR8SEA43tV86
        Log [v2.keypom.testnet]: User has enough balance to cover FT storage. Subtracting 0.0025 from user balance. User balance is now 7.259849
        Log [v2.keypom.testnet]: 21 calls with 105000000000000 attached GAS. Pow outcome: 1.8602935. Required Allowance: 20248156910387200000000
        Log [v2.keypom.testnet]: FT contract already registered. Refunding user balance for 0.00125. Balance is now 7.261099
Receipts: 9FEiXh19PMMRirF4CGDTEfopWxf6eLWxNvJmUMnrrVX8, AwJ362Sj4PZ3EbusnwLo4qoyExXRRZPAyqUUT1uZ64oi, 8KquU3a2BA3AWb9keYfwYvYpD6iD5CQG1Vn78efBex9B
        Log [ft.keypom.testnet]: EVENT_JSON:{"standard":"nep141","version":"1.0.0","event":"ft_transfer","data":[{"old_owner_id":"keypom-docs-demo.testnet","new_owner_id":"v2.keypom.testnet","amount":"1"}]}
Receipt: 9Ls4K4vm8pW7HcjD6PMBbJoWSsjwN16YEq3GdCqnahPx
        Log [ft.keypom.testnet]: New uses registered 1
Public Keys:  [ 'ed25519:DkvGVA8UuBRKtsXvBxnKkHs2aHzd221QSquinokfJ71a' ]
Linkdrops:  [
  'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/2H8i9Snk4v3wBBHeTxBFuzzi1SF5DL4nFHvMUp1nDz4ARSW3tB5b8z2Xxm6Y5rMzzVS3sDppPxM4jtRhyYkHfF2Y'
]
Keypom Contract Explorer Link: explorer.testnet.near.org/accounts/v2.keypom.testnet.com
```

</p>
</details>

### Claiming and Explorer Transactions
Once you click the link, it will take you to the following NEAR Wallet page, where you will have the choice to claim with an existing account or create a new one. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/ft/nw-claim.png").default} alt="NEAR Wallet claim" width="80%"/> </p>

In your NEAR wallet, you should now be able to see the FT tokens that were transferred to you. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/ft/ft.png").default} alt="ft claim" width="80%"/> </p>

To check the transactions, click the final link in the console log when you run the script.
```bash
Keypom Contract Explorer Link: https://explorer.testnet.near.org/accounts/v2.keypom.testnet 
```

From there, you should be able to see the [`create_drop`](https://explorer.testnet.near.org/transactions/6HkwpwWVA7m1tAGj75JGpF975toStWRF1y8FSRDMPPfT), [`ft_transfer_call`](https://explorer.testnet.near.org/transactions/47HmGKAHx4TDp6vNbnBAb9ifS1gTXrC58o7svFmZDYzk) and [`claim`](https://explorer.testnet.near.org/transactions/62gQiyQjx9z9WJsVQNaaa4fje9PeeTpCuHun2PZ8WjNm) transactions. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/ft/explorer.png").default} alt="explorer transactions" width="80%"/> </p>


:::note
Recall that `ft_transfer_call` is never explicitly called but rather `createDrop` calls it for you; this can be seen in the explorer shown above. 

This is the SDK in action!
:::

---

## Conclusion
In this tutorial, you've learned to ensure the funder has a [sufficient FT balance](ft-drops.md#getting-started) for the drop, [create an FT drop](ft-drops.md#creating-drop-and-transferring-fts) with the SDK, and to [transfer FTs](ft-drops.md#creating-drop-and-transferring-fts) to Keypom. Once the drop was created, you constructed a valid linkdrop using the private keys in order to claim the assets.

In the next tutorial, you will learn to create a function call drop. 