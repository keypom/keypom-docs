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
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Get amount of FTs to transfer. In this scenario, we've assumed it to be 1 for one single use key.
let amountToTransfer = parseNearAmount("1")

// Get funder's fungible token balance
let funderFungibleTokenBal = await fundingAccount.viewFunction({
	contractId: FT_CONTRACT, 
	methodName: 'ft_balance_of',
	args: {
		account_id: YOUR_ACCOUNT
	}
});

// Check if the owner has enough FT balance to fund drop
if (new BN(funderFungibleTokenBal).lte(new BN(amountToTransfer))){
	throw new Error('funder does not have enough Fungible Tokens for this drop. Top up and try again.');
}

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
