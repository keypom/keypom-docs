---
sidebar_label: 'Fungible Token Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fungible Token Drop
## Introduction
:::tip
It's recommended you understand the basics of how to create a [Simple Drop](simple-drops.md) first before moving to NFT drops. Many of the concepts in this tutorials are extensions on the Simple Drop. 

It's also important to understand the workings of the [Fungible Token drop](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/ftdrops.md) as many concepts will be referenced from there.
:::

The creation of a FT drop shares many concepts and similarities to the [Simple Drop](simple-drops.md) and the [NFT Drop](nft-drops.md). 

Similar to the NFT Drop example, the two approaches share some common code to start. In this case, we are ensuring that the drop funder has enough of the desired Fungible Token to fund the drop. 

This can be done by quickly calling `ft_balance_of` using a `viewFunction` on the desired FT contract and comparing it to the total amount of Fungible Tokens that need to be transfered, `amountToTransfer`. 

Typically, `amountToTransfer` is calculated by *FT per use* X *number of keys* X *uses per key*. For the sake of simplicity, we've assumed a value of 1 FT for a single key with one use.

:::note
With our Fungible Token used in the example, it has a `decimal` parameter value of 24, making it equivalent to 1 $NEAR -> 10<sup>24</sup> Yocto NEAR. This allows us to use [`parseNearAmount`](https://docs.near.org/tools/near-api-js/utils) to convert between the two. Read more on the decimal parameter [here](https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals).
:::


```js reference
https://github.com/keypom/keypom-js/blob/ae49a716c579fd849b6238772f570db5e636246a/docs-examples/keypom-js-sdk/ft-example.js#L19-L37
```

Following the initialization and Fungible Token balance check, the two approaches diverge. 

With the Keypom-JS SDK, `createDrop` will be called again, this time with the appropriate Fungible Token data. This will automatically pay the Fungible Token contract storage deposit, create the drop, and transfer the Fungible Tokens to the Keypom contract.

Using NEAR-API-JS to create the drop means doing this manually, all with `functionCall`s to the Keypom contract.

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/ae49a716c579fd849b6238772f570db5e636246a/docs-examples/keypom-js-sdk/ft-example.js#L39-L64
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/ae49a716c579fd849b6238772f570db5e636246a/docs-examples/near-api-js/ft-near-example.js#L27-L93
```

</TabItem>
</Tabs>