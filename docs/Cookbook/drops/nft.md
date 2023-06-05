---
sidebar_label: 'Non-Fungible Token Drops'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Non-Fungible Token Drops
This part of the cookbook contains a quick overview on how to create an NFT drop.
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)


:::info note
These scripts will not run without the proper setup shown in the [introduction page](../welcome.md#connection-to-near-and-initializing-the-sdk).
:::

## Creating a Non-Fungible Token Drop
An NFT drop is created by first minting the NFTs to be sent, and then including the `token_ids` in the `nftData` argument. This examples shows a single NFT, with a one single-use key. For a larger distribution, consider using an [FC to lazy mint NFTs](fc.md#attaching-nfts-to-your-fc-drop).

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Mint 1 NFT for the drop funder
await fundingAccount.functionCall({
	contractId: NFT_CONTRACT, 
	methodName: 'nft_mint', 
	args: {
		receiver_id: YOUR_ACCOUNT,
		metadata: {
		    title: "My First Keypom NFT",
		    description: "NFT from my first NFT Drop!",
		    media: "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
		},
		token_id: NFT_TOKEN_ID,
	},
	gas: "300000000000000",
	// Cost to cover storage of NFT
	attachedDeposit: parseNearAmount("0.1")
});

const { keys } = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    depositPerUseNEAR: "1",
    nftData: {
	    // NFT Contract Id that the tokens will come from
	    contractId: NFT_CONTRACT,
	    // Who will be sending the NFTs to the Keypom contract
	    senderId: YOUR_ACCOUNT,
	    // List of tokenIDs
	    tokenIds: [NFT_TOKEN_ID]
	}
});

console.log(keys)
```

</TabItem>

</Tabs>

___

## Delete Drop
A drop can be deleted manually at any time using `deleteDrops`. This will refund all unclaimed key balances back to the drop funder's Keypom balance. 

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Get drops for user
let drops = await getDrops({accountId: "minqi.testnet"});

// Delete the first two by drop object
await deleteDrops({
    drops: [drops[0], drops[1]]
})

// Delete the next two by dropId
await deleteDrops({
    dropIds: [drops[2].drop_id, drops[3].drop_id]
})
```

</TabItem>

</Tabs>

___
