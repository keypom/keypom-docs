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
const keypom = require("../../lib");
const { initKeypom, getEnv, createDrop } = keypom
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
https://github.com/keypom/keypom-js/blob/63a7e1d18671ea0165add88d5e7356329e03cd07/docs-examples/keypom-js-sdk/ft-example.js#L7-L39
```
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
https://github.com/keypom/keypom-js/blob/63a7e1d18671ea0165add88d5e7356329e03cd07/docs-examples/keypom-js-sdk/ft-example.js#L41-L66
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/63a7e1d18671ea0165add88d5e7356329e03cd07/docs-examples/near-api-js/ft-near-example.js#L43-L108
```

</TabItem>
</Tabs>

## Full Code
Inserting the above code blocks into the skeleton code from the [introduction](ft-drops.md#introduction) gives you the final finished code below. 

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/63a7e1d18671ea0165add88d5e7356329e03cd07/docs-examples/keypom-js-sdk/ft-example.js#L1-L69
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/63a7e1d18671ea0165add88d5e7356329e03cd07/docs-examples/near-api-js/ft-near-example.js#L1-L110
```

</TabItem>
</Tabs>

## Conclusion
In this tutorial, you've learned to [ensure the funder has enough FTs](ft-drops.md#introduction) for the drop, [create an FT drop](ft-drops.md#creating-drop-and-transferring-fts) with both NEAR-API-JS and the SDK, and to [transfer FTs to Keypom](ft-drops.md#creating-drop-and-transferring-fts). 

In the next tutorial, you will learn to create a function call drop. 