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
const keypom = require("../../lib");
const { updateFunder } = require("../../lib/lib/keypom");
const { initKeypom, getEnv, createDrop } = keypom

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

## Initialization
In this section, the NEAR blockchain connection is set up and the NFTs will be minted to ensure you are transferring NFTs that *you* own. This will serve as the foundation for creating the drop and transferring ownership of the NFTs to Keypom.

The NEAR connection process is identical to the one seen in the creating a [Simple Drop](simple-drops.md#initialization). If you already own the NFTs you wish to add to the drop, there is no need to mint them here. 

In this section, you'll notice that both the SDK and NEAR-API-JS share the same code for this process. The explanation is not a crucial detail but is in the note below the code block. If you do not need to mint the NFTs, you are free to use `initKeypom` to initiate the NEAR connection. 

The code for setting up the NEAR connection and minting the NFT is shown below. In the skeleton code, these are steps 1 and 2.

``` js
// Initiate connection to the NEAR testnet blockchain.
const network = "testnet"

const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath =  path.join(homedir, CREDENTIALS_DIR);

let keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

let nearConfig = {
	networkId: network,
	keyStore: keyStore,
	nodeUrl: `https://rpc.${network}.near.org`,
	walletUrl: `https://wallet.${network}.near.org`,
	helperUrl: `https://helper.${network}.near.org`,
	explorerUrl: `https://explorer.${network}.near.org`,
};

let near = await connect(nearConfig);
const fundingAccount = await near.account("keypom-docs-demo.testnet");

// Mint 1 NFT for the funder from the NFT contract outlined in the NFT_DATA
await fundingAccount.functionCall(
	"nft.examples.testnet", 
	'nft_mint', 
	{
		receiver_id: "keypom-docs-demo.testnet",
		metadata: {
		    title: "My Keypom NFT",
		    description: "Keypom is lit fam :D",
		    media: "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
		},
		token_id: "near-api-token-01",
	},
	"300000000000000",
	// Attached deposit of 0.1 $NEAR
	parseNearAmount("0.1")
);
```

:::note
In the SDK approach, `initKeypom` will not be used to **initialize a NEAR connection**. Instead, NEAR-API-JS will be used to initiate a NEAR connection. This is because the NFT must be minted with a NEAR-API-JS `functionCall`, which requires a NEAR connection object to be passed in.

Function arguments for `functionCall` can be found [here](https://docs.near.org/tools/near-api-js/reference/modules/transaction#functioncall)
:::

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
https://github.com/keypom/keypom-js/blob/ae49a716c579fd849b6238772f570db5e636246a/docs-examples/keypom-js-sdk/nft-example.js#L39-L62
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/ae49a716c579fd849b6238772f570db5e636246a/docs-examples/near-api-js/nft-near-example.js#L29-L79
```

</TabItem>
</Tabs>

## Full Solution
With all the steps completed, all the code can be placed into the skeleton from the [introduction](nft-drops.md#introduction). 

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/ae49a716c579fd849b6238772f570db5e636246a/docs-examples/keypom-js-sdk/nft-example.js#L39-L62
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/ae49a716c579fd849b6238772f570db5e636246a/docs-examples/near-api-js/nft-near-example.js#L29-L79
```

</TabItem>
</Tabs>

## Conclusion
In this NFT tutorial, you learned about the steps needed while [initializing an NFT drop](nft-drops.md#initialization) and the process of [creating the NFT drop](nft-drops.md#creating-drop-and-transferring-nfts).

With the NFT drop under your belt, the next tutorial will be the FT drop tutorial. The process is similar to the NFT drop tutorial but with a few different steps. 