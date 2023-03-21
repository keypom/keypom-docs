---
sidebar_label: 'Scanner Code'
---
# Scanner Code

## Introduction
In the previous sections, you designed the structure and components needed to meet the requirements of the ticket app and saw the code to create the user claim page. Building on that, this tutorial will guide you through the code to create the scanner app for your seamless ticketing system.

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

This tutorial will be covering the code in `scanner.js`.

---

## Scanner App - `Scanner.js`
### Breaking Down the Problem
As a brief reminder, the host scanner page will have the following stages, best outlined with the diagram below.

<p align="center">
  <img src={require("/static/img/docs/advanced-tutorials/ticketing/scanner-pink-rounded.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/>
</p>

* **Stage 1, Pre-claim:** A page with the camera viewport open, constantly scanning for QR codes.  
* **Stage 2, Claiming:** Once a QR code is detected and information is scanned in, the app attempts to derive the private key from the QR code to `claim` using the event password. During this time, the app will indicate it is in the process of claiming.
* **Stage 3, Post-claim:** After the `claim` is processed, the page will return either as successful or a failed `claim` based on the validity of the ticket.

After post-claim, the entire cycle will loop back to pre-claim after three seconds. This time interval was set so the host could read any error messages that may appear. You can modify this time by changing the values passed into `timeout()`.


In post-claim, a ticket may be invalid for a few reasons. 
* Incorrect password/key causing the Keypom SDK to return an error when `claim` fails
* A ticket may already be fully claimed; the user has claimed their POAP and so their private key has since been deleted
* The ticket has already been scanned by the host. This means the key's current use is 2. Although this claim *can* be made, it should not. Doing so would mean the attendee loses out on the opportunity to claim their POAP.

### `masterStatus` State Variable
In order to track all these stages and possible outcomes, a set of enums will be defined.

```js reference
https://github.com/keypom/keypom-js/blob/751b830e74cc0e2e354263359e926cb15f931d30/docs-advanced-tutorials/ticket-app/frontend/components/scanner.js#L15-L27
```

All these stages will be stored in a `masterStatus` state variable object.


|**`masterStatus.stage`**| **Description**                                                                         |
|------------------------|-----------------------------------------------------------------------------------------|
| `Stages.preClaim`      | *Pre-claim:* Host scanner page is scanning, waiting to read in data                     |
| `Stages.claiming`      | *Claiming:* Data has been read, scanner is trying to claim                              |
| `Stages.sucessClaim`   | *Post-claim:* Successful `claim`                                                        | 
| `Stages.failClaim`     | *Post-claim:* Failed to `claim`: Invalid password, key invalid/scanned already etc.     | 
| `default`              | *Unknow State:* Display error message                                                   | 


| **`masterStatus.data`** | **Description**                                   |
|-------------------------|---------------------------------------------------|
| `Data.empty`            | No data has been read, cannot call `claim`        |
| `Data.captured`         | Data has been read, scanner can now try to claim  |

### Initialization and Scanning
Upon app mount, the host scanner page will immediately do the following.  
 
1) Prompt the host for the drop password.  
2) Begin scanning.

These features can be seen in the code snippet below. 
```js reference
https://github.com/keypom/keypom-js/blob/751b830e74cc0e2e354263359e926cb15f931d30/docs-advanced-tutorials/ticket-app/frontend/components/scanner.js#L29-L58
```

### Claiming
The claiming process can be controlled using a React `useEffect` hook, that runs everytime the data status, `masterStatus.data`, is updated, indicating that data was read by the scanner. 

The primary task of the claim process is to determine if a claim is:

* Successful - `masterStatus.stage == Stages.successClaim` 
* Unsuccessful - `masterStatus.stage == Stages.failClaim` 

This can be done by a process of elimination. Once the existence of the key is confirmed, you must make sure the ticket has not already be scanned. Then finally, you can attempt to `claim` and return the result of that call.

First, you can check if the key still exists and has not been deleted by calling the SDK funciton [`getKeyInformation`](../../../keypom-sdk/modules.md#getkeyinformation). This will return `null` if the key does not exist.
```js reference
https://github.com/keypom/keypom-js/blob/751b830e74cc0e2e354263359e926cb15f931d30/docs-advanced-tutorials/ticket-app/frontend/components/scanner.js#L68-L75
```
:::note
All of these tests are placed inside a `try...catch` statement. The errors thrown will be `console.log`'d.
:::

Next, the `keyInformation` returned from above can be used to determine the current key use. If it's 1, that means the scanner should call `claim`. If not, then the ticket has already been scanned and should not allow the scanner to double-`claim` the ticket.
```js reference
https://github.com/keypom/keypom-js/blob/751b830e74cc0e2e354263359e926cb15f931d30/docs-advanced-tutorials/ticket-app/frontend/components/scanner.js#L77-L91
```

Lastly, the current key use *after* the scanner `claim` can be used to determine if the `claim` was successful. If the current key use has been decremented, it can be confirmed that the `claim` was successful. Otherwise, the current key use value would remain the same as before `claim` was called.
```js reference
https://github.com/keypom/keypom-js/blob/751b830e74cc0e2e354263359e926cb15f931d30/docs-advanced-tutorials/ticket-app/frontend/components/scanner.js#L93-L117
```

Put together, this is the `useEffect` hook that claims the key and ultimately determines the components to be rendered by setting `masterStatus.stage`. 
```js reference
https://github.com/keypom/keypom-js/blob/751b830e74cc0e2e354263359e926cb15f931d30/docs-advanced-tutorials/ticket-app/frontend/components/scanner.js#L61-L145
```

### Rendering

The rendering part of the scanner app is relatively simple, as all the logic for states was taken care of during the claim process. The following table outlines what the page should render based on the value of `masterStatus.stage`, as outlined [above](scanner-code.md#masterstatus-state-variable). 

The focus of the renders is on the scanner frame (coloured square) and the text below it. The QR code visible is a code on a phone screen held up to the camera.

|    **Condition and Description**                                                                               | **Render**                                                                                                                                                                               |
|----------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `masterStatus.stage` == `Stages.preClaim`, *Pre-claim:* Host scanner page is scanning, waiting to read in data | <p align="center"> <img src={require("/static/img/docs/advanced-tutorials/ticketing/scan-unread.png").default} width="60%" height="60%" alt="ticketing" class="rounded-corners"/></p>    |
| `masterStatus.stage` == `Stages.claiming`, *Claiming:* Data has been read, scanner is trying to claim          | <p align="center"> <img src={require("/static/img/docs/advanced-tutorials/ticketing/scan-claiming.png").default} width="60%" height="60%" alt="ticketing" class="rounded-corners"/></p>  |
| `masterStatus.stage` == `Stages.successClaim`, *Post-claim:* Successful `claim`                                | <p align="center"> <img src={require("/static/img/docs/advanced-tutorials/ticketing/scan-claim-good.png").default} width="60%" height="60%" alt="ticketing" class="rounded-corners"/></p>|
| `masterStatus.stage` == `Stages.failClaim`, *Post-claim:* Invalid password, key invalid/scanned already etc.   | <p align="center"> <img src={require("/static/img/docs/advanced-tutorials/ticketing/scan-claim-bad.png").default} width="60%" height="60%" alt="ticketing" class="rounded-corners"/></p> |
| `default`, *Unknown State:* Display error message                                                              | <p align="center"> <img src={require("/static/img/docs/advanced-tutorials/ticketing/error.png").default} width="60%" height="60%" alt="ticketing" class="rounded-corners"/></p>          |

The following expandable section contains code for rendering. 

<details>
<summary>Full scanner.js rendering code</summary>
<p>

``` jsx reference
https://github.com/keypom/keypom-js/blob/751b830e74cc0e2e354263359e926cb15f931d30/docs-advanced-tutorials/ticket-app/frontend/components/scanner.js#L147-L200
```

</p>
</details>

### Full Code
The full code, including the set up, claiming, and the rendering, can be seen below.

``` jsx reference
https://github.com/keypom/keypom-js/blob/751b830e74cc0e2e354263359e926cb15f931d30/docs-advanced-tutorials/ticket-app/frontend/components/scanner.js#L1-L201
```

---

## Conclusion
In this section, you learned about the `scanner.js` component. Its primary role is to handle the data read in from the QR code reader, and `claim` the private key embedded within the QR code. It is also designed to handle different kinds of errors, such as deleted keys, and tickets that have already been scanned.  

In the next section, you'll be seeing the final product of what you just built!