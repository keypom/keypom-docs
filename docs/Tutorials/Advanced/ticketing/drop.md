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
├── FCConfig?
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

