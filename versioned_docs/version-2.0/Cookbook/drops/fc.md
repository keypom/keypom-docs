---
sidebar_label: 'Function Call Drops'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Function Call Drops
This part of the cookbook contains a quick overview on how to create an assortment of function call drops, using Keypom injected arguments, and attaching NFTs to your FC drop by lazy minting them.
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)


:::info note
These scripts will not run without the proper setup shown in the [introduction page](../welcome.md#connection-to-near-and-initializing-the-sdk).
:::

## Creating a Single Method, Single Use Function Call Drop
A Function Call Drop allows the user to call almost any function on any NEAR smart contract when claiming. An example is shown below where the method `mint` is called on `MY_CONTRACT` with the specified `memo` and `metadata` arguments. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
MY_CONTRACT = "guest-book.examples.keypom.testnet"

// Creating a single key single use FC drop
let {keys} = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    depositPerUseNEAR: "0.1",
    fcData: {
        methods: [
            // First key use
            [
                {
                    receiverId: MY_CONTRACT,
                    methodName: "add_message",
                    args: JSON.stringify({
                        text: "first"
                    }),
                    attachedDeposit: parseNearAmount("0.001"),
                },
            ],
        ]   
    }   
})

console.log(keys)
```

</TabItem>

</Tabs>

___

## Single Method, Multi-Use Drop
To further expand the FC drop, you have the ability to call a different method for each claim. This is shown below, where the first use calls `mint`, the second call does nothing, and the third calls `sell`. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
MY_CONTRACT = "guest-book.examples.keypom.testnet"

// Creating a single key single use FC drop
let {keys} = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    config: {
        usesPerKey: 3
    },
    depositPerUseNEAR: "0.1",
    fcData: {
        methods: [
            // First key use
            [
                {
                    receiverId: MY_CONTRACT,
                    methodName: "add_message",
                    args: JSON.stringify({
                        text: "first"
                    }),
                    attachedDeposit: parseNearAmount("0.001"),
                },
            ],
            // Second key use
            null,
            // Third key use
            [
                {
                    receiverId: MY_CONTRACT,
                    methodName: "add_message",
                    args: JSON.stringify({
                        text: "first-point-five"
                    }),
                    attachedDeposit: parseNearAmount("0.001"),
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

## Multi-Method, Single Use Key Drop
With each `claim`, you can also call multiple functions. Note this would call each function in succession after the previous one is resolved. In the example below, the `mint`, `null` case, and `sell` functions are called during the first `claim`. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
MY_CONTRACT = "guest-book.examples.keypom.testnet"

// Creating a single key single use FC drop
let {keys} = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    depositPerUseNEAR: "0.1",
    fcData: {
        methods: [
            // First key use
            [
                {
                    receiverId: MY_CONTRACT,
                    methodName: "add_message",
                    args: JSON.stringify({
                        text: "first"
                    }),
                    attachedDeposit: parseNearAmount("0.001"),
                },
                null
                {
                    receiverId: MY_CONTRACT,
                    methodName: "add_message",
                    args: JSON.stringify({
                        text: "second"
                    }),
                    attachedDeposit: parseNearAmount("0.001"),
                },
            ],
        ]   
    }   
})

console.log(keys)
```

</TabItem>

</Tabs>

___

## Multi-Method, Multi-Use Drop
By combining the [multi-claim](#creating-a-multi-claim-function-call-drop) and [multi-function call](#creating-a-multi-function-call-drop) drops together, you can call multiple number of functions for multiple claims. As an example, a key with 3 uses can be seen:

1. `add_message`
2. `null`
3. `nft_mint`, `add_message`, `nft_transfer`

The drop for this would look like the following


<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
MY_CONTRACT = "guest-book.examples.keypom.testnet"

// Creating a single key single use FC drop
let {keys: key4} = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    config: {
        usesPerKey: 3
    },
    depositPerUseNEAR: "0.1",
    fcData: {
        methods: [
            // First key use
            [
                {
                    receiverId: MY_CONTRACT,
                    methodName: "add_message",
                    args: JSON.stringify({
                        text: "first"
                    }),
                    attachedDeposit: parseNearAmount("0.001"),
                }
            ],
            // Second key use
            null,
            // Third key use
            [
                {
                    receiverId: NFT_CONTRACT,
                    methodName: "nft_mint",
                    args: JSON.stringify({
                        token_id: "keypom-cookbook-1",
                        receiver_id: "minqi.testnet",
                        metadata: {
                            title: "My Test Keypom NFT",
                            description: "NFT from my first NFT Drop!",
                            media: "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
                        },
                    }),
                    attachedDeposit: parseNearAmount("0.001"),
                },
                {
                    receiverId: MY_CONTRACT,
                    methodName: "add_message",
                    args: JSON.stringify({
                        text: "second"
                    }),
                    attachedDeposit: parseNearAmount("0.001"),
                },
                {
                    receiverId: NFT_CONTRACT,
                    methodName: "nft_transfer",
                    args: JSON.stringify({
                        receiver_id: "benjiman.testnet
                        token_id: "keypom-cookbook-1"
                    }),
                    attachedDeposit: parseNearAmount("0.001"),
                },
            ],
        ]   
    }   
})

console.log(keys)
```

</TabItem>

</Tabs>

___

## Using and Verifying Injected Keypom Arguments
Keypom Args are important pieces of information injected automatically by Keypom when a key is claimed. The pieces of information can include: 

- Drop ID that the access key belongs to
- Funder's `accountId` of the drop
- The claiming account's `accountId`
- The current access key's `keyId`

The information is injected into the `args`, but their specific location depends on the field specified. In the example below, the `funderId` is being injected into an `originalOwner` field in the `args`, and the claiming account's `accountId` is being injected into the `metadata` object under the field `newOwner`. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Creating FC drop that injects accountId into function call arguments
let {keys, dropId} = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    depositPerUseNEAR: "0.1",
    fcData: {
        methods: [
            [
                {
                    receiverId: MY_NFT_CONTRACT,
                    methodName: "mint",
                    args: JSON.stringify({
                        mint_id: MINT_ID,
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

### Verifying Injected Arguments
In addition to the injected arguments, Keypom will also automatically send an object called `keypom_args`. This object is meant for your use to validate that certain arguments were indeed injected by Keypom. This object cannot be spoofed, and any attempt to do so will cause the claim to fail. 

:::info
To validate the injected argument the receiving `mint` function should look like this. 

```rust
#[payable]
pub fn mint(&mut self, mint_id: String, originalOwner: String, metadata: data, keypomArgs: keypom_args) -> Promise {
        assert!(originalOwner == DROP_FUNDER_ID && keypomArgs.funderIdField == "originalOwner", "Call must come from valid Keypom drop");
        // Optionally can also validate that keypomArgs.accountIdField == "metadata.newOwner" if you want to ensure newOwner was not hardcoded. 
        ...
}
```
:::

___

## Attaching NFTs to your FC Drop
As part of your FC drop, you can send the user an NFT. The best way to do this would be to lazy-mint them, as to not waste funds minting NFTs belonging to keys that are ultimately not claimed. 

To do this, you must create an NFT series, and then include a `nft_mint` call as one of the key's function calls. The Keypom NFT contracts, `nft-v2.keypom.testnet` and `nft-v2.keypom.near`, have the functionality to create a series and then mint the NFT using just the `dropId`.  

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

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
