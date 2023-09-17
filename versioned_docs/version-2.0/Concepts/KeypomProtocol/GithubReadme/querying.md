---
sidebar_label: 'Querying Information from Keypom'
sidebar_position: 7
---
# Query Information From Keypom

Keypom allows users to query a suite of different information from the contract. This information can be broken down into two separate objects that are returned. JsonDrops and JsonKeys.
```rs
pub struct JsonDrop {
    // Drop ID for this drop
    pub drop_id: DropId,
    // owner of this specific drop
    pub owner_id: AccountId,
    // Balance for all keys of this drop. Can be 0 if specified.
    pub deposit_per_use: U128,
    // Every drop must have a type
    pub drop_type: JsonDropType,
    // The drop as a whole can have a config as well
    pub config: Option<DropConfig>,
    // Metadata for the drop
    pub metadata: Option<DropMetadata>,
    // How many claims
    pub registered_uses: u64,
    // Ensure this drop can only be used when the function has the required gas to attach
    pub required_gas: Gas,
    // Keep track of the next nonce to give out to a key
    pub next_key_id: u64,
}

pub struct JsonKeyInfo {
    // Drop ID for the specific drop
    pub drop_id: DropId,
    pub pk: PublicKey,
    // How many uses this key has left. Once 0 is reached, the key is deleted
    pub remaining_uses: u64,
    // When was the last time the key was used
    pub last_used: u64,
    // How much allowance does the key have left. When the key is deleted, this is refunded to the funder's balance.
    pub allowance: u128,
    // Nonce for the current key.
    pub key_id: u64,
}
```

## Key Specific
- **`get_key_balance(key: PublicKey)`**: Returns the $NEAR that will be sent to the claiming account when the key is used 
- **`get_key_total_supply()`**: Returns the total number of keys currently on the contract
- **`get_keys(from_index: Option<U128>, limit: Option<u64>)`**: Paginate through all keys on the contract and return a vector of key info
- **`get_key_information(key: PublicKey)`**: Return the key info for a specific key
- **`get_key_information_batch(keys: Vec<PublicKey>)`**: Return a vector of key info for a set of public keys

## Drop Specific
- **`get_drop_information(drop_id: Option<DropId>, key: Option<PublicKey>)`**: Return the drop info for a specific drop. This can be queried for by either passing in the drop ID or a public key.
- **`get_key_supply_for_drop(drop_id: DropId)`**: Return the total number of keys for a specific drop
- **`get_keys_for_drop(drop_id: DropId, from_index: Option<U128>, limit: Option<u64>)`**: Paginate through all keys for a specific drop and return a vector of key info
- **`get_drop_supply_for_owner(account_id: AccountId)`**: Return the total number of drops for a specific account
- **`get_drops_for_owner(account_id: AccountId, from_index: Option<U128>, limit: Option<u64>)`**: Paginate through all drops for a specific account and return a vector of drop info 
- **`get_nft_supply_for_drop(drop_id: DropId)`**: Get the total number of NFTs registered for a given drop.
- **`get_nft_token_ids_for_drop(drop_id: DropId, from_index: Option<U128>, limit: Option<u64>)`**: Paginate through token IDs for a given drop
- **`get_next_drop_id()`**: Get the next drop ID that will be used for a new drop

### Utility
- **`get_root_account()`**: Get the global root account that all created accounts with be based off.
- **`get_user_balance()`**: Get the current user balance for a specific account.