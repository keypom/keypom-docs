---
sidebar_label: 'Access Key Marketplace'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sale Configurations
This part of the cookbook contains everything related to drops, including creating a drop, password protecting it, and utilizing Keypom arguments.
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)


:::info note
These scripts will not run without the proper setup shown in the [introduction page](../../welcome.md#connection-to-near-and-initializing-the-sdk).
:::

## Public Sale Drop
A public sale drop is one where you can sell the access keys from a drop to other users. These keys will all have the same propoerties and can be bought by anyone. The maximum number of keys in the drop can be set using `maxNumKeys`. 

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Create drop with a maximum of 100 keys that can be added by benji and min but not evil-moon
const { keys, dropId } = await createDrop({
    account: fundingAccount,
    depositPerUseNEAR: 0.1,
    config: {
        sale: {
            maxNumKeys: 100,
            pricePerKeyNEAR: 1
        }
    }
});

console.log(keys)
```

</TabItem>

</Tabs>

___

## Allowing Only Certain Users to Buy Keys
A public sale drop can be turned into a more private sale by only allowing certain accounts to purchase keys from the drop. This is done by using the `allowlist` argument. Any `accountId` specified here will be able to buy keys from your drop. If someone not on the list tries to buy from your drop, they will be rejected. 

By default, if no `allowlist` is included, then anybody can puchase a key.

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Create drop with a maximum of 100 keys that can be added by benji and min but not evil-moon
const { keys, dropId } = await createDrop({
    account: fundingAccount,
    depositPerUseNEAR: 0.1,
    config: {
        sale: {
            maxNumKeys: 100,
            pricePerKeyNEAR: 1
            allowlist: ["benji.testnet", "minqi.testnet"]
        }
    }
});

console.log(keys)
```

</TabItem>

</Tabs>

___

## Blocking People from your Public Sale
To protect your public sale, you may also choose to block certain accounts from purchasing keys. This can be done by using the `blocklist` argument. This prohibts select accounts from purchasing keys from your drop. Note here that since no `allowlist` is specified, anybody can purchase keys. However, since `evil-moon.testnet` is on the blocklist, they will not be allowed to do so. This means that everybody except for `evil-moon.testnet` has permission to purchase a key. 

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Create drop with a maximum of 100 keys that can be added by benji and min but not evil-moon
const { keys, dropId } = await createDrop({
    account: fundingAccount,
    depositPerUseNEAR: 0.1,
    config: {
        sale: {
            maxNumKeys: 100,
            pricePerKeyNEAR: 1
            blocklist: ["evil-moon.testnet"]
        }
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
