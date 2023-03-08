---
sidebar_label: 'Scanner App Code'
---
# Scanner App Code

## Introduction
In the previous section, you broken down the flow and logic of the two React apps: the ticket and the scanner. You also learned what Keypom information is needed in order to facilitate the app flow. 

In this tutorial, you'll learn about the actual code needed to create the ticket app for your seamless ticketing system.

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
