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
<TabItem value="CONTRACT" label="🦀 Rust Function Prototypes">

```rust
pub fn create_drop(
    &mut self,
    // How much $NEAR should be transferred everytime a key is used? Can be 0.
    deposit_per_use: U128,
) -> Option<DropIdJson>

pub fn add_keys(
    &mut self,
    // Public keys to add
    public_keys: Vec<PublicKey>,
    // Overload the specific drop ID
    drop_id: DropIdJson,
) -> Option<DropIdJson> 
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
<TabItem value="CONTRACT" label="🦀 Rust Function Prototypes">

```rust
pub fn create_drop(
    &mut self,
    // How much $NEAR should be transferred everytime a key is used? Can be 0.
    deposit_per_use: U128,
) -> Option<DropIdJson>

pub fn add_keys(
    &mut self,
    // Public keys to add
    public_keys: Vec<PublicKey>,
    // Overload the specific drop ID
    drop_id: DropIdJson,
) -> Option<DropIdJson> 
```

</TabItem>

</Tabs>

___

## Viewing Drops by Owner
To view all drops created by one acount, you can use the following. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Creating drop with 0 single use keys
 const dropsForOwner = await getDrops({accountId: "minqi.testnet"});
```

</TabItem>
<TabItem value="CONTRACT" label="🦀 Rust Function Prototypes">

```rust
pub fn get_drops_for_owner(
    &self,
    account_id: AccountId,
    from_index: Option<U128>,
    limit: Option<u64>,
) -> Vec<JsonDrop> 
```

</TabItem>

</Tabs>

___

## Delete Drop
A drop can be deleted manually at any time using `deleteDrops`. This will refund all unclaimed key balances back to the drop funder's Keypom balance. 

The Keypom contract does not have a `deleteDrops` equivalent function. Behind the scenes of the SDK, the keys are being collected, refunded and then deleted. 

The first step in this process is to use `get_key_supply_for_drop`. Once the total key supply is found, 50 keys at a time are retrieved using `get_keys_for_drop` and refunding their associated assets and deleting the keys using `refund_assets` and `delete_keys` respectively. 

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
<TabItem value="CONTRACT" label="🦀 Rust Function Prototypes">

```rust
// Get total number of keys
pub fn get_key_supply_for_drop(&self, drop_id: DropIdJson) -> u64

// Get 50 keys at a time, this might need to be looped depending on key supply
pub fn get_keys_for_drop(
    &self,
    drop_id: DropIdJson,
    from_index: Option<U128>,
    limit: 50,
) -> Vec<JsonKeyInfo>

// Refund the assets in those keys
// assets_to_refund indicated the number of assets to refund. If not specified, all assets will be attempted to be refunded. 
pub fn refund_assets(
    &mut self, 
    drop_id: DropIdJson, 
    assets_to_refund: Option<u64>
)

// Delete keys that were retrieved.
pub fn delete_keys(
    &mut self,
    drop_id: DropIdJson,
    public_keys: Option<Vec<PublicKey>>,
    limit: Option<u8>,
    delete_on_empty: Option<bool>,
)
```

</TabItem>

</Tabs>

___
