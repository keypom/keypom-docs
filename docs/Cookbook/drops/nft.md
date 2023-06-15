---
sidebar_label: 'Non-Fungible Token Drops'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Non-Fungible Token Drops
This part of the cookbook contains a quick overview on how to create an NFT drop.
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)


:::info note
These scripts will not run without the proper setup shown in the [introduction page](../welcome.md#connection-to-near-and-initializing-the-sdk).
:::

## Creating a Non-Fungible Token Drop
An NFT drop is created by first minting the NFTs to be sent, and then including the `token_ids` in the `nftData` argument. This examples shows a single NFT, with a one single-use key. For a larger distribution, consider using an [FC to lazy mint NFTs](fc.md#attaching-nfts-to-your-fc-drop).

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// The funding account `minqi.testnet` has the token `token_123` on the contract `nft.examples.testnet`
const NFT_CONTRACT = `nft.examples.testnet`;
const NFT_TOKEN_ID = `token_123`;
const SENDING_ACCOUNT = `minqi.testnet`;

const { keys } = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    depositPerUseNEAR: "1",
    nftData: {
        // NFT Contract Id that the tokens will come from
        contractId: NFT_CONTRACT,
        // Who will be sending the NFTs to the Keypom contract
        senderId: SENDING_ACCOUNT,
        // List of tokenIDs
        tokenIds: [NFT_TOKEN_ID]
    }
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
    nft: {
        sender_id: Option<AccountId>,
        contract_id: AccountId,
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
