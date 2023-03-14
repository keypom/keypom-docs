---
sidebar_label: 'Introduction'
---
# Introduction
In this tutorial, you'll learn how to create an unparalleled ticketing experience. You'll be able to garner a large audience for your events by creating a seamless admission and onboarding experience for your community. 
## Background
NFT ticketing is very common in the Web3 space and is an excellent way to engage your attendees and draw a larger audience. However, it currently requires the attendees to have an existing wallet. This is a massive barrier to entry, particularly to non-Web3-natives. 

Keypom aims to solve these problems by empowering you to create a seamless ticketing system that has the following features.

* No wallet is needed to enter the event or receive a POAP.
* Each ticket is unique and once you've entered the event, the ticket cannot be sent to another person to gain them access
* No wifi is needed at the door.
* An optional NFT POAP can be minted on-demand for each user that attends the event.
* The post-attendance gifts can **only** be given to people that physically showed up to the event. You can't receive the NFT if you didn't show up.
* People that have attended the event can get setup with a NEAR wallet if they don't have one yet.

These features open the door to an entirely new class of non-technical attendees and create a smoother experience compared to existing NFT ticketing solutions.

In this tutorial, you'll be creating a ticketing system with those features, and incorporating a POAP to further reward your community members that come out to your events. 

:::info note
The NFT POAP is optional to include as the event organizer. You may omit it, or replace it with your own function call if you wish. In this tutorial, the POAP will be minted on the second key use. 
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
In this section, you're going to create your project and install the SDK to prepare for the tutorial. If you have a completed script and have installed the SDK, you can skip [forward](architecture.md).

First, navigate to your desired home folder and use the `create-near-app` command to create a new project.
``` bash
npx create-near-app my-ticket-app
```
:::note
You may realize that there is a `contract` and `frontend` folder. The `create-near-app` package allows you to build out a NEAR smart contract and quickly hook it up with a frontend. This tutorial will not involve writting any smart contracts, so the `contract` folder can be ignored. 
:::

You'll then need to create a `package.json` inside the `frontend` folder. You can accept all default values that NPM suggests.

``` bash
cd frontend && npm init
```

Then, you can install the following libraries, including the Keypom JS SDK.

``` bash
npm install keypom-js && npm install react && npm install react-dom && npm install react-router-dom &&
npm install qrcode.react && npm install react-zxing && npm install web-vitals
```

Next, you'll want to navigate to `my-ticket-app/package.json` and make the following replacement:

```json
"scripts": {
    ...
    // Replace this line
    "start": "npm run deploy && echo The app is starting! It will automatically open in your browser when ready && env-cmd -f ./neardev/dev-account.env parcel frontend/index.html --open",
    
    // With this
    "start": "cd frontend && npm run start",
    ...
  },
```

Then, go to the `my-ticket-app/frontend/package.json` and add the following:
``` json
"scripts": {
    "start": "parcel index.html --open",
    "build": "parcel build index.html --public-url ./"
  },
  "devDependencies": {
    "crypto-browserify": "^3.12.0",
    "stream-browserify": "^3.0.0"
  },
```

From there, create the files that will be used to build out the functionality of the ticket app. 

```bash
mkdir state && mv App.js state/App.js
mkdir components && mkdir utils
touch utils/configurations.js && touch state/keyInfo.js && touch components/scanner.js && touch components/qrcode.js && touch utils/createTickDrop.js
```

With these steps complete, your project folder should look like this. 

```bash
/my-ticket-app
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

Finally, there are a few folders/files you can copy from the [SDK Github](https://github.com/keypom/keypom-js/tree/min/ticketing-tutorial/docs-advanced-tutorials/ticket-app/frontend) to the `frontend` folder. These files primarily deal with styling and setup. 
* static/img
* App.css
* app.test.js
* index.css
* index.html
* index.js
* logo.svg
* reportWebVitals.js
* setupTests.js
* start.sh
* styles.css
* ui-components.js
* yarn.lock


With this setup complete, you are ready to begin building out the ticket app, starting by breaking down the problem into its functional requirements. 






