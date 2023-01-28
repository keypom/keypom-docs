---
sidebar_label: 'Simple Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Simple Drop

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
:::info
In this tutorial, you are going to learn how to create a simple drop from scratch. 

A simple drop allows you to onboard users onto NEAR and send them any amount of $NEAR. To learn more on what a simple drop is, [click here](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/simpledrops.md)
:::

Creating a simple drop is a two step process:  

1) Establishing a connection to the NEAR blockchain.  
2) Creating keypairs and the simple drop.  

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

// STEP 2: Create keypairs and the drop.
}

simpleDropKeypom()

```

---

## Getting Started - Connecting to NEAR
The first step of creating an Keypom drop is to connect to the NEAR blockchain.

This is done with NEAR-API-JS and consists of creating an unecrypted local keystore and, creating a NEAR configurations, and then using that to initialize a connection to the blockchain. More information about this process can be found [here](https://docs.near.org/tools/near-api-js/quick-reference#key-store).


```js reference
https://github.com/keypom/keypom-js/blob/666f09935eecbbd6323b121bc60078b3830e8f56/docs-examples/keypom-js-sdk/simple-example.js#L8-L25

```

---

## Creating the Simple Drop
Now that the connection to the NEAR blockchain is set up, the next step is to create the Keypairs and then create the drop.  
:::tip
Recall that the Keypairs that are being generated are the ones that will be embedded in the link given to the user. 
:::

In the SDK, this process starts with calling the `initKeypom` function. This function will always be the first function you need to call to interact with the SDK. 

:::info
The `initKeypom` function is the first function you need to call in order to interact with the SDK.
:::

After `initKeypom` is called, the key generation and drop creation can be done. These two tasks are combined into one function, `createDrop`. This function can be either given a set of pre-created keypairs, **or** it can create them automatically.

With NEAR-API-JS, these two tasks are seperate, as the `create_drop` function only creates the drop. The keys that are passed into it must be generated seperately.These two tasks are separate and pre-created keys *must* be passed into create_drop

:::tip
Note that with NEAR-API-JS, an attached deposit must be added to the `functionCall`. This is to cover the cost of creating the drop. With simple drops, the cost is the sum of $NEAR embedded in each link as well as the storage costs on the protocol.

In these tutorials, a generous deposit is attached and any unused $NEAR is simply added to the funder's [Keypom balance](../../Concepts/Keypom%20Protocol/balances.md)
:::

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/666f09935eecbbd6323b121bc60078b3830e8f56/docs-examples/keypom-js-sdk/simple-example.js#L27-L41
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/d6fccdbec8223393468bdf5b31d93688690bbf93/docs-examples/near-api-js/simple-near-example.js#L26-L51
```

</TabItem>
</Tabs>

:::note
All function parameters and default values for the SDK and Keypom functions can be found in the [SDK Typedocs](../../keypom-sdk/modules.md). For NEAR-API-JS functions, their arguments can be found [here](https://docs.near.org/tools/near-api-js/reference)
:::

---

## Full Solution
The final code, using the skeleton defined in the [introduction](simple-drops.md#introduction) to create a simple 1 $NEAR linkdrop can be seen below.

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/666f09935eecbbd6323b121bc60078b3830e8f56/docs-examples/keypom-js-sdk/simple-example.js#L1-L55
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/d6fccdbec8223393468bdf5b31d93688690bbf93/docs-examples/near-api-js/simple-near-example.js#L1-L53
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
Prior to running these scripts, ensure you replace all instances of `keypom-docs-demo.testnet` in the script with the credentials of your account found in your `~/.near-credentials` folder
:::

From there, you are able to run this Simple Drop script that was made in this tutorial using the following command:
``` bash
npm run simple-keypom
```
:::note
The SDK script is being tested here; use `npm run simple-near` to test the NEAR-API-JS script instead.
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
```

</p>
</details>

### Claiming and Explorer Transactions
Once you have the link, you are able to claim the linkdrop you've just created. The output link will take you to the following NEAR Wallet page, where you will have the choice to call claim to an existing account or create a new one. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/simple/nw-claim.png").default} alt="Near Wallet claim" width="80%"/> </p>

After the claim transaction succeeds, you can check the transactions on the [NEAR Explorer](https://explorer.near.org/).

To view the transactions, you can search up the Keypom contract ID: `v1-3.keypom.testnet`. You should be able to see the `create_drop` and `claim` transactions. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/simple/explorer.png").default} alt="explorer transactions" width="80%"/> </p>

---

## Conclusion
In this tutorial, you learned the basic [steps of creating a simple drop](simple-drops.md#introduction), how to [initialize a NEAR blockchain connection](simple-drops.md#getting-started---connecting-to-near), and how to [create the keys and the drop](simple-drops.md#creating-the-simple-drop). You also learned the purpose of the `initKeypom` function and when to use it.

In the next tutorial, you'll be learning how to create and fund an NFT drop using the Keypom SDK and NEAR-API-JS.

