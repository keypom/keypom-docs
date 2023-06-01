---
sidebar_label: 'Utilities'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Utilities
This part of the cookbook contains utlilities and miscleaneous common Keypom use cases. This includes creating NFT series, using the DAO bot and more.  
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)
3. *Insert rust one here, i actually have no idea how to do that*

:::info note
Ensure that you have initialized Keypom using the `initKeypom` funciton prior to running any of the SDK examples. For more info on this, see the [introduction page](welcome.md#connection-to-near-and-initializing-the-sdk)
:::


### Create NFT Series

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
const {keys} = await createDrop({
    account: fundingAccount,
    numKeys: 2,
	config:{
		usesPerKey: 1
	},
    depositPerUseNEAR: "0.1",
});
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

### Utilize DAO Bot

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
const {keys} = await createDrop({
    account: fundingAccount,
    numKeys: 2,
	config:{
		usesPerKey: 1
	},
    depositPerUseNEAR: "0.1",
});
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

### Create Recurring Payments

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
const {keys} = await createDrop({
    account: fundingAccount,
    numKeys: 2,
	config:{
		usesPerKey: 1
	},
    depositPerUseNEAR: "0.1",
});
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
