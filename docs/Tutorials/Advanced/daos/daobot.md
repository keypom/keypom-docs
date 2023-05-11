---
sidebar_label: 'The DAO Bot'
---
# The DAO Bot

## Introduction
In this section you'll be creating the DAO bot in order to securely facilitate auto-registration into your DAO. This bot will be tailored according to the functionality and specifications found in the [Solution Architecture](architecture.md#keypom-solution).

Recall that the DAO bot needs the following properties:

* It must make multiple cross contract calls to the DAO in succession: first to add the proposal, then to vote to approve the proposal.
* It must validate the `accountId` in the `AddMemberToRole` proposal was injected by Keypom.
* The DAO Bot **must** ensure all calls to it originate from Keypom.

With this in mind, the aim of this tutorial will be to write a Rust smart contract that will match the above properties. This process can be broken down into three stages:

1. Verification of function call and arguments  
2. Auto-registration  
3. View Functions and Configuration  

> If you wish to simply use the DAO bot without modifying it, you can move ahead to the [Final Product](./final.md) page. 

### Accessing the Code

For this section of the tutorial, you will need to clone a seperate [DAO bot repository](https://github.com/keypom/dao-bot/tree/main). From there you can navigate to the skeleton code folder found below. 

```bash
cd src-skeleton
```

This is the skeleton code and will allow you to follow along as the DAO bot is built out. If you wish to examine the completed version, that can be found in the `src` folder.

In the expandable section below, you can see the skeleton code from the file `lib.rs`.

<details>
<summary>DAO Bot Skeleton Code</summary>
<p>

```rust reference
https://github.com/keypom/dao-bot/blob/2c3a7bac8b18e1134483f0736e2ca9e2152f8509/src-skeleton/lib.rs#L1-L123
```

</p>
</details>


You may notice a few structs and enums predefined; these are simply present to match the structures from the [SputnikV2 contract](https://github.com/near-daos/sputnik-dao-contract/tree/main/sputnikdao2/src) and allow the contract to work with proposal inputs. 


### Contract Structure and Security
As the DAO bot contract is meant to be used by many people, security is a high priority. In order to limit the amount of potential exploits, the contract will be simplistic and linear, with only one point of entry for incoming function calls. 

This can be seen in the skeleton code, with `new_auto_registration` being the only public method, aside from the view method `view_keypom_contract`.

---

## Verification of Function Call and Arguments
Validating the function call and arguments that are received is a crucial step in developing contracts to interface with Keypom. This ensures the legitamacy of the incoming function calls and significantly reduces the likelyhood of your contract being taken advantage of. 

To validate that the function call came from Keypom, a quick check on the predecessor `accountId` can be done. This should be equal to the latest version of the Keypom, in this case V2, stored in the state variable [`keypom_contract`](./daobot.md#view-functions-and-configuration). 

In order to ensure that account claiming the FC key is the user being auto-registered into the DAO, you can check the `keypom_args`. Recall from the last section, the claiming account's `accountId` was being injected by setting `accountIdField` to `proposal.kind.AddMemberToRole.member_id`. You can leverage this by checking if the received `keypom_args` reflect this. 

All this will be placed in the first and only point of entry into the contract, and will immiately fail if any of the requirements are not met. Putting these two together, the resultant checks can be seen below:

``` rust
require!(env::predecessor_account_id() == AccountId::try_from(self.keypom_contract.clone()).unwrap(), "KEYPOM MUST BE PREDECESSOR, CHECK REQUIRED VERSION USING view_keypom_contract");
require!(keypom_args.account_id_field == Some("proposal.kind.AddMemberToRole.member_id".to_string()), "KEYPOM MUST SEND THESE ARGS");
```

:::info
Since Keypom will reject any FC drops that attempt to hardcode the `keypom_args`, you know with 100% certainty that the arguments injected using `keypom_args` are legitamate. This allows you to simply compare the different fields of Keypom args to what's expected
:::

---

## Auto-Registration
The core part of the DAO bot are the cross contract calls needed to facilitate the auto-registration. For a refresher on making cross contract calls, see [[NEAR docs](https://docs.near.org/develop/contracts/crosscontract)]

:::note Recall
The DAO bot has been added to the DAO in its own role. This was, when the DAO bot votes to approve, it automatically reaches a quorum and passes the proposal
:::

In order to complete the auto-registration, two consecutive cross contract calls must be made.
1. `add_proposal` - This will add the `AddMemberToRole` proposal to the DAO  
2. `act_proposal` - Here, the DAO bot will vote to approve it's own newly added proposal.

For additional information on the `add_proposal` and `act_proposal` function, see the [SputnikV2 Readme](https://github.com/near-daos/sputnik-dao-contract/blob/main/README.md)

In order for `act_proposal` to be succesfully called, a `proposal_id` is needed. This is a unique identifier for the proposal that was just added, and is returned by the `add_proposal` function. Thus, the callback needs to receive and read the promise from the first function. 

During this callback, the vote to approve the proposal is hardcoded to eliminate ambiguity in the DAO bot's functionality. 

The code for this is shown below:

```rust reference
https://github.com/keypom/dao-bot/blob/2c3a7bac8b18e1134483f0736e2ca9e2152f8509/src-v1/lib.rs#L103-L147
```


There are a few things to note here. 
1. The additional `require!` in `new_auto_registration` ensures that the function call has attached enough $NEAR to cover the Sputnik [proposal bond](https://github.com/near-daos/sputnik-dao-contract#add-proposal). Documentation lists this as 1 $NEAR but the contracts deployed on testnet require just 0.1 $NEAR.  
2. Any DAO can be used, by simply passing in the `dao_contract`
3. The callback function is private, ensuring incoming funciton calls cannot exploit it to auto-approve malicious proposals.

---

## View and Setter Functions
The last step in creating this DAO bot smart contract is adding a view and setter function for the `keypom_contract` state variable. For the purposes of security, only the DAO bot can change this state variable. 

```rust reference
https://github.com/keypom/dao-bot/blob/2c3a7bac8b18e1134483f0736e2ca9e2152f8509/src-v1/lib.rs#L149-L156
```

The `keypom_contract` state variable is used instead of a hardcoded variable just to ensure the DAO bot contract can be updated as the Keypom protocol progresses into newer versions. 

---

## Final Code

Putting everything together, the final code for the drop should be:

```js reference
https://github.com/keypom/dao-bot/blob/2c3a7bac8b18e1134483f0736e2ca9e2152f8509/src-v1/lib.rs#L1-L157
```


## Conclusion
In this tutorial, you've created the all new DAO bot by analyzing the requirements given the expected high thoroughput. 

In the next tutorial, you'll be testing the DAO bot, finding it's vulnerabilities and further improving it. 


