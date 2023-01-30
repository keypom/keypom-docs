---
sidebar_label: 'Non Fungible Token Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Non Fungible Token Drop
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
In this tutorial, you are going to learn how to create an NFT drop from scratch.

An NFT drop allows you to onboard users onto NEAR and send them any amount of $NEAR and an NFT. To learn more on what an NFT drop is, [click here](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/nftdrops.md)
:::

When creating an NFT drop, the steps are very similar to creating a simple drop with an added layer of complexity. The major difference is that the NFTs must be added to drop. This is done by transferring the NFTs to Keypom.

1) Initialization, which includes setting up a connection to the NEAR blockchain  
2) If you don't own the NFT, mint it using the `nft_mint` function 
3) Create the drop with the NFT metadata   
4) Transfer the ownership of the NFTs to Keypom  

:::info
The NFT must be transfered to Keypom so that it can transfer the NFT to the user when they claim their drop. 
:::

The following skeleton code can be used as a starting point:

```js
// Each of the two methods to create this drop will have their own unique set of imports

// Imports used in the Keypom SDK method:
const { initKeypom, createDrop } = require("keypom-js");
const { parseNearAmount, formatNearAmount } = require("near-api-js/lib/utils/format");
const { KeyPair, keyStores, connect } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();

// Imports used in the NEAR-API-JS method:
const { parseNearAmount, formatNearAmount } = require("near-api-js/lib/utils/format");
const { KeyPair, keyStores, connect } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();


async function NFTDropKeypom(){
// GETTING STARTED

//      STEP 1: Initiate a NEAR connection.

//      STEP 2: Mint NFTs

// CREATING DROP AND TRANSFERRING NFTs

//      STEP 3: Create NFT drop

//      STEP 4: Transfer NFTs to Keypom
}

NFTDropKeypom()
```

For this tutorial, steps 1 and 2 will be grouped under "[Getting Started](nft-drops.md#getting-started)" and steps 3 and 4 will be grouped under "[Creating drop and transferring NFT](nft-drops.md#creating-drop-and-transferring-nft)"

---

## Getting Started
In this section, the NEAR blockchain connection is set up and the NFTs will be minted to ensure you are transferring NFTs that *you* own. If you already own the NFTs you wish to add to the drop, there is no need to mint them here. 

The code for setting up the NEAR connection and minting the NFT is shown below. In the skeleton code, these are steps 1 and 2.

``` js reference
https://github.com/keypom/keypom-js/blob/49244d227f23535ae8962707183d1eca59280d29/docs-examples/keypom-js-sdk/nft-example.js#L8-L43
```

:::note
The NFT must be minted with a NEAR-API-JS `functionCall` to the NFT contract.

Function arguments for `functionCall` can be found [here](https://docs.near.org/tools/near-api-js/reference/modules/transaction#functioncall)
:::

---

## Creating Drop and Transferring NFT

The next step is where the drop is created and the NFT is transfered. Similar to what was done in the [Simple Drop](simple-drops.md#creating-the-simple-drop) tutorial, the drop creation using the SDK is very simple.

### The Keypom SDK Approach

:::info
The `initKeypom` function is the first function you need to call in order to interact with the SDK.
:::

After calling `initKeypom`, a simple `createDrop` function is called where the `nftData` is passed in. This data includes the NFT contract id, sender ID  and the list of token IDs of the NFTs to be added to the drop. 

:::tip
Adding the `nftData` argument is what makes this drop an NFT drop. 
:::

### The NEAR-API-JS Approach

With the NEAR-API-JS approach, you can see that `create_drop` and `nft_transfer_call` are called seperately. The first `create_drop` call looks similar to the [Simple Drop](simple-drops.md#creating-the-simple-drop) process, with the added NFT data. The major difference lies in needing to make a seperate `nft_transfer_call` function call. 

:::info
When using the SDK, there is no need for you to call `nft_transfer_call`. That is because the SDK's `createDrop` will do this for you and transfer the NFT ownership to Keypom automatically. 

It's important to ensure you own the NFTs before calling `createDrop` as otherwise it will fail. 
:::

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/49244d227f23535ae8962707183d1eca59280d29/docs-examples/keypom-js-sdk/nft-example.js#L45-L67
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/49244d227f23535ae8962707183d1eca59280d29/docs-examples/near-api-js/nft-near-example.js#L44-L93
```

</TabItem>
</Tabs>

---

## Full Solution
With all the steps completed, all the code can be placed into the skeleton from the [introduction](nft-drops.md#introduction). 

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/49244d227f23535ae8962707183d1eca59280d29/docs-examples/keypom-js-sdk/nft-example.js#L1-L80
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/49244d227f23535ae8962707183d1eca59280d29/docs-examples/near-api-js/nft-near-example.js#L1-L96
```

</TabItem>
</Tabs>

---

## Testing
### Running the Script
Here, you'll learn how to run the code that was just covered, and what to expect.

To view the completed code, clone the following repo:
``` bash
git clone https://github.com/keypom/keypom-js && cd keypom-js/docs-examples/keypom-js-sdk/nft-example.js
```
To run the code you just cloned, install all the necesasry packages. 
```bash
npm install
```
:::caution
Prior to running these scripts, ensure you replace all instances of `keypom-docs-demo.testnet` in the script with the credentials of your account found in your `~/.near-credentials` folder
:::

From there, you are able to run this NFT Drop script that was made in this tutorial using the following command:
``` bash
npm run nft-keypom
```
:::note
The SDK script is being tested here; use `npm run nft-near` to test the NEAR-API-JS script instead.
:::
This should return a successful drop creation and console log a Public Key and Linkdrop
 b 
```bash
Public Keys and Linkdrops:  {
  'ed25519:Gw5Lkkts1qHUEXvkcX6H3hkxNFQrC6cnLNtDApxie2p3': 'https://wallet.testnet.near.org/linkdrop/v1-3.keypom.testnet/3amoAemhXqvbCf7Ufu8gXnySE8dmTjJqjBntaUZQLeRsicEd1VsfRSCauMS8abGbzxbmDiPgtGcm6efs4Qfcj4xb'
}
```

To see the full console log from this drop creation, see the expandable section below.

<details>
<summary>Console Log of Test</summary>
<p>

``` bash
yarn run v1.22.19
warning ../../../package.json: No license field
$ node docs-examples/keypom-js-sdk/nft-example.js
Account.functionCall(contractId, methodName, args, gas, amount) deprecated use `Account.functionCall(FunctionCallOptions)` instead docs-examples/keypom-js-sdk/nft-example.js:28:23
Receipts: CZ2FN99DCY2VSEp3PtGg8A7DAu6gb6cbM3vsypU9XJkB, fCfRujBXDPgdMhPEFkw6eiJBcAsWCpcXcHHL6wDgj52
        Log [nft.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"nft-1.0.0","event":"nft_mint","data":[{"owner_id":"keypom-docs-demo.testnet","token_ids":["keypom-sdk-token-01"]}]}
Receipts: 5tAUYno3BKpjEu8TQ1WEdBE4m3HxBvm9Z4W3zZ5xzS87, BZkWwC9bVaMnbmChHr49bymqUomKeXGsGC7ZgzUZpW2b
        Log [v1-3.keypom.testnet]: Current Block Timestamp: 1674846627051314306
        Log [v1-3.keypom.testnet]: 20 calls with 100000000000000 attached GAS. Pow outcome: 1.8061103. Required Allowance: 18762630063718400000000
        Log [v1-3.keypom.testnet]: Total required storage Yocto 12070000000000000000000
        Log [v1-3.keypom.testnet]: Current balance: 1.1821351, 
            Required Deposit: 1.0318326, 
            total_required_storage: 0.01207,
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
        Log [v1-3.keypom.testnet]: New user balance 0.1503024
        Log [v1-3.keypom.testnet]: Fees collected 0
Receipts: CtmXr16yuuV4KAPZm2ZNbXNKcXundTUSNAggzVgi7N59, Cr9QM9FefBf9bGcuHavWUwj2utwAkdpaXM4xeVTrMMA, FsFwnM7WCFZswC4bZkjwi1CdbsKeuS7BTerptBJtVMnK
        Log [nft.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"nft-1.0.0","event":"nft_transfer","data":[{"old_owner_id":"keypom-docs-demo.testnet","new_owner_id":"v1-3.keypom.testnet","token_ids":["keypom-sdk-token-01"]}]}
Receipt: 6gVMGoupyoJKL7RjnaEjHzR2nLaGZpT6nGTp6HMCmafz
        Log [nft.examples.testnet]: drop.registered_uses 1
        Log [nft.examples.testnet]: Subtracting 1040000000000000000000 from funder to cover storage. New balance is 149262478807229311000000
Public Keys and Linkdrops:  {
  'ed25519:Gw5Lkkts1qHUEXvkcX6H3hkxNFQrC6cnLNtDApxie2p3': 'https://wallet.testnet.near.org/linkdrop/v1-3.keypom.testnet/3amoAemhXqvbCf7Ufu8gXnySE8dmTjJqjBntaUZQLeRsicEd1VsfRSCauMS8abGbzxbmDiPgtGcm6efs4Qfcj4xb'
}
```

</p>
</details>

### Claiming and Explorer Transactions
Once you have the link, you are able to claim the linkdrop you've just created. The output link will take you to the following  NEAR wallet page, where you will have the choice to call claim to an existing account or create a new one. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/nft/nw-claim.png").default} alt="Near Wallet claim" width="80%"/> </p>

After the claim transaction succeeds, you can view the NFT in your collectibles tab.
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/nft/collectibles-claimed.png").default} alt="MyNearWallet claim" width="50%"/> </p>

You can check the transactions on the [NEAR Explorer](https://explorer.near.org/).

To view the transactions, you can search up the Keypom contract ID: `v1-3.keypom.testnet`. You should be able to see the [`create_drop`](https://explorer.testnet.near.org/transactions/973w2aW112VuxA5CLhiqVo46bCchJAWovMQcp1F56zwj#5tAUYno3BKpjEu8TQ1WEdBE4m3HxBvm9Z4W3zZ5xzS87), [`nft_transfer_call`](https://explorer.testnet.near.org/transactions/4EPqp1kU6a8cJ2ST1CPjJc7FTHbNZE8jqCGEpKxHCcE8#CtmXr16yuuV4KAPZm2ZNbXNKcXundTUSNAggzVgi7N59) and [`claim`](https://explorer.testnet.near.org/transactions/ERqgjZMrQsu7Z8m58iE7KL63yDAz77Fgfkr4Y14spTZH) transactions. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/nft/explorer.png").default} alt="explorer transactions" width="80%"/> </p>

:::note
Recall that in the SDK approach, `nft_transfer_call` is never explicitely called but rather `createDrop` calls it for you; this can be seen in the explorer shown above. 

This is the SDK in action!
:::

---

## Conclusion
In this NFT tutorial, you learned about the steps needed while [initializing an NFT drop](nft-drops.md#getting-started) and the process of [creating the NFT drop](nft-drops.md#creating-drop-and-transferring-nft).

With the NFT drop under your belt, the next tutorial will be the FT drop tutorial. The process is similar to the NFT drop tutorial but with a few different steps. 