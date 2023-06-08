---
sidebar_label: 'Trial Account Drops'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Trial Account Drops
This part of the cookbook contains a quick overview on how to create a trial account drop.
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)


:::info note
These scripts will not run without the proper setup shown in the [introduction page](../welcome.md#connection-to-near-and-initializing-the-sdk).
:::

## Creating a Trial Account Drop
When creating a trial account drop, there are 3 main parameters to define. The first is `callableContracts`, indicating what contracts the trial account can call. This will prevent rugging from the funder's perspective. Next is `maxAttachableNearPerContract` which just outlines how much $NEAR can be attached to any function call on any of the aforementioned contracts. The order of this is the same as the order defined in `callableContracts`. Lastly is the `callableMethods` parameter, which defines what methods the trial account is allowed to call on the allowed contracts. A `*` indicated any contract is callable. 

When creating the drop, the trial account's balance is then defined by its starting balance and ending balance, known as the `startingBalanceNEAR` and `trialEndFloorNEAR` respectively. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

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
	// Once the trial account has spent this much $NEAR, the trial will be over.
    trialEndFloorNEAR: 1.25
})

console.log(keys)
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
