---
sidebar_label: 'Function Call Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Function Call Drop
## Prerequisites
For the basic tutorials, you can choose to run the scripts on your own machine. To do son, you must have the following:

1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [NEAR-API-JS](https://docs.near.org/tools/near-api-js/quick-reference#install)  
3. To install the SDK, simply run the following in your command prompt.  
```bash
npm -i keypom-js
```

---

## Introduction
:::tip
In this tutorial, you are going to learn how to create an Function Call drop from scratch.

A FC drop allows you to onboard users onto NEAR by sending them any amount of $NEAR and allowing them to make function calls to almost any function on any smart contract in the NEAR ecosystem. To learn more on what an FC drop is, [click here](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/fcdrops.md)
:::

A function call drop is arguably the most powerful feature of Keypom and allows you to create almost all of the examples found in the [Advanced Tutorials](../Advanced/ticketing/concept.md). A brief breakdown of how an FC drop works is as follows:

:::info
For every key-use, a vector of functions is called in the order that they are passed in. This vector can vary for each individual key use.

This means for use 1, functions `my_func_1`, `my_func_2` and `my_func_3` can be called and on use 2, functions `my_func_4`, `my_func_5`, and `my_func_6` can be called.
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

Connecting to the NEAR blockchain will be done using NEAR-API-JS. 

The code for the initialization can be found below. 


```js reference
https://github.com/keypom/keypom-js/blob/49244d227f23535ae8962707183d1eca59280d29/docs-examples/keypom-js-sdk/fc-example.js#L8-L25
```

## Creating Drop with Function Call Data
In this section, you'll learn about the process of creating the function call drop. 


The majority of this process is defining the function calls using the `fcData` or `fc` objects for the SDK and NEAR-API-JS appraoches respectively. 

### The Keypom SDK Approach
:::info
The `initKeypom` function is the first function you need to call in order to interact with the SDK.
:::

After `initKeypom` is called, the drop creation can be done. The primary task in creating the drop is to define `fcData`. In this example, only the `methods` parameter will be defined for the sake of simplicity. For a breakdown of the `fcData` parameter, see the [TypeDocs](../../keypom-sdk/interfaces/FCData.md).

[`methods`]((../../keypom-sdk/interfaces/Method.md)) is a 2D array, the first outer array dictates the use number, and the inner array dictates the set of functions used on that particular key use. Each element requires a few parameters  

- `receiverId` or `receiver_id`, which defines the contract receiving the function call.  
- `methodName` or `method_name` which defines the function to be called on the receiver contract.  
- `args` is a JSON object of all the arguments for the above method, all stringified.  
- `attachedDeposit` is the deposit attached to the function call when the key is used.  

### The NEAR-API-JS Approach
The approach through NEAR-API-JS is nearly identical but called using the `functionCall` method from the API.

It is important to note, in the NEAR-API-JS approach, a generous attached deposit of 1.5 $NEAR was added to the call to cover all costs, including storage and NEAR in the key. 

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/49244d227f23535ae8962707183d1eca59280d29/docs-examples/keypom-js-sdk/fc-example.js#L27-L64
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/49244d227f23535ae8962707183d1eca59280d29/docs-examples/near-api-js/fc-near-example.js#L26-L75
```

</TabItem>
</Tabs>

## Complete Code
Taking the code snippets from the [getting started](fc-drops.md#getting-started) and [creating the drop](fc-drops.md#creating-drop-with-function-call-data), and filling in the skeleton code form the [introduction](fc-drops.md#introduction) results in the following.

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/49244d227f23535ae8962707183d1eca59280d29/docs-examples/keypom-js-sdk/fc-example.js#L1-L77
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/49244d227f23535ae8962707183d1eca59280d29/docs-examples/near-api-js/fc-near-example.js#L1-L77
```

</TabItem>
</Tabs>

---

## Testing
### Running the Script
Here, you'll learn how to run the code that was just covered, and what to expect.

To view the completed code, clone the following repo:
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
The SDK script is being tested here; use `npm run fc-near` to test the NEAR-API-JS script instead.
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
```

</p>
</details>

### Claiming and Explorer Transactions
Once you have the link, you are able to claim the linkdrop you've just created. The output link will take you to the following NEAR Wallet page, where you will have the choice to call claim to an existing account or a new one. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/fc/nw-claim.png").default} alt="NEAR Wallet claim" width="80%"/> </p>

After the claim transaction succeeds, you can check the transactions on the [NEAR Explorer](https://explorer.near.org/). Ensure you are select `testnet` from the dropdown in the top left if you are using testnet to conduct these tests.

To view the transactions, you can search up the Keypom contract ID: `v1-3.keypom.testnet`. You should be able to see the [`create_drop`](https://explorer.testnet.near.org/transactions/CpQfJ3P76qADcCCZVP9kxCQznSCsweyZoQbTgtKx8hGN) and [`claim`](https://explorer.testnet.near.org/transactions/Cgckyr9EEC3o9MDiL8E2mvs6JYPuCApYqWjpgZvy3z6U) transactions. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/fc/explorer.png").default} alt="explorer transactions" width="80%"/> </p>

Within the [`claim`](https://explorer.testnet.near.org/transactions/Cgckyr9EEC3o9MDiL8E2mvs6JYPuCApYqWjpgZvy3z6U) transaction, you can also see that `nft_mint` was called on the `nft.examples.testnet` contract. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/fc/nft-mint.png").default} alt="explorer transactions" width="80%"/> </p>

---

## Conclusion
In this tutorial, you learned the how to create a function call drop [using the Function Call Data](fc-drops.md#creating-drop-with-function-call-data) parameter. 

Now that you've had a good introduction to creating all 4 Keypom drop types, you can tinker with existing code in the [Deploy Scripts](getting-started.md#deploy-scripts) or move on to the [Advanced Tutorials](../Advanced/ticketing/concept.md) for more challenging and practical examples.