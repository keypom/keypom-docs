---
sidebar_label: 'Function Call Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Function Call Drop
Function call drops, relative to Fungible and Non Funcgible Token Drops, are relatively simple and bear a closer resemblance to [Simple Drops](simple-drops.md). As the function parameters are the only thing that require to be passed in, and there is no token transfering to the Keypom contract, both approaches can be done in a relatively short manner, 

Similar to Simple Drops, the only major difference between the two approaches is that using NEAR-API-JS requires you to generate the keys manually and call the Keypom by way of a `functionCall`. 

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/ae49a716c579fd849b6238772f570db5e636246a/docs-examples/keypom-js-sdk/fc-example.js#L17-L56
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/ae49a716c579fd849b6238772f570db5e636246a/docs-examples/near-api-js/fc-near-example.js#L6-L58
```

</TabItem>
</Tabs>

The data structure `methods` that is passed into the drop creation is a *2D vector*. Each individual key use can call multiple functions and these sets of functions can change between each key use. For more on this data structure and the incredibly powerful use cases this can unlock, see the [Function Call Drops Concepts page](/Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/fcdrops.md#key-uses).