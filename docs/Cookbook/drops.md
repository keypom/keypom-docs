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

### Creating a Simple Drop
A drop is the fundemental building block of Keypom. It is a collection of access keys that all share the same properties. A simple drop allows you to send $NEAR by sharing those access keys in the form of a linkdrop. 

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

:::caution
`createDrop` is limited to adding 50 password protected keys or 100 non-protected keys at a time. To add more keys, see the [large drops](#creating-a-large-drop) example. 
:::

___

### Creating a Non-Fungible Token Drop
A drop is the fundemental building block of Keypom. It is a collection of access keys that all share the same properties.

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Mint 1 NFT for the drop funder
await fundingAccount.functionCall({
	contractId: NFT_CONTRACT, 
	methodName: 'nft_mint', 
	args: {
		receiver_id: YOUR_ACCOUNT,
		metadata: {
		    title: "My First Keypom NFT",
		    description: "NFT from my first NFT Drop!",
		    media: "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
		},
		token_id: NFT_TOKEN_ID,
	},
	gas: "300000000000000",
	// Cost to cover storage of NFT
	attachedDeposit: parseNearAmount("0.1")
});

const { keys } = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    depositPerUseNEAR: "1",
    nftData: {
	    // NFT Contract Id that the tokens will come from
	    contractId: NFT_CONTRACT,
	    // Who will be sending the NFTs to the Keypom contract
	    senderId: YOUR_ACCOUNT,
	    // List of tokenIDs
	    tokenIds: [NFT_TOKEN_ID]
	}
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

### Creating a Fungible Token Drop
A drop is the fundemental building block of Keypom. It is a collection of access keys that all share the same properties.

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Get amount of FTs to transfer. In this scenario, we've assumed it to be 1 for one single use key.
let amountToTransfer = parseNearAmount("1")
let funderFungibleTokenBal = await fundingAccount.viewFunction({
	contractId: FT_CONTRACT, 
	methodName: 'ft_balance_of',
	args: {
		account_id: YOUR_ACCOUNT
	}
});

// Check if the owner has enough FT balance to fund drop
if (new BN(funderFungibleTokenBal).lte(new BN(amountToTransfer))){
	throw new Error('funder does not have enough Fungible Tokens for this drop. Top up and try again.');
}

const { keys } = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    depositPerUseNEAR: 1,
    ftData: {
    	contractId: FT_CONTRACT,
    	senderId: YOUR_ACCOUNT,
    	// This balance per use is balance of human readable FTs per use. 
    	amount: "1"
		// Alternatively, you could use absoluteAmount, which is dependant on the decimals value of the FT
		// ex. if decimals of an ft = 8, then 1 FT token would be absoluteAmount = 100000000
    },
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

### Creating a Function Call Drop
A drop is the fundemental building block of Keypom. It is a collection of access keys that all share the same properties.

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

### Public Sale Drop
A public sale drop is one where you can sell the access keys from a drop to other users. These keys will all have the same propoerties and can be bought by anyone unless otherwise specified using the `allowlist` and `blocklist`. The maximum number of keys in the drop can be set using `maxNumKeys`. 

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Create drop with a maximum of 100 keys that can be added by benji and min but not evil-moon
const { keys, dropId } = await createDrop({
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

### Creating a Large Drop
Adding keys, either using `createDrop` or `addKeys` is limited to 50 password protected or 100 non-protected keys. To bypass this, the drop can be created first and then the keys can be added by looping `addKeys`.

<Tabs>
<TabItem value="SDK" label="Keypom JS SDK🧩">

```js
// Creating drop with 0 single use keys
const {dropId} = await createDrop({
    account: fundingAccount,
	config:{
		usesPerKey: 1
	},
    depositPerUseNEAR: "0.1",
});

// Adding 200 keys to the drop
for(i = 0, i < 4, i++){
    const {keys} = await addKeys({
        dropId,
        numKeys: 50
    })
    console.log(keys)
}

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

### Creating a Trial Account Drop
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
