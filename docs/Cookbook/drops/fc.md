---
sidebar_label: 'Function Call Drops'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Function Call Drops
This part of the cookbook contains everything related to drops, including creating a drop, password protecting it, and utilizing Keypom arguments.
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)


:::info note
These scripts will not run without the proper setup shown in the [introduction page](../welcome.md#connection-to-near-and-initializing-the-sdk).
:::

### Creating a Function Call Drop
A Function Call Drop allows the user to call almost any function on any NEAR smart contract when claiming. An example is shown below where the method `mint` is called on `MY_CONTRACT` with the specified `memo` and `metadata` arguments. 

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Creating a single key single use FC drop
let {keys, dropId} = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    config: {
        usesPerKey: 1
    },
    depositPerUseNEAR: "0.1",
    fcData: {
        methods: [
            [
                {
                    receiverId: MY_CONTRACT,
                    methodName: "mint",
                    args: JSON.stringify({
                        memo: "Called from Keypom FC drop!"
                        metadata: {
                            id: 4390000
                        }
                    }),
                }
            ],
        ]   
    }   
})

console.log(keys)
```

</TabItem>

</Tabs>

___

### Creating a Multi-claim Function Call Drop
To further expand the FC drop, you have the ability to call a different method for each claim. This is shown below, where the first use calls `mint`, the second call does nothing, and the third calls `sell`. 

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Creating a single key single use FC drop
let {keys, dropId} = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    config: {
        usesPerKey: 1
    },
    depositPerUseNEAR: "0.1",
    fcData: {
        methods: [
            // First key use
            [
                {
                    receiverId: MY_CONTRACT,
                    methodName: "mint",
                    args: JSON.stringify({
                        memo: "Minted from Keypom FC drop!"
                        metadata: {
                            id: 4390000
                        }
                    }),
                }
            ],
            // Second key use
            null,
            // Third key use
            [
                {
                    receiverId: MY_CONTRACT,
                    methodName: "mint",
                    args: JSON.stringify({
                        memo: "Sold from Keypom FC drop!"
                        metadata: {
                            id: 4390000
                        }
                    }),
                }
            ],
        ]   
    }   
})

console.log(keys)
```

</TabItem>

</Tabs>

___

### Creating a Multi-Function Call Drop
With each `claim`, you can also call multiple functions. Note this would call each function in succession after the previous one is resolved. In the example below, the `mint`, `null` case, and `sell` functions are called during the first `claim`. 

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Creating a single key single use FC drop
let {keys, dropId} = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    config: {
        usesPerKey: 1
    },
    depositPerUseNEAR: "0.1",
    fcData: {
        methods: [
            // First key use
            [
                {
                    receiverId: MY_CONTRACT,
                    methodName: "mint",
                    args: JSON.stringify({
                        memo: "Minted from Keypom FC drop!"
                        metadata: {
                            id: 4390000
                        }
                    }),
                },
                null,
                {
                    receiverId: MY_CONTRACT,
                    methodName: "mint",
                    args: JSON.stringify({
                        memo: "Sold from Keypom FC drop!"
                        metadata: {
                            id: 4390000
                        }
                    }),
                }
            ],
        ]   
    }   
})

console.log(keys)
```

</TabItem>

</Tabs>

___

### Creating a Multi-claim Multi-Function Call Drop
By combining the [multi-claim](#creating-a-multi-claim-function-call-drop) and [multi-function call](#creating-a-multi-function-call-drop) drops together, you can call multiple number of functions for multiple claims. As an example, a key with 3 uses can be seen:

1. `nft_mint`
2. `null`
3. `nft_transfer`, `nft_mint`, `nft_sell`

The drop for this would look like the following


<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Creating a single key single use FC drop
let {keys, dropId} = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    config: {
        usesPerKey: 1
    },
    depositPerUseNEAR: "0.1",
    fcData: {
        methods: [
            // First key use
            [
                {
                    receiverId: MY_CONTRACT,
                    methodName: "nft_mint",
                    args: JSON.stringify({
                        memo: "Minted from Keypom FC drop!"
                        metadata: {
                            id: 4390000
                        }
                    }),
                }
            ],
            // Second key use
            null,

            // Third key use
            [
                {
                    receiverId: MY_CONTRACT,
                    methodName: "nft_transfer",
                    args: JSON.stringify({
                        memo: "Transfered from Keypom FC drop!"
                        metadata: {
                            id: 4390000
                        }
                    }),
                },
                {
                    receiverId: MY_CONTRACT,
                    methodName: "nft_mint",
                    args: JSON.stringify({
                        memo: "Minted from Keypom FC drop!"
                        metadata: {
                            id: 4390005
                        }
                    }),
                },
                {
                    receiverId: MY_CONTRACT,
                    methodName: "nft_sell",
                    args: JSON.stringify({
                        memo: "Sold from Keypom FC drop!"
                        metadata: {
                            id: 4390005
                        }
                    }),
                }
            ],
        ]   
    }   
})

console.log(keys)
```

</TabItem>

</Tabs>

___

### Using and Verifying Injected Keypom Arguments
Keypom Args are important pieces of information injected automatically by Keypom when a key is claimed. The pieces of information can include: 

- Drop ID that the access key belongs to
- Funder's `accountId` of the drop
- The claiming account's `accountId`
- The current access key's `keyId`

The information is injected into the `args`, but their specific location depends on the field specified. Here, the `funderId` is being injected into an `originalOwner` field in the args, and the claiming account's `accountId` is being injected into the metadata object under the field `newOwner`. 

In addition to the injected arguments, Keypom will also automatically send an object called `keypom_args`. This object cannot be spoofed, and any attempt to do so will cause the claim to fail. These `keypom_args` are meant for you to use to validate injected arguments. 

:::info
To validate the injected argument the receiving `mint` function should look somehting like this. 

```rust
#[payable]
pub fn mint(&mut self, mint_id: String, originalOwner: String, metadata: data, keypomArgs: keypom_args) -> Promise {
        assert!(originalOwner == DROP_FUNDER_ID && keypomArgs.funderIdField == "originalOwner", "Call must come from valid Keypom drop");
        // Optionally can also validate that keypomArgs.accountIdField == "metadata.newOwner" if you want to ensure newOwner was not hardcoded. 
        ...
}
```
:::

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Creating FC drop that injects accountId into function call arguments
let {keys, dropId} = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    config: {
        usesPerKey: 1
    },
    depositPerUseNEAR: "0.1",
    fcData: {
        methods: [
            [
                {
                    receiverId: MY_NFT_CONTRACT,
                    methodName: "mint",
                    args: JSON.stringify({
                        mint_id: MINT_ID
                        metadata: {
                            description: "my new NFT"
                        }
                    }),
                    // Injecting claiming account ID into the metadata object as originalOwner
                    accountIdField: "metadata.newOwner",
                    funderIdField: "originalOwner",
                }
            ],
        ]   
    }   
})

console.log(keys)
```

</TabItem>

</Tabs>

___

### Attaching NFTs to your FC Drop
As part of your FC drop, you can send the user an NFT. The best way to do this would be to lazy-mint them, as to not waste funds minting NFTs belonging to keys that are ultimately not claimed. 

To do this, you must create an NFT series, and then include a `nft_mint` call as one of the key's function calls. The Keypom NFT contract, `nft-v2.keypom.testnet` and `nft-v2.keypom.near`, have the functionality to create a series and then mint the NFT using just the `dropId`.  

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Create drop with 10 keys and 2 key uses each
let {keys, dropId} = await createDrop({
    account: fundingAccount,
    numKeys: 30,
    depositPerUseNEAR: "0.1",
    fcData: {
        methods: [
            [
                {
                    receiverId: `nft-v2.keypom.${NETWORK_ID}`,
                    methodName: "nft_mint",
                    args: "",
                    dropIdField: "mint_id",
                    accountIdField: "receiver_id",
                    attachedDeposit: parseNearAmount("0.1")
                }
            ],
        ]   
    }   
})

await createNFTSeries({
    account: fundingAccount,
    dropId,
    metadata: {
        title: "Moon NFT Ticket!",
        description: "A cool NFT POAP for the best dog in the world.",
        media: "bafybeibwhlfvlytmttpcofahkukuzh24ckcamklia3vimzd4vkgnydy7nq",
        copies: 30
    }
}); 
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

</Tabs>

___
