import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

# Getting Started

In the basic tutorials, you will be shwon how to create [the four types](/Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/introduction.md) of Keypom drops. Two methods will be shown.

1) [NEAR-API-JS](https://docs.near.org/tools/near-api-js/reference)  
2) [Keypom-JS SDK](https://github.com/keypom/keypom-js) <-- currently linked to github, change this to typedocs or smth else once ready)

In the Deploy scripts, the same four types of Keypom drops will be created, but you will be able to customize the configurations to your needs. 

---

## Prerequisites
For the basic tutorials, you can choose to run the scripts on your own machine. To do son, you must have the following:

1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [NEAR-API-JS](https://docs.near.org/tools/near-api-js/quick-reference#install)  
3. To install the SDK, simply run the following in your command prompt.  
```bash
npm -i keypom-js
```

At this point, you are ready to start the tutorials. To interact with the deploy scripts, you can continue reading this page.  

For the Deploy Scripts, you should have a [NEAR account](https://docs.near.org/concepts/basics/account). It can be either `testnet` or `mainnet`.
:::note
If you choose to use mainnet, you will be using real $NEAR to fund your drops.
:::

---

## Deploy Scripts

There are [4 deploy scripts](https://github.com/keypom/keypom/tree/main/deploy) that have been made available for you to use and easily create Keypom links. These are for:
- Simple Drops
- NFT Drops
- FT Drops
- Function Call Drops

In order to use these scripts, open the `deploy/` directory and modify the `configurations.js` file for the drop you want to create. In this file, you can specify important information such as the number of keys you wish to create, the amount of $NEAR you want to send, how many uses per key etc.

You must specify the account that you will fund the drops with under the `FUNDING_ACCOUNT_ID` variable. This account needs to have keys stored in your `~/.near-credentials` folder. To do this, simply run `near login` on your terminal and follow the prompts using the NEAR CLI.

Once the `configurations.js` file has been modified to your liking, navigate back to the
root directory and run the deploy script.

For simple drops:
<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```bash
yarn simple-sdk
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```bash
yarn simple
```

</TabItem>
</Tabs>

For FT drops:
<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```bash
yarn ft-sdk
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```bash
yarn ft
```

</TabItem>
</Tabs>

For NFT drops:
<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```bash
yarn NFT-minted-sdk
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```bash
yarn NFT
```

</TabItem>
</Tabs>
For Function Call drops:
<Tabs>
<TabItem value="KPJS" label="🔑Keypom-JS SDK">

```bash
yarn fc-sdk
```

</TabItem>
<TabItem value="NRJS" label="💻NEAR-API-JS">

```bash
yarn fc
```

</TabItem>
</Tabs>