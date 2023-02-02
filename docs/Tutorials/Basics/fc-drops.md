---
sidebar_label: 'Function Call Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Function Call Drop

## Introduction

In this tutorial, you are going to learn how to create an Function Call Drop from scratch.

A FC drop allows you to onboard users by sending them a Web2 style link that allows them to call almost any function on any NEAR smart contract. This link is also embedded with $NEAR.

In this tutorial, the function call will be to Lazy Mint an NFT.

<p align="center"> <img src={require("/static/img/docs/basic-tutorials/nft/collectibles-claimed2.png").default} alt="NFT collectibles claim" width="65%"/> </p>

To learn more about what the FC drop, see the [concepts page](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/fcdrops.md)


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

A Function Call Drop is Keypom's most powerful drop type. A brief breakdown of how an FC drop works is as follows:

:::info
For every key-use, a vector of functions is called in the order that they are defined. This vector can vary for each individual key use.

This means for each key use, a different set of functions can be called. An example can be seen below. 
:::

| Key Use    | Functions called during n<sup>th</sup> Key Use |
| -----------| ---------------------------------------------- |
| Key Use 1  | `nft_mint`                                     |
| Key Use 2  | `my_nft_function_1`, `my_nft_function_2`       |
| Key Use 3  | `nft_transfer_call`                            |

:::note
In this tutorial, the key will only call `nft_mint`.
:::

With the power of function call drops understood, the process of creating one can be broken down.

1) Connecting to the NEAR blockchain  
2) Creating Drop with function call data  

The following skeleton code can be used as a starting point:
``` js
// Each of the two methods to create this drop will have their own unique set of imports

// Imports used in the Keypom SDK method:
const { parseNearAmount, formatNearAmount } = require("near-api-js/lib/utils/format");
const { initKeypom, createDrop } = require("keypom-js");
const { KeyPair, keyStores, connect } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

// Imports used in the NEAR-API-JS method:
const { parseNearAmount, formatNearAmount } = require("near-api-js/lib/utils/format");
const { KeyPair, keyStores, connect } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();


async function fcDropKeypom(){
// STEP 1: Initiate a NEAR connection.

// STEP 2: Create the drop with funciton call data.
}

fcDropKeypom()

```
## Getting Started
In this section, you'll be addressing the first step: connecting to NEAR. 

This is done with `NEAR-API-JS` and consists of:

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
https://github.com/keypom/keypom-js/blob/bbe4716ff64dd7a73a6d727a5aea518e8141f60f/docs-examples/keypom-js-sdk/fc-example.js#L8-L25
```

## Creating Drop with Function Call Data
In this section, you'll learn about the process of creating the Function Call Drop using the Keypom SDK. 

In the SDK, this process starts with calling the `initKeypom` function. This function will always be the first function you need to call to interact with the SDK. 

`initKeypom` initializes the SDK to allow for interactions with the Keypom Protocol. Without it, none of the other SDK functions would work as expected. If a NEAR connection is not already present,it will initialize a new one for you. More info on the `initKeypom` function can be found [here](../../keypom-sdk/modules#initkeypom).

:::info
The `initKeypom` function is the first function you need to call in order to interact with the SDK.
:::

After `initKeypom` is called, the FC Drop can be created by calling `createDrop` and adding a `fcData` parameter. 

:::tip
Recall that the private keys being generated using `createDrop` are used to store the assets. These keys are then embedded within a link.

In an FC Drop, the assest consist of $NEAR and a set of callable methods.
:::

The primary task in creating the Function Call Drop is to define `fcData`. It is an object with the following properties.

```bash
fcData
├── FCConfig
├── methods
```

- `FCConfig`: [Specific configuratrions](../../keypom-sdk/interfaces/FCConfig.md) for the Function Call Drop.  
- `methods`: A vector of all the functions to be called for each key use.  

In this example, only the `methods` parameter will be defined for the sake of simplicity.

`methods` is a 2D array, the first outer array dictates the use number, and the inner array dictates the set of functions used on that particular key use. For more information on the `methods` parameter, please see the [TypeDocs](../../keypom-sdk/interfaces/Method.md)

Each inner element of methods represents a function call and requires the following parameters  

- `receiverId`: The contract receiving the function call.  
- `methodName`: The function to be called on the receiver contract.  
- `args`: A stringified JSON object of all the arguments to be passsed into `methodName`.  
- `attachedDeposit`: The yoctoNear deposit attached to the function call when the key is used.  

In this tutorial only one function call will be made: `nft_mint` in order to Lazy Mint an NFT.

Including the `fcData` parameter makes this drop a FC drop. Without it, the Keypom Protocol would treat this drop as a Simple Drop. More information on the `fcData` parameter can be found [here](../../keypom-sdk/interfaces/FCData.md).

To see what the SDK is doing behind the scenes, a `NEAR-API-JS` equivalent NodeJS script has been provided.

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/bbe4716ff64dd7a73a6d727a5aea518e8141f60f/docs-examples/keypom-js-sdk/fc-example.js#L27-L64
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/bbe4716ff64dd7a73a6d727a5aea518e8141f60f/docs-examples/near-api-js/fc-near-example.js#L26-L75
```

</TabItem>
</Tabs>

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

## Complete Code
Now that everything has been put together, the final code can be seen below.

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/bbe4716ff64dd7a73a6d727a5aea518e8141f60f/docs-examples/keypom-js-sdk/fc-example.js#L1-L79
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/bbe4716ff64dd7a73a6d727a5aea518e8141f60f/docs-examples/near-api-js/fc-near-example.js#L1-L88
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
``` bash
Public Keys and Linkdrops:  {
  'ed25519:6gMZ9FCQk9Jc8yLkpVuFkG3Y9grvFAxGEC3qvqBYiNsp': 'https://wallet.testnet.near.org/linkdrop/v1-3.keypom.testnet/4Ee7ubk795C8tMKNzMLyqkuL5nQNezRNYFHGi8bsm74hQDvdiqpi1jSHHx1y2puQmo8CdDSEd4cTxLEE1htidBh8'
}
```
To see the full console log from this drop creation, see the expandable section below.

<details>
<summary>Console Log of Test</summary>
<p>

``` bash
yarn run v1.22.19
warning ../../../package.json: No license field
$ node docs-examples/keypom-js-sdk/fc-example.js
Receipts: 5HqDWEefxgXmX2AJiaQigmJdNtTeoLNxLfzsmTL2Svxq, 5butQSW4kSmYMGrywfVjKs7jFAkMu4ajBxRy1dBnVDru
        Log [v1-3.keypom.testnet]: Current Block Timestamp: 1675104111611855178
        Log [v1-3.keypom.testnet]: 20 calls with 100000000000000 attached GAS. Pow outcome: 1.8061103. Required Allowance: 18762630063718400000000
        Log [v1-3.keypom.testnet]: Total required storage Yocto 14330000000000000000000
        Log [v1-3.keypom.testnet]: Current balance: 2.2833955, 
            Required Deposit: 2.0340926, 
            total_required_storage: 0.01433,
            Drop Fee: 0, 
            Key Fee: 0 Total Key Fee: 0,
            allowance: 0.0187626 total allowance: 0.0187626,
            access key storage: 0.001 total access key storage: 0.001,
            deposits less none FCs: 1 total deposits: 1 lazy registration: false,
            deposits for FCs: 1 total deposits for FCs: 1,
            uses per key: 1
            None FCs: 0,
            length: 1
            GAS to attach: 100000000000000
        Log [v1-3.keypom.testnet]: New user balance 0.2493029
        Log [v1-3.keypom.testnet]: Fees collected 0
Public Keys and Linkdrops:  {
  'ed25519:6gMZ9FCQk9Jc8yLkpVuFkG3Y9grvFAxGEC3qvqBYiNsp': 'https://wallet.testnet.near.org/linkdrop/v1-3.keypom.testnet/4Ee7ubk795C8tMKNzMLyqkuL5nQNezRNYFHGi8bsm74hQDvdiqpi1jSHHx1y2puQmo8CdDSEd4cTxLEE1htidBh8'
}
Keypom Contract Explorer Link: https://explorer.testnet.near.org/accounts/v1-3.keypom.testnet 
```

</p>
</details>

### Claiming and Explorer Transactions
Once you have the link, you are able to claim the linkdrop you've just created. Once clicked, it will take you to the following NEAR Wallet page, where you will have the choice to claim with an existing account or create a new one. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/fc/nw-claim.png").default} alt="NEAR Wallet claim" width="80%"/> </p>

To check the transactions, click the final link in the console log when you run the script.
```bash
Keypom Contract Explorer Link: https://explorer.testnet.near.org/accounts/v1-3.keypom.testnet 
```

From there, you should be able to see the [`create_drop`](https://explorer.testnet.near.org/transactions/CpQfJ3P76qADcCCZVP9kxCQznSCsweyZoQbTgtKx8hGN) and [`claim`](https://explorer.testnet.near.org/transactions/Cgckyr9EEC3o9MDiL8E2mvs6JYPuCApYqWjpgZvy3z6U) transactions. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/fc/explorer.png").default} alt="explorer transactions" width="80%"/> </p>

Within the [`claim`](https://explorer.testnet.near.org/transactions/Cgckyr9EEC3o9MDiL8E2mvs6JYPuCApYqWjpgZvy3z6U) transaction, you can also see that `nft_mint` was called on the `nft.examples.testnet` contract. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/fc/nft-mint.png").default} alt="explorer transactions" width="80%"/> </p>

This can be confirmed by visiting the "Collectibles" tab in your NEAR wallet. You should see the newly minted NFT in your wallet.  
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/nft/collectibles-claimed2.png").default} alt="NFT collectibles claim" width="65%"/> </p>

---

## Conclusion
In this tutorial, you learned the how to create a function call drop using the [Function Call Data](fc-drops.md#creating-drop-with-function-call-data) parameter. 

Now that you've had a good introduction to creating all 4 Keypom drop types, you can tinker with existing code in the [Deploy Scripts](getting-started.md#deploy-scripts) or move on to the [Advanced Tutorials](../Advanced/ticketing/concept.md) for more challenging and practical examples.