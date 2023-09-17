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
https://github.com/keypom/keypom-docs-examples/blob/4c8f86dab842c16e9c2bc6ad6f22e1eee2dced9e/advanced-tutorials/trial-accounts/create-trial-drop.js#L11-L29
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

## Creating the Trial Drop

Now that both the SDK and NEAR connections have been established, it's time to create the drop itself. This is done using the `createTrialAccountDrop` function. You'll start by defining the restrictions that the trial account will have. You'll want the trial account to only call methods on the guest book contract and attach up to 1 $NEAR per method. In this case, the guest book contract is deployed to the `guest-book.examples.keypom.testnet` account.

```js reference
https://github.com/keypom/keypom-docs-examples/blob/4c8f86dab842c16e9c2bc6ad6f22e1eee2dced9e/advanced-tutorials/trial-accounts/create-trial-drop.js#L37-L51
```

:::note
Note that a `*` was passed in for the callable methods. This means that the trial account can call any method as long as it's on the guest book contract.
:::

Once this is finished, you can create the drop itself. The account will start with `2.5 $NEAR` and will reach the floor once `1.25 $NEAR` has been spent on attached deposits and burnt gas. 

```js reference
https://github.com/keypom/keypom-docs-examples/blob/4c8f86dab842c16e9c2bc6ad6f22e1eee2dced9e/advanced-tutorials/trial-accounts/create-trial-drop.js#L53-L67
```

In the above example, you only created 1 drop but you can create as many as you want for your users. It's super simple and the Keypom SDK has abstracted all the complexities away from you. In the next tutorial, you'll run the script and instantly sign into the guest-book app.

