---
sidebar_label: 'Creating the Drop'
---
# Creating the Drop

## Introduction
In this section, you'll take the first step to creating the DAO onboarding experience by designing the FC drop. This drop will be tailored according to the functionality and specifications found in the [Solution Architecture](architecture.md#keypom-solution).

Recall that the following properties must be met:

* A [Function Call drop](../../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/fc-drops.md) must be used and configured so that it calls a method on the DAO bot contract.
* The middleman contract will then invoke the `add_proposal` method, parse the return value and pass the proposal ID into the `act_proposal` method to approve.

With this in mind, the aim of this tutorial will be to create the drop matching the above properties. This process can be broken down into two stages:

1) Connect to the NEAR blockchain.  
2) Create the drop with function call data.  

Starting at the `keypom-docs-examples` directory, navigate to the `advanced-tutorial/dao-onboarding-skeleton` folder and open the `createDaoDrop.js` file. 

```bash
cd advanced-tutorials/dao-onboarding-skeleton
```

There, you can see the following skeleton code in the file `createDaoDrop.js`.
``` js reference
https://github.com/keypom/keypom-docs-examples/blob/3d2ebdfdfe601bc7471a62e859682abaf9afb7cf/advanced-tutorials/dao-onboarding-skeleton/createDaoDrop.js#L1-L29
```

:::note
While the skeleton code allows you to follow alongside the tutorial, the completed code can be found in `advanced-tutorial/dao-onboarding`.
:::

---

## Connecting to NEAR
In this section, you'll be addressing the first step which is connecting to the NEAR network. 

This is done with `NEAR-API-JS` and consists of:

* Selecting which network to connect to (testnet or mainnet).

* Specifying the location where the keys are stored for the drop funder's account. This location is commonly in the `~/.near-credentials` folder on your local machine.

```js reference
https://github.com/keypom/keypom-docs-examples/blob/3d2ebdfdfe601bc7471a62e859682abaf9afb7cf/advanced-tutorials/dao-onboarding/pre-security/createDaoDrop.js#L19-L39
```

---

## Creating the Drop
In this section, you'll create the function call drop to meet the functional requirements defined earlier.

### Function Call Drop Basics

#### Initializing the SDK

This process starts with calling the `initKeypom` function to initialize the SDK.


```js
// Change this to your account ID
const FUNDER_ACCOUNT_ID = "minqi.testnet";
const NETWORK_ID = "testnet"
async function createDaoDrop() {
  // Initiate connection to the NEAR blockchain.
  const CREDENTIALS_DIR = ".near-credentials";
  ...
  ...
  let near = await connect(nearConfig);

  await initKeypom({
    near,
    network: NETWORK_ID,
  });
}
```

After `initKeypom` is called, the FC Drop can be created by calling `createDrop` and adding an `fcData` parameter.

#### Defining the Function Call Data

The `fcData` is an object that defines the methods that will be called for any given key use:


```bash
fcData
└── methods
```

For this Keypom drop, only a single function call will be needed which invokes a method on the middleman contract. In this tutorial, that method is called `new_auto_registration`.

```js
methods: [
  [
    "new_auto_registration"
  ]
]
```

In reality, each method is not simply a string as shown above. The methods require the following parameters:

- `receiverId`: The contract receiving the function call.  
- `methodName`: The function to be called on the receiver contract.  
- `args`: A stringified JSON object of all the arguments to be passed into `methodName`.  
- `attachedDeposit`: The yoctoNear deposit attached to the function call when the key is used.  

For more information on the `methods` parameter, please see the [TypeDocs](../../../keypom-sdk/Core/interfaces/Method.md)

In summary, the `fcData` should look something like this:

```js
fcData: {
    methods: [
        // First key use
        [
            {
                receiverId: DAO_BOT,
                methodName: "new_auto_registration",
                args: SOME_ARGS, 
                attachedDeposit: SOME_DEPOSIT
            }
        ],
    ]   
}  
```

The required arguments and attached deposits will be covered in a later section.

### Adding Proposal and Injected Arguments

The DAO bot will need to know what proposal to add and so that information should be passed in as arguments. From the [SputnikV2 ReadMe](https://github.com/near-daos/sputnik-dao-contract#add-proposal), it can be seen that the proposal will need the following structure. 
```json
{
  "proposal": {
    "description": "Auto-Registering New Member",
    "kind": {
      "AddMemberToRole": {
        "member_id": "new-moon-dao-member-1.testnet",
        "role": "new-onboardee"
      }
    }
  }
}
```
:::caution
The `role` in the proposal **must already exist** in the DAO. This is because the `AddMemberToRole` proposal from SputnikV2 only works with existing roles.
:::

In order for the onboarding to perform as expected, the `member_id` field must be set to the wallet address for the account that is onboarding. To do this you can use Keypom Arguments which are important pieces of information that can be passed into specified fields when a key is used.

The following optional Keypom arguments are exposed for each individual method in the `fcData` alongside the required receiverId, methodName, attachedDeposit etc. 

They tell Keypom where to inject certain parameters for each function call.

- `accountIdField`: The name of the account that is claiming the linkdrop.
- `dropIdField`: The [`dropId`](../../../keypom-sdk/Core/interfaces/Drop.md#dropid) of the drop that the claim is being called on. 
- `keyIdField` The unique identifier, [`keyId`](../../../keypom-sdk/Core/interfaces/KeyInfo.md#keyid), of the key that is being used to claim.
- `funderIdField` the `accountId` of the person funding the drop.

In this case, the `accountIdField` should be set to `proposal.kind.AddMemberToRole.member_id`. This will, upon the key being claimed, tell Keypom to inject the `accountId` of the user claiming into the argument's proposal object under the `kind.AddMemberToRole.member_id` field. 

In addition to the `accountIdField`, an attached deposit must be sent to cover the cost of the DAO's [proposal bond](https://github.com/near-daos/sputnik-dao-contract/blob/2b19edb50e4542e1b8a6769023f2318c70255ee9/sputnikdao2/src/policy.rs#L153C1-L154). In this case, the bond is set to 0.1 $NEAR. 

Finally, the FC drop should pass the desired DAO contract to the middleman DAO bot into the `dao_contract` argument. 

In summary, the final `fcData` should look as follows.

```js
fcData: {
    methods: [
        [
            {
                receiverId: DAO_BOT_CONTRACT,
                methodName: "new_auto_registration",
                args: JSON.stringify({
                    dao_contract: DAO_CONTRACT,
                    proposal: {
                        description: "Auto-Registering New Member",
                        kind: {
                            AddMemberToRole:{
                                role: "new-onboardee-role"
                            }
                        }
                    }
                }),
                accountIdField: "proposal.kind.AddMemberToRole.member_id",
                // Attached deposit of 0.1 $NEAR, the Sputnik proposal deposit, for when the receiver makes this function call
                attachedDeposit: parseNearAmount("0.1")
            }
        ],
    ]   
}   
```

### Gas Requirements
The final consideration to make is the amount of gas needed to claim the drop. To determine this amount, you can test your drop by using `create_account_and_claim`. To maximize gas usage, it is important to use an `account_id` of maximum length (64 characters).

By default, MyNearWallet will attach 100 [TGas](https://docs.near.org/concepts/basics/transactions/gas#thinking-in-gas) to linkdrop claims. This can be used as a starting point when testing your drop but if more gas is needed, it can be overriden manually.

If you were to use the default 100 TGas, it would work for claims to existing wallets but would throw an error for `create_account_and_claim`. This is because the drop uses more Gas when a new account is created. This can be seen in the screenshot below. To mitigate this, you can set the required gas to be 175 TGas.

<p align="center"> <img src={require("/static/img/docs/advanced-tutorials/dao-auto-reg/fail-not-enough-gas.png").default} alt="failed txn not enough gas" width="80%"/> </p>

:::note
For the majority of use-cases, the 100 TGas default is more than enough. With the DAO bot, however, the middleman contract is quite complex and requires more Gas
:::

To combat this, you can add a `requiredGas` argument to your `createDrop`. This will increase the overall amount of gas available to each key in your drop. 

```js
const TERA_GAS = 1000000000000;
let {keys, dropId} = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    ...
    requiredGas: (175*TERA_GAS).toString(),
    ...
})
```

With this modification, the [transaction](https://explorer.testnet.near.org/transactions/AoH2PDMvtdeNqwxjMJdPE6BmVxV1TKVGhdCybL9YsyG6) shows that the drop is claimed successfully and the user is registered into the DAO.

### Final Drop Structure

Putting it all together, the final drop structure should look something like this:

```js reference
https://github.com/keypom/keypom-docs-examples/blob/3d2ebdfdfe601bc7471a62e859682abaf9afb7cf/advanced-tutorials/dao-onboarding/pre-security/createDaoDrop.js#L48-L81
```

---

## Creating Onboarding Links
The last step in this process is to create the links themselves so that you can easily register people into your DAO. For this tutorial, you will make use of MyNEARWallet's linkdrop claim flow which has the following URL: `https://testnet.mynearwallet.com/linkdrop/CONTRACT_ID/SECRET_KEY`.

You can utilize the `formatLinkdropUrl` function for convenience. It can take a custom URL that contains `CONTRACT_ID` and `SECRET_KEY` and it will replace them with the contract ID and secret keys passed in.

```js reference
https://github.com/keypom/keypom-docs-examples/blob/3d2ebdfdfe601bc7471a62e859682abaf9afb7cf/advanced-tutorials/dao-onboarding/pre-security/createDaoDrop.js#L84-L89
```

---

## Final Code

Putting everything together, the final code for the drop should be as shown below:

```js reference
https://github.com/keypom/keypom-docs-examples/blob/3d2ebdfdfe601bc7471a62e859682abaf9afb7cf/advanced-tutorials/dao-onboarding/pre-security/createDaoDrop.js#L1-L105
```

:::note
This drop will not work until the DAO bot is created and deployed. The full script and process will be tested in the [Final Product](./final.md) section. 
:::

---

## Conclusion

So far, you've broken down the DAO auto-registration tool into functional requirements. You then used them to write a script to create the accompanying drop.

This included [creating the proposal and using the `accountIdField`](#adding-proposal-and-injected-arguments) to attach the wallet address for the account that will be onboarded. You then finished that off by [creating the linkdrops](#creating-onboarding-links) to distribute to prospective onboardees. 

In the next tutorial, you'll be creating the DAO bot that the FC drop you just created will be interacting with. 


