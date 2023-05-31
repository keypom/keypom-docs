---
sidebar_label: 'Drops'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Drops
This part of the cookbook contains everything related to drops, including creating a drop, password protecting it, and utilizing Keypom arguments.
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)
3. *Insert rust one here, i actually have no idea how to do that*

:::info note
Ensure that you have initialized Keypom using the `initKeypom` funciton prior to running any of the SDK examples. For more info on this, see the [introduction page](welcome.md#connection-to-near-and-initializing-the-sdk)
:::

### Creating a Drop
A drop is the fundemental building block of Keypom. It is a collection of access keys that all share the same properties.

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Creating drop with 2 single use keys
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

### Public Sale Drop
A public sale drop is one where you can sell the access keys from a drop to other users. These keys will all have the same propoerties and can be bought by anyone unless otherwise specified using the `allowlist` and `blocklist`. The maximum number of keys in the drop can be set using `maxNumKeys`. 

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Create drop with a maximum of 100 keys that can be added by benji and min but not evil-moon
const {dropId} = await createDrop({
    account: fundingAccount,
    depositPerUseNEAR: 0.1,
    config: {
        sale: {
            maxNumKeys: 100,
            pricePerKeyNEAR: 1
            allowlist: ["benji.testnet", "minqi.testnet"]
            blocklist: ["evil-moon.testnet"]
        }
    }
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

### Keypom Args
Keypom Args are important pieces of information injected automatically by Keypom when a key is claimed. If any attempt is made to spoof Keypom args, the claim will automatically fail. This makes the Keypom Args an untamperable source of truth. The pieces of information can include: 
- Drop ID that the access key belongs to
- Funder's `accountId` of the drop
- The claiming account's `accountId`
- The current access key's `keyId`

The information are injected into the `args`, but their specific location depends on the field specified. Here, the `funderId` is being injected into an `originalOwner` field in the args, and the claiming account's `accountId` is being injected into the metadata object under the field `newOwner`. 

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
