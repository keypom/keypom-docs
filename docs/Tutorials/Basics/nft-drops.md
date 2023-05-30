---
sidebar_label: 'Non Fungible Token Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Non Fungible Token Drop

## Introduction
In this tutorial, you will learn how to create a non-fungible token drop from scratch. This allows you onboard users both with $NEAR and an existing NFT with the click of a link. This is great for sending an NFT that you own to your friends without needing to worry about whether or not they have a NEAR wallet.


<p align="center"> <img src={require("/static/img/docs/basic-tutorials/nft/collectibles-claimed2.png").default} alt="MyNearWallet claim" width="65%"/> </p>

To learn more about the NFT drop, see the [concepts page](../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/nft-drops.md)

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
touch nft-keypom.js
```

</TabItem>
<TabItem value="WNDS" label="Windows">

```bash
fsutil file createnew nft-keypom.js 0
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
├── nft-keypom.js
├── package.json
├── package-lock.json
├── node_modules
│   └── @keypom/core
│   └── ...
```

You are now ready to begin creating your drop!

---

## Breaking Down the Problem

The process of creating an NFT drop can be broken down into the following steps.  

1) Establish a connection to the NEAR blockchain.  
2) If you don't own the NFT, mint it using the `nft_mint` function.   
3) Create the keys and the drop with the NFT information.   
4) Transfer ownership of the NFTs to Keypom.  
5) Create linkdrops.  

:::info
The NFT ownership must be transferred to Keypom so that it can send the NFT to the user when they claim their drop. 
:::

The following skeleton code can be used as a starting point:

```js
// Each of the two methods to create this drop will have their own unique set of imports

// Imports used in the Keypom SDK method:
const { initKeypom, createDrop, getEnv, formatLinkdropUrl } = require("@keypom/core");
const { parseNearAmount } = require("@near-js/utils");
const { UnencryptedFileSystemKeyStore } = require("@near-js/keystores-node");
const { Near } = require("@near-js/wallet-account");
const { Account } = require("@near-js/accounts");
const path = require("path");
const homedir = require("os").homedir();

// Imports used in the NEAR-API-JS method:
const { parseNearAmount } = require("@near-js/utils");
const { KeyPair } = require("@near-js/crypto")
const { UnencryptedFileSystemKeyStore } = require("@near-js/keystores-node");
const { Near } = require("@near-js/wallet-account");
const { Account } = require("@near-js/accounts");
const { getRecentDropId } = require("../utils/general.js")
const path = require("path");
const homedir = require("os").homedir();


async function NFTDropKeypom(){
// GETTING STARTED

//      STEP 1: Initiate a NEAR connection.

//      STEP 2: Mint NFTs

// CREATING DROP AND TRANSFERRING NFTs

//      STEP 3: Create NFT drop

//      STEP 4: Transfer NFTs to Keypom

// CREATING LINKDROPS

//      STEP 5: Create Linkdrops
}

NFTDropKeypom()
```

For this tutorial, steps 1 and 2 will be grouped under "[Getting Started](nft-drops.md#getting-started)", steps 3 and 4 will be grouped under "[Creating drop and transferring NFT](nft-drops.md#creating-drop-and-transferring-nft)", and step 5 will have its own section called "[Creating Linkrops](nft-drops.md#creating-linkdrops)".

---

## Getting Started
In this section, the NEAR blockchain connection is set up and the NFTs will be minted to ensure you are transferring NFTs that *you* own. If you already own the NFTs you wish to add to the drop, there is no need to mint them here. 

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

The code for setting up the NEAR connection and minting the NFT is shown below. In the skeleton code, these are steps 1 and 2.

``` js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/non-fungible-token-drop/nft-example.js#L11-L49
```

:::note
The NFT must be minted with a `NEAR-API-JS` `functionCall` to the NFT contract.

Function arguments for `functionCall` can be found [here](https://docs.near.org/tools/near-api-js/reference/modules/transaction#functioncall)
:::

---

## Creating Drop and Transferring NFT

In this section of the tutorial, you'll be creating the NFT drop and transferring the NFT to Keypom using the Keypom SDK.

This process starts with calling the `initKeypom` function and will always be the first function you call to interact with the SDK. 

`initKeypom` initializes the SDK to allow for interactions with the Keypom smart contracts. Without it, none of the other SDK functions would work as expected. If a NEAR connection is not already present, it will initialize a new one for you. More info on the `initKeypom` function can be found [here](../../keypom-sdk/Core/modules.md#initkeypom).

After calling `initKeypom`, the NFT Drop is created. This is done by calling `createDrop` and adding an `nftData` parameter.

:::tip
Recall that the private keys being generated using `createDrop` are used to store the assets. These keys are then embedded within a link.

In an NFT Drop, the assets consist of an NFT and optional $NEAR.
:::

`nftData` is an object with the following properties.

```bash
nftData
├── contractId
├── senderId
├── tokenIds
```

- `contractId`: The contract ID where the NFTs for this drop are coming from
- `senderId`: The current owner of the NFTs that will be sent to Keypom
- `tokenIds`: A list of all the token IDs to be sent to Keypom during the NFT drop creation process. 

Including the `nftData` parameter categorizes this as an NFT drop. Without it, the Keypom Protocol would treat this drop as a Simple Drop.

More information on the `nftData` parameter can be found [here](../../keypom-sdk/Core/interfaces/NFTData.md).

To see what the SDK is doing behind the scenes, a `NEAR-API-JS` equivalent NodeJS script has been provided.

<Tabs>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/non-fungible-token-drop/nft-example.js#L51-L74
```

</TabItem>
<TabItem value="NRJS" label="💻 NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/non-fungible-token-drop/nft-near-example.js#L52-L101
```

</TabItem>
</Tabs>

:::note
All function parameters and default values for the SDK and Keypom functions can be found in the [SDK Typedocs](../../keypom-sdk/Core/modules.md). For `NEAR-API-JS` functions, their arguments can be found [here](https://docs.near.org/tools/near-api-js/reference)
:::

---

## Creating Linkdrops
The last step in this process is to create the links themselves so that you can easily distribute the assets to people. This is done by embedding the private key, containing the $NEAR, into the link along with the Keypom contract ID.  

With the Keypom SDK, this is all neatly wrapped up in the function [`formatLinkdropUrl`](../../keypom-sdk/Core/modules.md#formatlinkdropurl). You just need to provide the base URL format and the private key you wish to embed.

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/non-fungible-token-drop/nft-example.js#L76-L82
```

---

## Full Solution
Now that everything has been put together, the final code can be seen below.

<Tabs>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/non-fungible-token-drop/nft-example.js#L1-L89
```

</TabItem>
<TabItem value="NRJS" label="💻 NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/non-fungible-token-drop/nft-near-example.js#L1-L114
```

</TabItem>
</Tabs>

---

## Testing
### Running the Script
Here, you'll learn how to run the code that was just covered, and what to expect.

To view the completed code, clone the [Keypom Docs Examples](https://github.com/keypom/keypom-docs-examples) repository and navigate to the `basic-tutorials/nft-drop`.
``` bash
git clone https://github.com/keypom/keypom-docs-examples.git && cd keypom-docs-examples/basic-tutorials/nft-drop
```
From there, you can and open the `nft-example.js` file.

To run the code you just cloned, return to the `keypom-docs-examples` directory and install all the necessary packages. 
```bash
cd .. && cd .. && yarn
```

:::caution
Prior to running these scripts, ensure you replace all instances of `keypom-docs-demo.testnet` in the script with the credentials of your account found in your `~/.near-credentials` folder
:::

From there, you run this NFT Drop script that was made in this tutorial using the following command:
``` bash
yarn basic:nft:keypom
```
:::note
The SDK script is being tested here; use `yarn basic:nft:naj` to test the `NEAR-API-JS` script instead.
:::
This should return a successful drop creation and console log a Public Key and Linkdrop: 
```bash
Public Keys:  [ 'ed25519:Cf48tjtLrRDm5qYN5fyNvPHBTNVkSsX2mP2mfw2W2f3N' ]
Linkdrops:  [
  'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/4iBKGBMhKo3BLi8wfc6qDPxUG3xrsXygDbzVwXBsh3tEvLVE2a4EGDtHreH89a7peAhC8yot1Zm5vd3nfnxxmzv4'
]
Keypom Contract Explorer Link: explorer.testnet.near.org/accounts/v2.keypom.testnet.com
```

To see the full console log from this drop creation, see the expandable section below.

<details>
<summary>Console Log of Test</summary>
<p>

``` bash
Receipts: 94Hxiw6dy2VbgfWWuL8scyAKutgmZ6TnyaGLuSdw8bdw, EPBCevWD8jCmVmRhH4r7nEWY5P5mHNXBzxRs8FFmjh1s
        Log [nft.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"nft-1.0.0","event":"nft_mint","data":[{"owner_id":"keypom-docs-demo.testnet","token_ids":["keypom-token-1682351707371"]}]}
Receipts: 8VKpVfRZkPBJzZR42aBiytbECXFYqAvLF72jRUgaccHt, AV5tmBbWuzkV7DLNX6o4LgkeBysShJ647VmdY3ye15s
        Log [v2.keypom.testnet]: Current Block Timestamp: 1682351728091701553
        Log [v2.keypom.testnet]: 21 calls with 105000000000000 attached GAS. Pow outcome: 1.8602935. Required Allowance: 20248156910387200000000
        Log [v2.keypom.testnet]: Total required storage Yocto 12140000000000000000000
        Log [v2.keypom.testnet]: Current balance: 8.2333838, 
            Required Deposit: 1.0333881, 
            total_required_storage: 0.01214,
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
        Log [v2.keypom.testnet]: New user balance 7.1999957
        Log [v2.keypom.testnet]: Fees collected 0
Receipts: HwvpQcMKQdWczLsbBsvZD72UdJTpY6BTDPZBFwk7YZFy, DGs58AziaMcgkZbhki2caZBAFC6fYa83qXfziQmmwaeU, 3zs1apRpLhdfYpdRJUidgP8YJzkPr2YKaoVT8Hitau5p
        Log [nft.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"nft-1.0.0","event":"nft_transfer","data":[{"old_owner_id":"keypom-docs-demo.testnet","new_owner_id":"v2.keypom.testnet","token_ids":["keypom-token-1682351707371"]}]}
Receipt: 4HJAWvH67JtsdDVQP1vsRTniFwkALWokPRpkPbMxqArY
        Log [nft.examples.testnet]: drop.registered_uses 1
        Log [nft.examples.testnet]: Subtracting 1110000000000000000000 from funder to cover storage. New balance is 7198885721113380930000000
Public Keys:  [ 'ed25519:Cf48tjtLrRDm5qYN5fyNvPHBTNVkSsX2mP2mfw2W2f3N' ]
Linkdrops:  [
  'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/4iBKGBMhKo3BLi8wfc6qDPxUG3xrsXygDbzVwXBsh3tEvLVE2a4EGDtHreH89a7peAhC8yot1Zm5vd3nfnxxmzv4'
]
Keypom Contract Explorer Link: explorer.testnet.near.org/accounts/v2.keypom.testnet.com
```

</p>
</details>

### Claiming and Explorer Transactions
Once you click the link, it will take you to the following NEAR Wallet page, where you will have the choice to claim with an existing account or create a new one.  
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/nft/nw-claim.png").default} alt="Near Wallet claim" width="80%"/> </p>

After the claim transaction succeeds, you can view the NFT in your collectibles tab.
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/nft/collectibles-claimed2.png").default} alt="NFT collectibles claim" width="65%"/> </p>

To check the transactions, click the final link in the console log when you run the script.
```bash
Keypom Contract Explorer Link: https://explorer.testnet.near.org/accounts/v2.keypom.testnet 
```

From there, you should be able to see the [`create_drop`](https://explorer.testnet.near.org/transactions/9rR6mPjoQFKC2Euuvn5yh5e6hPv3WTrMYjwja3ppkjaD), [`nft_transfer_call`](https://explorer.testnet.near.org/transactions/A2hdnm6mHQNLupFLP1vMNZ1J8QHkxLqDLqocUnQxNC5F) and [`claim`](https://explorer.testnet.near.org/transactions/5Kx9F5nxjbWpq8qUr7rRuDun8zipvR7TFbVuPoP5qwBW) transactions. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/nft/explorer.png").default} alt="explorer transactions" width="80%"/> </p>

:::note
Recall that `nft_transfer_call` is never explicitly called but rather `createDrop` calls it for you; this can be seen in the explorer shown above. 

This is the SDK in action!
:::

---

## Conclusion
In this NFT tutorial, you learned about the steps needed while [initializing an NFT drop](nft-drops.md#getting-started) and the process of [creating the NFT drop](nft-drops.md#creating-drop-and-transferring-nft). Once the drop was created, you constructed a valid linkdrop using the private keys in order to claim the assets.

In the next tutorial, you will learn how to create a Fungible Token drop, which is similar to the NFT drop, but transfers FTs instead of NFTs.