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
3. [Keypom JS SDK](https://github.com/keypom/keypom-js#installation)

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
npm install keypom-js
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
    "keypom-js": "^1.4.0-rc.1"
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
│   └── keypom-js
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
const { initKeypom, createDrop } = require("keypom-js");
const { BN } = require("bn.js");
const { parseNearAmount, formatNearAmount } = require("near-api-js/lib/utils/format");
const { KeyPair, keyStores, connect } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

// Imports used in the NEAR-API-JS method:
const { parseNearAmount, formatNearAmount } = require("near-api-js/lib/utils/format");
const { KeyPair, keyStores, connect } = require("near-api-js");
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
https://github.com/keypom/keypom-js/blob/18df717151e3f5b25cae24f2d9389459b87ece68/docs-examples/keypom-js-sdk/ft-example.js#L9-L41
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

`initKeypom` initializes the SDK to allow for interactions with the Keypom smart contracts. Without it, none of the other SDK functions would work as expected. If a NEAR connection is not already present, it will initialize a new one for you. More info on the `initKeypom` function can be found [here](../../keypom-sdk/modules.md#initkeypom).

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

More information on the `ftData` parameter can be found [here](../../keypom-sdk/interfaces/FTData.md).

:::info
So long as the funder has an adequate FT balance, all you need to do is call `createDrop` with `ftData` to create the drop.

The SDK will **automatically** register Keypom on the FT contract and transfer the FTs to Keypom for you. 
:::

To see what the SDK is doing behind the scenes, a `NEAR-API-JS` equivalent NodeJS script has been provided.

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/18df717151e3f5b25cae24f2d9389459b87ece68/docs-examples/keypom-js-sdk/ft-example.js#L43-L66
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/bbe4716ff64dd7a73a6d727a5aea518e8141f60f/docs-examples/near-api-js/ft-near-example.js#L43-L108
```

</TabItem>
</Tabs>

---

## Creating Linkdrops
The last step in this process is to create the links themselves so that you can easily distribute the assets to people. This is done by embedding the private key, containing the $NEAR, into the link along with the Keypom contract ID.  

With the Keypom SDK, this is all neatly wrapped up in the function [`formatLinkdropUrl`](../../keypom-sdk/modules.md#formatlinkdropurl). You just need to provide the base URL format and the private key you wish to embed.

```js 
pubKeys = keys.publicKeys

var dropInfo = {};
const {contractId: KEYPOM_CONTRACT} = getEnv()
// Creating list of pk's and linkdrops
for(var i = 0; i < keys.keyPairs.length; i++) {
    let linkdropUrl = formatLinkdropUrl({
        customURL: "https://testnet.mynearwallet.com/linkdrop/CONTRACT_ID/SECRET_KEY",
        secretKeys: keys.secretKeys[i]
      })
    dropInfo[pubKeys[i]] = linkdropUrl;
}
// Write file of all pk's and their respective linkdrops
console.log('Public Keys and Linkdrops: ', dropInfo)
```

---

## Full Code
Now that everything has been put together, the final code can be seen below.
<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/18df717151e3f5b25cae24f2d9389459b87ece68/docs-examples/keypom-js-sdk/ft-example.js#L1-L84
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/bbe4716ff64dd7a73a6d727a5aea518e8141f60f/docs-examples/near-api-js/ft-near-example.js#L1-L120
```

</TabItem>
</Tabs>

---

## Testing
### Running the Script
Here, you'll learn how to run the code that was just covered, and what to expect.

To view the completed code, clone the Keypom SDK repo and visit the examples directory:
``` bash
git clone https://github.com/keypom/keypom-js && cd keypom-js/docs-examples
```
To run the code you just cloned, install all the necessary packages. 
```bash
npm install
```
:::caution
Prior to running these scripts, ensure you replace all instances of `keypom-docs-demo.testnet` in the script with the credentials of your account found in your `~/.near-credentials` folder
:::

From there, you can navigate back to the root directory and run this FT Drop script that was made in this tutorial using the following command:
``` bash
cd .. && npm run ft-keypom
```
:::note
The SDK script is being tested here; use `npm run ft-near` to test the `NEAR-API-JS` script instead.
:::
This should return a successful drop creation and console log a Public Key and Linkdrop

```bash
Public Keys and Linkdrops:  {
  'ed25519:5BGPkbc7L2TDjZJKXMpwp212C8htvbVrrJVxnqdW4wzD': 'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/2EiALoL2b31Ys2K4YtPZvCoDFUB6SwcHHdqzKnyyUQjXekoxHPybWahHSwmtQYytyaZp9ScakMtma7zfFoT4Uctu'
}
```

To see the full console log from this drop creation, see the expandable section below.

<details>
<summary>Console Log of Test</summary>
<p>

``` bash
Receipts: Deh44Xf8VhtDUmotqXyNaRgwGH66D6xMkzc2z4C2Zbst, 4sgjdBC4ZVsWRr3cwnGqTsSjDcGUaShQsWzgtVXUTzSn, 3wMFSsnLRFpeKdJFsLnHZfDfNAp4GffWFmBtKJpbxov5
        Log [v2.keypom.testnet]: Current Block Timestamp: 1677015598581427999
        Log [v2.keypom.testnet]: 20 calls with 100000000000000 attached GAS. Pow outcome: 1.8061103. Required Allowance: 18762630063718400000000
        Log [v2.keypom.testnet]: was_ft_registered: true
        Log [v2.keypom.testnet]: Total required storage Yocto 11940000000000000000000
        Log [v2.keypom.testnet]: Current balance: 1.1296246, 
            Required Deposit: 1.0317026, 
            total_required_storage: 0.01194,
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
        Log [v2.keypom.testnet]: New user balance 0.097922
        Log [v2.keypom.testnet]: Fees collected 0
        Log [v2.keypom.testnet]: Performing CCC to get storage from FT contract
Receipts: B8QZN8mAQrZWEepaaxWNp1Zv1ikom6mMTDrBV4t17c6e, CiBcYbMsq5YYB5i4FmJPKhG97XtZtUmJFBBedTaDEdKy
        Log [v2.keypom.testnet]: User has enough balance to cover FT storage. Subtracting 0.0025 from user balance. User balance is now 0.095422
        Log [v2.keypom.testnet]: 20 calls with 100000000000000 attached GAS. Pow outcome: 1.8061103. Required Allowance: 18762630063718400000000
        Log [v2.keypom.testnet]: FT contract already registered. Refunding user balance for 0.00125. Balance is now 0.096672
Receipts: HnrB7sWQMcDUhLrcsqfNkyN7dsLHQ754iTaJGppap7w3, 4X6yRXCFciXp7SGhmkzHxTmqbaSdGV5a9SVUAFkxpkLo, 7eRbRqnqeU9DweWHvkZQBo9BMMZHEAAMypChZybDYP6C
        Log [ft.keypom.testnet]: EVENT_JSON:{"standard":"nep141","version":"1.0.0","event":"ft_transfer","data":[{"old_owner_id":"keypom-docs-demo.testnet","new_owner_id":"v2.keypom.testnet","amount":"1"}]}
Receipt: B9CFNtKN6eWwdFeTBBwW29zcZ7TWVpVgh8B4c6DiQc8T
        Log [ft.keypom.testnet]: New uses registered 1
Public Keys and Linkdrops:  {
  'ed25519:5BGPkbc7L2TDjZJKXMpwp212C8htvbVrrJVxnqdW4wzD': 'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/2EiALoL2b31Ys2K4YtPZvCoDFUB6SwcHHdqzKnyyUQjXekoxHPybWahHSwmtQYytyaZp9ScakMtma7zfFoT4Uctu'
}
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