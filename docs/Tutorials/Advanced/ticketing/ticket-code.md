---
sidebar_label: 'Ticket App Code'
---
# Ticket App Code

## Introduction
In the previous section, you broken down the flow and logic of the two React apps: the ticket and the scanner. You also learned what Keypom information is needed in order to facilitate the app flow. 

In this tutorial, you'll learn about the actual code needed to create the ticket app for your seamless ticketing system.

:::note
The focus of this section will be on the Keypm aspects of each script, such as getting key information and using it. 

The full code for each script will be shown, with highlights. For React resources, see [here](https://reactjs.org/docs/hello-world.html) as a starting point.
:::

Recall, from [the beginning](introduction.md) that your code had the following outline.

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

This tutorial will be covering the code in `app.js`, `keyInfo.js`, and `qrcode.js`.

---

## Ticket App - `App.js`
### Setting Up
The primary purpose of `app.js` is to display the different states of the ticket app. 

This will involved getting the current key uses, and then rendering based on the value returned. First, a sort of `init` funciton can be declared using react's `useEffect` hook.

```jsx reference
https://github.com/keypom/keypom-js/blob/b1ff9af4cf4bdef03e27c59717e771864ea412c3/docs-advanced-tutorials/ticketing/src/state/App.js#L16-L59
```
Looking at the `useEffect` function, the following processes can be seen

Upon app mount, the URL is stored parsed for `contractId` and `privateKey`. These are stored in their own respective state variables for further use. Note that the URL is split by `/` and the index of `contractId` and `privateKey` are known. When adapting this code for your own app, you will need to change those index values accordingly.

Once all state variables are set, `connectNear` is called. This is similar to the NEAR connection set up in the [drop creation](drop.md#getting-started) section. 

:::note 
Here, a `BrowserLocalStorageKeyStore` is used rather than an `UnencryptedFileSystemKeyStore`. This will create a key store in the user's browser for future use. For more on key stores, see [here](https://docs.near.org/tools/near-api-js/quick-reference#key-store)
:::

With the NEAR connection established, your browser can now talk to the NEAR blockchain. The next step, is to call `initKeypom`. This initializes the SDK to allow for interactions with the Keypom smart contracts. Without it, none of the other SDK functions would work as expected. More info on the `initKeypom` function can be found [here](../../../keypom-sdk/modules#initkeypom).

After the Keypom initialization is complete, the SDK function `makeLink` can be used to create the linkdrop link to embed in the QR code. To use this function, it simply needs a base URL, as well as the `privateKey` to be used. The returned linkdrop link is set to the state variable `link` and will be used when rendering.

### Rendering

When rendering, the `QrCode` and `KeyInfo` components are called, passing in the values and state variables set up in the [set up](ticket-code.md#setting-up). 

For the time being, you can think of the `KeyInfo` component as just a black box, where a private key and other state variables are passed in, and those state variables get modified to change what is rendered. 

```jsx reference showLineNumbers
https://github.com/keypom/keypom-js/blob/b1ff9af4cf4bdef03e27c59717e771864ea412c3/docs-advanced-tutorials/ticketing/src/state/App.js#L69-L136
```

You can see lines 1, 22, and 43 hold conditions on the current key uses.
* **`curUse` is 1**: The ticket app should show a QR code representing the linkdrop link. The `QrCode` component is rendered by passing in the `link` state variable created earlier. 
* **`curUse` is 2**: The first claim was done by the bouncer, and thus should give the user the option to claim their POAP. This is done with the same linkdrop link. 
* **`curUse` is anything else**: Currently this is used as a problem shooting page, just to see what the key use is. If the key use is 0, that means the key is depleted and deleted. 

**ADD CURUSE 3 TO ONBOARD TO NEAR AND TEST**

### Full Code
The full code, including the set up and the rendering, can be seen below.
<details>
<summary>Full app.js code</summary>
<p>

``` jsx reference
https://github.com/keypom/keypom-js/blob/b1ff9af4cf4bdef03e27c59717e771864ea412c3/docs-advanced-tutorials/ticketing/src/state/App.js#L1-L141
```

</p>
</details>






--- 

## Ticket App - `Qrcode.js`

--- 

## Ticket App - `Keyinfo.js`


