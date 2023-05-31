---
sidebar_label: 'Balances'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Balances
This part of the cookbook contains everything related to Keypom balances. This balance acts like a debit card, where you deposit $NEAR up front and create drop and interact with Keypom without needing to attach deposits to everything you do. For more on balances, see [here](../../Concepts/KeypomProtocol/balances.md). 
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)
3. *Insert rust one here, i actually have no idea how to do that*

:::info note
Ensure that you have initialized Keypom using the `initKeypom` funciton prior to running any of the SDK examples. For more info on this, see the [introduction page](welcome.md#connection-to-near-and-initializing-the-sdk)
:::

### Viewing User Keypom Balances

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Query for the drop information for a specific drop
const userBal = await getUserBalance({
accountId: "benjiman.testnet",
})

console.log('userBal: ', userBal)
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
### Adding to Keypom Balances

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

### Withdrawing from Keypom Balance

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

