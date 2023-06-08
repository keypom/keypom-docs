---
sidebar_label: 'Claiming Behavior'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Usage Configurations
This part of the cookbook contains everything related to claiming behavior and usage configurations. These will range from permissions for different types of claims, to automatically deleting the drop once all the keys have been used. 
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)


:::info note
These scripts will not run without the proper setup shown in the [introduction page](../../welcome.md#connection-to-near-and-initializing-the-sdk).
:::

## Only New Accounts can Claim
Using `permissions` in the `usage` config, you can specify whether an account can call `claim`, `create_account_and_claim` or both. Here, the claimer must create a new account as they may only call `create_account_and_claim`. 

If no `permissions` are specified, the claimer can use either function.

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
const { keys } = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    depositPerUseNEAR: "1",
    config: {
        usage:{
            permissions: `create_account_and_claim`
        }
    }
});

console.log(keys)
```

</TabItem>

</Tabs>

___

## Only Existing Accounts can Claim
Using `permissions` in the `usage` config, you can specify whether an account can call `claim`, `create_account_and_claim` or both. Here, the claimer must have an existing account as they may only call `claim`. 

If no `permissions` are specified, the claimer can use either function.

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
const { keys } = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    depositPerUseNEAR: "1",
    config: {
        usage:{
            permissions: `claim`
        }
    }
});

console.log(keys)
```

</TabItem>

</Tabs>

___
## Refunding Deposit when `Claim` is Called
When creating keys for your drop, each is loaded with enough $NEAR to cover the cost of creating an account for each claim. If a user claims with an existing account, this deposit is lost and transferred to the user. If you wish to retain those deposits whenever `claim` is called instead of `create_account_and_claim`, you can use the following. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
const { keys } = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    depositPerUseNEAR: "1",
    config: {
        usage:{
            refundDeposit: true
        }
    }
});

console.log(keys)
```

</TabItem>

</Tabs>

___

## Automatically Deleting Drop when Empty
By default, depleted drops are not deleted unless you manually delete them. To delete them automatically, include the following. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
const { keys } = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    depositPerUseNEAR: "1",
    config: {
        usage:{
            autoDeleteDrop: true
        }
    }
});

console.log(keys)
```

</TabItem>

</Tabs>

___

## Automatically Withdrawing your Balance
By default, withdrawing your Keypom balance back into your wallet is only done when call `withdrawBalance`. If you wish to withdraw it once all your drops have been depleted, you can turn on `autoDeleteDrop` and `autoWithdraw`.  

This will ensure that once this drop is empty it is automatically deleted and, assuming it is the final drop on your account, will automatically withdraw your Keypom balance.

:::note
This will only automatically withdraw your balance if and only if the last drop you have. If you empty a this drop but it is not the last drop on your account, you will need to manually withdraw your balance. 
:::

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
const { keys } = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    depositPerUseNEAR: "1",
    config: {
        usage:{
            autoDeleteDrop: true,
            autoWithdraw: true
        }
    }
});

console.log(keys)
```

</TabItem>

</Tabs>

___

## Gatekeeping Account Creation
When accounts are created with drops using a custom [`dropRoot`](dropConfig.md#using-a-custom-drop-root), they will be subaccounts of the `dropRoot`.

If you wish to make these subaccounts exclusive, you can gatekeep this process by using `accountCreationFields` to check if the claiming account is coming from your drop. Note that the `dropRoot` account would need to expose a `create_account` function that looks similar to the following:

```rust
#[payable]
pub fn create_account(&mut self, new_account_id: AccountId, new_public_key: PublicKey, funder: String, keypomArgs: keypom_args) -> Promise {
        assert!(keypomArgs.funderIdField == "funder_id","Call must come from valid Keypom drop");
        assert!(funder == EXPECTED_FUNDER == "funder_id","Funder must be approved");
        ...
}
```

The following shows a drop where users can only claim with a new account, and only those using your drop can create subaccounts of `moonpom.near`

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
// Creating FC drop that injects accountId into function call arguments
let {keys, dropId} = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    config: {
        usage:{
            permissions: `create_account_and_claim`,
            accountCreationFields: {
                funderIdField: "funder_id"
            }
        },
        dropRoot: "mint-brigade.testnet"
    },
    depositPerUseNEAR: "1",
})

console.log(keys)
```

</TabItem>

</Tabs>

For more info on injected `keypom_args`, see the [`keypom_args`](../fc.md#using-and-verifying-injected-keypom-arguments) section. 


___
