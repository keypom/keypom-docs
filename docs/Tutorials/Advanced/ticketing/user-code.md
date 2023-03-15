---
sidebar_label: 'Attendee Ticket Page Code'
---
# Attendee Ticket Page Code

## Introduction
In the previous section, you broke down the flow and logic of the ticket app. You also learned what Keypom information is needed in order to render the pages properly. 

In this tutorial, you'll learn about the actual code needed to create the attendee ticket page for your seamless ticketing system.

:::note
The focus of this section will be on the Keypom aspects of each script, such as getting key information and using it. 

The full code for each script will be shown, with highlights. For React resources, see [here](https://reactjs.org/docs/hello-world.html) as a starting point.
:::

Recall, from the [introduction](introduction.md) that your code had the following outline.

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

This tutorial will be covering the code in `app.js`, `KeyInfo.js`, and `qrcode.js`.

---

## `App.js`
### Setting Up
The primary purpose of `app.js` is to display the different states of the attendee ticket page. This will involve getting the current key uses, and then rendering based on the value returned. 

The first step is to initialize a connection to NEAR and setup all the state variables that will be needed to render the page. 

```jsx reference showLineNumbers
https://github.com/keypom/keypom-js/blob/0035852580c8ce848571d89f31ae47a3794414d6/docs-advanced-tutorials/ticket-app/frontend/state/App.js#L15-L59
```

When the page is loaded, the function `setup` is called and the URL is parsed for `contractId` and `privateKey`. These will be stored in their own respective state  variables (lines 40-45) for further use. Note that the URL is split by `/` and the index of `contractId` and `privateKey` are known. When adapting this code for your own app, you may need to change those index values accordingly.

Once the URL has been parsed and the resulting values stored, `connectNear` is called. This function handles the NEAR connection, as well as the Keypom connection and the linkdrop URL.

:::note 
When connecting to NEAR, a `BrowserLocalStorageKeyStore` is used rather than an `UnencryptedFileSystemKeyStore`. This will create a key store in the user's browser for future use. For more on key stores, see [here](https://docs.near.org/tools/near-api-js/quick-reference#key-store)
:::

With the NEAR connection established, your browser can now talk to the NEAR blockchain. The next step, is to call `initKeypom`. This initializes the SDK to allow for interactions with the Keypom smart contracts. Without it, none of the other SDK functions would work as expected. More info on the `initKeypom` function can be found [here](../../../keypom-sdk/modules#initkeypom).

After the Keypom initialization is complete, the SDK function [`formatLinkdropUrl`](../../../keypom-sdk/modules.md#formatlinkdropurl) can be used to create the linkdrop link to embed in the QR code. To use this function, it simply needs a base URL, as well as the `privateKey` to be used. The returned linkdrop link is set to the state variable `link` and will be used to render the QR code.

### Rendering

The process of rendering is simple: retrieve the key's current use number, and render the page differently based on the stages outlined in the [App Design](react-outline.md). 

The information is passed into both a QR code component and a KeyInfo component. For the time being, you can think of the `KeyInfo` component as just a black box, where a `privKey`, `curUse` and other state variables are passed in, and those state variables get modified to change what is rendered. `QRCode` uses the `qrcode.react` library to display a QR code based on a string input.

The following table outlines what the page should render based on a set of conditions including the current key use. 

|    **Condition and Description**                                                                                                                                                                                                      | **Render**                                                                                                                                                                              |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`curUse` is 1**: The attendee ticket page should show a QR code representing the ticket data (contract and secret key). The `QrCode` component is rendered by passing in the `link` state variable created earlier.                 | <p align="center"> <img src={require("/static/img/docs/advanced-tutorials/ticketing/claim-1.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/></p>       |
| **`curUse` is 2**: The first claim was done by the host, and thus should give the user the option to claim their POAP. This is done with the same linkdrop link.                                                                      | <p align="center"><img src={require("/static/img/docs/advanced-tutorials/ticketing/claim-2.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/></p>        |
| **`curUse` is 0**: The second claim was used, and thus the key was depleted and deleted. Here, the user will be given resources to continue learning about NEAR. You can choose to show anything here.                                | <p align="center"><img src={require("/static/img/docs/advanced-tutorials/ticketing/claim-3.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/></p>        |
| This should act as a landing page for your event and will be shown if any URL is invalid. In this case, `curUse` is 0 **and** splitRes[3] is '' or undefined                                                                          | <p align="center"><img src={require("/static/img/docs/advanced-tutorials/ticketing/claim-0.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/></p>        |

The code to render can be found in the exandable section below. 

<details>
<summary>app.js rendering code</summary>
<p>

```jsx reference showLineNumbers
https://github.com/keypom/keypom-js/blob/0035852580c8ce848571d89f31ae47a3794414d6/docs-advanced-tutorials/ticket-app/frontend/state/App.js#L61-L131
```

</p>
</details>

:::tip 
Lines 2, 23, 40, and 55 hold conditions on the current key uses, `curUse`. These conditions control what is shown to the user.
:::


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

## `Qrcode.js`

`Qrcode.js` is a simple component that returns a QR code based on the string passed in. On the attendee ticket page, this is the linkdrop URL for the host to scan. 

The full code can be seen below. 

```js reference
https://github.com/keypom/keypom-js/blob/0035852580c8ce848571d89f31ae47a3794414d6/docs-advanced-tutorials/ticket-app/frontend/components/qrcode.js#L1-L22
```

--- 

## `Keyinfo.js`

`Keyinfo.js` is responsible for updating Keypom related state variables, `pubKey`, and `curUse`. 

When `curUse` is 1 and the QR code is being rendered, the public key and use number is shown for educational purposes.

A NEAR connection is initialized, similar to the [`App.js` setup](user-code.md#setting-up). However, this time around, its done on app mount by using a React `useEffect` hook. Once the connection is initialized, another `useEffect` hook is used to update the needed Keypom state variables whenver the `KeyInfo` component is rendered.

To do this, two SDK functions are used: [`getPubFromSecret`](../../../keypom-sdk/modules.md#getpubfromsecret) to get the public key and [`getKeyInformation`](../../../keypom-sdk/modules.md#getkeyinformation) to get the current key use. This can be seen below. 

```js reference
https://github.com/keypom/keypom-js/blob/96827e6a585a469cc8693dd0dfaf37de312958a2/docs-advanced-tutorials/ticket-app/frontend/state/keyInfo.js#L1-L66
```

---

## Conclusion
In this section, you learned about the 3 components that make up the attendee ticket page: `App.js`, `Qrcode.js`, and `KeyInfo.js`.

In summary, `App.js` is the "homepage" of the attendee ticket page and takes care of setting up all the state variables based on the URL and then renedering the page. `Qrcode.js` simply renders a QR code based on an input string. `KeyInfo` is in charge of updating all Keyom state variables whenever `App.js` re-renders. 

You also went through the code for each of these components and saw the expected [render results](user-code.md#rendering). 

In the next section, you'll be going through a similar process with the scanner page.

