---
sidebar_label: 'Introduction'
---
# Introduction
In this tutorial, you'll learn how to create a seamless DAO registration experience that allows you to easily onboard crypto natives and non-natives into your DAO with just a single Keypom drop!

## Background
DAOs are a raging topic in crypto and offer a vast suite versatile on-chain governance features. The problem arises with the barrier to entry for users that aren’t familiar with the specific chain they’re built on top of. Users might be very knowledgable in the DAO’s topics but 

1. They might not have wallets or understand how to interact with smart contracts.
2. To become a DAO member and contribute to the community, they need to submit an [`AddMemberToRole`](https://github.com/near-daos/sputnik-dao-contract#proposal-types) proposal that needs to be approved by an existing quorum of voting members.

Both of these act as bottlenecks in attracting new members and getting them up to speed.

Using Keypom, you can create a function call drop with the goal of automatically registering users into a DAO. For people that have a wallet, this will act as an easy way of registering them with the click of a link. For users that don’t have a wallet and are unfamiliar with NEAR, they can be onboarded and registered into the DAO with the same click of a link. This solution should have the following requirements:

- Prospective members don't need an existing wallet to join the DAO. 
- Each invitation is unique, single use, and can only be used by one person.
- The invitations do not require council to vote and reach a quorum to approve the registrations. 
- The drop is exclusive to your DAO and cannot be used or replicated for malicious purposes.

With these requirements met, you will be able to seamlessly register new members into your DAO while maintaining the integrity of your DAO's members.

In this tutorial, you'll learn how to create this seamless DAO onboarding.

:::info
This tutorial will be interacting with MoonDAO, a [Sputnik V2](https://github.com/near-daos/sputnik-dao-contract) DAO

<p align="center"> <img src={require("/static/img/docs/advanced-tutorials/dao-auto-reg/moondaohomepage.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/></p>
:::

---

## Prerequisites

For the this tutorial, you can choose to run the scripts on your own machine. To do so, you must have the following:

1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [NEAR-API-JS](https://docs.near.org/tools/near-api-js/quick-reference#install)  
3. [Keypom JS SDK](https://github.com/keypom/keypom-js#installation)

If you want to reference the finished code, that can be found [here](https://github.com/keypom/keypom-js/tree/min/dao). To follow along and build out this ticketing app, see the steps below. 

---

## Creating your Project
In this section, you'll prepare to create the DAO auto-registration tool using the skeleton code made available to you at the [Keypom SDK repo](https://github.com/keypom/keypom-js). 

First, you'll want to clone the repo:

```bash
git clone https://github.com/keypom/keypom-js.git && cd keypom-js 
```

Second, install the dependencies for both the SDK and DAO auto-registration skeleton code:

```
yarn install && cd docs-advanced-tutorials/dao-onboarding-skeleton && yarn
```

At this point, all the dependencies should be installed and you should be in the `docs-advanced-tutorials/dao-onboarding-skeleton` folder. Here you'll find the following files required to build out your app.

```bash
/ticket-app-skeleton
└── configurations.js
└── createDaoOnboarding.js
└── package.json
```

With this setup complete, you are ready to begin building out this DAO auto-registration tool, starting by breaking down the problem into its functional requirements. 