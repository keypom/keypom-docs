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
:::tip
A short explanation for Rust version is found below the codeblock.
:::

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
<TabItem value="CONTRACT" label="🦀 Rust Function Prototypes">

```rust
pub fn create_drop(
    &mut self,
    // How much $NEAR should be transferred everytime a key is used? Can be 0.
    deposit_per_use: U128,
    config: {
        uses_per_key: u64
    }
    fc: {
        methods:{
            // First key use
            [
                // First method to be called will be `create_account_advanced` on the drop's `root_account_id`. 
                // This will be called with the args shown here: https://github.com/keypom/keypom-js/blob/5e4c7f3524c9e2b5be537a779e3ebf41bcafc357/packages/core/src/lib/trial-accounts/pre-trial.ts#L319-L333 
                {
                    /// Contract that will be called
                    receiver_id: String,
                    /// Method to call on receiver_id contract
                    method_name: "create_account_advanced",
                    /// Arguments to pass in (stringified JSON)
                    args: String,
                    /// Amount of yoctoNEAR to attach along with the call
                    attached_deposit: U128,
                },
                // Second method will be the `setup` method on the newly created account from above. This is done using the `receiver_to_claimer` boolean
                // Args for this function call can be seen here: https://github.com/keypom/keypom-js/blob/5e4c7f3524c9e2b5be537a779e3ebf41bcafc357/packages/core/src/lib/trial-accounts/pre-trial.ts#L341-L351
                {
                    /// Contract that will be called
                    receiver_id: : "",
                    /// Method to call on receiver_id contract
                    method_name: "setup",
                    /// Arguments to pass in (stringified JSON)
                    args: String,
                    /// Amount of yoctoNEAR to attach along with the call
                    attached_deposit: U128,
                    /// Call newly created account
                    receiver_to_claimer: true
                }
            ]
        }
    }
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

At its core, a trial account drop is just a FunctionCall drop that uses the function calls to creates an account with a contract deployed to it, and then calls the `setup` method on that newly created account. Since there is no `createTrialAccountDrop` equivalent baked into the protocol, you will need to manually setup all the FC drop arguments.

The first half, creating an account with a contract deployed to it, is done using the [`create_account_advanced`](https://github.com/near/near-linkdrop/blob/49279e529c254fa7736465b4a39d05cb8f1e5443/src/lib.rs#L156) method. If you have used a custom drop root using the [`root_account_id`](../../keypom-sdk/Core/interfaces/ProtocolReturnedDropConfig.md#root_account_id) parameter, you must ensure the contract deployed to that account has the `create_account_advanced` method exposed. 

A sample set of arguments passed into `create_account_advanced` for a trial account drop can be found [here](https://github.com/keypom/keypom-js/blob/5e4c7f3524c9e2b5be537a779e3ebf41bcafc357/packages/core/src/lib/trial-accounts/pre-trial.ts#L319-L333).

The second half is the `setup` method, which defines the trial account's allowed contracts, methods and max deposits etc. It's important to understand that the `setup` method is being called on the contract deployed to the trial account during `create_account_advanced`. To do this, the `receiver_to_claimer` must be set to `true`.

A sample set of arguments passed into `setup` can be found [here](https://github.com/keypom/keypom-js/blob/5e4c7f3524c9e2b5be537a779e3ebf41bcafc357/packages/core/src/lib/trial-accounts/pre-trial.ts#L341-L351). 

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
