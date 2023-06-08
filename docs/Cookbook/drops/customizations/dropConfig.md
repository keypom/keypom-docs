---
sidebar_label: 'Drop Configurations'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Drop Configurations
This part of the cookbook contains everything related to drop configurations, including multi-use drops, and creating custom subaccounts.
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)


:::info note
These scripts will not run without the proper setup shown in the [introduction page](../../welcome.md#connection-to-near-and-initializing-the-sdk).
:::

## Creating a Multi-Use Simple Drop
To make all the keys in the drop multi-use, you can specify `usesPerKey` in the dropConfig parameter `config`. In this example, each of the 2 keys created will have 5 uses. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Creating drop with 2 keys with 5 uses each
const {keys} = await createDrop({
    account: fundingAccount,
    numKeys: 2,
	config:{
		usesPerKey: 5
	},
    depositPerUseNEAR: "0.1",
});

console.log(keys)
```

</TabItem>

</Tabs>

:::caution
`createDrop` is limited to adding 50 password protected keys or 100 non-protected keys at a time. To add more keys, see the [large drops](#creating-a-large-drop) example. 
:::

___

## Creating Custom Subaccounts
By specifying a custom `dropRoot`, all new accounts created using your drop will be a subaccount of the specified account. For example, all accounts created with the drop below will follow the form of `${YOUR_USERNAME}.moonpom.near`.

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Creating drop with 2 keys with 5 uses each
const {keys} = await createDrop({
    account: fundingAccount,
    numKeys: 2,
	config:{
		dropRoot: "mint-brigade.testnet"
	},
    depositPerUseNEAR: "0.1",
});

console.log(keys)
```

</TabItem>

</Tabs>

:::caution
the `dropRoot` account **must** have a contract deployed to it that exposes a method `create_account` to create the sub-account. A sample contract can be found [here](https://github.com/near/near-linkdrop)

In addition, it is wise to [`gatekeep account creation`](usageConfig.md#gatekeeping-account-creation) to ensure that not anyone can create subaccounts of your account.

For this reason, the above code **will not work** out of the box. 
:::

___
