---
sidebar_label: 'Fungible Token Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fungible Token Drop
## Introduction
:::tip
It's recommended you understand the basics of how to create a [Simple Drop](simple-drops.md) first before moving to FT drops. Many of the concepts in this tutorials are extensions on the Simple Drop. 

It's also important to understand the workings of the [Fungible Token drop](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/ftdrops.md) as many concepts will be referenced from there.
:::

The creation of a FT drop shares many concepts and similarities to the [Simple Drop](simple-drops.md) and the [NFT Drop](nft-drops.md). Though not necessary to review the NFT drop tutorial, it is highly recommended you review the Simple Drop tutorial first.   

The process of creating an FT drop can again be broken down into the following steps.  

1) Initializing NEAR blockchain connection.  
2) Ensure the funder has enough FTs to fund the drop.  
3) Creating the drop.  
4) Registering the Keypom contract on the FT contract.  
5) Transferring  Keypom the necessary Fungible Tokens.  

With this, the following skeleton code can be created. 
```js
// Each of the two methods to create this drop will have their own unique set of imports

// Imports used in the Keypom SDK method:
const { initKeypom, createDrop } = require("keypom-js");
const { BN } = require("bn.js");

// Imports used in the NEAR-API-JS method:
const { parseNearAmount, formatNearAmount } = require("near-api-js/lib/utils/format");
const { KeyPair, keyStores, connect } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();


async function FTDropKeypom(){
// INITIALIZATION

//      STEP 1 Initializing NEAR blockchain connection.

//      STEP 2 Ensure the funder has enough FTs to fund the drop.

// CREATING DROP AND TRANSFERRING FTs

//      STEP 3 Creating the drop.

//      STEP 4 Registering the Keypom contract on the FT contract.

//      STEP 5 Transferring  Keypom the necessary Fungible Tokens.
}

FTDropKeypom()
```
Similar to the NFT tutorial, these steps will be classified under umbrella sections. Steps 1 and 2 will be covered in "[Initialization](ft-drops.md#initialization)" and Steps 3, 4, and 5 will be under "[Creating FT drop and Transferring FTs](ft-drops.md#creating-drop-and-transferring-fts)"

---

## Initialization
In this section, you'll be addressing the first two steps: initiating a NEAR blockchain connection and ensuring the funder has enough FTs for the drop. To ensure the funder has enough FTs to fund the drop, a new concept is to be defined.

:::info
Sufficient funds to fund the drop with FTs is the same as in simple drops. The funder must have enough Fungible Tokens to cover the `amountToTransfer` = *FT per use* X *number of keys* X *uses per key*.
:::

With `amountToTransfer` in mind, a `viewFunction` to the FT contract can be made to call `ft_balance_of`. This will return the funder's FT balance and can be compared against `amountToTransfer` to ensure the funder has enough FTs to fund the drop. 

In the code, you may notice the balances defined using `BN`. These are simply *Big Numbers* and is a library built to handle numbers beyond Javascript's [max safe integer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER). This is necessary as the FTs in this example have a decimal of 24.

:::note
With the Fungible Token used in the example, it has a `decimal` parameter value of 24, making it equivalent to 1 $NEAR -> 10<sup>24</sup> Yocto NEAR. This allows us to use [`parseNearAmount`](https://docs.near.org/tools/near-api-js/utils) to convert between the two. Read more on the decimal parameter [here](https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals).
:::

Similar to the NFT drop tutorial, a NEAR-API-JS function was used in the SDK approach, meaning the SDK approach will need to use NEAR-API-JS methods to initialize a NEAR connection. To read futher on this, see the [NFT drop tutorial](nft-drops.md#initialization). This means the two approaches will share the same code for steps 1 and 2. 

```js reference
https://github.com/keypom/keypom-js/blob/6169628b981c54e3c4b31c57b15e0abb99784385/docs-examples/keypom-js-sdk/ft-example.js#L9-L41
```

---

## Creating Drop and Transferring FTs
In this section of the tutorial, you'll be creating the drop and transferring the FTs to Keypom. 

:::info
Part of this process is ensuring that Keypom is registered on the FT contract. If not, there will be a small storage fee to pay, as the FT contract is incurring a cost to store the Keypom contractID on its list of token owners. For more info, see the NEAR [Nomicon](https://nomicon.io/Standards/StorageManagement)
::: 

Recall from the introduction that there are 3 tasks to complete in this section.  

- Creating the drop  
- Registering Keypom on the FT contract  
- Transferring the FTs to Keypom  

The process of creating the drop is very similar to what was done in the [NFT tutorial](nft-drops.md#creating-drop-and-transferring-nfts); the usual `createdrop` or `create_drop` functions are called and `ftdata` is passed in instead. Note that the `amount` argument in `createdrop` is representative of the human-readable amount of the FT while `balance_per_use` in `create_drop` requires the absolute number, based on the number of decimal placs. 

Registering Keypom requires you to call `storage_deposit` on the FT contract. This will send a storage deposit to the FT contract if Keypom is not already registered. Finally, the `ft_transfer_call` is called and is similar to the NFT drop tutorial. 

Using the SDK approach, **all of this is done for you**. A simple `initKeypom` and `createDrop` call with FT data will create the FT drop so long as the funder has an adaquette FT balance. 

The code for this section can be seen below.

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/6169628b981c54e3c4b31c57b15e0abb99784385/docs-examples/keypom-js-sdk/ft-example.js#L43-L67
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/6169628b981c54e3c4b31c57b15e0abb99784385/docs-examples/near-api-js/ft-near-example.js#L43-L109
```

</TabItem>
</Tabs>

---

## Full Code
Inserting the above code blocks into the skeleton code from the [introduction](ft-drops.md#introduction) gives you the final finished code below. 

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/6169628b981c54e3c4b31c57b15e0abb99784385/docs-examples/keypom-js-sdk/ft-example.js#L1-L82
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/6169628b981c54e3c4b31c57b15e0abb99784385/docs-examples/near-api-js/ft-near-example.js#L1-L110
```

</TabItem>
</Tabs>

---

## Testing
### Running the Script and Expected Console Logs
Here, you'll learn how to run the code that was just covered, and what to expect.

To access the code, clone the code from [this repo](https://github.com/keypom/keypom-js). Then open a terminal and cd to the directory where the code is located and run the following to install all the necesasry packages. 
```bash
npm install
```
:::caution
Prior to running these scripts, ensure you replace all instances of `keypom-docs-demo.testnet` and its private key in the script with the credentials of your account found in your `~/.near-credentials` folder
:::

From there, you are able to run this Simple Drop script that was made in this tutorial using the following command:
``` bash
npm run ft-keypom
```
:::note
The SDK script is being tested here; use `npm run ft-near` to test the NEAR-API-JS script instead.
:::
This should return a successful drop creation and console log a Public Key and Linkdrop
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/ft/console-output.png").default} alt="console output" width="100%"/> </p>
To see the full console log from this drop creation, see the expandable section below.

<details>
<summary>Console Log of Test</summary>
<p>

``` bash
yarn run v1.22.19
warning ../../../package.json: No license field
$ node docs-examples/keypom-js-sdk/ft-example.js
1000000000000000000000000
Receipts: 4hyrL1bBnqFsFP6LanLUULidRAuhQ6SLwRpY6TQDHeHb, 9iwfDWoXUB4vw8iiRow6fbUYxqGac5CwhymTko7avdKD, Fb6k3k3yPMdLPmK5ryuEjRJsNdFvgKZCufPenyQow2N5
        Log [v1-3.keypom.testnet]: Current Block Timestamp: 1674702268840214182
        Log [v1-3.keypom.testnet]: 20 calls with 100000000000000 attached GAS. Pow outcome: 1.8061103. Required Allowance: 18762630063718400000000
        Log [v1-3.keypom.testnet]: was_ft_registered: true
        Log [v1-3.keypom.testnet]: Total required storage Yocto 11910000000000000000000
        Log [v1-3.keypom.testnet]: Current balance: 1.1362367, 
            Required Deposit: 1.0316726, 
            total_required_storage: 0.01191,
            Drop Fee: 0, 
            Key Fee: 0 Total Key Fee: 0,
            allowance: 0.0187626 total allowance: 0.0187626,
            access key storage: 0.001 total access key storage: 0.001,
            deposits less none FCs: 1 total deposits: 1 lazy registration: false,
            deposits for FCs: 0 total deposits for FCs: 0,
            uses per key: 1
            None FCs: 0,
            length: 1
            GAS to attach: 100000000000000
        Log [v1-3.keypom.testnet]: New user balance 0.1045641
        Log [v1-3.keypom.testnet]: Fees collected 0
        Log [v1-3.keypom.testnet]: Performing CCC to get storage from FT contract
Receipts: 5xnj5kCS1Uo6CheMzg3jiy6tBGGpsnRMhzPAhjV1UqHJ, 48rqNRmCrVBmpcNhBG8mcEn6ghi23B8A3cuYe4vrYtdD
        Log [v1-3.keypom.testnet]: User has enough balance to cover FT storage. Subtracting 0.0025 from user balance. User balance is now 0.1020641
        Log [v1-3.keypom.testnet]: 20 calls with 100000000000000 attached GAS. Pow outcome: 1.8061103. Required Allowance: 18762630063718400000000
        Log [v1-3.keypom.testnet]: FT contract already registered. Refunding user balance for 0.00125. Balance is now 0.1033141
Receipts: 2d5vtVYmbs4imDwzGc26CpttHmpWTUh4BghpqcSMrgRJ, 3LxUVoJSShQd89SVEPFYMa3qZ9wSZgVL27JY9X1TwAST, CiWpDnThfxP1z6o1CX95iU1EsaxWtHmMhzndKPbrTZst
        Log [ft.keypom.testnet]: EVENT_JSON:{"standard":"nep141","version":"1.0.0","event":"ft_transfer","data":[{"old_owner_id":"keypom-docs-demo.testnet","new_owner_id":"v1-3.keypom.testnet","amount":"1000000000000000000000000"}]}
Receipt: 8dzLaYfsSToB8tnWupcz4RYZpgBMuF6MgsLSPNCwMaTf
        Log [ft.keypom.testnet]: New uses registered 1
Public Keys and Linkdrops:  {
  'ed25519:FF1MYB98hanD7wirMsefQRFJqDNucrXtYofHnKpqkZYD': 'https://testnet.mynearwallet.com/linkdrop/v1-3.keypom.testnet/3VwemiDWwbcizfQKEH96AjqJ2YDrb8kYokCfBtmPRvswEdgP7HRGcVQy8XJixAYVcJBhRXaUTSKDNbpGgbCf3ZW9'
}
✨  Done in 10.21s.
```

</p>
</details>

### Claiming and Explorer Transactions
Once you have the link, you are able to claim it the linkdrop you've just created. The output link will take you to the following MyNearWallet page, where you will have the choice to call claim to an existing account or a new one. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/ft/mnw-claim.png").default} alt="MyNearWallet claim" width="80%"/> </p>

You can check the transactions on the [NEAR Explorer](https://explorer.near.org/). Ensure you are select `testnet` from the dropdown in the top left if you are using testnet to conduct these tests.

To view the transactions, you can search up the Keypom contract ID: `v1-3.keypom.testnet`. You should be able to see the `create_drop`, `ft_transfer_call` and `claim` transactions. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/ft/explorer.png").default} alt="explorer transactions" width="80%"/> </p>

:::note
Recall that in the SDK approach, `ft_transfer_call` is never explicitely called but rather `createDrop` calls it for you; this can be seen in the explorer shown above. 

This is the SDK in action!
:::

---

## Conclusion
In this tutorial, you've learned to [ensure the funder has enough FTs](ft-drops.md#introduction) for the drop, [create an FT drop](ft-drops.md#creating-drop-and-transferring-fts) with both NEAR-API-JS and the SDK, and to [transfer FTs to Keypom](ft-drops.md#creating-drop-and-transferring-fts). 

In the next tutorial, you will learn to create a function call drop. 