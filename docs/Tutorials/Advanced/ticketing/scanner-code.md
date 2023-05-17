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

This tutorial will be covering the code in `scanner.js`.

---

## Scanner App - `Scanner.js`
### Breaking Down the Problem
As a brief reminder, the host scanner page will have the following stages, best outlined with the diagram below.

<p align="center">
  <img src={require("/static/img/docs/advanced-tutorials/ticketing/scanner-pink-rounded.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/>
</p>

* **Stage 1, Pre-claim:** A page with the camera viewport open, constantly scanning for QR codes.  
* **Stage 2, Claiming:** Once a QR code is detected and information is scanned in, the app attempts to derive the private key from the QR code and calls `allowEntry` using the event password. During this time, the app will indicate it is in the process of claiming.
* **Stage 3, Post-claim:** After the claim is processed, the page will indicate whether or not to admit the attendee depending on the return value of `allowEntry`.

After post-claim, the entire cycle will loop back to pre-claim after three seconds. This time interval was set so the host could read any error messages that may appear. You can modify this time by changing the values passed into `timeout()`.


In post-claim, a `allowEntry` might have returned false for a few reasons. 
* Incorrect password/key
* A ticket may already be fully claimed and not exist when the host attempts to claim it.
* The ticket has already been scanned by the host. This means the key's current use is 2.

### `masterStatus` State Variable
In order to track all these stages and possible outcomes, a set of enums will be defined.

```js reference
https://github.com/keypom/keypom-docs-examples/blob/4c8f86dab842c16e9c2bc6ad6f22e1eee2dced9e/advanced-tutorials/ticket-app/components/scanner.js#L10-L22
```

All these stages will be stored in a `masterStatus` state variable object.


|**`masterStatus.stage`**| **Description**                                                                         |
|------------------------|-----------------------------------------------------------------------------------------|
| `Stages.preClaim`      | *Pre-claim:* Host scanner page is scanning, waiting to read in data                     |
| `Stages.claiming`      | *Claiming:* Data has been read, scanner is trying to claim                              |
| `Stages.sucessClaim`   | *Post-claim:* Successful claim (`true` returned from `allowEntry`)                                                        | 
| `Stages.failClaim`     | *Post-claim:* Failed to claim (`false` returned from `allowEntry`)  | 
| `default`              | *Unknow State:* Display error message                                                   | 


| **`masterStatus.data`** | **Description**                                   |
|-------------------------|---------------------------------------------------|
| `Data.empty`            | No data has been read, cannot call `claim`        |
| `Data.captured`         | Data has been read, scanner can now try to claim  |

### Initialization and Scanning
Upon app mount, the host scanner page will immediately do the following.  
 
1) Prompt the host for the base password.  
2) Begin scanning.

These features can be seen in the code snippet below. 
```js reference
https://github.com/keypom/keypom-docs-examples/blob/4c8f86dab842c16e9c2bc6ad6f22e1eee2dced9e/advanced-tutorials/ticket-app/components/scanner.js#L9-L53
```

### Claiming
The claiming process can be controlled using a React `useEffect` hook, that runs every time the data status, `masterStatus.data`, is updated, indicating that data was read by the scanner. 

The primary task of the claim process is to determine if a claim is:

* Successful - `masterStatus.stage == Stages.successClaim` 
* Unsuccessful - `masterStatus.stage == Stages.failClaim` 

This is accomplished using the `allowEntry` function that you created earlier. If it returns `true`, the master status stage should be set to `Stages.successClaim`. Otherwise, it should be set to `Stages.failClaim`.

```js reference
https://github.com/keypom/keypom-docs-examples/blob/4c8f86dab842c16e9c2bc6ad6f22e1eee2dced9e/advanced-tutorials/ticket-app/components/scanner.js#L55-L92
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

```jsx reference
https://github.com/keypom/keypom-docs-examples/blob/4c8f86dab842c16e9c2bc6ad6f22e1eee2dced9e/advanced-tutorials/ticket-app/components/scanner.js#L94-L147
```

</p>
</details>

### Full Code
The full code, including the set up, claiming, and the rendering, can be seen below.

``` jsx reference
https://github.com/keypom/keypom-docs-examples/blob/4c8f86dab842c16e9c2bc6ad6f22e1eee2dced9e/advanced-tutorials/ticket-app/components/scanner.js#L1-L148
```

---

## Conclusion
In this section, you learned about the `scanner.js` component. Its primary role is to handle the data read in from the QR code reader, and `claim` the private key embedded within the QR code. It is also designed to handle different kinds of errors, such as deleted keys, and tickets that have already been scanned.  

In the next section, you'll be seeing the final product of what you just built!