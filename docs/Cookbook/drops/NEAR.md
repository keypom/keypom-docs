---
sidebar_label: 'Simple NEAR Drops'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Simple NEAR Drops
This part of the cookbook contains a quick guide on the simple NEAR drop.
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)


:::info note
These scripts will not run without the proper setup shown in the [introduction page](../welcome.md#connection-to-near-and-initializing-the-sdk).
:::

## Creating a Simple Drop
A drop is the fundamental building block of Keypom. It is a collection of access keys that all share the same properties. A simple drop allows you to send $NEAR by sharing those access keys in the form of a linkdrop. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Creating drop with 2 single use keys
const {keys} = await createDrop({
    account: fundingAccount,
    numKeys: 2,
    depositPerUseNEAR: "0.1",
});

console.log(keys)
```

</TabItem>
</Tabs>

:::caution
`createDrop` is limited to adding 50 password protected keys or 100 non-protected keys at a time. To add more keys, see the [large drops](#creating-a-large-drop) example below. 
:::

___

## Creating a Large Drop
Adding keys, either using `createDrop` or `addKeys` is limited to 50 password protected or 100 non-protected keys. To bypass this, the drop can be created first and then the keys can be added by looping `addKeys`.

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Creating drop with 0 single use keys
let {dropId} = await createDrop({
    account: fundingAccount,
    depositPerUseNEAR: "0.001",
});

let numKeys = 200
let keysAdded = 0;
let allSecretKeys = [];
while (keysAdded < numKeys) {
    const keysToAdd = Math.min(50, numKeys - keysAdded);
    const {secretKeys, publicKeys} = await generateKeys({
        numKeys: keysToAdd,
    });
    await addKeys({
        account: fundingAccount,
        dropId,
        publicKeys
    });
    keysAdded += keysToAdd;
    allSecretKeys = allSecretKeys.concat(secretKeys);
}
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
