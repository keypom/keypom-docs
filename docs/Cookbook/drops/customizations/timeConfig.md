---
sidebar_label: 'Time'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Time Configurations
This part of the cookbook contains everything related to drops, including creating a drop, password protecting it, and utilizing Keypom arguments.
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)
3. *Insert rust one here, i actually have no idea how to do that*

:::info note
Ensure that you have initialized Keypom using the `initKeypom` funciton prior to running any of the SDK examples. For more info on this, see the [introduction page](../../welcome.md#connection-to-near-and-initializing-the-sdk)
:::

### Creating a Time Based Drop
A drop is the fundemental building block of Keypom. It is a collection of access keys that all share the same properties.

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js

const ONE_SECOND_NS = 1e9;

myTimeConfig: {
    // Start time is 30 seconds from now
    start: (Date.now() * 1000000) + ONE_SECOND_NS * 30,

    // End time is 5 minutes from start time
    end: (Date.now() * 1000000) + ONE_SECOND_NS * 330,

    // Time between use is 15 seconds
    throttle: ONE_SECOND_NS * 15,

    // Time after start for first use is 15 seconds
    interval: ONE_SECOND_NS * 15,
}

// Creating timed drop with 2 single use keys
const {keys} = await createDrop({
    account: fundingAccount,
    numKeys: 2,
	config:{
		usesPerKey: 1
	},
    time: myTimeConfig,
    depositPerUseNEAR: "0.1",
});

console.log(keys)
```

</TabItem>
<TabItem value="Rust" label="Rust🦀">

```rust
// create keys first

ext_keypom::ext(AccountId::try_from("v2.keypom.tesnet".to_string()).unwrap())
.create_drop({
    // args for create drop including generated keys
})
// callback to capture dropId
.then(
    Self::ext(env::current_account_id())
    .internal_create_drop_callback()
);
```

</TabItem>
</Tabs>

___

### Password Protecting your Drop
Password protecting your drop prevents unauthorized people from claiming keys in your drop. A claim will fail if the password is not included in the claim transaction. 

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Create drop with 10 password protected keys and 2 key uses each
let {keys, dropId} = await createDrop({
    account: fundingAccount,
    numKeys: 10,
    config: {
        usesPerKey: 2
    },
    depositPerUseNEAR: "0.1",
    basePassword: "base-password",
    // only first key use will be password protected. If not specified, all uses will be protected
    passwordProtectedUses: [1],
})

console.log(keys)
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
A drop is the fundemental building block of Keypom. It is a collection of access keys that all share the same properties.

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// What contracts can the trial account call?
const callableContracts = [
    'guest-book.examples.keypom.testnet',
    'v1.social08.testnet'
]
// What is the maximum amount of $NEAR that can be attached to a call for each callable contract?
// 1 NEAR for guestbook, 2 NEAR for NEAR social
const maxAttachableNEARPerContract = [
    '1',
    '2'
]
// What methods can the trial account call?
// Any function can be called on either contracts. 
const callableMethods = [
	['*'],
    ['*']
]

const wasmDirectory = `${require('path').resolve(__dirname, '..')}/trial-accounts/ext-wasm/trial-accounts.wasm`
const {keys} = await createTrialAccountDrop({
	account: fundingAccount,
    numKeys: 1,
    contractBytes: [...readFileSync(wasmDirectory)],
	// How much $NEAR should be made available to the trial account when it's created?
    startingBalanceNEAR: 2.5,
    callableContracts,
    callableMethods,
    maxAttachableNEARPerContract,
    // repayAmountNEAR: 0.6,
    // repayTo: "dennis.near",
	// Once the trial account has spent this much $NEAR, the trial will be over.
    trialEndFloorNEAR: 1.25
})

console.log(keys)
```

</TabItem>
<TabItem value="Rust" label="Rust🦀">

```rust
// create keys first

ext_keypom::ext(AccountId::try_from("v2.keypom.tesnet".to_string()).unwrap())
.create_drop({
    // args for create drop including generated keys
})
// callback to capture dropId
.then(
    Self::ext(env::current_account_id())
    .internal_create_drop_callback()
);
```

</TabItem>
</Tabs>

___

### Delete Drop
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
<TabItem value="Rust" label="Rust🦀">

```rust
pub fn a() -> u8{
    64
}
```

</TabItem>
</Tabs>

___
