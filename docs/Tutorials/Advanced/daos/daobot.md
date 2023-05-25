---
sidebar_label: 'Designing the DAO Bot'
---
# The DAO Bot

## Introduction
In this section you'll be creating the middleman DAO bot contract in order to securely facilitate auto-registration into your DAO. This bot will be tailored according to the functionality and specifications found in the [Solution Architecture](architecture.md#keypom-solution).

## Designing the DAO Bot

[Recall](TODO) that the DAO bot needs accomplish the following:

1. Take in a proposal object for adding a new member to a DAO (which includes the account ID of the new member).
2. Take in a desired DAO contract and call `add_proposal` with the proposal object.
3. Parse the return value which should be the proposal ID and then call `act_proposal` to automatically register the new member into the DAO.

With this in mind, the aim of this tutorial will be to write a Rust smart contract that will match the above properties. This process can be broken down into two stages:
1. Adding the proposal
2. Approving the proposal

> If you wish to simply use the DAO bot without modifying it, you can move ahead to the [Final Product](./final.md) page.

### Accessing the Code

For this section of the tutorial, you will need to clone a separate [DAO bot repository](https://github.com/keypom/dao-bot/tree/main). From there you can navigate to the skeleton code folder found below. 

```bash
git clone https://github.com/keypom/dao-bot.git && cd src-skeleton
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

---

## Adding the Proposal

Since the middleman contracts needs to call `add_proposal` on the DAO contract, this requires the use of cross-contract calls. For a refresher on making cross contract calls, see [NEAR docs](https://docs.near.org/develop/contracts/crosscontract#snippet-sending-information).

The first thing that needs to be checked is that the attached deposit is enough to cover the add proposal cost and Keypom is the predecessor to the call. Once that's done, the DAO bot can make a cross contract call to the dao contract and call `add_proposal`, passing in the proposal object.

When the `add_proposal` function finishes executing, the DAO bot can then invoke a callback method to parse the returned proposal ID and call `act_proposal`.

TODO: fix reference

```rust reference
https://github.com/keypom/dao-bot/blob/2c3a7bac8b18e1134483f0736e2ca9e2152f8509/src-v1/lib.rs#L103-L147
```

## Approving the Proposal

In the callback after the proposal has been added, the DAO bot will first check the success of the call and then parse the return value for the proposal ID.

Using the proposal ID, the DAO bot can then make another cross contract call to the DAO contract and call `act_proposal` to approve the proposal.

:::note Recall
The DAO bot has been added to the DAO in its own role. This means that when the DAO bot votes to approve, it automatically reaches a quorum and passes the proposal
:::

TODO: add code reference

---

## Final Code

Putting everything together, the final code for the DAO bot smart contract should be:

TODO: update reference
```js reference
https://github.com/keypom/dao-bot/blob/2c3a7bac8b18e1134483f0736e2ca9e2152f8509/src-v1/lib.rs#L1-L157
```

TODO: add a section about security and how we'll talk about that in the next section

## Conclusion
TODO: add to conclusion with hyperlinks and expand on what we talked about (add proposal, act proposal etc.)
In this tutorial, you've created the all new DAO bot by analyzing the requirements given the expected high thoroughput. 

In the next tutorial, you'll be testing the DAO bot, finding it's vulnerabilities and further improving it. 


