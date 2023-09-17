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
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// The funding account `minqi.testnet` has the token `token_123` on the contract `nft.examples.testnet`
const NFT_CONTRACT = `nft.examples.testnet`;
const NFT_TOKEN_ID = `token_123`;
const SENDING_ACCOUNT = `minqi.testnet`;

const { keys } = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    depositPerUseNEAR: "1",
    nftData: {
        // NFT Contract Id that the tokens will come from
        contractId: NFT_CONTRACT,
        // Who will be sending the NFTs to the Keypom contract
        senderId: SENDING_ACCOUNT,
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
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Get all the drops for a given user
let drops = await getDrops({accountId: "minqi.testnet"});

// Delete all the drops currently funded by `minqi.testnet`
await deleteDrops({
    account: fundingAccount,
    drops
})

// Delete 2 seperate drops given their IDs
await deleteDrops({
    account: fundingAccount,
    dropIds: ["123123123123123", "12391238012380123"]
})
```

</TabItem>

</Tabs>

___
