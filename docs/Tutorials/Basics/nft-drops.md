---
sidebar_label: 'Non Fungible Token Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Non Fungible Token Drop
## Introduction
:::tip
It's recommended you understand the basics of how to create a [Simple Drop](simple-drops.md) first before moving to NFT drops. Many of the concepts in this tutorials are extensions on the Simple Drop. 

It's also important to understand the workings of the [NFT drop](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/nftdrops.md) as many concepts will be referenced from there.
:::

When creating an NFT drop, the steps are very similar to creating a simple drop with an added layer of complexity. The major difference is that the NFTs must be added to drop. This is done by transferring the NFTs to Keypom.

1) Initialization, which includes setting up a connection to the NEAR blockchain  
2) Mint the NFTs to ensure you own the NFTs you will be adding to the drop. If you own them already, this can be skipped.  
3) Create the drop, including NFT metadata  
4) Transfer the ownership of the NFTs to Keypom  


To start, the skeleton code is created. 

```js
// Each of the two methods to create this drop will have their own unique set of imports

// Imports used in the Keypom SDK method:
const { initKeypom, createDrop } = require("keypom-js");

// Imports used in the NEAR-API-JS method:
const { parseNearAmount, formatNearAmount } = require("near-api-js/lib/utils/format");
const { KeyPair, keyStores, connect } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();


async function NFTDropKeypom(){
// INITIALIZATION

//      STEP 1: Initiate a NEAR connection.

//      STEP 2: Mint NFTs

// CREATING DROP AND TRANSFERRING NFTs

//      STEP 3: Create NFT drop

//      STEP 4: Transfer NFTs to Keypom
}

NFTDropKeypom()
```

For this tutorial, steps 1 and 2 will be grouped under "[Initialization](nft-drops.md#initialization)" and steps 3 and 4 will be grouped under "[Creating drops and transferring NFTs](nft-drops.md#creating-drop-and-transferring-nfts)"

---

## Initialization
In this section, the NEAR blockchain connection is set up and the NFTs will be minted to ensure you are transferring NFTs that *you* own. This will serve as the foundation for creating the drop and transferring ownership of the NFTs to Keypom.

The NEAR connection process is identical to the one seen in the creating a [Simple Drop](simple-drops.md#initialization). If you already own the NFTs you wish to add to the drop, there is no need to mint them here. 

In this section, you'll notice that both the SDK and NEAR-API-JS share the same code for this process. The explanation is not a crucial detail but is in the note below the code block. If you do not need to mint the NFTs, you are free to use `initKeypom` to initiate the NEAR connection. 

The code for setting up the NEAR connection and minting the NFT is shown below. In the skeleton code, these are steps 1 and 2.

``` js reference
https://github.com/keypom/keypom-js/blob/4e3aeb7cce7e50ee1bb27c3384d46fd6536f502a/docs-examples/keypom-js-sdk/nft-example.js#L8-L42
```

:::note
In the SDK approach, `initKeypom` will not be used to **initialize a NEAR connection**. Instead, NEAR-API-JS will be used to initiate a NEAR connection. This is because the NFT must be minted with a NEAR-API-JS `functionCall`, which requires a NEAR connection object to be passed in.

Function arguments for `functionCall` can be found [here](https://docs.near.org/tools/near-api-js/reference/modules/transaction#functioncall)
:::

---

## Creating Drop and Transferring NFTs

The next step is where the drop is created and transfer of your NFTs to the Keypom smart contract occur. 

Similar to what was done in the [Simple Drop](simple-drops.md#creating-keypairs-and-simple-drop) tutorial, the drop creation using the SDK is very simple.
:::info
`initKeypom` is used here to initialize all the tools needed to interact with the SDK. More info on this function can be found in the [TypeDocs](creating-drop.md) <-- LINK THIS
:::
The SDK approach requires you to use `initKeypom` first to initialize the tools needed for the SDK. Then, a simple `createDrop` function is called where the `nftData` is passed in. This data includes the NFT contract id, sender ID (which in this case is you) and the list of token IDs of the NFTs to be added to the drop. 

With the NEAR-API-JS approach, you can see that `create_drop` and `nft_transfer_call` are called seperately. The first `create_drop` call looks similar to the [Simple Drop](simple-drops.md#creating-keypairs-and-simple-drop) process, with the added NFT data. The major difference lies in needing to make a seperate `nft_transfer_call` function call. 

:::info
When using the SDK, there is no need for you to call `nft_transfer_call`. That is because the SDK's `createDrop` will do this for you and transfer the NFT ownership to Keypom automatically. 

It's important to ensure you own the NFTs before calling `createDrop` as otherwise it will fail. 
:::

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/6169628b981c54e3c4b31c57b15e0abb99784385/docs-examples/keypom-js-sdk/nft-example.js#L44-L69
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/4e3aeb7cce7e50ee1bb27c3384d46fd6536f502a/docs-examples/near-api-js/nft-near-example.js#L44-L93
```

</TabItem>
</Tabs>

---

## Full Solution
With all the steps completed, all the code can be placed into the skeleton from the [introduction](nft-drops.md#introduction). 

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/6169628b981c54e3c4b31c57b15e0abb99784385/docs-examples/keypom-js-sdk/nft-example.js#L1-L82
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/4e3aeb7cce7e50ee1bb27c3384d46fd6536f502a/docs-examples/near-api-js/nft-near-example.js#L1-L96
```

</TabItem>
</Tabs>

---

## Testing
### Running the Script and Expected Console Logs
Here, you'll learn how to run the code that was just covered, and what to expect.

To access the code, clone the code from [this repo](https://github.com/keypom/keypom-js). Then open a terminal and cd to the directory where the code is located and run the following to install all the necesasry packages. 
```bash
npm install
```
:::caution
Prior to running these scripts, ensure you replace all instances of `keypom-docs-demo.testnet` and its private key in the script with the credentials of your account found in your `~/.near-credentials` folder
:::

From there, you are able to run this Simple Drop script that was made in this tutorial using the following command:
``` bash
npm run nft-keypom
```
:::note
The SDK script is being tested here; use `npm run nft-near` to test the NEAR-API-JS script instead.
:::
This should return a successful drop creation and console log a Public Key and Linkdrop
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/nft/console-output.png").default} alt="console output" width="100%"/> </p>
To see the full console log from this drop creation, see the expandable section below.

<details>
<summary>Console Log of Test</summary>
<p>

``` bash
yarn run v1.22.19
warning ../../../package.json: No license field
$ node docs-examples/keypom-js-sdk/nft-example.js
Account.functionCall(contractId, methodName, args, gas, amount) deprecated use `Account.functionCall(FunctionCallOptions)` instead docs-examples/keypom-js-sdk/nft-example.js:28:23
Receipts: 3RaUp2JEcnbe3wcvSUU1kZXxecBKdJu8vFnnjARP4Yua, 8td5J2TXsYztavhfv9p25KAjfYW2y2iqGfJeiRRo6aBp
        Log [nft.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"nft-1.0.0","event":"nft_mint","data":[{"owner_id":"keypom-docs-demo.testnet","token_ids":["docs-example-03"]}]}
Receipts: 7CY97iHWfwMNeXC6SncLh7gnFMjhczhLgjJGkirog9aB, 6vEvuj9RoX8VeWQJJKCx7HN6JW7xv6eRMmXuzSAtTHQn
        Log [v1-3.keypom.testnet]: Current Block Timestamp: 1674679853045334603
        Log [v1-3.keypom.testnet]: 20 calls with 100000000000000 attached GAS. Pow outcome: 1.8061103. Required Allowance: 18762630063718400000000
        Log [v1-3.keypom.testnet]: Total required storage Yocto 12070000000000000000000
        Log [v1-3.keypom.testnet]: Current balance: 1.0793346, 
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
        Log [v1-3.keypom.testnet]: New user balance 0.047502
        Log [v1-3.keypom.testnet]: Fees collected 0
Receipts: jgP3nYNvNyE752mu3mtv7YCPENCquinurKvCy6URFXs, 549CYT9yRL1zXKGdBSWDsk6bXCP5CSAcdyB5GDjYsFye, 3Jwy5yXWcrV4VGD9vxEZMrQX5njVHtJ9KUuvmdyNB6TP
        Log [nft.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"nft-1.0.0","event":"nft_transfer","data":[{"old_owner_id":"keypom-docs-demo.testnet","new_owner_id":"v1-3.keypom.testnet","token_ids":["docs-example-03"]}]}
Receipt: 9xdc2hT7evQjScr6D6fqf4bLPxDRMeRJnUg4eVKfPFhZ
        Log [nft.examples.testnet]: drop.registered_uses 1
        Log [nft.examples.testnet]: Subtracting 1000000000000000000000 from funder to cover storage. New balance is 46502063322647704000000
Public Keys and Linkdrops:  {
  'ed25519:9VRdSYJm8D2eWiTv9oyW8cHeAYoNkd5a8ApGtc5Wmfh5': 'https://testnet.mynearwallet.com/linkdrop/v1-3.keypom.testnet/sRV2UPgDH8p1SXtT3zfTBNe5h9LDqFZM4Ce4ZkW8UXZHzrKY8Rw3V2K9Bs4QKGw728ydt8ZZBWE1ihPYUKdLUdq'
}
✨  Done in 16.49s.
```

</p>
</details>

### Claiming and Explorer Transactions
Once you have the link, you are able to claim it the linkdrop you've just created. The output link will take you to the following MyNearWallet page, where you will have the choice to call claim to an existing account or a new one. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/nft/mnw-claim.png").default} alt="MyNearWallet claim" width="80%"/> </p>

After the claim transaction succeeds, you can view the NFT in your collectibles tab.
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/nft/collectibles-claimed.png").default} alt="MyNearWallet claim" width="50%"/> </p>

You can check the transactions on the [NEAR Explorer](https://explorer.near.org/). Ensure you are select `testnet` from the dropdown in the top left if you are using testnet to conduct these tests.

To view the transactions, you can search up the Keypom contract ID: `v1-3.keypom.testnet`. You should be able to see the `create_drop`, `nft_transfer_call` and `claim` transactions. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/nft/explorer.png").default} alt="explorer transactions" width="80%"/> </p>

:::note
Recall that in the SDK approach, `nft_transfer_call` is never explicitely called but rather `createDrop` calls it for you; this can be seen in the explorer shown above. 

This is the SDK in action!
:::

---

## Conclusion
In this NFT tutorial, you learned about the steps needed while [initializing an NFT drop](nft-drops.md#initialization) and the process of [creating the NFT drop](nft-drops.md#creating-drop-and-transferring-nfts).

With the NFT drop under your belt, the next tutorial will be the FT drop tutorial. The process is similar to the NFT drop tutorial but with a few different steps. 