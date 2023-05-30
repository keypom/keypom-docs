---
sidebar_label: 'Introduction'
---
# Introduction
In this tutorial, you'll learn how to create a seamless ticketing experience that is cheaper than alternative methods and can also handle very large audiences.
## Background
The most popular ticketing solutions in Web3 utilize NFT technologies. This approach, however, requires attendees to own a crypto wallet and sign transactions. This is a massive barrier to entry, particularly for users that are new to Web3. 

Keypom aims to solve these problems by empowering you to create a seamless ticketing system that has the following features.

* Users are not required to have a wallet to enter the event.
* Each ticket is unique and can only be used by one person.
* Attendees are not required to have wifi to gain entry to the event.
* Attendees that did not have a NEAR wallet can get one for free.
* Attendees can choose to receive an NFT proving their attendance at the event. This is commonly known as a [POAP](https://academy.binance.com/en/glossary/proof-of-attendance-protocol-poap). 
* The post-attendance gifts can **only** be given to people that physically showed up to the event. You can't receive the NFT if you didn't show up.

These features open the door to an entirely new class of non-technical attendees and create a smoother experience compared to existing NFT ticketing solutions.

In this tutorial, you'll be creating a ticketing system with those features, and incorporating a POAP to further reward your community members that come out to your events. 

:::info note
The NFT POAP is optional to include as the event organizer. You can choose to keep it, or replace it with a different attendance gift such as Fungible Tokens.
:::

---

## Prerequisites

For the this tutorial, you can choose to run the scripts on your own machine. To do so, you must have the following:

1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [NEAR-API-JS](https://docs.near.org/tools/near-api-js/quick-reference#install)  
3. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)

If you want to reference the finished code, that can be found [here](https://github.com/keypom/keypom-js/tree/min/ticketing-tutorial/docs-advanced-tutorials/ticket-app). To follow along and build out this ticketing app, see the steps below. 

---

## Creating your Project
In this section, you'll prepare to create the ticketing app using the skeleton code made available to you at the [Keypom Docs Examples](https://github.com/keypom/keypom-docs-examples) repo. 

First, you'll want to clone the repo:

```bash
git clone https://github.com/keypom/keypom-docs-examples.git && cd keypom-docs-examples
```

Second, install all dependencies for the ticketing app skeleton code using the following:

```
yarn ticketing:init-skeleton && cd advanced-tutorials/ticket-app-skeleton
```

:::note
To install all dependencies for the completed ticketing app, run the following:
```
yarn ticketing:init-complete && cd advanced-tutorials/ticket-app
```
:::



At this point, all the dependencies should be installed and you should be in the `advanced-tutorials/ticket-app-skeleton` folder. Here you'll find the following files required to build out your app.

```bash
/ticket-app-skeleton
└── components
│    └── scanner.js
│    └── qrcode.js
└── state
│    └── App.js
│    └── keyInfo.js
└── utils
│    └── allowEntry.js
│    └── createTickDrop.js
│    └── testTickDrop.js
└── package.json
```

With this setup complete, you are ready to begin building out the ticket app, starting by breaking down the problem into its functional requirements. 






