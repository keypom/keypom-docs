---
sidebar_label: 'Keys'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Keys
This part of the cookbook contains everything related to keys in a drop, including adding keys to a drop, checking key usage and getting the number of active keys in a drop.
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)


:::info note
Ensure that you have initialized Keypom using the `initKeypom` function prior to running any of the SDK examples. For more info on this, see the [introduction page](welcome.md#connection-to-near-and-initializing-the-sdk)
:::


## Adding Keys to a Drop
Additional keys may be added to a drop using the `addKeys` function. This is particularly helpful when you want to [create a large drop](drops/NEAR.md#creating-a-large-drop).

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Create an empty simple drop with no keys.
const {dropId} = await createDrop({
    account: fundingAccount,
    depositPerUseNEAR: 1,
});

// Add 10 completely random keys. The return value `keys` contains information about the generated keys
const {keys} = await addKeys({
    account: fundingAccount,
    dropId,
    numKeys: 10
})
```

</TabItem>

</Tabs>

:::caution
`addKeys` is limited to adding 50 password protected keys or 100 non-protected keys at a time. To add more keys, see the [example below](#adding-lots-of-keys). 
:::

___

## Adding Lots of Keys
Adding keys, either using `createDrop` or `addKeys` is limited to 50 password protected or 100 non-protected keys. To bypass this, the drop can be created first and then the keys can be added by looping `addKeys`.

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Creating drop with 0 single use keys
let {dropId} = await createDrop({
    account: fundingAccount,
    depositPerUseNEAR: "0.001",
});

// Loop to add 200 keys
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

## Removing Keys from a Drop
Just as keys can be added to a drop retroactively, they can also be removed. The following shows that process. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Create drop with 5 keys
const {keys, dropId} = await createDrop({
    account: fundingAccount,
	numKeys: 5,
	depositPerUseNEAR: 1,
});

// Delete first key from drop
await deleteKeys({
    account: fundingAccount,
	dropId,
	publicKeys: keys.publicKeys[0] // Can be wrapped in an array as well
})
```

</TabItem>

</Tabs>

___

## Checking Key Usage
A good use case for checking key usage is when you want to track the progress/retention of the keys in your drop. An excellent example is the [ticketing tutorial](../Tutorials/Advanced/ticketing/architecture.md#keypom-solution) where each key use represented a different phase of the ticketing experience. To do this, you can get and parse the [`keyInfo`](../keypom-sdk/Core/interfaces/KeyInfo.md) object by calling `getKeysForDrop`. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Query for the key supply for the drop that was created
const keyInfos = await getKeysForDrop({
    dropId
})

// Check key usage of first key
const keyUsage = keyInfos[0].remaining_uses

console.log(keyUsage)
```

</TabItem>

</Tabs>

___

## Checking Key Balance 
Similar to how checking a key usage is done, you can parse the [`keyInfo`](../keypom-sdk/Core/interfaces/KeyInfo.md) object to see a key's remaining allowance. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Query for the key supply for the drop that was created
const keyInfos = await getKeysForDrop({
    dropId
})

// Check key usage of first key
const keyBalance = keyInfos[0].allowance

console.log(keyBalance)
```

</TabItem>

</Tabs>

___

## Check Number of Keys Remaining in a Drop
When a key is fully depleted, it is deleted from the drop. To check the number of remaining keys, and thus the amount of keys to still be claimed, you can use `getKeySupplyForDrop`.

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Query for the key supply for a drop
const keySupply = await getKeySupplyForDrop({
    dropId
})

console.log(keySupply)
```

</TabItem>

</Tabs>

___
