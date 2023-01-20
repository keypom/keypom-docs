---
sidebar_label: 'Simple Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Simple Drop
:::note
The code contained in the code blocks are not full scripts but instead excerpts from the DEPLOY scripts in our [Github](https://github.com/keypom/keypom/tree/main/deploy). To run these scripts yourself, see the [Getting Started](/Tutorials/Basics/getting-started.md) page.
:::


When interacting with the NEAR blockchain, the first thing that you must do is initialize a NEAR connection. This must be manually done with NEAR-API-JS but is done automatically with our Keypom-JS SDK through the use of the `initKeypom` function.


<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/b60893fd51d73aebb2b474eb3c82510914192d22/docs-examples/keypom-js%20sdk/simple-example.js#L17-L23
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/b60893fd51d73aebb2b474eb3c82510914192d22/docs-examples/near-api-js/simple-near-example.js#L6-L9

```

</TabItem>
</Tabs>

Next, let's create our drop! The first step is to generate keypairs. Similar to initializing a NEAR conection, this must be done manually with the NEAR-API-JS but is done automatically through our Keypom-JS SDK when creating a drop.

To create the drop, we use `createDrop` with our Keypom JS SDK or `create_drop` in NEAR-API-JS. 

Note that with NEAR-API-JS, an attached deposit `parseNearAmount("1")` must be added to the `functionCall` in order to fund the drop.


<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/b60893fd51d73aebb2b474eb3c82510914192d22/docs-examples/keypom-js%20sdk/simple-example.js#L25-L32
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/b60893fd51d73aebb2b474eb3c82510914192d22/docs-examples/near-api-js/simple-near-example.js#L11-L37
```

</TabItem>
</Tabs>

