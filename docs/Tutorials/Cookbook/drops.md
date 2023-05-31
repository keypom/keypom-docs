---
sidebar_label: 'Drops'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Cookbook - Drops
Welcome to the Keypom cookbook! Here you can explore Keypom's building blocks that help create awesome onboarding experiences.

## Getting Started
In this cookbook, you will get to explore different building blocks you can use for your own projects. These will range from creating a drop to working with Keypom balances and everything in between. Each of these building blocks will provide a code snippet, using the Keypom JS SDK and Rust.

For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)
3. *Insert rust one here, i actually have no idea how to do that*


## Connection to NEAR and Initializing the SDK
When working with the SDK, you will always need to connect to NEAR and initiate Keypom using the `initKeypom` function. This will always be the first function you call to interact with the SDK. 

`initKeypom` initializes the SDK to allow for interactions with the Keypom smart contracts. Without it, none of the other SDK functions would work as expected. If a NEAR connection is not already present, it will initialize a new one for you. More info on the `initKeypom` function can be found [here](../../keypom-sdk/Core/modules.md#initkeypom).

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/simple-drop/simple-example.js#L10-L35
```

### Creating a Drop
A drop is the fundemental building block of Keypom. It is a collection of access keys that all share the same properties. The key is what you would distribute to people while the drop is that collection of keys that you fund and own until you distribute it.

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
                        accountIdField: "metadata.originalOwner",
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
