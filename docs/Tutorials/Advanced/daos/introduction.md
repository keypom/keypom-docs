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

This is where Keypom can help. Using a [function call drop](../../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/fc-drops.md), Keypom can automatically register users into your DAO **as part of the wallet creation process**. Not only does this eliminate the need for a wallet, but it also bypasses the 2 step approval process.

> **NOTE** If someone has a wallet already, they can skip account creation and register their existing wallet into the DAO.


## Success Criteria

This tutorial will cover the following requirements to achieve a seamless onboarding experience for new users.

- Members don't need an existing wallet to join the DAO. 
- The invitations do not require a 2 step process where a council votes and reaches a quorum for every single registration.
- The drop cannot be used for malicious purposes.

With these requirements met, you will be able to seamlessly and automatically register new members into your DAO while maintaining the integrity of your DAO's members.

:::info
This tutorial will have members registered into the MoonDAO, a [Sputnik V2](https://github.com/near-daos/sputnik-dao-contract) compatible DAO. 

<p align="center"> <img src={require("/static/img/docs/advanced-tutorials/dao-auto-reg/moondaohomepage.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/></p>
:::

---

## Prerequisites

For the this tutorial series, you can choose to follow along on your own machine. To do so, you must have the following:

1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom Core SDK](https://github.com/keypom/keypom-js/tree/main/packages/core#installation)


> **NOTE** If you want to reference the finished tutorial code, it can be found [here](https://github.com/keypom/keypom-docs-examples/tree/main/advanced-tutorials/dao-onboarding).

---

## Creating your Project
In this section, you'll install the skeleton project and get familiar with the codebase.

First, you'll want to clone the repo:

```bash
git clone https://github.com/keypom/keypom-docs-examples.git && cd advanced-tutorials
```

Second, install all the dependencies

```
yarn install && cd advanced-tutorials/dao-onboarding-skeleton && yarn
```

At this point, all the dependencies should be installed and you should be in the `advanced-tutorials/dao-onboarding-skeleton` folder. Here you'll find the following files required to build out your app.

```bash
/dao-onboarding-skeleton
└── configurations.js
└── createDaoOnboarding.js
└── package.json
└── view-roles.js
```

With this setup complete, you are ready to begin building the onboarding experience, starting by expanding upon the success criteria and breaking down the problem further.