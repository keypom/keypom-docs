---
sidebar_label: 'Creating the Drop'
---
# Creating the Drop

## Introduction
In this section you'll take the first step to creating your auto-registration tool by designing the drop. This drop will be tailored according to the functionality and specifications found in the [Solution Architecture](architecture.md#keypom-solution).

Recall that the drop needs the following properties:

* A [Function Call drop](../../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/fc-drops.md) must be used and configured so that each key has 1 use.
* This use will call the DAO bot contract and inject the drop funder and claiming account's `accountId` into the arguments.  



With this in mind, the aim of this tutorial will be to write a node script that will create the drop matching the above properties. This process can be broken down into three stages:

1) Connect to the NEAR blockchain.  
2) Create the drop with function call data.  

Starting at the `keypom-js` directory, navigate to the `utils` folder and open the `createDaoDrop.js` file. 

```bash
cd docs-advanced-tutorials/dao-onboarding-skeleton
```

There, you can see the following skeleton code in the file `createDaoDrop.js`.
``` js reference
https://github.com/keypom/keypom-js/blob/50de06cab595a73ba043c352398b7f2d30d2d837/docs-advanced-tutorials/dao-onboarding-skeleton/createDaoDrop.js#L1-L27C1
```

---

## Connecting to NEAR
In this section, you'll be addressing the first step which is connecting to the NEAR network. 

This is done with `NEAR-API-JS` and consists of:

* Selecting which network to connect to (testnet or mainnet).

* Specifying the location where the keys are stored for the drop funder's account. This location is commonly in the `~/.near-credentials` folder on your local machine.

```js reference
https://github.com/keypom/keypom-js/blob/50de06cab595a73ba043c352398b7f2d30d2d837/docs-advanced-tutorials/dao-onboarding/pre-security/createDaoDrop.js#L20-L36
```

---

## Creating the Drop
In this section, you'll create the function call drop to meet the functional requirements defined earlier.

### Function Call Drop Basics

#### Initializing the SDK

This process starts with calling the `initKeypom` function and will always be the first function you call to interact with the Keypom SDK. 

`initKeypom` initializes the SDK to allow for interactions with the Keypom smart contracts. Without it, none of the other SDK functions would work as expected.


```js
// Change this to your account ID
const FUNDER_ACCOUNT_ID = "minqi.testnet";
const NETWORK_ID = "testnet"
async function createDaoDrop() {
  // Initiate connection to the NEAR blockchain.
  const CREDENTIALS_DIR = ".near-credentials";
  const credentialsPath =  path.join(homedir, CREDENTIALS_DIR);
  ...
  ...
  let near = await connect(nearConfig);

  await initKeypom({
    near,
      network: NETWORK_ID
  });
}
```

After `initKeypom` is called, the FC Drop can be created by calling `createDrop` and adding an `fcData` parameter.

#### Defining the Function Call Data

One the SDK has been initialized and the NEAR connection established, it's time to create the function call drop. This is done by passing in `fcData` into create drop. It is an object that defines the methods that will be called for any given key use:


```bash
fcData
└── methods
```

For this Keypom drop, only a single function call to the DAO bot will be needed. 

```js
methods: [
  [
    "new_proposal"
  ]
]
```

In reality, each method is not simply a string as shown above. The methods require the following parameters:

- `receiverId`: The contract receiving the function call.  
- `methodName`: The function to be called on the receiver contract.  
- `args`: A stringified JSON object of all the arguments to be passed into `methodName`.  
- `attachedDeposit`: The yoctoNear deposit attached to the function call when the key is used.  

For more information on the `methods` parameter, please see the [TypeDocs](../../../keypom-sdk/interfaces/Method.md)

In summary, the `fcData` should look something like this:

```js
fcData: {
    methods: [
        [
            {
                receiverId: DAO_BOT,
                methodName: "new_proposal",
                args: SOME_ARGS, 
                attachedDeposit: SOME_DEPOSIT
            }
        ],
    ]   
}  
```

### Adding Proposal and Injected Arguments
As part of the function call, you will need to define the proposal itself. From the [SputnikV2 ReadMe](https://github.com/near-daos/sputnik-dao-contract#add-proposal), it can be seen that the proposal will need the following structure. 
```json
{
  "proposal": {
    "description": "Add New Member",
    "kind": {
      "AddMemberToRole": {
        "member_id": "council_member_3.testnet",
        "role": "new-onboardee"
      }
    }
  }
}
```

In order for the DAO bot to perform as expected, the `member_id` needs to be equal to the claiming account's `accountId`. To do this you can use what's known as Keypom Arguments which are important pieces of information that can be passed into specified fields when a key is used.

The following optional Keypom arguments are exposed for each individual method in the `fcData` alongside the required receiverId, methodName, attachedDeposit etc. 

They tell Keypom where to inject certain parameters for each function call.

- `accountIdField`: The name of the account that is claiming the linkdrop.
- `dropIdField`: The [`dropId`](../../../keypom-sdk/interfaces/Drop.md#dropid) of the drop that the claim is being called on. 
- `keyIdField` The unique identifier, [`keyId`](../../../keypom-sdk/interfaces/KeyInfo.md#keyid), of the key that is being used to claim.
- `funderIdField` the `accountId` of the person funding the drop.

In this case, the `accountIdField` should be set to `proposal.kind.AddMemberToRole.member_id`.

In summary, the final `fcData` should look as follows.

```js
fcData: {
    methods: [
        [
            {
                receiverId: DAO_BOT_CONTRACT,
                methodName: "new_proposal",
                args: JSON.stringify({
                    dao_contract: DAO_CONTRACT,
                    proposal: {
                        description: "Add New Member",
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


### Final Drop Structure

Putting it all together, the final drop structure should look something like this:

```js reference
https://github.com/keypom/keypom-js/blob/50de06cab595a73ba043c352398b7f2d30d2d837/docs-advanced-tutorials/dao-onboarding/pre-security/createDaoDrop.js#L46-L77
```

---

## Creating Ticket Links
The last step in this process is to create the links themselves so that you can easily regiter people into you DAO. You can control the format of the URL, for this case `https://testnet.mynearwallet.com/linkdrop/` will be used.

You can utilize the `formatLinkdropUrl` function for convenience. It can take a custom URL that contains `CONTRACT_ID` and `SECRET_KEY` and it will replace them with the contract ID and secret keys passed in.

```js reference
https://github.com/keypom/keypom-js/blob/50de06cab595a73ba043c352398b7f2d30d2d837/docs-advanced-tutorials/dao-onboarding/pre-security/createDaoDrop.js#L80-L85
```

---

## Final Code

Putting everything together, the final code for the drop should be:

```js reference
https://github.com/keypom/keypom-js/blob/50de06cab595a73ba043c352398b7f2d30d2d837/docs-advanced-tutorials/dao-onboarding/pre-security/createDaoDrop.js#L1-L101
```


## Conclusion

So far, you've broken down the DAO auto-registration tool into functional requirements and used them to write a script to create the drop.

In the next tutorial, you'll be creating the DAO bot that the FC drop you just created will be interacting with. 


