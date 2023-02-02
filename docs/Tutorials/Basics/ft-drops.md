---
sidebar_label: 'Fungible Token Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fungible Token Drop

## Introduction
In this tutorial, you will learn how to create an FT Drop. This will allow you to onboard users using a simple Web2 style link. Alternatively, if the user has a wallet already, the assets can be sent there instead.

In the FT drop, the assets consist of $NEAR and Fungible Tokens. 

<p align="center"> <img src={require("/static/img/docs/basic-tutorials/ft/ft.png").default} alt="ft claim" width="80%"/> </p>

To learn more about the FT drop, see the [concepts page](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/ftdrops.md)


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

The process of creating an FT drop can again be broken down into the following steps.  

1) Connecting to the NEAR blockchain.  
2) Ensuring the funder has enough FTs to fund the drop.  
3) Creating the drop.  
4) Registering Keypom on the FT contract.  
5) Transferring  Keypom the necessary Fungible Tokens.  
6) Creating linkdrops.   

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

//      STEP 1 Initializing NEAR blockchain connection.

//      STEP 2 Ensure the funder has enough FTs to fund the drop.

// CREATING DROP AND TRANSFERRING FTs

//      STEP 3 Creating the drop.

//      STEP 4 Registering Keypom on the FT contract.

//      STEP 5 Transferring  Keypom the necessary Fungible Tokens.

// CREATING LINKDROPS

//      STEP 6 Creating Linkdrops
}

FTDropKeypom()
```
Steps 1 and 2 will be covered in "[Getting Started](ft-drops.md#getting-Started)" and Steps 3, 4, and 5 will be under "[Creating FT drop and Transferring FTs](ft-drops.md#creating-drop-and-transferring-fts)". Step 6 will have its own section called "[Creating Linkrops](ft-drops.md#creating-linkdrops)".

---

## Getting Started
In this section, you'll be addressing the first two steps: connecting to NEAR and ensuring the funder has enough FTs for the drop. 

Connecting to the NEAR blockchain will be done using `NEAR-API-JS` and consists of the following steps: 

1) Create an Keystore, which stores your access keys used to sign transactions   
  * select a network, either `testnet` or `mainnet`  
  * choose a location for the Keystore, either a folder on your local machine, or an in-memory keystore   

2) Define a NEAR configuration using the Keystore  
3) Use the configuration to initialize a connection to NEAR  

More information about this process can be found [here](https://docs.near.org/tools/near-api-js/quick-reference#key-store).

:::note
For simplicity, this tutorial will choose a file-based keystore and point to the `~/.near-credentials` folder on your local machine since this is where most of your keys are stored. For more information about KeyStores, visit NEAR's [official docs](https://docs.near.org/tools/near-api-js/quick-reference#key-store).
:::

To ensure the funder has enough FTs to fund the drop, a new concept is to be defined.

:::info
The funder must have enough Fungible Tokens to cover the `amountToTransfer` = *FT per use* X *number of keys* X *uses per key*.
:::

Using `NEAR-API-JS`, a `viewFunction` to the FT contract can be made to call `ft_balance_of`. This will return the funder's FT balance and can be compared with `amountToTransfer` to ensure the funder has enough FTs to fund the drop. 



The code for setting up the NEAR connection and ensuring sufficient funder FT balance is shown below. In the skeleton code, these are steps 1 and 2.

```js reference
https://github.com/keypom/keypom-js/blob/bbe4716ff64dd7a73a6d727a5aea518e8141f60f/docs-examples/keypom-js-sdk/ft-example.js#L9-L41
```
:::note
In the code, you may notice the balances defined using `BN`. These are simply *Big Numbers* and is a library built to handle numbers beyond Javascript's [max safe integer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER). This is necessary as the FTs in this example have a decimal of 24.

With the Fungible Token used in the example, it has a `decimal` parameter value of 24, making it equivalent to 1 $NEAR -> 10<sup>24</sup> Yocto NEAR. This allows us to use [`parseNearAmount`](https://docs.near.org/tools/near-api-js/utils) to convert between the two. Read more on the decimal parameter [here](https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals).
:::

---

## Creating Drop and Transferring FTs
In this section of the tutorial, you'll be creating the drop and transferring the FTs to Keypom using the Keypom SDK. 

As outlined in to introduction, there are 3 tasks to complete in this section.  

- Creating the drop  
- Registering Keypom on the FT contract  
- Transferring the FTs to Keypom  


In the SDK, this process starts with calling the `initKeypom` function. This function will always be the first function you need to call to interact with the SDK. 

`initKeypom` initializes the SDK to allow for interactions with the Keypom Protocol. Without it, none of the other SDK functions would work as expected. If a NEAR connection is not already present,it will initialize a new one for you. More info on the `initKeypom` function can be found [here](../../keypom-sdk/modules#initkeypom).

:::info
The `initKeypom` function is the first function you need to call in order to interact with the SDK.
:::

Following the `initKeypom` call, the FT Drop is created. This is done by calling `createDrop` and adding a `ftData` parameter. 

:::tip
Recall that the private keys being generated using `createDrop` are used to store the assets. These keys are then embedded within a link.

In an FT Drop, the assest consist of $NEAR and FTs.
:::


`ftData` is an object with the following properties.
```bash
ftData
├── contractId
├── senderId
├── amount
```


- `contractId`: the FT contract ID
- `senderId`: the account from which the FTs will be sent to Keypom.
- `amount`: This is the human readable amount of FT, based on the [decimals value](https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals) of the token

Including the `ftData` parameter makes this drop a FT drop. Without it, the Keypom Protocol would treat this drop as a Simple Drop.

More information on the `ftData` parameter can be found [here](../../keypom-sdk/interfaces/FTData.md).

Calling `createDrop` will **automatically** register Keypom on the FT contract. In addition, it will also transfer the Fungible Tokens to Keypom. 

:::info
So long as the funder has an adaquette FT balance, all you need to do is call `createDrop` with `ftData` to create the drop.

The SDK will do all the necessary checks and transfer the FTs to Keypom for you. 
:::

To see what the SDK is doing behind the scenes, a `NEAR-API-JS` equivalent NodeJS script has been provided.

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/bbe4716ff64dd7a73a6d727a5aea518e8141f60f/docs-examples/keypom-js-sdk/ft-example.js#L43-L64
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

## Full Code
Now that everything has been put together, the final code can be seen below.
<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/bbe4716ff64dd7a73a6d727a5aea518e8141f60f/docs-examples/keypom-js-sdk/ft-example.js#L1-L80
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
git clone https://github.com/keypom/keypom-js && cd keypom-js/docs-examples/keypom-js-sdk/n]ft-example.js
```
To run the code you just cloned, install all the necesasry packages. 
```bash
npm install
```
:::caution
Prior to running these scripts, ensure you replace all instances of `keypom-docs-demo.testnet` in the script with the credentials of your account found in your `~/.near-credentials` folder
:::

From there, you are able to run this FT Drop script that was made in this tutorial using the following command:
``` bash
npm run ft-keypom
```
:::note
The SDK script is being tested here; use `npm run ft-near` to test the `NEAR-API-JS` script instead.
:::
This should return a successful drop creation and console log a Public Key and Linkdrop

```bash
Public Keys and Linkdrops:  {
  'ed25519:BwHf7aPaXWRQKj4YDqU67qRwJ9sGPhiNH5TSdBUWbeox': 'https://wallet.testnet.near.org/linkdrop/v1-3.keypom.testnet/5Dvd5UzvVDtrfYJLB8SLGh9tWdiz7oUwhxUNvuu3TjRS54W9vNnVUYbuJ9zzrXaZc8gFPuXMAAAH6NqnxMkMHpaa'
}
```

To see the full console log from this drop creation, see the expandable section below.

<details>
<summary>Console Log of Test</summary>
<p>

``` bash
yarn run v1.22.19
warning ../../../package.json: No license field
$ node docs-examples/keypom-js-sdk/ft-example.js
Receipts: 7rapjpGF8DMhc7rZt5cD3Y291jo44qKMBZHQUGHmttVG, BanoHX6yNjTzX9mdxyRffdqHaQzz2BxipTC1SHGWYrCj, 3Mra6c4pifoXLHEGyQMRwuCBRaHQdrysfKdF1j9ydFzK
        Log [v1-3.keypom.testnet]: Current Block Timestamp: 1674866893166668038
        Log [v1-3.keypom.testnet]: 20 calls with 100000000000000 attached GAS. Pow outcome: 1.8061103. Required Allowance: 18762630063718400000000
        Log [v1-3.keypom.testnet]: was_ft_registered: true
        Log [v1-3.keypom.testnet]: Total required storage Yocto 11910000000000000000000
        Log [v1-3.keypom.testnet]: Current balance: 1.2394966, 
            Required Deposit: 1.0316726, 
            total_required_storage: 0.01191,
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
        Log [v1-3.keypom.testnet]: New user balance 0.207824
        Log [v1-3.keypom.testnet]: Fees collected 0
        Log [v1-3.keypom.testnet]: Performing CCC to get storage from FT contract
Receipts: 9NQFrjxffX2KfGtkwS9T1Fg9qZotUgoR9JSmZYPPNUkL, 4M3Q9VNBKCMxcnPWBsgrQyDEs5sf98zLibFXSK9FjrhB
        Log [v1-3.keypom.testnet]: User has enough balance to cover FT storage. Subtracting 0.0025 from user balance. User balance is now 0.205324
        Log [v1-3.keypom.testnet]: 20 calls with 100000000000000 attached GAS. Pow outcome: 1.8061103. Required Allowance: 18762630063718400000000
        Log [v1-3.keypom.testnet]: FT contract already registered. Refunding user balance for 0.00125. Balance is now 0.206574
Receipts: HHpoyVk6JCTdm3nRx81QgJNHKjfzkpXWcykEcFPUohrv, Ck44W2Qt9JxUni3Zuhb4bFLs8eL84Sc3kKWRc3hiVoWN, 4esPCtbCixj7TDixkiAvsFZJdjjodKRFwAwyRe2TArtP
        Log [ft.keypom.testnet]: EVENT_JSON:{"standard":"nep141","version":"1.0.0","event":"ft_transfer","data":[{"old_owner_id":"keypom-docs-demo.testnet","new_owner_id":"v1-3.keypom.testnet","amount":"1000000000000000000000000"}]}
Receipt: CWvpXcfg41HBP1e6gD7GXgTEehT1QeybTRMT1j4iANSh
        Log [ft.keypom.testnet]: New uses registered 1
Public Keys and Linkdrops:  {
  'ed25519:BwHf7aPaXWRQKj4YDqU67qRwJ9sGPhiNH5TSdBUWbeox': 'https://wallet.testnet.near.org/linkdrop/v1-3.keypom.testnet/5Dvd5UzvVDtrfYJLB8SLGh9tWdiz7oUwhxUNvuu3TjRS54W9vNnVUYbuJ9zzrXaZc8gFPuXMAAAH6NqnxMkMHpaa'
}
Keypom Contract Explorer Link: https://explorer.testnet.near.org/accounts/v1-3.keypom.testnet 
```

</p>
</details>

### Claiming and Explorer Transactions
Once you have the link, you are able to claim the linkdrop you've just created. Once clicked, it will take you to the following NEAR Wallet page, where you will have the choice to claim with an existing account or create a new one.  
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/ft/nw-claim.png").default} alt="NEAR Wallet claim" width="80%"/> </p>

In your NEAR wallet, you should now be able to see your FT tokens that were claimed. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/ft/ft.png").default} alt="ft claim" width="80%"/> </p>

To check the transactions, click the final link in the console log when you run the script.
```bash
Keypom Contract Explorer Link: https://explorer.testnet.near.org/accounts/v1-3.keypom.testnet 
```

From there, you should be able to see the [`create_drop`](https://explorer.testnet.near.org/transactions/6ipZEMFU8zQWupZg66gDkngBP3XzZuq5q2QqsTqab3j#7rapjpGF8DMhc7rZt5cD3Y291jo44qKMBZHQUGHmttVG), [`ft_transfer_call`](https://explorer.testnet.near.org/transactions/JrpKU5uhsmsoe2qxcCieKJyhhBLsq2YvVaduHE6xC8w#HHpoyVk6JCTdm3nRx81QgJNHKjfzkpXWcykEcFPUohrv) and [`claim`](https://explorer.testnet.near.org/transactions/67dsn2WAz69CHiwNqqZJdNpkj7nErWBL6Hcek5abj94y) transactions. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/ft/explorer.png").default} alt="explorer transactions" width="80%"/> </p>


:::note
Recall that `ft_transfer_call` is never explicitely called but rather `createDrop` calls it for you; this can be seen in the explorer shown above. 

This is the SDK in action!
:::

---

## Conclusion
In this tutorial, you've learned to ensure the funder has a [sufficient FT balance](ft-drops.md#getting-started) for the drop, [create an FT drop](ft-drops.md#creating-drop-and-transferring-fts) with the SDK, and to [transfer FTs](ft-drops.md#creating-drop-and-transferring-fts) to Keypom. 

In the next tutorial, you will learn to create a function call drop. 