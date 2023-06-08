---
sidebar_label: 'Password Protection'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Password Protection
This part of the cookbook contains everything related password protecting your drops.
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)


:::info note
These scripts will not run without the proper setup shown in the [introduction page](../../welcome.md#connection-to-near-and-initializing-the-sdk).
:::

## Password Protecting your Entire Drop
Password protecting your drop prevents unauthorized people from claiming keys in your drop. A claim will fail if the [*actual password*](#claiming-a-password-protected-key) (base password is NOT the claiming password) is not included in the claim transaction. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Create drop with 1 single use password protected key
let {keys, dropId} = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    depositPerUseNEAR: "0.1",
    basePassword: "base-password"
})

console.log(keys)
```

</TabItem>

</Tabs>

___

## Claiming a Password-Protected Key
When claiming a password protected key, the password is not actually the base password. The base password is just one component that is universal for all keys across the entire drop. The actual password for each claim is different but follows the following format format:

```
hash(basePassword + publicKey + current_key_use)
```

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
let base_password = "base-password"

// Create drop with 1 password protected key
let {keys, dropId} = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    depositPerUseNEAR: "0.1",
    basePassword: base_password
})

// Create password using base + pubkey + key use as string
const keyInfo1 = await getKeyInformation({
    publicKey: keys.publicKeys[0]
})
let passwordForClaim = await hashPassword(base_password + keys.publicKeys[0] + keyInfo1.cur_key_use.toString())

// Claim with created password
await claim({
    accountId: "minqianlu.testnet",
    secretKey: keys.secretKeys[0],
    password: passwordForClaim
})
```

</TabItem>

</Tabs>

___

## Password Protecting a Specific Key Use
Rather than password protecting your entire drop, you may only want to protect certain key uses. A great use case of this is for [ticketing](../../../Tutorials/Advanced/ticketing/architecture.md#attendance-required-for-poap), when a bouncer would scan your ticket to claim your key and admit you into the event but only they know the password. This would prevent people admitting themselves into the event and gaining access to any POAPs and goodies available only to those who physically attend. 

To specify key uses to password protect, simply add it to the `passwordProtectedUses` array. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Create drop with 10 password protected keys and 5 key uses each
let {keys, dropId} = await createDrop({
    account: fundingAccount,
    numKeys: 10,
    config:{
		usesPerKey: 5
	},
    depositPerUseNEAR: "0.1",
    basePassword: "base-password",
    // Password protect the first, third and fourth key uses
    passwordProtectedUses: [1, 3, 4],
})

console.log(keys)
```

</TabItem>

</Tabs>

___

## Delete Drop
A drop can be deleted manually at any time using `deleteDrops`. This will refund all unclaimed key balances back to the drop funder's Keypom balance. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Get all the drops for a given user
let drops = await getDrops({accountId: "minqi.testnet"});

// Delete all the drops currently funded by `minqi.testnet`
await deleteDrops({
    account: fundingAccount,
    drops
})

// Delete 2 seperate drops given their IDs
await deleteDrops({
    account: fundingAccount,
    dropIds: ["123123123123123", "12391238012380123"]
})
```

</TabItem>

</Tabs>

___
