---
sidebar_label: 'Introduction'
---
# Introduction
In this tutorial, you'll learn how to create a seamless DAO registration experience that allows you to onboard anyone directly into your DAO with the click of a link!

---

## Background
DAOs are a popular topic in crypto and offer powerful on-chain governance features. They work very well in most cases but there are 2 key issues that Keypom will solve.

1. There is a **high barrier to entry** for an everyday user who might not have a crypto wallet.
2. Being enrolled into the DAO is a **2 step process**. First, a proposal must be made and then it needs to be approved by an existing quorum of voting members.

Both of these act as bottlenecks in attracting and onboarding new members.

This is where Keypom can help. Using a [function call drop](../../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/fc-drops.md), Keypom automatically registers users into your DAO as part of the wallet creation process. Not only does this eliminate the need for a wallet, but it also bypasses the 2 step approval process. 

> **NOTE** If someone has a wallet already, they can skip the creation process and simply be registered into the DAO.


## Requirements

This tutorial will cover the following requirements to achieve a seamless onboarding experience for new users.

- Members don't need an existing wallet to join the DAO. 
- The invitations do not require a 2 step process where a council votes and reaches a quorum for every single registration.
- The drop cannot be used for malicious purposes.

With these requirements met, you will be able to seamlessly and automatically register new members into your DAO while maintaining the integrity of your DAO's members.

In this tutorial, you'll learn how to create this seamless DAO onboarding.

:::info
This tutorial will be interacting with MoonDAO, a [Sputnik V2](https://github.com/near-daos/sputnik-dao-contract) DAO

<p align="center"> <img src={require("/static/img/docs/advanced-tutorials/dao-auto-reg/moondaohomepage.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/></p>
:::

---

## Prerequisites

For the this tutorial, you can choose to run the scripts on your own machine. To do so, you must have the following:

1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
3. [Keypom JS SDK](https://github.com/keypom/keypom-js#installation)

If you want to reference the finished code, that can be found [here](https://github.com/keypom/keypom-js/tree/min/dao). To follow along and build out this auto-registration tool, see the steps below. 

---

## Creating your Project
In this section, you'll prepare to create the auto-registration tool using the skeleton code made available to you at the [Keypom SDK repo](https://github.com/keypom/keypom-js). 

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
/dao-onboarding-skeleton
└── configurations.js
└── createDaoOnboarding.js
└── package.json
```

With this setup complete, you are ready to begin building out this DAO auto-registration tool, starting by breaking down the problem into its functional requirements. 