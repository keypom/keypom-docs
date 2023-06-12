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
Additional keys may be added to a drop using the `addKeys` function. This is particularly helpful when you want to [create a large drop](drops/NEAR.md#creating-a-large-drop), and need to add more than 100 keys to the drop. You can simply loop `addKeys` instead of being restricted by the amount of gas used when calling `createDrop`. 

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
<TabItem value="CONTRACT" label="🦀 Rust Function Prototypes">

```rust
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
`addKeys` is limited to adding 50 password protected keys or 100 non-protected keys at a time. To add more keys, see the [large drops](#creating-a-large-drop) example. 
:::

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
<TabItem value="CONTRACT" label="🦀 Rust Function Prototypes">

```rust
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
<TabItem value="CONTRACT" label="🦀 Rust Function Prototypes">

```rust
pub fn get_key_information(
    &self, 
    key: PublicKey
) -> Option<JsonKeyInfo>

// pub struct JsonKeyInfo {
//     // Drop ID for the specific drop
//     pub drop_id: DropIdJson,
//     pub pk: PublicKey,

//     // Which use is the current key on?
//     pub cur_key_use: u64,

//     // How many uses this key has left. Once 0 is reached, the key is deleted
//     pub remaining_uses: u64,

//     // When was the last time the key was used
//     pub last_used: u64,

//     // How much allowance does the key have left. When the key is deleted, this is refunded to the funder's balance.
//     pub allowance: u128,

//     // Nonce for the current key.
//     pub key_id: u64,
// }
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
<TabItem value="CONTRACT" label="🦀 Rust Function Prototypes">

```rust
pub fn get_key_information(
    &self, 
    key: PublicKey
) -> Option<JsonKeyInfo>

// pub struct JsonKeyInfo {
//     // Drop ID for the specific drop
//     pub drop_id: DropIdJson,
//     pub pk: PublicKey,

//     // Which use is the current key on?
//     pub cur_key_use: u64,

//     // How many uses this key has left. Once 0 is reached, the key is deleted
//     pub remaining_uses: u64,

//     // When was the last time the key was used
//     pub last_used: u64,

//     // How much allowance does the key have left. When the key is deleted, this is refunded to the funder's balance.
//     pub allowance: u128,

//     // Nonce for the current key.
//     pub key_id: u64,
// }
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
<TabItem value="CONTRACT" label="🦀 Rust Function Prototypes">

```rust
pub fn get_key_supply_for_drop(
    &self, 
    drop_id: DropIdJson
) -> u64
```

</TabItem>

</Tabs>

___
