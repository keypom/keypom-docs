---
sidebar_label: 'Creating the Drop'
---
# Creating the Drop

## Introduction
In this section you'll take the first step to creating the ticketing experience by designing the drop. This drop will be tailored according to the functionality and specifications found in the [Solution Architecture](architecture.md#keypom-solution).

Recall that the drop needs the following properties:

* The drop must have 2 key uses for each key.
* A function call drop must be used.
* The second key use can call `nft_mint`.
* The first key use must be password protected.


:::info note
The NFT POAP is optional to include as the event organizer. You may omit it, or replace it with your own function call if you wish. In this tutorial, the POAP will be minted on the second key use. 
:::

Similar to creating a [function call drop](../../Basics/fc-drops.md), the process for creating this drop can be broken down into three stages.

1) Connect to the NEAR blockchain.  
2) Create the drop with function call data.  
3) Make the NFT series for POAPs.

The following skeleton code can be used as a starting point:
``` js
// Imports:
const { initKeypom, createDrop, createNFTSeries, addToBalance } = require("keypom-js");
const { KeyPair, keyStores, connect } = require("near-api-js");
const { parseNearAmount } = require("near-api-js/lib/utils/format");
const path = require("path");
const homedir = require("os").homedir();


async function createTickDrop(){
// STEP 1: Initiate a NEAR connection.

// STEP 2: Create the drop with funciton call data.

// STEP 3: Make NFT series for POAPs.
}

createTickDrop()
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
https://github.com/keypom/keypom-js/blob/5e4b4744a16c727d96d235282020c186edd0b0b5/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L9-L26
```

---

## Creating Drop with Function Call Data
In this section, you'll create the function call drop to meet the functional requirements defined earlier.

Recall that the drop needs the following properties:

* The drop must have 2 key uses for each key.
* The second key use should call `nft_mint`.
* the first key use must be password protected.

### Function Call Drop Basics
This process starts with calling the `initKeypom` function and will always be the first function you call to interact with the SDK. 

`initKeypom` initializes the SDK to allow for interactions with the Keypom smart contracts. Without it, none of the other SDK functions would work as expected. If a NEAR connection is not already present, it will initialize a new one for you. More info on the `initKeypom` function can be found [here](../../../keypom-sdk/modules#initkeypom).

After `initKeypom` is called, the FC Drop can be created by calling `createDrop` and adding an `fcData` parameter. 

:::tip
Recall that the private keys being generated using `createDrop` are used to store the assets. These keys are then embedded within a link.
:::

The primary task in creating the Function Call Drop is to define `fcData`. It is an object with the following properties.

```bash
fcData
├── methods
```

- `FCConfig`: [Specific configurations](../../../keypom-sdk/interfaces/FCConfig.md) for the FC Drop.  
- `methods`: A vector of all the functions to be called for each key use.  

In this example, only the `methods` parameter will be defined for the sake of simplicity.

`methods` is a 2D array. The outer array defines the vectors of functions to be called **per key use**. The inner array dictates the functions invoked on **each particular key use**. For more information on the `methods` parameter, please see the [TypeDocs](../../../keypom-sdk/interfaces/Method.md)

Each inner element of `methods` represents a function call and requires the following parameters:  

- `receiverId`: The contract receiving the function call.  
- `methodName`: The function to be called on the receiver contract.  
- `args`: A stringified JSON object of all the arguments to be passsed into `methodName`.  
- `attachedDeposit`: The yoctoNear deposit attached to the function call when the key is used.  

### Tailoring to Ticketing Requirements

To ensure each key has two key uses with a passwort protected first use, the following `config` can be added to `createDrop`.

```js
// 2 Uses per key
config: {
    usesPerKey: 2
},

// Create base password and ensure only first key use is password protected
basePassword: "event-password",
passwordProtectedUses: [1],
```

:::info
As disucssed in the [introduction](drop.md#introduction), the first key use should not call anything, and the second should call `nft_mint`. To do this, a value of `null` can be passed in to the first index of the `methods` array
:::

On top of the required `receiverId`, `methodName`, `args`, and `attachedDeposit` parameters, a few others will be used used in `methods` to better utilize the SDK. These parameters tell Keypom where to inject arguments. 

- `accountIdField`: Specifies what field Keypom should auto-inject the claiming account's `accountId`into when calling the function.  
- `dropIdField`: Specifies what field Keypom should auto-inject the drop's `dropId` into when calling the function.  

These parameters will be used alongisde the [`createNFTSeries`](../../../keypom-sdk/modules.md#createnftseries) SDK method.  

In this case, the drop will be interfacing with an NFT contract deployed at `nft-v2.keypom.testnet`. This is a contract specifically made to work with the SDK to allow you to seamlessly create NFTs and NFT Series to attach to your drops. 

:::note
If you wish to use a different NFT contract for your POAP, ensure you know the contract's interface and tailor the `methods` arguments accordingly.
:::

```js reference
https://github.com/keypom/keypom-js/blob/5e4b4744a16c727d96d235282020c186edd0b0b5/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L30-L61
```

:::note
Calling `claim` here before creating the NFT Series will fail. This only applies if you choose to include a POAP using `nft_mint` in the second `claim`. 
:::

 

You may have noticed that the syntax for the `nft_mint` function call looks slightly different from what was used in the [FC drop tutorial](../../Basics/fc-drops.md#creating-drop-with-function-call-data). This is because an NFT series is being minted. The NFT series must be defined before `claim` can be called and will require the drop ID, as you'll see in the next section. 

:::info
An NFT series can be thought of as a bucket of NFT token IDs that *all* share similar information. This information comes in the form of metadata, royalties, price etc. For more on NFT series, see NEAR's [NFT tutorial](https://docs.near.org/tutorials/nfts/series#nft-collections-and-series)
:::


## Making NFT Series
In this section, you'll be creating the series of NFTs to be used as POAPs.

The Keypom SDK provides a function to create an NFT series specifically for function call drops, called [`createNFTSeries`](../../../keypom-sdk/modules.md#createnftseries). It requires the following parameters: 

- `dropId`: The drop ID for the drop that should have the NFT series associated with it.  
- `metadata`: 	The metadata that all minted NFTs will have.  

`metadata` is an object with these properties:
* `title`: The title for the NFTs in the series.
* `description`: Description for all NFTs in the series.
* `media`: link to the media for the NFTs.
* `copies`: Number of NFTs in the series.

The code for creating the series is shown below. 

```js reference
https://github.com/keypom/keypom-js/blob/5e4b4744a16c727d96d235282020c186edd0b0b5/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L64-L73
```

Once both the series and drop are defined, `claim` can be called and will mint the desired NFT POAP. 

---

## Creating Linkdrops
The last step in this process is to create the links themselves so that you can easily distribute the assets to people. This is done by embedding the private key, containing the $NEAR, into the link along with the Keypom contract ID.  

With the Keypom SDK, this is all neatly wrapped up for you into the function [`formatLinkdropUrl`](../../../keypom-sdk/modules.md#formatlinkdropurl). You just need to provide the base URL format and the key you want to embed.

```js 
pubKeys = keys.publicKeys

var dropInfo = {};
const {contractId: KEYPOM_CONTRACT} = getEnv()
// Creating list of pk's and linkdrops
for(var i = 0; i < keys.keyPairs.length; i++) {
    let linkdropUrl = formatLinkdropUrl({
        customURL: "https://testnet.mynearwallet.com/linkdrop/CONTRACT_ID/SECRET_KEY",
        secretKeys: keys.secretKeys[i]
      })
    dropInfo[pubKeys[i]] = linkdropUrl;
}
// Write file of all pk's and their respective linkdrops
console.log('Public Keys and Linkdrops: ', dropInfo)
```

---


## Testing Drop Logic
With the drop created, some code can be written to test the actual logic, to ensure that the ticket claiming process works as expected. 

Recall that the drop should have the following properties:
* First `claim` needs to be password protected, only those who know the password (event organizers/doorman) should be able to `claim`.
* Second claim can be called without a password
* The key is deleted after its second use and cannot be claimed again
* Fake/Bogus keys cannot be claimed. This is to prevent people from making their own QR codes to try and enter the event

To ensure the first claim is password protected, `claim` will be called without a password and its expected that the current key use remains at 1. Then, `claim` will be called with the correct password, which should cause current key use to increment to 2. 

```js reference
https://github.com/keypom/keypom-js/blob/5e4b4744a16c727d96d235282020c186edd0b0b5/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L98-L122
```

The second `claim` should be unprotected, and should delete the key afterwards. To verify this, the following test can be used. Here, its expected that `getKeyInformation` will throw an error, causing the message in the catch statement to be logged. 
```js reference
https://github.com/keypom/keypom-js/blob/5e4b4744a16c727d96d235282020c186edd0b0b5/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L124-L137
```

The last two cases to be tested are claiming with a depleted key, and claiming with a fake key. The following tests can be used. Similar to the last example, its expected that both of these should throw errors.

``` js reference
https://github.com/keypom/keypom-js/blob/5e4b4744a16c727d96d235282020c186edd0b0b5/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L139-L163
```

With the drop functionality tested, you can be confident in the logic behind the scenes and focus on the app behaviour. 

---


## Full Code
Now that everything has been put together, the final code can be seen below.

```js reference
https://github.com/keypom/keypom-js/blob/5e4b4744a16c727d96d235282020c186edd0b0b5/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L1-L166
```

---

## Running the Script
Here, you'll learn how to run the code that was just covered, and what to expect.

To view the completed code, clone the Keypom SDK repo and visit the examples directory:
``` bash
git clone https://github.com/keypom/keypom-js && cd keypom-js/docs-advanced-tutorial/ticket-app
```
To run the code you just cloned, install all the necesasry packages. 
```bash
npm install
```

:::caution
Prior to running these scripts, ensure you replace all instances of `minqi.testnet` and its private key in the script with the credentials of your account found in your `~/.near-credentials` folder
:::

To run the script, use the following command:
```bash
node frontend/utils/createTickDrop
```
This should return a successful drop creation, console log your public keys, linkdrops, and the expected test messages.

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

---

## Conclusion

So far, you've learned how to set up your React app, as well as break down the ticketing system into functional requirments. You then took those requirements and wrote a script to create the drop.

In the next tutorial, the ticketing process will be broken down into stages. From there, the React app to reflect those states will be created.


