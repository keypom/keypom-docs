---
sidebar_label: 'Non Fungible Token Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Non Fungible Token Drop
When creating an NFT drop, it is important to ensure that the NFT is minted and belongs to you first. To do this, a simple `functionCall` using the NEAR-API-JS to mint the NFT will suffice. This code is shared between the Keypom-JS-SDK approach and the NEAR-API-JS approach.

We will start with initializing the NEAR connection and then make the function call. We will only be minting 1 NFT in this example.

```js reference
https://github.com/keypom/keypom-js/blob/ae49a716c579fd849b6238772f570db5e636246a/docs-examples/keypom-js-sdk/nft-example.js#L17-L37
```

The next step is where we create the drop and transfer the newly minted NFT to the Keypom smart contract. Recall from [NFT drop concepts](/Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/nftdrops.md), the funder must transfer the NFT to the Keypom contract in order for the NFT to be added to the drop. This is where the two approaches diverge. 

With NEAR-API-JS, this must be done manually. Conversely, with the Keypom-JS SDK, this is done automatically when calling `createDrop`, as seen in the code snipped below. 

<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```js reference
https://github.com/keypom/keypom-js/blob/ae49a716c579fd849b6238772f570db5e636246a/docs-examples/keypom-js-sdk/nft-example.js#L39-L62
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```js reference
https://github.com/keypom/keypom-js/blob/ae49a716c579fd849b6238772f570db5e636246a/docs-examples/near-api-js/nft-near-example.js#L29-L79
```

</TabItem>
</Tabs>