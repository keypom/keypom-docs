---
sidebar_label: 'Function Call Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Function Call Drop
## Introduction
:::tip
It's recommended you understand the basics of how to create a [Simple Drop](simple-drops.md) first before moving to FC drops. Many of the concepts in this tutorials are extensions on the Simple Drop. 

It's also important to understand the workings of the [FC drop](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/fcdrops.md) as many concepts will be referenced from there.
:::

A function call drop is arguably the most powerful feature of Keypom and allows you to create almost all of the examples found in the [Advanced Tutorials](../Advanced/ticketing/concept.md).

:::info
A function call drop will have the same set of function calls for ALL keys. For every key-use, a vector of functions is called in the order that they are passed in. This vector can vary for each individual key use.

This means for use 1, functions a, b and c can be called and on use 2, functions d, e, and f can be called. However, this will be the case for ALL keys accross the entire funciton call
:::

With the power of function call drops understood, the process of creating one can beb broken down. The process is actually very similar to a [Simple Drop](simple-drops.md). It can be broken down into two steps.  

1) Initalizing NEAR blockchain connection  
2) Creating Drop with function call data  

This translated to the following skeleton code. 
``` js
// Each of the two methods to create this drop will have their own unique set of imports

// Imports used in the Keypom SDK method:
const keypom = require("../../lib");
const { initKeypom, getEnv, createDrop } = keypom

// Imports used in the NEAR-API-JS method:
const { parseNearAmount, formatNearAmount } = require("near-api-js/lib/utils/format");
const { KeyPair, keyStores, connect } = require("near-api-js");
const path = require("path");
const homedir = require("os").homedir();


async function fcDropKeypom(){
// STEP 1: Initiate a NEAR connection.

// STEP 2: Create the drop with funciton call data.
}

fcDropKeypom()

```
## Initialization
This step is identical to the [simple drop version](simple-drops.md#initialization). It will not be covered in depth here as it was assumed that you have covered that tutorial prior to attempting more complex tutorials. 

However, a quick summary is as follows: the NEAR-API-JS approach uses a unencryptedLocalKeystore and creates a `nearConfig` while the SDK approach uses `initKeypom` to achieve the same goal. 

The code for the initialization can be found below. 

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/63a7e1d18671ea0165add88d5e7356329e03cd07/docs-examples/keypom-js-sdk/fc-example.js#L6-L14
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/63a7e1d18671ea0165add88d5e7356329e03cd07/docs-examples/near-api-js/fc-near-example.js#L7-L24

```

</TabItem>
</Tabs>

## Creating Drop with Function Call Data
In this section, you'll learn about the process of creating the function call drop. The majority of this process is creating the `methods` 2D array, which defines the functions to be claimed when the key is used. 

`methods` is a 2D array, the first outer array dictates the use number, and the inner array dictates the set of functions used on that particular key use. Each element requires a few parameters  

- `receiverId` or `receiver_id`, which defines the contract receiving the function call.  
- `methodName` or `method_name` which defines the function to be called on the receiver contract.  
- `args` is a JSON object of all the arguments for the above method, all stringified.  
- `attachedDeposit` is the deposit attached to the function call when the key is used.  

:::tip
For more on this data structure and the incredibly powerful use cases this can unlock, see the [Function Call Drops Concepts page](/Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/fcdrops.md#key-uses).
:::

All of these arguments are wrapped up in a `fcData` or `fc` object that is passed into `createDrop` or `create_drop` functions. This can be seen in the code block below. 

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/63a7e1d18671ea0165add88d5e7356329e03cd07/docs-examples/keypom-js-sdk/fc-example.js#L16-L45
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/63a7e1d18671ea0165add88d5e7356329e03cd07/docs-examples/near-api-js/fc-near-example.js#L26-L75
```

</TabItem>
</Tabs>

## Complete Code
Taking the code snippets from the [initialization](fc-drops.md#initialization) and [creating the drop](fc-drops.md#creating-drop-with-function-call-data), and filling in the skeleton code form the [introduction](fc-drops.md#introduction) results in the following.

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/63a7e1d18671ea0165add88d5e7356329e03cd07/docs-examples/keypom-js-sdk/fc-example.js#L1-L47
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/63a7e1d18671ea0165add88d5e7356329e03cd07/docs-examples/near-api-js/fc-near-example.js#L1-L77
```

</TabItem>
</Tabs>

## Conclusion
In this tutorial, you learned the how to create a function call drop [using the Function Call Data](fc-drops.md#creating-drop-with-function-call-data) parameter. 

Now that you've had a good introduction to creating all 4 Keypom drop types, you can tinker with existing code in the [Deploy Scripts](getting-started.md#deploy-scripts) or move on to the [Advanced Tutorials](../Advanced/ticketing/concept.md) for more challenging and practical examples.