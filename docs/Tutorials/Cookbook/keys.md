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
3. *Insert rust one here, i actually have no idea how to do that*

:::info note
Ensure that you have initialized Keypom using the `initKeypom` funciton prior to running any of the SDK examples. For more info on this, see the [introduction page](welcome.md#connection-to-near-and-initializing-the-sdk)
:::


### Adding Keys to a Drop


<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Create an empty simple drop with no keys.
const {dropId} = await createDrop({
    account: fundingAccount,
    depositPerUseNEAR: 1,
});

// Add 10 completely random keys. The return value `keys` contains information about the generated keys
const {keys} = await addKeys({
    dropId,
    numKeys: 10
})
```

</TabItem>
<TabItem value="Rust" label="Rust🦀">

```rust
pub fn a() -> u8{
    64
}
```

</TabItem>
</Tabs>

___

### Removing Keys from a Drop

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Create drop with 5 keys
const {keys, dropId} = await createDrop({
    account: fundingAccount,
	numKeys: 5,
	depositPerUseNEAR: 1,
});

// Delete first key from drop
await deleteKeys({
	dropId,
	publicKeys: keys.publicKeys[0] // Can be wrapped in an array as well
})
```

</TabItem>
<TabItem value="Rust" label="Rust🦀">

```rust
pub fn a() -> u8{
    64
}
```

</TabItem>
</Tabs>

___

### Checking Key Usage

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Query for the key supply for the drop that was created
const keyInfos = await getKeysForDrop({
    dropId
})

// Check key usage of first key
const keyUsage = keyInfos[0].remaining_uses
```

</TabItem>
<TabItem value="Rust" label="Rust🦀">

```rust
pub fn a() -> u8{
    64
}
```

</TabItem>
</Tabs>

___

### Checking Key Balance 

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Query for the key supply for the drop that was created
const keyInfos = await getKeysForDrop({
    dropId
})

// Check key usage of first key
const keyUsage = keyInfos[0].allowance
```

</TabItem>
<TabItem value="Rust" label="Rust🦀">

```rust
pub fn a() -> u8{
    64
}
```

</TabItem>
</Tabs>

___

### Check Number of Keys Remaining in a Drop

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Query for the key supply for a drop
const keySupply = await getKeySupplyForDrop({
    dropId
})
```

</TabItem>
<TabItem value="Rust" label="Rust🦀">

```rust
pub fn a() -> u8{
    64
}
```

</TabItem>
</Tabs>

___
