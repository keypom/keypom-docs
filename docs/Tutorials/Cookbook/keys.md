---
sidebar_label: 'Keys'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Cookbook - Keys
Welcome to the Keypom cookbook! Here you can explore Keypom's building blocks that help create awesome onboarding experiences.

## Getting Started
In this cookbook, you will get to explore different building blocks you can use for your own projects. These will range from creating a drop to working with Keypom balances and everything in between. Each of these building blocks will provide a code snippet, using the Keypom JS SDK and Rust.

For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)
3. *Insert rust one here, i actually have no idea how to do that*


## Connection to NEAR and Initializing the SDK
When working with the SDK, you will always need to connect to NEAR and initiate Keypom using the `initKeypom` function. This will always be the first function you call to interact with the SDK. 

`initKeypom` initializes the SDK to allow for interactions with the Keypom smart contracts. Without it, none of the other SDK functions would work as expected. If a NEAR connection is not already present, it will initialize a new one for you. More info on the `initKeypom` function can be found [here](../../keypom-sdk/Core/modules.md#initkeypom).

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/simple-drop/simple-example.js#L10-L35
```


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
