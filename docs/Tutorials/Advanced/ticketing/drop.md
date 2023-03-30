---
sidebar_label: 'Creating the Drop'
---
# Creating the Drop

## Introduction
In this section you'll take the first step to creating the ticketing experience by designing the drop. This drop will be tailored according to the functionality and specifications found in the [Solution Architecture](architecture.md#keypom-solution).

Recall that the drop needs the following properties:

* A [Function Call drop](../../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/fcdrops.md) must be used and configured so that each key has 2 uses.
* The first key use is password protected and `null` (a lightweight transaction to reflect that the key has been used).
* The second key use will have a small amount of $NEAR to cover account creation costs and sponsor the first few transactions.
* The second key use will also call `nft_mint` on an NFT contract which will send the new or existing account a POAP.


With this in mind, you can create a script to create the drop matching the above properties. This process can be broken down into three stages:

1) Connect to the NEAR blockchain.  
2) Create the drop with function call data.  
3) Create the NFT collection for the post attendance gift.

Starting at the `keypom-js` directory, navigate to `docs-advanced-tutorials/frontend/utils`. 
```bash
cd docs-advanced-tutorials/ticket-app-skeleton/frontend/utils
```

There, you can see the following skeleton code in the file `createTickDrop.js`.
``` js reference
https://github.com/keypom/keypom-js/blob/8b52d854bf8bc39b92e28c0150dbeceb97ad5ddf/docs-advanced-tutorials/ticket-app-skeleton/frontend/utils/createTickDrop.js#L1-L22
```

## Connecting to NEAR
In this section, you'll be addressing the first step which is connecting to the NEAR network. 

This is done with `NEAR-API-JS` and consists of:

* Selecting which network to connect to (testnet or mainnet).

* Specifying the location where the keys are stored for the drop funder's account. This location is commonly in the `~/.near-credentials` folder on your local machine.

```js reference
https://github.com/keypom/keypom-js/blob/63db8ff15510db8acffc849e46a0a6b1f6889cef/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L9-L27
```

---

## Creating the Drop
In this section, you'll create the function call drop to meet the functional requirements defined earlier.

### Function Call Drop Basics

#### Initializing the SDK

This process starts with calling the `initKeypom` function and will always be the first function you call to interact with the Keypom SDK. 

`initKeypom` initializes the SDK to allow for interactions with the Keypom smart contracts. Without it, none of the other SDK functions would work as expected.

After `initKeypom` is called, the FC Drop can be created by calling `createDrop` and adding an `fcData` parameter.

```js
// Change this to your account ID
const FUNDER_ACCOUNT_ID = "minqi.testnet";
const NETWORK_ID = "testnet"
async function createTickDrop() {
  // Initiate connection to the NEAR blockchain.
  const CREDENTIALS_DIR = ".near-credentials";
  const credentialsPath =  path.join(homedir, CREDENTIALS_DIR);
  ...
  ...
  let near = await connect(nearConfig);

  await initKeypom({
      near,
      network: NETWORK_ID
  });
}
```

#### Defining the Function Call Data

One the SDK has been initialized and the NEAR connection established, it's time to create the function call drop. This is done by passing in `fcData` into create drop. It is an object that defines the methods that will be called for any given key use:


```bash
fcData
└── methods
```

For multi-use keys, each specific use can have a different set of methods that will be called. These methods are executed one by one. As an example, a key with 3 uses can be seen:

1. `nft_mint`
2. `null`
3. `create_account_advanced` -> `setup` -> `nft_mint` 

The first time the key is used, an NFT will be minted. The second use will simply advance the key with nothing called. The third time the key is used, it will first call `create_account_advanced` followed by the `setup` method and then finally `nft_mint` all in the same transaction.

This is represented with a 2D array, where the inner array is the set of methods per key use. The above example would be represented as:

```js
methods: [
  [
    "nft_mint"
  ], 
  null, 
  [
    "create_account_advanced", 
    "setup", 
    "nft_mint"
  ]
]
```

In reality, each method is not simply a string as shown above. The methods require the following parameters:

- `receiverId`: The contract receiving the function call.  
- `methodName`: The function to be called on the receiver contract.  
- `args`: A stringified JSON object of all the arguments to be passsed into `methodName`.  
- `attachedDeposit`: The yoctoNear deposit attached to the function call when the key is used.  

For more information on the `methods` parameter, please see the [TypeDocs](../../../keypom-sdk/interfaces/Method.md)

In summary, the `fcData` should look something like this, with a generic method for the POAP which you'll explore in the next section:

```js
fcData: {
    methods: [
        null,
        [
            {
                receiverId: SOME_NFT_CONTRACT,
                methodName: "nft_mint",
                args: SOME_ARGS,
                attachedDeposit: SOME_DEPOSIT
            }
        ],
    ]   
}  
```

#### POAP

Now that the basics for creating an FC drop have been covered, it's time to define what the second key use method data should look like

Each NFT that is given out to participants will share the same artwork, title, description etc. They will be part of the same series and the only thing that differs between them is their unique ID. For a full tutorial about the series contract, see NEAR's [NFT tutorial](https://docs.near.org/tutorials/nfts/series#nft-collections-and-series)

To mint these NFTs, there is a contract deployed to `nft-v2.keypom.testnet`. When creating an FC drop, it is important to understand the interface of the receiver contract. In this case, the mint function has the following parameters:

```rust
pub fn nft_mint(
  &mut self, 
  mint_id: U64, 
  receiver_id: AccountId
)
```
Here, the `mint_id` is needed to identify and tell the NFT contract which series an NFT should belong to. The `receiver_id` field is needed to identify which account should receive the minted NFT.

The `mint_id` field should be set as the drop's `dropId` and the `receiver_id` should be the attendee's NEAR `accountId`. At first glance, this might seem impossible because you don't know the attendee's accounts ahead of time. To solve this, you can use what's known as Keypom Arguments which are important pieces of information that can be passed into specified fields when a key is used.

The following optional Keypom arguments are exposed for each individual method in the `fcData` alongside the required receiverId, methodName, attachedDeposit etc. 

They tell Keypom where to inject certain Keypom parameters into for each function call.

- `accountIdField`: The name of the account that is claiming the linkdrop
- `dropIdField`: The [`dropId`](../../../keypom-sdk/interfaces/Drop.md#dropid) of the drop that the claim is being called on. 
- `keyIdField` The unique identifier, [`keyId`](../../../keypom-sdk/interfaces/KeyInfo#keyid), of the key that is being used to claim.
- `funderIdField` the `accountId` of the person funding the drop.

In this case, the `dropIdField` should be set to `mint_id`  and `accountIdField` set to `receiver_id`. This will result in the drop's ID being passed into the parameter `mint_id` and attendee's NEAR account passed into the `receiver_id` field.

In summary, the final `fcData` should look as follows.

```js
fcData: {
    methods: [
        null,
        [
            {
                receiverId: `nft-v2.keypom.testnet`,
                methodName: "nft_mint",
                args: "",
                dropIdField: "mint_id",
                accountIdField: "receiver_id",
                attachedDeposit: parseNearAmount("0.1")
            }
        ],
    ]   
}
```
:::note
If you wish to use a different NFT contract for your POAP, ensure you know the contract's interface and tailor the `methods` arguments accordingly.
:::

#### Password Protected Keys

To ensure each key has two uses with a password protected first use, the following `config`, `basePassword` and `passwordProtectedUses` can be added to `createDrop`.

```js
await createDrop(
  // 2 Uses per key
  config: {
      usesPerKey: 2
  },
  // Create base password and ensure only first key use is password protected
  basePassword: "event-password",
  passwordProtectedUses: [1],
  fcData: {
    ...
  }
)
```
As the drop creator, you have the option of creating a password and applying it to the keys in your drop. This password is unique for each key use and is comprised of multiple pieces of information. 

This can be applied by providing the core component, a `basePassword`, into the `createDrop` arguments. In the ticketing case, only the first use should be protected which can be achieved by passing `[1]` into the `passwordProtectedUses` parameter.

Once a key has been password protected, you must pass in `hash(basePassword + publicKey + current_key_use)` in order to successfully claim it. 

With this model, if the host were to simply know the `basePassword`, it could deterministically generate this hash for any given ticket link. Furthermore, if the host was the only person who knew the password, nobody could claim the key without going through them first.

For an in-depth explanation around password protected keys, see the [Typedocs](../../../keypom-sdk/modules.md#createdrop).

### Final Drop Structure

Putting it all together, the final drop structure should look something like this:

```js reference
https://github.com/keypom/keypom-js/blob/63db8ff15510db8acffc849e46a0a6b1f6889cef/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L36-L61
```


## Making NFT Series

Up until now, the drop is pointing to an NFT series that doesn't exist yet. If a key were to be claimed, the function call would throw an error. In this section, you'll be creating the series of NFTs to be used as POAPs.

The Keypom SDK provides a function to create an NFT series specifically for function call drops, called [`createNFTSeries`](../../../keypom-sdk/modules.md#createnftseries). It requires the following parameters: 

- `dropId`: The drop ID for the drop that should have the NFT series associated with it.  
- `metadata`: The metadata that all minted NFTs will have. 

`metadata` is an object with these properties:
* `title`: The title for the NFTs in the series.
* `description`: Description for all NFTs in the series.
* `media`: link to the artwork in the form of an IPFS CID.
* `copies`: Number of NFTs in the series.

The code for creating the series is shown below. 

```js reference
https://github.com/keypom/keypom-js/blob/63db8ff15510db8acffc849e46a0a6b1f6889cef/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L64-L73
```

Once both the series and drop are created, the key can be used to mint on-demand POAPs to wallets.

---

## Creating Ticket Links
The last step in this process is to create the links themselves so that you can easily distribute the tickets to people. You can control the format of the URL, for now `localhost:1234` will be used.

```js reference
https://github.com/keypom/keypom-js/blob/63db8ff15510db8acffc849e46a0a6b1f6889cef/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L74-L85
```

---

## Final Code

Putting everything together, the final code for the drop should be:

```js reference
https://github.com/keypom/keypom-js/blob/63db8ff15510db8acffc849e46a0a6b1f6889cef/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L9-L90
```


## Conclusion

So far, you've broken down the ticketing system into functional requirments and used them to write a script to create the drop.

In the next tutorial, you'll be testing the drop you just created, starting with creating a script to emulate the host scanning a ticket. 


