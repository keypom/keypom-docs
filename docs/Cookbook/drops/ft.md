---
sidebar_label: 'Fungible Token Drops'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fungible Token Drops
This part of the cookbook contains a quick overview on how to create an FT drop.
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)


:::info note
These scripts will not run without the proper setup shown in the [introduction page](../welcome.md#connection-to-near-and-initializing-the-sdk).
:::

## Creating a Fungible Token Drop
The process of creating an FT drop starts by checking if the funder has sufficient fungible tokens to actually create the drop. The `amountToTransfer` represents the total amount of FT to transfer for the entire drop. If you want to transfer 1 FT for 50 keys, `amountToTransfer` will be 50 fungible tokens. Next, this amount is compared to the funder's FT balance. Once that check is complete, then the FT drop can be created by including the `ftData`	 argument in `createDrop`. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Note that drop funder must have enough FTs to fund drop.
// If amount is "3" and there are 4 keys, Funder FT balance must be more than 12
const { keys } = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    depositPerUseNEAR: 1,
    ftData: {
    	contractId: FT_CONTRACT,
    	senderId: YOUR_ACCOUNT,
    	// This balance per use is balance of human readable FTs per use. 
    	amount: "1"
		// Alternatively, you could use absoluteAmount, which is dependant on the decimals value of the FT
		// ex. if decimals of an ft = 8, then 1 FT token would be absoluteAmount = 100000000
    },
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
