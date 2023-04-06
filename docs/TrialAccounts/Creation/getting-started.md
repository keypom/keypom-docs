---
sidebar_label: 'Before You Begin'
---
# Introduction
In the following tutorials, you'll learn how Trial Accounts work behind the scenes and how to create a basic drop that can be used to instantly sign a user into the guest-book app. You'll also learn about the underlying flow for the official Keypom wallet selector plugin and how it's used to create instant sign-in experiences for users.

---

## Prerequisites

In order to successfully complete the tutorials, you'll need to have the following:

1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#installation)

---

## Creating your Project
In this section, you'll prepare to create the ticketing app using the skeleton code made available to you at the [Keypom SDK repo](https://github.com/keypom/keypom-js). 

First, you'll want to clone the repo:

```bash
git clone https://github.com/keypom/keypom-js.git && cd keypom-js
```

Second, install the dependencies for both the SDK and ticketing app skeleton code:

```
yarn install && cd docs-advanced-tutorials/ticket-app-skeleton && yarn
```

At this point, all the dependencies should be installed and you should be in the `docs-advanced-tutorials/ticket-app-skeleton` folder. Here you'll find the following files required to build out your app.

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






