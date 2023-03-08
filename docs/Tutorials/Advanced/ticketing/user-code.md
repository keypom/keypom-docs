---
sidebar_label: 'User App Code'
---
# User App Code

## Introduction
In the previous section, you broken down the flow and logic of the two React apps: the ticket and the scanner. You also learned what Keypom information is needed in order to facilitate the app flow. 

In this tutorial, you'll learn about the actual code needed to create the user app for your seamless ticketing system.

:::note
The focus of this section will be on the Keypm aspects of each script, such as getting key information and using it. 

The full code for each script will be shown, with highlights. For React resources, see [here](https://reactjs.org/docs/hello-world.html) as a starting point.
:::

Recall, from [the beginning](introduction.md) that your code had the following outline.

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

This tutorial will be covering the code in `app.js`, `keyInfo.js`, and `qrcode.js`.

---

## User App - `App.js`
### Setting Up
The primary purpose of `app.js` is to display the different states of the user app. This will involve getting the current key uses, and then rendering based on the value returned. 

The first step is to initialize a connection to NEAR and setup all the needed state variable, which will be needed to render the page. 

```jsx reference showLineNumbers
https://github.com/keypom/keypom-js/blob/0035852580c8ce848571d89f31ae47a3794414d6/docs-advanced-tutorials/ticket-app/frontend/state/App.js#L15-L59
```

When the page is loaded, the function `setup` is called and the URL is parsed for `contractId` and `privateKey`. These will be stored in their own respective state  variables (lines 40-45) for further use. Note that the URL is split by `/` and the index of `contractId` and `privateKey` are known. When adapting this code for your own app, you will need to change those index values accordingly.

Once all URL has been parsed and values stored, `connectNear` is called. This function handles the NEAR connection, as well as the Keypom connection and the linkdrop URL.

:::note 
When connecting to NEAR, a `BrowserLocalStorageKeyStore` is used rather than an `UnencryptedFileSystemKeyStore`. This will create a key store in the user's browser for future use. For more on key stores, see [here](https://docs.near.org/tools/near-api-js/quick-reference#key-store)
:::

With the NEAR connection established, your browser can now talk to the NEAR blockchain. The next step, is to call `initKeypom`. This initializes the SDK to allow for interactions with the Keypom smart contracts. Without it, none of the other SDK functions would work as expected. More info on the `initKeypom` function can be found [here](../../../keypom-sdk/modules#initkeypom).

After the Keypom initialization is complete, the SDK function `formatLinkdropUrl` can be used to create the linkdrop link to embed in the QR code. To use this function, it simply needs a base URL, as well as the `privateKey` to be used. The returned linkdrop link is set to the state variable `link` and will be used when rendering.

### Rendering

The process of rendering is simple: retrieve the key's current use number, and render the page differently based on the stages outlined in the [App Design](react-outline.md). 

During this process, the `QrCode` and `KeyInfo` components are called, passing in the values and state variables defined in the [set up](user-code.md#setting-up). For the time being, you can think of the `KeyInfo` component as just a black box, where a `privKey`, `curUse` and other state variables are passed in, and those state variables get modified to change what is rendered. `QRCode` uses the `qrcode.react` library to display a QR based on a string input.

```jsx reference showLineNumbers
https://github.com/keypom/keypom-js/blob/0035852580c8ce848571d89f31ae47a3794414d6/docs-advanced-tutorials/ticket-app/frontend/state/App.js#L61-L131
```

:::info 
Lines 2, 23, 40, and 55 hold conditions on the current key uses, `curUse`. These conditions control what is shown to the user.
:::

* **`curUse` is 1**: The user app should show a QR code representing the linkdrop link. The `QrCode` component is rendered by passing in the `link` state variable created earlier. 
* **`curUse` is 2**: The first claim was done by the bouncer, and thus should give the user the option to claim their POAP. This is done with the same linkdrop link. 
* **`curUse` is 0**: The second claim was used, and thus the key was depleted and deleted. Here, the user will be given resources to continue learning about NEAR.
* **`curUse` is 0 **and** splitRes[3] is '' or undefined**: `splitRes[3]` is 0 or undefined indicates it does not exist in the URL. This is to act as a landing page for your event, you can choose to show anything here. 

### Full Code
The full code, including the set up and the rendering, can be seen below.
<details>
<summary>Full app.js code</summary>
<p>

``` jsx reference
https://github.com/keypom/keypom-js/blob/0035852580c8ce848571d89f31ae47a3794414d6/docs-advanced-tutorials/ticket-app/frontend/state/App.js#L1-L136
```

</p>
</details>

--- 

## User App - `Qrcode.js`

`Qrcode.js` is a simple component that returns a QR code based on the string passed in. In the user app, this is the linkdrop link, for the doorman to scan. 

The full code can be seen below. 

```js reference
https://github.com/keypom/keypom-js/blob/0035852580c8ce848571d89f31ae47a3794414d6/docs-advanced-tutorials/ticket-app/frontend/components/qrcode.js#L1-L22
```

--- 

## User App - `Keyinfo.js`

`Keyinfo.js` is responsible for updating Keypom related state variables, `pubKey`, and `curUse`. 

When `curUse` is 1 and the QR code is being rendered, its imparative to show the public key and key use, so the user has this information on hand in case the QR code becomes unreadable. 

A NEAR connection is initialized, similar to the [`App.js` setup](user-code.md#setting-up). However, this time around, its done on app mount by using a React `useEffect` hook. Once the connection is initialized, another `useEffect` hook is used to update the needed Keypom state variables.

To do this, two SDK functions are used: `getPubFromSecret` to get the public key and `getKeyInformation` to get the current key use. This can be seen below. 

```js reference
https://github.com/keypom/keypom-js/blob/96827e6a585a469cc8693dd0dfaf37de312958a2/docs-advanced-tutorials/ticket-app/frontend/state/keyInfo.js#L1-L66
```


