---
sidebar_label: 'Scanner Code'
---
# Scanner Code

## Introduction
In the previous sections, you designed the structure and components needed to meet the requirements of the ticket app. Building on that, this tutorial will guide you to learn the code needed to create the scanner app for your seamless ticketing system.

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

This tutorial will be covering the code in `scanner.js`.

---

## Scanner App - `Scanner.js`
### Breaking Down the Problem
As a brief reminder, the scanner page will have the following stages, best outlined with the diagram below.

<p align="center">
  <img src={require("/static/img/docs/advanced-tutorials/ticketing/scanner-pink-rounded.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/>
</p>

* **Stage 1:** A page with the camera viewport open, constantly scanning for QR codes  
* **Stage 2:** Once a QR code is detected and information is scanned in, the app attempts to derive the private key from the QR code and tries to `claim` using the event password. During this time, the app will indicate it is in the process of claiming.
* **Stage 3:** After the `claim` is processed, the page will return either as successful or a failed `claim` based on the validity of the ticket.

After stage 3, the entire cycle will loop back to stage 1 after three seconds. 

In stage 3, a ticket may be invalid for a few reasons. 
* Incorrect password/key, the Keypom SDK returns an error when `claim` fails
* A ticket may already be fully claimed; the user has claimed their POAP and so their private key has since been deleted
* The ticket has already been scanned by the doorman. This means the key's current use is 2. Although this claim *can* be made, it should not. Doing so would mean the attendee loses out on the opportunity to claim their POAP.

### `masterState` State Variable
In order to track all these stages and possible outcomes, a `masterState` state variable will be declared. These are the corresponding values it can take on.

|    **`masterState[0]`**     | **Description**                                                           |
|-----------------------------|---------------------------------------------------------------------------|
| `masterState[0]` == 1       | Scanner app is scanning, waiting to read in data                          |
| `masterState[0]` == 2       | Data has been read, scanner is trying to claim                            |
| `masterState[0]` == 3       | Successful `claim`                                                        | 
| `masterState[0]` == 4       | Failed to `claim`: SDK returned error, likely incorrect password          | 
| `masterState[0]` == 5       | Failed to `claim`: Ticket has been fully claimed and key has been deleted | 
| `masterState[0]` == 6       | Failed to `claim`: The ticket has already been scanned                    | 

You may have noticed that `masterState` is an array; this is to include a "data bit" inside to indicate the instant that data has been successfully read in by the scanner. 

|    **`masterState[1]`**         | **Description**                                   |
|---------------------------------|---------------------------------------------------|
| `masterState[1]` == False       | No data has been read, cannot call `claim`        |
| `masterState[1]` == True        | Data has been read, scanner may now try to claim  |

### Initialization and Scanning
Upon app mount, the scanner page will immediately do the following.  

1) Similar to the other components covered in the previous pages, `scanner.js` requires a NEAR connection to be established in order to receive Keypom information and call `claim`.   
2) Prompt the doormnan/event organizers for the key passwords  
3) Begin scanning.the scanner page should always be scanning for data and immediately flip the `masterState[1]`'s "data bit" as soon as data is read.   

These features can be seen in the code snippet below. 
```js reference
https://github.com/keypom/keypom-js/blob/96827e6a585a469cc8693dd0dfaf37de312958a2/docs-advanced-tutorials/ticket-app/frontend/components/scanner.js#L21-L64
```

### Claiming
The claiming process can be controlled using a React `useEffect` hook, that runs everytime `masterState[1]` is updated to indicate a change in the data read by the scanner.The primary task of the claim process is to determine if a claim is 

* Successful - `masterState[0]` == 3  
* Failed due to SDK error (likely password) - `masterState[0]` == 4  
* Unsuccessful due to deleted key - `masterState[0]` == 6  
* Failed due to ticket already being scanned by doorman - `masterState[0]` == 5  

This can be done by a process of elimination. Once the existence is confirmed, you must make sure the ticket has not already be sacanned. Then finally, you can attempt to `claim` and return the result of that call.

First, you can check if the key still exists and has not been deleted by calling the SDK funciton `getKeyInformation`. This will return `null` if the key does not exist. This covers the case of `masterState[0]` == 6.
```js reference
https://github.com/keypom/keypom-js/blob/96827e6a585a469cc8693dd0dfaf37de312958a2/docs-advanced-tutorials/ticket-app/frontend/components/scanner.js#L73-L96
```

Next, the `keyInformation` returned from above can be used to determine the current key use. If it's 1, this means the scanner should call `claim`. If not, then the ticket has already been scanned and should not allow the scanner to double-`claim` the ticket. This covers the case of `masterState[0]` == 5
```js reference
https://github.com/keypom/keypom-js/blob/96827e6a585a469cc8693dd0dfaf37de312958a2/docs-advanced-tutorials/ticket-app/frontend/components/scanner.js#L99-L121
```

Lastly, the current key use *after* the scanner `claim` can be used to determine if the `claim` was successful. This covers the case of `masterState[0]` == 4.
```js reference
https://github.com/keypom/keypom-js/blob/96827e6a585a469cc8693dd0dfaf37de312958a2/docs-advanced-tutorials/ticket-app/frontend/components/scanner.js#L123-L149
```

Put together, this is the `useEffect` hook that claims the key and ultimately determines the components to be rendered. 
```js reference
https://github.com/keypom/keypom-js/blob/96827e6a585a469cc8693dd0dfaf37de312958a2/docs-advanced-tutorials/ticket-app/frontend/components/scanner.js#L67-L156
```

### Rendering

The rendering part of the scanner app is relatively simple, as all the logic for states was taken care of during the claim process. The following expandable section contains the entire rendering section. 

<details>
<summary>Full scanner.js rendering code</summary>
<p>

``` jsx reference
https://github.com/keypom/keypom-js/blob/96827e6a585a469cc8693dd0dfaf37de312958a2/docs-advanced-tutorials/ticket-app/frontend/components/scanner.js#L157-L284
```

</p>
</details>

### Full Code
The full code, including the set up, claiming, and the rendering, can be seen below.

``` jsx reference
https://github.com/keypom/keypom-js/blob/96827e6a585a469cc8693dd0dfaf37de312958a2/docs-advanced-tutorials/ticket-app/frontend/components/scanner.js#L1-L284
```