---
sidebar_label: 'Simple Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Simple Drop
## Introduction
:::info
In this tutorial, you are going to learn how to create a simple drop from scratch. To learn what a simple drop is, [click here](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/simpledrops.md)
:::

Creating a simple drop is a two step process:  

1) Initialization, which includes setting up a connection to the NEAR blockchain.  
2) Creating keypairs and the simple drop.  

To do this, the skeleton code will first be defined. 
``` js
// Each of the two methods to create this drop will have their own unique set of imports

// Imports used in the Keypom SDK method:
const keypom = require("../../lib");
const { initKeypom, createDrop } = keypom

// Imports used in the NEAR-API-JS method:
const { parseNearAmount, formatNearAmount } = require("near-api-js/lib/utils/format");
const { KeyPair, keyStores, connect } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();


async function simpleDropKeypom(){
// STEP 1: Initiate a NEAR connection.

// STEP 2: Create keypairs and the drop.
}

simpleDropKeypom()

```

## Initialization
In this tutorial, our goal for initialization to set up our connection to the NEAR blockchain.

Using the SDK, the NEAR connection is done using the `initKeypom` function. Note that the current method of initialization requires exposing the private key. There are alternative ways to [sign transactions](../Misc/sign-txn.md).

:::info
The `initKeypom` function is the first function you need to call in order to interact with the SDk. It will initialize all tools needed to interact with the SDK, including a NEAR connection if it is not already connected. 

Note that there will be instances where the NEAR connection is already connected but `initKeypom` will still be called to initalize other tools to interact with the SDK.
:::

Using NEAR-API-JS, the connection process is more complicated. It consists of creating a unecrypted local keystore and, creating a NEAR configurations, and then using that to initialize a connection with the NEAR-API-JS library. More information about this process can be found [here](https://docs.near.org/tools/near-api-js/quick-reference#key-store) 

:::tip
In order to run these scripts locally, you need to ensure all accountID and related fields (such as secretKey) are the same as what is stored in your `~/.near-credentials` folder.

If you do not have your account credentials and Keypairs stored in your `~./near-credentials` folder, the script will return a `no matching key pair` error. To solve this, open your CLI and run `near login`.
:::

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/63a7e1d18671ea0165add88d5e7356329e03cd07/docs-examples/keypom-js-sdk/simple-example.js#L5-L13
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/63a7e1d18671ea0165add88d5e7356329e03cd07/docs-examples/near-api-js/simple-near-example.js#L7-L24

```

</TabItem>
</Tabs>

:::note
All function parameters and default values for SDK and Keypom functions can be found in the SDK Typedocs (LINK THIS). For NEAR-API-JS functions, their arguments can be found [here](https://docs.near.org/tools/near-api-js/reference)
:::

## Creating Keypairs and Simple Drop
Now that the connection to the NEAR blockchain is set up, the next step is to create the Keypairs and then create the drop.  
:::tip
Recall that the Keypairs that are being generated are the ones that will be embedded in the link given to the user. 
:::

In the SDK, these two tasks are combined into one function, `createDrop`. This function can be given a set of keys, OR a number of keys can be specified and `createDrop` will create those keypairs for you while creating the drop. 

With NEAR-API-JS, these two tasks are seperate, as the `create_drop` function only creates the drop. The keys that are passed into it must be generated seperately.

### Cost to Fund Simple Drop
Note that with NEAR-API-JS, an attached deposit must be added to the `functionCall`. This is to cover the cost of creaating the drop. With simple drops, the costs are just the total sum of $NEAR needed for the collective sum of all the linkdrops. 

In this example, a single key that has one use of the default 1 $NEAR per use cost is being funded. If there were 5 keys that had 2 uses each and had a 10 $NEAR per use cost, the total cost to fund the drop would be `5 keys * 2 uses * 10 $NEAR per use` = `100 $NEAR`


<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/63a7e1d18671ea0165add88d5e7356329e03cd07/docs-examples/keypom-js-sdk/simple-example.js#L15-L21
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/63a7e1d18671ea0165add88d5e7356329e03cd07/docs-examples/near-api-js/simple-near-example.js#L26-L51
```

</TabItem>
</Tabs>

## Full Solution
Placing all the code code into the skeleton from the [introduction](simple-drops.md#introduction), the following full code is the final result.

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/63a7e1d18671ea0165add88d5e7356329e03cd07/docs-examples/keypom-js-sdk/simple-example.js#L1-L24
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/63a7e1d18671ea0165add88d5e7356329e03cd07/docs-examples/near-api-js/simple-near-example.js#L1-L53
```

</TabItem>
</Tabs>

## Testing
### Running the Script and Expected Console Logs
Here, you'll learn how to run the code that was just covered, and what to expect.

To access the code, clone the code from this repo. Then open a terminal and cd to the directory where the code is located and run the following to install all the necesasry packages. 
```bash
npm install
```
From there, you are able to run this Simple Drop script that was made in this tutorial using the following command:
``` bash
npm run simple-keypom
```
This should return a successful drop creation and console log a Public Key and Linkdrop
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/simple/console-output.png").default} alt="console output" width="100%"/> </p>
To see the full console log from this drop creation, see the expandable section below.

<details>
<summary>Console Log of Test</summary>
<p>

``` bash
yarn simple-keypom
yarn run v1.22.19
warning ../../../package.json: No license field
$ node docs-examples/keypom-js-sdk/simple-example.js
Receipts: HLaPfsxpvU8SKAczYM9NfBtuvPjx5UGvJ4t6bgM9K9TU, 5on8FEqcHgf5iy15KafL2B8bzMTGTnTijgmmf2BiuQGQ
        Log [v1-3.keypom.testnet]: Current Block Timestamp: 1674673033871504065
        Log [v1-3.keypom.testnet]: 20 calls with 100000000000000 attached GAS. Pow outcome: 1.8061103. Required Allowance: 18762630063718400000000
        Log [v1-3.keypom.testnet]: Total required storage Yocto 11110000000000000000000
        Log [v1-3.keypom.testnet]: Current balance: 1.0512189, 
            Required Deposit: 1.0308726, 
            total_required_storage: 0.01111,
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
        Log [v1-3.keypom.testnet]: New user balance 0.0203462
        Log [v1-3.keypom.testnet]: Fees collected 0
Public Keys and Linkdrops:  {
  'ed25519:CoNw7z7fZQhVtb3mXyxj2tJ3A18X61dAKpJLpEFaX69W': 'https://testnet.mynearwallet.com/linkdrop/v1-3.keypom.testnet/4wnfxw9w1pYuEhZW5NSvrgbKE1UxudU669bwxMTgw3Kgjyp39eUsjsa9GSwYX4mJXwmjBkEQMYRr7Hwaf1ovAX6G'
}
✨  Done in 4.45s.
```

</p>
</details>

### Claiming and Explorer Transactions
Once you have the link, you are able to claim it the linkdrop you've just created. The output link will take you to the following MyNearWallet page, where you will have the choice to call claim to an existing account or a new one. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/simple/mnw-claim.png").default} alt="MyNearWallet claim" width="80%"/> </p>

After the claim transaction succeeds, you can check the transactions on the [NEAR Explorer](https://explorer.near.org/). Ensure you are select `testnet` from the dropdown in the top left if you are using testnet to conduct these tests.

To view the transactions, you can search up the Keypom contract ID: `v1-3.keypom.testnet`. You should be able to see the `create_drop` and `claim` transactions. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/simple/explorer.png").default} alt="explorer transactions" width="80%"/> </p>


## Conclusion
In this tutorial, you learned the basic [steps of creating a simple drop](simple-drops.md#introduction), how to [initialize a NEAR blockchain connection](simple-drops.md#initialization), and how to [create the keys and the drop](simple-drops.md#creating-keypairs-and-simple-drop). You also learned the meaning of "funding a drop" as well as the purpose of the `initKeypom` function and when to use it. 

In the next tutorial, you'll be learning how to create and fund and NFT drop using the Keypom SDK and NEAR-API-JS.

