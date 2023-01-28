---
sidebar_label: 'Fungible Token Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fungible Token Drop
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
In this tutorial, you are going to learn how to create an FT drop from scratch.

An FT drop allows you to onboard users onto NEAR and send them any amount of $NEAR *and* Fungible Tokens. To learn more on what an FT drop is, [click here](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/ftdrops.md)
:::

The process of creating an FT drop can again be broken down into the following steps.  

1) Connecting to the NEAR blockchain.  
2) Ensuring the funder has enough FTs to fund the drop.  
3) Creating the drop.  
4) Registering the Keypom contract on the FT contract.  
5) Transferring  Keypom the necessary Fungible Tokens.  

With this, the following skeleton code can be created. 
```js
// Each of the two methods to create this drop will have their own unique set of imports

// Imports used in the Keypom SDK method:
const { initKeypom, createDrop } = require("keypom-js");
const { BN } = require("bn.js");

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

//      STEP 4 Registering the Keypom contract on the FT contract.

//      STEP 5 Transferring  Keypom the necessary Fungible Tokens.
}

FTDropKeypom()
```
Steps 1 and 2 will be covered in "[Getting Started](ft-drops.md#getting-Started)" and Steps 3, 4, and 5 will be under "[Creating FT drop and Transferring FTs](ft-drops.md#creating-drop-and-transferring-fts)"

---

## Getting Started
In this section, you'll be addressing the first two steps: connecting to NEAR and ensuring the funder has enough FTs for the drop. 

Connecting to the NEAR blockchain will be done using NEAR-API-JS. 

To ensure the funder has enough FTs to fund the drop, a new concept is to be defined.

:::info
The funder must have enough Fungible Tokens to cover the `amountToTransfer` = *FT per use* X *number of keys* X *uses per key*.
:::

Using NEAR-API-JS, a `viewFunction` to the FT contract can be made to call `ft_balance_of`. This will return the funder's FT balance and can be compared with `amountToTransfer` to ensure the funder has enough FTs to fund the drop. 


:::note
In the code, you may notice the balances defined using `BN`. These are simply *Big Numbers* and is a library built to handle numbers beyond Javascript's [max safe integer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER). This is necessary as the FTs in this example have a decimal of 24.

With the Fungible Token used in the example, it has a `decimal` parameter value of 24, making it equivalent to 1 $NEAR -> 10<sup>24</sup> Yocto NEAR. This allows us to use [`parseNearAmount`](https://docs.near.org/tools/near-api-js/utils) to convert between the two. Read more on the decimal parameter [here](https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals).
:::

The code for setting up the NEAR connection and ensuring sufficient funder FT balance is shown below. In the skeleton code, these are steps 1 and 2.

```js reference
https://github.com/keypom/keypom-js/blob/7267b48750b204c2c4d9672ff1a7f5f46c53b371/docs-examples/keypom-js-sdk/ft-example.js#L9-L41
```

---

## Creating Drop and Transferring FTs
In this section of the tutorial, you'll be creating the drop and transferring the FTs to Keypom. 

:::info
Part of this process is ensuring that Keypom is registered on the FT contract. If not, there will be a small storage fee to pay, as the FT contract is incurring a cost to store the Keypom contractID on its list of token owners. For more info, see the NEAR [Nomicon](https://nomicon.io/Standards/StorageManagement)
::: 

Recall from the introduction that there are 3 tasks to complete in this section.  

- Creating the drop  
- Registering Keypom on the FT contract  
- Transferring the FTs to Keypom  

### The Keypom SDK Approach
When using the SDK, the first step of this process is to call `initKeypom`

:::info
The `initKeypom` function is the first function you need to call in order to interact with the SDK.
:::

Following the `initKeypom` call, `createDrop` is called, this time with `ftdata` passed in, which consists of the following: 

- `contractId`: the FT contract ID
- `senderId`: the account from which the FTs will be sent to the Keypom from.
- `amount`: This is the human readable amount of FT, based on the [decimals value](https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals) of the token

Calling `createDrop` will **automatically** register Keypom on the FT contract, if not already registered,*and* transfer the FT tokens to Keypom. 

:::tip
Adding the `ftData` argument is what makes this drop an NFT drop. 
:::

### The NEAR-API-JS Approach

This process using NEAR-API-JS is done manually, you must explicitely call all the functions for each task and ensure they do not fail. 

First, `create_drop` is called to create the drop, using the `ft` object. The arguments are the same as above, except `balance_per_use` is the **total** values of FTs for each use. For example, if you want the user to receive 1 FT per claim and the decimal value of that FT is 8, then `balance_per_use` is 100000000. 

Once the drop is created, you need to pay for the storage deposit and transfer the FTs to Keypom using the `storage_deposit` and `ft_transfer_call` functions respectively. 

The code for both approaches to this section can be seen below.

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/7267b48750b204c2c4d9672ff1a7f5f46c53b371/docs-examples/keypom-js-sdk/ft-example.js#L43-L64
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/7267b48750b204c2c4d9672ff1a7f5f46c53b371/docs-examples/near-api-js/ft-near-example.js#L43-L108
```

</TabItem>
</Tabs>

---

## Full Code
Inserting the above code blocks into the skeleton code from the [introduction](ft-drops.md#introduction) gives you the final finished code below. 

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/7267b48750b204c2c4d9672ff1a7f5f46c53b371/docs-examples/keypom-js-sdk/ft-example.js#L1-L79
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/7267b48750b204c2c4d9672ff1a7f5f46c53b371/docs-examples/near-api-js/ft-near-example.js#L1-L110
```

</TabItem>
</Tabs>

---

## Testing
### Running the Script and Expected Console Logs
Here, you'll learn how to run the code that was just covered, and what to expect.

To view the completed code, clone the following repo:
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
The SDK script is being tested here; use `npm run ft-near` to test the NEAR-API-JS script instead.
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
```

</p>
</details>

### Claiming and Explorer Transactions
Once you have the link, you are able to claim the linkdrop you've just created. The output link will take you to the following NEAR Wallet page, where you will have the choice to call claim to an existing account or create a new one. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/ft/nw-claim.png").default} alt="MyNearWallet claim" width="80%"/> </p>

You can check the transactions on the [NEAR Explorer](https://explorer.near.org/).

To view the transactions, you can search up the Keypom contract ID: `v1-3.keypom.testnet`. You should be able to see the `create_drop`, `ft_transfer_call` and `claim` transactions. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/ft/explorer.png").default} alt="explorer transactions" width="80%"/> </p>

:::note
Recall that in the SDK approach, `ft_transfer_call` is never explicitely called but rather `createDrop` calls it for you; this can be seen in the explorer shown above. 

This is the SDK in action!
:::

---

## Conclusion
In this tutorial, you've learned to [ensure the funder has enough FTs](ft-drops.md#getting-started) for the drop, [create an FT drop](ft-drops.md#creating-drop-and-transferring-fts) with both NEAR-API-JS and the SDK, and to [transfer FTs to Keypom](ft-drops.md#creating-drop-and-transferring-fts). 

In the next tutorial, you will learn to create a function call drop. 