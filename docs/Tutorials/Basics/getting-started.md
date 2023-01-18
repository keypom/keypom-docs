import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

# Getting Started

There are several ways to get started using Keypom. You can use the NEAR CLI, our Keypom application, our Keypom SDK and more. In this section, we will go over how you can interact with Keypom and create drops using the NEAR-API-JS library and write simple node scripts.

## Prerequisites

In order to successfully interact with this contract using the deploy scripts, you should have the following: 

- [NEAR account](https://docs.near.org/concepts/basics/account)
- [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Deploy Scripts

There are 4 deploy scripts that have been made available for you to use and easily create Keypom links. These are for:
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