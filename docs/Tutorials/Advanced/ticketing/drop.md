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
Receipts: FYGRwDNQCqfXYZjKZHXW4xxJK2Yu7t9ZocyYrcMx2b2U, Aor9Twk2ptEzqQRcZz5AnpSzJryKz4H2K3KmaRprgoev
        Log [v1-4.keypom.testnet]: Current Block Timestamp: 1677011501641230759
        Log [v1-4.keypom.testnet]: 20 calls with 100000000000000 attached GAS. Pow outcome: 1.8061103. Required Allowance: 18762630063718400000000
        Log [v1-4.keypom.testnet]: Total required storage Yocto 109940000000000000000000
        Log [v1-4.keypom.testnet]: Current balance: 47.616488, 
            Required Deposit: 2.4951926, 
            total_required_storage: 0.10994,
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
        Log [v1-4.keypom.testnet]: New user balance 45.1212954
        Log [v1-4.keypom.testnet]: Fees collected 0
Public Keys and Linkdrops:  {
  'ed25519:4aR5UP5K7F81EJhSWdkUyKvG1tn2uaG9Q19LNGjBgTpA': 'https://testnet.mynearwallet.com/linkdrop/v1-4.keypom.testnet/2WjpzSDEghzQ5YdzpJ6n76hsRUUP4FMzCmqZbEunUeUzPomswXGy3ovaG5oen8ZCmSq82Q5TBnobn9b3nBzu3AhC',
  'ed25519:4gB4AWKcFYa8ZQMcm1Pvk5RxSPRDjoJQjNUbG8jMWZ88': 'https://testnet.mynearwallet.com/linkdrop/v1-4.keypom.testnet/5pn4DkNULgMmRReooRVtz4iTDHQes7GcKGsF8END693WHwJrbZPFKeFxhjHcymMvFSbyRAXqhx6mzUxeiZWNPg3N',
  'ed25519:5a8pFZn18qya6yYvA3AEKEK1VXcWX171ujRt1pQK7UKE': 'https://testnet.mynearwallet.com/linkdrop/v1-4.keypom.testnet/4PbuT4unmKHb1GnnHB1oBLKwpjts176HAU9YwSYhyznps861i6UwGb6Ls4MJZMsUwADLcxVD7WehhD5rXiyESfX2',
  'ed25519:3tj8FmL9idnwbRW7uqZfaJGaLSeEW98cbrUHFFqTn9CG': 'https://testnet.mynearwallet.com/linkdrop/v1-4.keypom.testnet/3P4wWQXmJxuh4vVtS89DrWu8G9u6f1LNFpo3Rj83RSjDLRvwTryYxRq6oL4jmsnc4Y2SuSegG8T8UZyUcHQm4sy6',
  'ed25519:D7HtsoXRtFrgoS945nzHeXGnQsrEJRAAA3mtbATZw5i4': 'https://testnet.mynearwallet.com/linkdrop/v1-4.keypom.testnet/5uRKgeEjVVv1osfcs3ySPxkHs1SceouTf5pNEo1hAZB5C1tJwTT45eV7uMFnMP2NyNe3pNET1WnWqpCjWEM7Lzvp',
  'ed25519:5ipGZMy8amfESzJS7sdRdP1nADX1bMAAfZgF7UvWbg7R': 'https://testnet.mynearwallet.com/linkdrop/v1-4.keypom.testnet/4fmEuktYBLzAu2LoUxk279XWqa8t2AEia5kjK3pAgqvtckavgTDga3a39g19Un88HPoKbwHRStiULk5q6kum7XKu',
  'ed25519:BrtuHmGJjQ2eAz8HkwLLKrdGwH9ApRJmM52Q2J7tgaKw': 'https://testnet.mynearwallet.com/linkdrop/v1-4.keypom.testnet/3RUN8ZTzsJ5Y4bUj9q9BphiNNuQ2MsRtNWVmVcDuLgMHUXGdojgeXwQy5sgYaxYXGoE3jZ92iVWUaohftQcxDv4d',
  'ed25519:BtkaELtDDBKRWQKdPf4vongBsksq9Yqkxbx8sJyPzewv': 'https://testnet.mynearwallet.com/linkdrop/v1-4.keypom.testnet/5TDEuKVusLhLVs239KVgY27G7qNz2uTQPqgaoqPNmnLw2E2kbMvNy1nxkASR8aAQkeERP4xJYPrD6148rpg3yDEC',
  'ed25519:4nqAzfJbypBnZzPWu9JnJgCRGNUvt2q4khTCu3zDjrZn': 'https://testnet.mynearwallet.com/linkdrop/v1-4.keypom.testnet/4rXeSVbobWSNV5rLoJdXVF6dWwhm8xCpW5f44bPiBZJQizXqyubJxVbij3aZDoZxqjXtdrPniRHBZ1Z1Feegszcp',
  'ed25519:2ecoFo7d3M5svEbGEA6dx2oMPkBaMxbqf7aEJfqQBEdP': 'https://testnet.mynearwallet.com/linkdrop/v1-4.keypom.testnet/WEXXgM4JrG9mQx4zzJovkdRH7PyYeH3UCGdpsc9bKKcqnHyVaJhcZfUEPzy46G5M8eD4XWZE2eaoot9BaL4Jszh'
}
Keypom Contract Explorer Link: explorer.testnet.near.org/accounts/v1-4.keypom.testnet.com
```


---

## Project Status

---

## Conclusion

---

