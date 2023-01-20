---
sidebar_label: 'Fungible Token Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fungible Token Drop
Similar to the NFT Drop example, the two approaches share some common code to start. In this case, we are ensuring that the drop funder has enough of the desired Fungible Token to fund the drop. 

This can be done by quickly calling `ft_balance_of` using a `viewFunction` on the desired FT contract and comparing it to the total amount of Fungible Tokens that need to be transfered, `amountToTransfer`. 

Typically, `amountToTransfer` is calculated by *FT per use* X *number of keys* X *uses per key*. For the sake of simplicity, we've assumed a value of 1 FT for a single key with one use.

:::note
With our Fungible Token used in the example, it has a `decimal` parameter value of 24, making it equivalent to 1 $NEAR -> 10<sup>24</sup> Yocto NEAR. This allows us to use [`parseNearAmount`](https://docs.near.org/tools/near-api-js/utils) to convert between the two. Read more on the decimal parameter [here](https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals).
:::


```js reference
https://github.com/keypom/keypom-js/blob/b60893fd51d73aebb2b474eb3c82510914192d22/docs-examples/keypom-js%20sdk/ft-example.js#L17-L35
```

Following the initialization and Fungible Token balance check, the two approaches diverge. 

With the Keypom-JS SDK, `createDrop` will be called again, this time with the appropriate Fungible Token data. This will automatically pay the Fungible Token contract storage deposit, create the drop, and transfer the Fungible Tokens to the Keypom contract.

Using NEAR-API-JS to create the drop means doing this manually, all with `functionCall`s to the Keypom contract.

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/b60893fd51d73aebb2b474eb3c82510914192d22/docs-examples/keypom-js%20sdk/ft-example.js#L37-L61
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/b60893fd51d73aebb2b474eb3c82510914192d22/docs-examples/near-api-js/ft-near-example.js#L26-L92
```

</TabItem>
</Tabs>