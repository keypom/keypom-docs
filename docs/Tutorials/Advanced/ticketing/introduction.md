---
sidebar_label: 'Introduction'
---
# Introduction
In this tutorial, you'll learn how to create a ticketing experience that is both able to handle large audiences and creates a seamless admission and onboarding experience for your community. 
## Background
NFT ticketing is very common in the Web3 space and is an excellent way to engage your attendees and draw a larger audience. However, it currently requires the attendees to have an existing wallet. This is a massive barrier to entry, particularly to non-Web3-natives. 

Keypom aims to solve these problems by empowering you to create a seamless ticketing system that has the following features.

* No wallet is needed to enter the event or receive a Proof-of-Attendence NFT, commonly known as a [POAP](https://academy.binance.com/en/glossary/proof-of-attendance-protocol-poap).
* Each ticket is unique and once you've entered the event, the ticket cannot be sent to another person to gain them access
* Attendees are not required to have wifi at the door.
* Users that choose to onboard will receive a Proof-of-Attendence NFT.
* The post-attendance gifts can **only** be given to people that physically showed up to the event. You can't receive the NFT if you didn't show up.

These features open the door to an entirely new class of non-technical attendees and create a smoother experience compared to existing NFT ticketing solutions.

In this tutorial, you'll be creating a ticketing system with those features, and incorporating a POAP to further reward your community members that come out to your events. 

:::info note
The NFT POAP is optional to include as the event organizer. You can choose to keep it, or replace it with a different attendance gift such as $NEAR.
:::

---

## Prerequisites

For the advanced tutorials, you can choose to run the scripts on your own machine. To do so, you must have the following:

1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [NEAR-API-JS](https://docs.near.org/tools/near-api-js/quick-reference#install)  
3. [Keypom JS SDK](https://github.com/keypom/keypom-js#installation)

If you want to reference the finished code, that can be found [here](https://github.com/keypom/keypom-js/tree/min/ticketing-tutorial/docs-advanced-tutorials/ticket-app). To follow along and build out this ticketing app, see the steps below. 

---

## Creating your Project
In this section, you'll prepare to create the ticketing app using the skeleton code made available to you at the [Keypom SDK repo](https://github.com/keypom/keypom-js). 

Once youve cloned the repo, you can navigate to `docs-advanced-tutorials/ticket-app-skeleton`. Here you'll find the following files.

```bash
/ticket-app-skeleton
├── contract
│   └── ...
├── frontend
│   └── components
│   │    └── scanner.js
│   │    └── qrcode.js
│   └── state
│   │    └── App.js
│   │    └── keyInfo.js
│   └── utils
│   │    └── configurations.js
│   │    └── createTickDrop.js
│   └── node_modules
│   │    └── keypom-js
│   │    └── qrcode.react
│   │    └── react-zxing
│   │    └── react
│   │    └── react-dom
│   │    └── react-router-dom
│   │    └── ...
│   └── package.json
│   └── package-lock.json
├── ...
├── package.json
├── package-lock.json
```

With this setup complete, you are ready to begin building out the ticket app, starting by breaking down the problem into its functional requirements. 






