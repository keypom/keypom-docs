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
* An NFT is minted on-demand for each user that attends the event.
* Users can optionally onboard onto NEAR if they don't have a wallet.

These features allow for an entirely new class of non-technical attendees and create a smoother experience than traditional NFT ticketing;

In this tutorial, you'll be creating that ticketing system, and incorporating a POAP as well to further reward your community members that come out to your events. 

## Prerequisites
For the advanced tutorials, you can choose to run the scripts on your own machine. To do so, you must have the following:

1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [NEAR-API-JS](https://docs.near.org/tools/near-api-js/quick-reference#install)  
3. [Keypom JS SDK](https://github.com/keypom/keypom-js#installation)

### Creating your Project
In this section, you're going to create your project and install the SDK to prepare for the tutorial. If you have a completed script and have installed the SDK, you can skip [forward](introduction#background).

First, you need to give your project a home. This can be done with `create-react-app`.

```bash
npx create-react-app my-keypom-ticketing-project && cd my-ticketing-keypom-project
```

Next, you will need to install the Keypom JS SDK, the QR code generator and QR code reader using the following.

```bash
npm install keypom-js
npm install qrcode.react
npm install react-zxing
```

Lastly, you can create the following folders and files.
```bash
mkdir state && mv App.js state/App.js
mkdir components && mkdir utils
touch utils/configurations.js && touch state/keyInfo.js && touch components/scanner.js && touch components/qrcode.js && touch utils/createTickDrop.js
```

With these steps complete, your project folder should look like this. 

```bash
/my-keypom-ticketing-project
├── public
│   └── ...
├── src
│   └── components
│   │    └── scanner.js
│   │    └── qrcode.js
│   └── state
│   │    └── App.js
│   │    └── keyInfo.js
│   └── utils
│   │    └── configurations.js
│   │    └── createTickDrop.js
├── node_modules
│   └── keypom-js
│   └── qrcode.react
│   └── react-zxing
│   └── ...
├── package.json
├── package-lock.json
```

### Hiccups
When creating this tutorial, there were a few issues that were present with `create-react-app`. Here are the items added manually to address them.

For reference, these fixes were done February 2023. 
<details>
<summary>Bug fixes</summary>
<p>

#### Browserify `crypto` and `stream` inside of `package.json`
Inside of `package.json`, the following were added to the `dependencies`
```bash
"dependencies": {
    "crypto": "npm:crypto-browserify",
    "crypto-browserify": "^3.12.0",
    "stream": "npm:stream-browserify",
  },
```

#### Issues with `Buffer` library and Webpack v5
To solve issues with `Buffer` compatibility with Webpack5, the following steps were done.

First was to install `buffer`
```bash
npm install buffer
```
:::info
note that NPM libraries are case sensative. `Buffer` and `buffer` are two different libraries
:::

Next, the following was added to `index.js`
```js
import { Buffer } from "buffer"; global.Buffer = Buffer;
```

#### Webpack configurations
The following was added to `node_modules/react-scripts/config/webpack.config.js`
```js
fallback: { 
  "crypto": require.resolve("crypto-browserify"), 
  "fs": false,
  "path": false
},,
```
This was done according to [this error](https://www.mongodb.com/community/forums/t/cant-resolve-crypto-in-node-modules-bson-dist-react/143227/2)


</p>
</details>








