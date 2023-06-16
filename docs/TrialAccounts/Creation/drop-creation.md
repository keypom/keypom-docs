---
sidebar_label: 'Create Your First Drop'
---

# Introduction

Up until this point, you should have installed the Keypom SDK and its dependencies and should have a basic understanding of how trial accounts work and what is needed to create one. In this tutorial, you'll go through the process of creating the trial account drop that will be used to onboard users into the guest-book app.

## Creating the Script

Starting at the `keypom-docs-example` directory, navigate to the `advanced-tutorials/trial-accounts` folder and open the `create-trial-drop.js` file. 

```bash
cd advanced-tutorials/trial-accounts
```

There, you will see the code that is used to create the trial account drop. 

---

## Connecting to NEAR
The first step to creating the drop is connecting to the NEAR network. 

This is done with `NEAR-API-JS` and consists of:

* Selecting which network to connect to (testnet or mainnet).

* Specifying the location where the keys are stored for the drop funder's account. This location is commonly in the `~/.near-credentials` folder on your local machine.

```js reference
https://github.com/keypom/keypom-docs-examples/blob/f71760cb9cda203c389c3927c8e0a667db345bac/advanced-tutorials/trial-accounts/create-trial-drop.js#L45-L61
```

---

## Initializing the SDK

The process for creating a drop always starts with calling the `initKeypom` function.

`initKeypom` initializes the SDK to allow for interactions with the Keypom smart contracts. Without it, none of the other SDK functions would work as expected.

```js
// Change this to your account ID
const FUNDER_ACCOUNT_ID = "minqi.testnet";
const NETWORK_ID = "testnet"
async function createTrialAccount() {
  // Initiate connection to the NEAR blockchain.
  const CREDENTIALS_DIR = ".near-credentials";
  const credentialsPath =  path.join(homedir, CREDENTIALS_DIR);
  ...
  ...
  let near = await connect(nearConfig);

  // Initialize the SDK and point it to the custom NEAR object that was created.
  await initKeypom({
		near,
		network: NETWORK_ID
	});
}
```

---

## Creating the Trial Drop

Now that both the SDK and NEAR connections have been established, it's time to create the drop itself. This is done using the `createTrialAccountDrop` function. 

You'll start by defining the restrictions that the trial account will have. You'll want the trial account to only call methods on the guest book and social contracts and attach up to 1 $NEAR per method. In this case, the guest book and social contracts are deployed to the `guest-book.examples.keypom.testnet` and `v1.social08.testnet` accounts respectively.

```js reference
https://github.com/keypom/keypom-docs-examples/blob/f71760cb9cda203c389c3927c8e0a667db345bac/advanced-tutorials/trial-accounts/create-trial-drop.js#L20-L34
```

:::note
Note that a `*` was passed in for the callable methods. This means that the trial account can call any method as long as it's on the guest book contract.
:::

In addition to specifying methods, you can also pre-claim a key so that the user receives an initialized account that can use the dApp right away. This can be done with the following:

```js reference
https://github.com/keypom/keypom-docs-examples/blob/f71760cb9cda203c389c3927c8e0a667db345bac/advanced-tutorials/trial-accounts/create-trial-drop.js#L82-L94
```

Once this is finished, you can create the drop itself. The account will start with `2.5 $NEAR` and will reach the floor once `1.25 $NEAR` has been spent on attached deposits and burnt gas. 

```js reference
https://github.com/keypom/keypom-docs-examples/blob/f71760cb9cda203c389c3927c8e0a667db345bac/advanced-tutorials/trial-accounts/create-trial-drop.js#L69-L79
```

---

## Full Code

```js reference
https://github.com/keypom/keypom-docs-examples/blob/f71760cb9cda203c389c3927c8e0a667db345bac/advanced-tutorials/trial-accounts/create-trial-drop.js#L1-L133
```

---

## Conclusion
In this example, you only created 1 drop but you can create as many as you want for your users. It's super simple and the Keypom SDK has abstracted all the complexities away from you. In the next tutorial, you'll run the script and instantly sign into the guest-book app.