---
sidebar_label: 'Introduction'
---
# Introduction
In this tutorial, you'll learn how to create an unparalleled ticketing experience. You'll be able to garner a large audience for your events by creating a seamless admission and onboarding experience for your community. 
## Background
NFT ticketing is very common in the Web3 space and is an excellent way to engage your attendees and draw a larger audience. However, they currently require the attendees to have an existing wallet. This is a massive barrier to entry and limits the event to a more technical crowd. 

Keypom aims to solve these problems by allwoing for a ticketing system that has the following features.

* No wallet is needed to enter the event or receive a POAP.
* No wifi is needed at the door.
* Users can optionally onboard onto NEAR if they don't have a wallet.
* Users that choose to onboard can receive a Proof-of-Attendence NFT, although this is optional

These features allow for an entirely new class of non-technical attendees and create a smoother experience than traditional NFT ticketing;

In this tutorial, you'll be creating that ticketing system, and incorporating a POAP as well to further reward your community members that come out to your events. 

## Prerequisites

For the advanced tutorials, you can choose to run the scripts on your own machine. To do so, you must have the following:

1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [NEAR-API-JS](https://docs.near.org/tools/near-api-js/quick-reference#install)  
3. [Keypom JS SDK](https://github.com/keypom/keypom-js#installation)

### Creating your Project
In this section, you're going to create your project and install the SDK to prepare for the tutorial. If you have a completed script and have installed the SDK, you can skip [forward](introduction#background).

First, navigate to your desired home folder and use the `create-near-app` command to create a new project
``` bash
npx create-near-app my-ticket-app
```
:::note
You may realize that there is a `contract` and `frontend` folder. The `create-near-app` framework is supposed to allow you to build out a NEAR smart contract and quickly hook it up with a frontend. This tutorial will not involve writting any smart contracts, so the `contract` folder can just be ignored for now. 
:::

You'll then need to create a `package.json` inside the `frontend` folder.

``` bash
cd frontend && npm init
```

Then, you can install the following libraries, including the Keypom JS SDK.

``` bash
npm install keypom-js && npm install react && npm install react-dom && npm install react-router-dom &&
npm install qrcode.react && npm install react-zxing && npm install web-vitals
```

Next, you'll want to navigate to `my-ticket-app/package.json` and make the following replacement

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






