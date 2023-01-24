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
const { updateFunder } = require("../../lib/lib/keypom");
const { initKeypom, getEnv, createDrop } = keypom

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
https://github.com/keypom/keypom-js/blob/ae49a716c579fd849b6238772f570db5e636246a/docs-examples/keypom-js-sdk/simple-example.js#L17-L26
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/ae49a716c579fd849b6238772f570db5e636246a/docs-examples/near-api-js/simple-near-example.js#L6-L9

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

Note that with NEAR-API-JS, an attached deposit must be added to the `functionCall`. This is to cover the cost of creaating the drop. With simple drops, the costs are just the total sum of $NEAR needed for the collective sum of all the linkdrops. 

In this example, a single key that has one use of the default 1 $NEAR per use cost is being funded. If there were 5 keys that had 2 uses each and had a 10 $NEAR per use cost, the total cost to fund the drop would be `5 keys * 2 uses * 10 $NEAR per use` = `100 $NEAR`


<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/ae49a716c579fd849b6238772f570db5e636246a/docs-examples/keypom-js-sdk/simple-example.js#L33-L39
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/ae49a716c579fd849b6238772f570db5e636246a/docs-examples/near-api-js/simple-near-example.js#L11-L37
```

</TabItem>
</Tabs>

## Full Solution
Placing all the code code into the skeleton from the [introduction](simple-drops.md#introduction), the following full code is the final result.

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/ae49a716c579fd849b6238772f570db5e636246a/docs-examples/keypom-js-sdk/simple-example.js#L33-L39
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/ae49a716c579fd849b6238772f570db5e636246a/docs-examples/near-api-js/simple-near-example.js#L11-L37
```

</TabItem>
</Tabs>

## Conclusion
In this tutorial, you learned the basic [steps of creating a simple drop](simple-drops.md#introduction), how to [initialize a NEAR blockchain connection](simple-drops.md#initialization), and how to [create the keys and the drop](simple-drops.md#creating-keypairs-and-simple-drop). 

In the next tutorial, you'll be learning how to create and fund and NFT drop using the Keypom SDK and NEAR-API-JS.

