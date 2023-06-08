---
sidebar_label: 'Balances'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Balances
This part of the cookbook contains everything related to Keypom balances. This balance acts like a debit card, where you deposit $NEAR up front and create drop and interact with Keypom without needing to attach deposits to everything you do. For more on balances, see [here](../Concepts/KeypomProtocol/balances.md). 
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)


:::info note
Ensure that you have initialized Keypom using the `initKeypom` function prior to running any of the SDK examples. For more info on this, see the [introduction page](welcome.md#connection-to-near-and-initializing-the-sdk)
:::

## Viewing User Keypom Balances
To view your Keypom balance, you can use the following. This will allow you to decipher if you need to add more $NEAR to your balance before creating a drop. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Query for the drop information for a specific drop
const userBal = await getUserBalance({
    accountId: "benjiman.testnet",
})

console.log('userBal: ', userBal)
```

</TabItem>

</Tabs>

___
## Adding to Keypom Balances
If you don't have sufficient funds to create your drop, you may add more $NEAR to your balance using the following. When specifying the amount to add, you can use `amountNear` or `amountYocto` to add in NEAR or yoctoNEAR respectively. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
await addToBalance({
    account: fundingAccount, 
    amountNear: "5"
});
```

</TabItem>

</Tabs>

___

## Withdrawing from Keypom Balance
If you are confident you no longer need Keypom or simply wish to withdraw your Keypom balance back into your NEAR wallet, you can use the following:

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
await withdrawBalance({
    account: fundingAccount
})
```

</TabItem>

</Tabs>

___

