---
sidebar_label: 'Creating the Drop'
---
# Creating the Drop

## Introduction
In this section you'll take the first step to creating the ticketing experience by designing the drop. This drop will be tailored according to the functionality and specifications found in the [Solution Architecture](architecture.md#keypom-solution).

Recall that the drop needs the following properties:

* An FC drop must be used whereby each key has 2 uses.
* The first key use is a `null` method that is password protected.
* The second key use will have $NEAR to create a new wallet and it will also call `nft_mint` on an NFT contract which will send the new or existing account a POAP.


:::info note
The NFT POAP is optional to include as the event organizer. You may omit it, or replace it with your own function call if you wish. In this tutorial, the POAP will be minted on the second key use. 
:::

The process for creating this drop can be broken down into three stages.

1) Connect to the NEAR blockchain.  
2) Create the drop with function call data.  
3) Make the NFT series for POAPs.

Starting at the `keypom-js` directory, navigate to `docs-advanced-tutorials/frontend/utils`. 
```bash
cd docs-advanced-tutorials/ticket-app-skeleton/frontend/utils
```

There, you can see the following skeleton code in the file `createTickDrop.js`.
``` js
// Imports:
const { initKeypom, createDrop, createNFTSeries, addToBalance } = require("keypom-js");
const { KeyPair, keyStores, connect } = require("near-api-js");
const { parseNearAmount } = require("near-api-js/lib/utils/format");
const path = require("path");
const homedir = require("os").homedir();
var assert = require('assert');


async function createTickDrop(){
// STEP 1: Initiate a NEAR connection.

// STEP 2: Create the drop with funciton call data.

// STEP 3: Make NFT series for POAPs.
}

async function main(){
    createTickDrop()
    // Test drop logic here
}

main()
```

## Getting Started
In this section, you'll be addressing the first step: connecting to NEAR. 

This is done with `NEAR-API-JS` and consists of:

1) Create a Keystore, which stores your access keys used to sign transactions   
  * select a network, either `testnet` or `mainnet`  
  * choose a location where the keypairs live, either a folder on your local machine, or in-memory      

2) Define a NEAR configuration using the Keystore  
3) Use the configuration to initialize a connection to NEAR  

More information about this process can be found [here](https://docs.near.org/tools/near-api-js/quick-reference#key-store).

:::note
For simplicity, this tutorial will choose a file-based keystore and point to the `~/.near-credentials` folder on your local machine since this is where most of your keys are stored. For more information about KeyStores, visit NEAR's [official docs](https://docs.near.org/tools/near-api-js/quick-reference#key-store).
:::

```js reference
https://github.com/keypom/keypom-js/blob/a79d1d7204d4b3baf659cb56909024a72fc6cec7/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L8-L26
```

---

## Creating Drop with Function Call Data
In this section, you'll create the function call drop to meet the functional requirements defined earlier.

Recall that the drop needs the following properties:

* An FC drop must be used whereby each key has 2 uses.
* The first key use is a `null` method that is password protected.
* The second key use will have $NEAR to create a new wallet and it will also call `nft_mint` on an NFT contract which will send the new or existing account a POAP.

### Function Call Drop Basics
This process starts with calling the `initKeypom` function and will always be the first function you call to interact with the SDK. 

`initKeypom` initializes the SDK to allow for interactions with the Keypom smart contracts. Without it, none of the other SDK functions would work as expected. If a NEAR connection is not already present, it will initialize a new one for you. More info on the `initKeypom` function can be found [here](../../../keypom-sdk/modules#initkeypom).

After `initKeypom` is called, the FC Drop can be created by calling `createDrop` and adding an `fcData` parameter. 

:::tip
Recall that the private keys being generated using `createDrop` are the tickets and will be embedded into the attendee's QR code
:::

The primary task in creating the Function Call Drop is to define `fcData`. It is an object with the following properties.

```bash
fcData
└── methods
```

For multi-use keys, each specific use can have a different set of methods that will be called. These methods are executed sequentially and not in parallel. As an example, a key with 3 uses can be seen:

1. `nft_mint`
2. `null`
3. `create_account_advanced`, `setup`, `nft_mint` 

The first time the key is used, an NFT will be minted. The second use will simply advance the key and nothing will be called. The third time the key is used, it will first call `create_account_advanced`. Once that's finished it will call the `setup` method and then finally `nft_mint`.  

This is represented with a 2D array, where each inner is the set of methods per key use. The above example would be represented as:

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

Every method listed represents a function call and requires the following parameters:  

- `receiverId`: The contract receiving the function call.  
- `methodName`: The function to be called on the receiver contract.  
- `args`: A stringified JSON object of all the arguments to be passsed into `methodName`.  
- `attachedDeposit`: The yoctoNear deposit attached to the function call when the key is used.  

For more information on the `methods` parameter, please see the [TypeDocs](../../../keypom-sdk/interfaces/Method.md)

### Tailoring to Ticketing Requirements
#### Key Uses
To ensure each key has two key uses with a passwort protected first use, the following `config`, `basePassword` and `passwordProtectedUses` can be added to `createDrop`.

```js
await createDrop(
  // 2 Uses per key
  config: {
      usesPerKey: 2
  },

  // Create base password and ensure only first key use is password protected
  basePassword: "event-password",
  passwordProtectedUses: [1],
)
```
The `basePassword` acts as the base for the custom generated password for each key and each use. It is the password that the host will need to enter to the scanner before admitting attendees. 

`passwordProtectedUses` indicated the key uses that should be protected by the given password. In this case, only the first use is protected and the second use can be claimed without a password. 

For more on these parameters, see the [Typedocs](../../../keypom-sdk/modules.md#createdrop).
ADD PW PROTECT EXPLANATIONS HERE

#### POAP

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

The following Keypom arguments are exposed for each individual method alongside the `fcData` receiverId, methodName, attachedDeposit etc: 
- `accountIdField`: Specifies what field Keypom should auto-inject the claiming account's `accountId` into when calling the function.
- `dropIdField`: Specifies what field Keypom should auto-inject the drop's `dropId` into when calling the function.
- `keyIdField` EXPLAIN
- `funderIdField` EXPLAIN

In this case, the dropIdField should be set to mint_id  and accountIdField set to receiver_id. This will result in the drop's ID being passed into the parameter mint_id and attendee's NEAR account passed into the receiver_id field.

This `mint_id` is the same as the associated drop's `dropId` and the `receiver_id` needs to be the attendee's account ID. To do this, 



This `mint_id` is the same as the associated drop's `dropId`. In order to pass the `dropId` into `nft_mint`'s `mint_id` parameter, the following can be used.

  
- `dropIdField`: Specifies what field Keypom should auto-inject the drop's `dropId` into when calling the function.  

`nft_mint` also expects a `receiver_id`, which needs to be the attendee's account ID in order to send the POAP to the attendee. To do this, a similar parameter can be used.

`accountIdField`: Specifies what field Keypom should auto-inject the claiming account's `accountId` into when calling the function.

By passing `"mint_id"` into `dropIdField` and `"receiver_id"` into `accountIdField`, you are telling the Keypom contract to send the value of your drop's `dropId` parameter to `mint_id` and the claiming account's `accountId` to `receiver_id` on the receiver NFT contract. 

:::note
If you wish to use a different NFT contract for your POAP, ensure you know the contract's interface and tailor the `methods` arguments accordingly.
:::

```js reference
https://github.com/keypom/keypom-js/blob/a79d1d7204d4b3baf659cb56909024a72fc6cec7/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L30-L61
```

:::note
Calling `claim` here before creating the NFT Series will fail. This only applies if you choose to include a POAP using `nft_mint` in the second `claim`. 
:::


## Making NFT Series
In this section, you'll be creating the series of NFTs to be used as POAPs.

The Keypom SDK provides a function to create an NFT series specifically for function call drops, called [`createNFTSeries`](../../../keypom-sdk/modules.md#createnftseries). It requires the following parameters: 

- `dropId`: The drop ID for the drop that should have the NFT series associated with it.  
- `metadata`: 	The metadata that all minted NFTs will have. 

:::tip
The `dropId` provided will be used as the unique NFT series identifier, `mint_id`
:::


`metadata` is an object with these properties:
* `title`: The title for the NFTs in the series.
* `description`: Description for all NFTs in the series.
* `media`: link to the artwork in the form of an IPFS CID.
* `copies`: Number of NFTs in the series.

The code for creating the series is shown below. 

```js reference
https://github.com/keypom/keypom-js/blob/a79d1d7204d4b3baf659cb56909024a72fc6cec7/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L64-L73
```

Once both the series and drop are created, the key can be used to mint on-demand POAPs to wallets. It's important to note that if the series was not created and a key was claimed, the NFT contract would panic and the key would be wasted. 

---

## Creating Ticket Links
The last step in this process is to create the links themselves so that you can easily distribute the tickets to people. You can control the format of the URL, for now `localhost:1234` will be used.

```js 
pubKeys = keys.publicKeys

var dropInfo = {};
const {contractId: KEYPOM_CONTRACT} = getEnv()
// Creating list of pk's and linkdrops
 for(var i = 0; i < keys.keyPairs.length; i++) {
    // Replace this with your desired URL format. 
    let url = `http://localhost:1234/${KEYPOM_CONTRACT}/${keys.secretKeys[i]}`
    dropInfo[pubKeys[i]] = url;
}   
// Write file of all pk's and their respective linkdrops
console.log('Public Keys and Linkdrops: ', dropInfo)
```

---


## Testing Drop Logic
With the drop created, some code can be written to test the actual logic, to ensure that the ticket claiming process works as expected. 

Recall that the drop should have the following properties:
* First `claim` needs to be password protected, only those who know the password (the host) should be able to `claim`.
* Second claim can be called without a password
* The key is deleted after its second use and cannot be claimed again
* Fake keys cannot be claimed. This is to prevent people from making their own QR codes to try and enter the event

To ensure the first claim is password protected, `claim` will be called without a password and its expected that the current key use remains at 1. Then, `claim` will be called with the correct password, which should cause current key use to increment to 2. 

```js reference
https://github.com/keypom/keypom-js/blob/a79d1d7204d4b3baf659cb56909024a72fc6cec7/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L96-L120
```

The second `claim` should be unprotected, and should delete the key afterwards. To verify this, the following test can be used. Here, its expected that `getKeyInformation` will throw an error, causing the message in the catch statement to be logged. 
```js reference
https://github.com/keypom/keypom-js/blob/a79d1d7204d4b3baf659cb56909024a72fc6cec7/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L122-L135
```

The last two cases to be tested are claiming with a depleted key, and claiming with a fake key. The following tests can be used. Similar to the last example, its expected that both of these should throw errors.

``` js reference
https://github.com/keypom/keypom-js/blob/a79d1d7204d4b3baf659cb56909024a72fc6cec7/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L137-L161
```

With the drop functionality tested, you can be confident in the logic behind the scenes and focus on the app behaviour. 

---


## Full Code
Now that everything has been put together, the final code can be seen below.

```js reference
https://github.com/keypom/keypom-js/blob/a79d1d7204d4b3baf659cb56909024a72fc6cec7/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L1-L164
```

---

## Running the Script
Here, you'll learn how to run the code that was just covered, and what to expect. It's assumed that you have already cloned the code from the [Keypom SDK repo](https://github.com/keypom/keypom-docs).

:::caution
Prior to running these scripts, ensure you replace all instances of `minqi.testnet` and its private key in the script with the credentials of your account found in your `~/.near-credentials` folder
:::

To run the script, use the following command:
```bash
node createTickDrop
```

If you would like to run the completed script, you can run the command below:=
```bash
cd keypom-js/docs-advanced-tutorial/ticket-app && node frontend/utils/createTickDrop
```
This should return a successful drop creation, console log your public keys, linkdrops, and the expected test messages.
<details>
<summary>Drop Creation Example Output</summary>
<p>

```bash
Receipts: Fs29veV4FzQ7ddoSQsAxzK8XRbL1nHbXEtsJGEy9Ei5J, 9uYGoGRpiuGVXxGnYTgQDGdEHxEXGt1iQeTjENKxmu2n
        Log [v2.keypom.testnet]: Current Block Timestamp: 1678140717051797169
        Log [v2.keypom.testnet]: 20 calls with 100000000000000 attached GAS. Pow outcome: 1.8061103. Required Allowance: 18762630063718400000000
        Log [v2.keypom.testnet]: Total required storage Yocto 109950000000000000000000
        Log [v2.keypom.testnet]: Current balance: 3.6972488, 
            Required Deposit: 2.4952026, 
            total_required_storage: 0.10995,
            Drop Fee: 0, 
            Key Fee: 0 Total Key Fee: 0,
            allowance: 0.0375252 total allowance: 0.3752526,
            access key storage: 0.001 total access key storage: 0.01,
            deposits less none FCs: 0.1 total deposits: 1 lazy registration: false,
            deposits for FCs: 0.1 total deposits for FCs: 1,
            uses per key: 2
            None FCs: 1,
            length: 10
            GAS to attach: 100000000000000
        Log [v2.keypom.testnet]: New user balance 1.2020462
        Log [v2.keypom.testnet]: Fees collected 0
Public Keys and Linkdrops:  {
  'ed25519:74jzMpmVAAVi4vanNzDRVkgu6nFUkxzD9GpWGb8W1VMT': [
    'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/22YdTvCuLbVcgTVQ7jmVvmPAn2qVnChzdWrX33WqKy7sPcBRc6hNR2jQWzbGKGqhfxNacMLWwTAPLvQMgB1uNCxy'
  ],
  'ed25519:8srzfMbwYb1S5KMUisf3LM4fkysTbnY83NnYxSD1yPak': [
    'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/SMGCEDmnfmWTH4uuKjjqkMRjez6xX2iEVRee7xxXz5wVLYpSHxFftscKRZ1dsca6FwKgvUpFhAyDgYjPk7LfMQQ'
  ],
  'ed25519:Gnk2z8tCeGTn92uXY4rft7R5Rvbva8YhkjCaBjedbhvB': [
    'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/639zizchXNjAW9qQHdwmBrE4hqjFsQns9b7ELVPULA6ccYZQD283kKcgs2PwiRkybih48Exxh9pMC7cpX9vyUPNj'
  ],
  'ed25519:2T57oiR59LWdLtdBJ1fVXrCiKu5jiG9sDD5RRgMnZkrE': [
    'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/3YVkiKE8uDE5dFGDQgYQrtqD6EGVNMoQshVcrpo6jLyuoH4W2zTfogUFnKcqemSXncnowxgUPdFLemDFQRb3RD5C'
  ],
  'ed25519:2MJUMrC47tFYVEXsqXwbMQLj6pHBgj2EpLJSekTcZRKG': [
    'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/5vRkUDDQbLdtxph1MgKFy8cxpYzQRLPrNe7EFbxyufMK1t4ec3fgGmTaw96chJSN9AvSxSjYh9if78ZaLTTswqWJ'
  ],
  'ed25519:AoKtDmiKzYDw3BaHe5CwfSWU66Ja9bSaUqxAjH89ANy4': [
    'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/2bfx6a5A4fLZvu4sg8V9Rs6ZVmtb1e4jwf9oPBT5KGDHZ1gHZ4H3WPMgZQVp27b7A1iGrKPXbkpuUDdV5RMPSojk'
  ],
  'ed25519:HmFCfZrCc9ABdSpVqDQPkYjNMxZ5FfJMokKL6wSF35R8': [
    'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/5xi2nCMtN82fvV7deca6g5GrfHuo5192Suf8EQUFuwb19j7inUL7YyYQ58H876PFmNYC4tJjurLSYGKryhzSk5sC'
  ],
  'ed25519:6LVrKQn1TGTub4XFao2UAYKd6eB6F296eD6Sh4qi2CHK': [
    'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/5SNgZLHHbqMZWRSbAiy3n5WvYfmXtwXi8DfWLm6THafSsTX5vJzhQsohEkLy7b9Xiv2PtVqLvknqGQY14fxRnKB3'
  ],
  'ed25519:BqZR8gTVteyVDxP5dxLHARG8UKgyG2Epi1g2jzXbtsaE': [
    'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/RnsRiLVJZxRRJ36irkk555aucoKugCvzzBsNH85xRawJRDNnGGqrrXo1fDUdgxdpjmgDLbrp7amw1g9UopE7HQJ'
  ],
  'ed25519:71REUPYcJNMsayBRDxPHzeSzLJXDkYBh76SutP3ET4tt': [
    'https://testnet.mynearwallet.com/linkdrop/v2.keypom.testnet/3nrZU7RKdradZUYb6CebA2dHnh2LiS69enT3BfxBqee8W1uAtpJ8md5tnRuwkKXbUEPEazdQr8nkzSxfS74cHm3S'
  ]
}
Keypom Contract Explorer Link: explorer.testnet.near.org/accounts/v2.keypom.testnet.com
Private Key: 22YdTvCuLbVcgTVQ7jmVvmPAn2qVnChzdWrX33WqKy7sPcBRc6hNR2jQWzbGKGqhfxNacMLWwTAPLvQMgB1uNCxy
Public Key: ed25519:74jzMpmVAAVi4vanNzDRVkgu6nFUkxzD9GpWGb8W1VMT
Key use before claiming with wrong password: 1
Claiming with wrong password...
Receipt: DojTjFkNF5iDeMTx7JQxGXT27M1yHr4B8qQ9vD6SzyD7
        Log [v2.keypom.testnet]: Beginning of process claim used gas: 478059845595 prepaid gas: 100000000000000
        Log [v2.keypom.testnet]: passed global check
        Log [v2.keypom.testnet]: hashed password: [227, 176, 196, 66, 152, 252, 28, 20, 154, 251, 244, 200, 153, 111, 185, 36, 39, 174, 65, 228, 100, 155, 147, 76, 164, 149, 153, 27, 120, 82, 184, 85]
        Log [v2.keypom.testnet]: actualPass password: [153, 171, 244, 102, 240, 122, 172, 4, 9, 230, 47, 154, 140, 38, 169, 253, 39, 88, 92, 70, 202, 67, 245, 80, 84, 80, 180, 180, 118, 1, 182, 128] cur use: 1
        Log [v2.keypom.testnet]: Incorrect password. Decrementing allowance by 1313367981790000000000. Used GAS: 3133679817900
        Log [v2.keypom.testnet]: Allowance is now 36211892145646800000000
        Log [v2.keypom.testnet]: Invalid claim. Returning.
Key use after claiming with wrong password and before claiming with correct password: 1
claiming with correct password...
Receipt: CoiiFfyDHsgJkEJHXr1N6CsX22SBLg4BWwan3kUE42RT
        Log [v2.keypom.testnet]: Beginning of process claim used gas: 479503406607 prepaid gas: 100000000000000
        Log [v2.keypom.testnet]: passed global check
        Log [v2.keypom.testnet]: hashed password: [153, 171, 244, 102, 240, 122, 172, 4, 9, 230, 47, 154, 140, 38, 169, 253, 39, 88, 92, 70, 202, 67, 245, 80, 84, 80, 180, 180, 118, 1, 182, 128]
        Log [v2.keypom.testnet]: actualPass password: [153, 171, 244, 102, 240, 122, 172, 4, 9, 230, 47, 154, 140, 38, 169, 253, 39, 88, 92, 70, 202, 67, 245, 80, 84, 80, 180, 180, 118, 1, 182, 128] cur use: 1
        Log [v2.keypom.testnet]: passed local check
        Log [v2.keypom.testnet]: Key usage last used: 0 Num uses: 2 (before)
        Log [v2.keypom.testnet]: Key has 1 uses left. Decrementing allowance by 10000000000000000000000. Allowance left: 26211892145646800000000
        Log [v2.keypom.testnet]: Total storage freed: 0. Initial storage: 22623189. Final storage: 22623189
        Log [v2.keypom.testnet]: Empty function call. Returning.
Key use after claiming with correct password: 2
Second claim with no password
Receipts: 3ZcLpjhNFK229HSh3rRvRGks57sujt9bb5YxhHsgxj9t, HsogZHNfYVkw6sBtx1TwHXxwKjn1fjvZQRZgupTkruVK, 2DUM7ptaN4njquZJeqkxXyTRFEdDHAvieofiLxH323Ls, EYgv7eqbVApJwok4oToVf6VuEiCGH2z2HWQJE5XD4i3x
        Log [v2.keypom.testnet]: Beginning of process claim used gas: 475708059903 prepaid gas: 100000000000000
        Log [v2.keypom.testnet]: passed global check
        Log [v2.keypom.testnet]: hashed password: [227, 176, 196, 66, 152, 252, 28, 20, 154, 251, 244, 200, 153, 111, 185, 36, 39, 174, 65, 228, 100, 155, 147, 76, 164, 149, 153, 27, 120, 82, 184, 85]
        Log [v2.keypom.testnet]: actualPass password: [227, 176, 196, 66, 152, 252, 28, 20, 154, 251, 244, 200, 153, 111, 185, 36, 39, 174, 65, 228, 100, 155, 147, 76, 164, 149, 153, 27, 120, 82, 184, 85] cur use: 2
        Log [v2.keypom.testnet]: passed local check
        Log [v2.keypom.testnet]: Key usage last used: 0 Num uses: 1 (before)
        Log [v2.keypom.testnet]: Key has no uses left. It will be deleted
        Log [v2.keypom.testnet]: Key being deleted. Will refund: 1000000000000000000000
        Log [v2.keypom.testnet]: User balance incremented by 0.001. Old: 1.2020462 new: 1.2030462
        Log [v2.keypom.testnet]: Total storage freed: 7320000000000000000000. Initial storage: 22623189. Final storage: 22622457
        Log [v2.keypom.testnet]: End of regular claim function: 65417266328543 prepaid gas: 100000000000000
Receipts: 4C9r7CjrAFvXVF7PPaX1Uad2nNkCkusPuLmN3ZBP871h, DsxMBwWYDifpRFJQqEXPDJJFyoGDETKPVWDFoVw8gTyR
        Log [v2.keypom.testnet]: Beginning of on claim Function Call used gas: 562004381091 prepaid gas: 89418751746228
        Log [v2.keypom.testnet]: received empty string as success value
        Log [v2.keypom.testnet]: Has function been executed via CCC: true
        Log [v2.keypom.testnet]: Refund Amount (storage used): 0.00732. Auto withdraw: false
        Log [v2.keypom.testnet]: User balance incremented by 0.00732. Old: 1.2030462 new: 1.2103662
        Log [v2.keypom.testnet]: (TOP of for loop): initial receiver ID: "nft-v2.keypom.testnet" for method: "nft_mint"
        Log [v2.keypom.testnet]: Adding claimed account ID: AccountId("minqi.testnet") to specified field: "receiver_id"
        Log [v2.keypom.testnet]: Adding drop ID: 1678140714164 to specified field "mint_id"
Receipts: 6YK1XKb6EAshV9dUVCCJxAm4ZkJX6B8noj2Bg6ccyHwE, FTRMTmNDWdYRgEE8rWB62iaR3X9uKzqJ49Vq92GH9VDh
        Log [v2.keypom.testnet]: EVENT_JSON:{"standard":"nep171","version":"nft-1.0.0","event":"nft_mint","data":[{"owner_id":"minqi.testnet","token_ids":["305:1"]}]}
Second claim successful. Key has been depleted and deleted
Claim with depleted key
Claim failed, as expected
Claim with fake key
Claim failed, as expected
```

</p>
</details>

---

## Conclusion

So far, you've learned how to set up your React app, as well as break down the ticketing system into functional requirments. You then took those requirements and wrote a script to create the drop.

In the next tutorial, the ticketing process will be broken down into stages for both the user side and event organizer side. From there, the flow of the app, and the Keypom variables that control it, can be established.


