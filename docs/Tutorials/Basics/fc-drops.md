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
const { initKeypom, createDrop } = require("keypom-js");

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
https://github.com/keypom/keypom-js/blob/4e3aeb7cce7e50ee1bb27c3384d46fd6536f502a/docs-examples/keypom-js-sdk/fc-example.js#L5-L13
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/4e3aeb7cce7e50ee1bb27c3384d46fd6536f502a/docs-examples/near-api-js/fc-near-example.js#L7-L24

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
https://github.com/keypom/keypom-js/blob/4e3aeb7cce7e50ee1bb27c3384d46fd6536f502a/docs-examples/keypom-js-sdk/fc-example.js#L15-L44
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/4e3aeb7cce7e50ee1bb27c3384d46fd6536f502a/docs-examples/near-api-js/fc-near-example.js#L26-L75
```

</TabItem>
</Tabs>

## Complete Code
Taking the code snippets from the [initialization](fc-drops.md#initialization) and [creating the drop](fc-drops.md#creating-drop-with-function-call-data), and filling in the skeleton code form the [introduction](fc-drops.md#introduction) results in the following.

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/4e3aeb7cce7e50ee1bb27c3384d46fd6536f502a/docs-examples/keypom-js-sdk/fc-example.js#L1-L57
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/4e3aeb7cce7e50ee1bb27c3384d46fd6536f502a/docs-examples/near-api-js/fc-near-example.js#L1-L77
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
npm run fc-keypom
```
:::note
The SDK script is being tested here; use `npm run fc-near` to test the NEAR-API-JS script instead.
:::
This should return a successful drop creation and console log a Public Key and Linkdrop
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/fc/console-output.png").default} alt="console output" width="100%"/> </p>
To see the full console log from this drop creation, see the expandable section below.

<details>
<summary>Console Log of Test</summary>
<p>

``` bash
yarn run v1.22.19
warning ../../../package.json: No license field
$ node docs-examples/keypom-js-sdk/fc-example.js
Receipts: 9U5t7Y7UJvVBm7XB3rJm5jbtz3RsvCKmDS7tkYqNKmfN, BvnzbtZJwmL6HhZeyhhSa962mKJ9LoTJkGnbqRKLLenU
        Log [v1-3.keypom.testnet]: Current Block Timestamp: 1674703753206707126
        Log [v1-3.keypom.testnet]: 20 calls with 100000000000000 attached GAS. Pow outcome: 1.8061103. Required Allowance: 18762630063718400000000
        Log [v1-3.keypom.testnet]: Total required storage Yocto 14280000000000000000000
        Log [v1-3.keypom.testnet]: Current balance: 2.1800656, 
            Required Deposit: 2.0340426, 
            total_required_storage: 0.01428,
            Drop Fee: 0, 
            Key Fee: 0 Total Key Fee: 0,
            allowance: 0.0187626 total allowance: 0.0187626,
            access key storage: 0.001 total access key storage: 0.001,
            deposits less none FCs: 1 total deposits: 1 lazy registration: false,
            deposits for FCs: 1 total deposits for FCs: 1,
            uses per key: 1
            None FCs: 0,
            length: 1
            GAS to attach: 100000000000000
        Log [v1-3.keypom.testnet]: New user balance 0.146023
        Log [v1-3.keypom.testnet]: Fees collected 0
Public Keys and Linkdrops:  {
  'ed25519:6cgHrrGVfkmfBwznoFVMAxT2iBV7h9nixzq4nAYr8Qcc': 'https://testnet.mynearwallet.com/linkdrop/v1-3.keypom.testnet/5vfa1fTbyrki4yy969pxB4yqzjLPKps5U22Lj47PBFA7zNYAi66tyAH6hP9ZAJgHzHUc3ciFQSjW9Nu1jDyLwiha'
}
✨  Done in 4.27s.
```

</p>
</details>

### Claiming and Explorer Transactions
Once you have the link, you are able to claim it the linkdrop you've just created. The output link will take you to the following MyNearWallet page, where you will have the choice to call claim to an existing account or a new one. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/fc/mnw-claim.png").default} alt="MyNearWallet claim" width="80%"/> </p>

After the claim transaction succeeds, you can check the transactions on the [NEAR Explorer](https://explorer.near.org/). Ensure you are select `testnet` from the dropdown in the top left if you are using testnet to conduct these tests.

To view the transactions, you can search up the Keypom contract ID: `v1-3.keypom.testnet`. You should be able to see the `create_drop` and `claim` transactions. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/fc/explorer.png").default} alt="explorer transactions" width="80%"/> </p>

You can also view the function call that was called when the drop was claimed. In this case, the function was `nft_mint` on the `nft.examples.testnet` contract. 
<p align="center"> <img src={require("/static/img/docs/basic-tutorials/fc/explorer-nft.png").default} alt="explorer transactions" width="80%"/> </p>

---

## Conclusion
In this tutorial, you learned the how to create a function call drop [using the Function Call Data](fc-drops.md#creating-drop-with-function-call-data) parameter. 

Now that you've had a good introduction to creating all 4 Keypom drop types, you can tinker with existing code in the [Deploy Scripts](getting-started.md#deploy-scripts) or move on to the [Advanced Tutorials](../Advanced/ticketing/concept.md) for more challenging and practical examples.