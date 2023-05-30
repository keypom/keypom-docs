---
sidebar_label: 'Integrating Into Your Apps'
---

# Introduction

In the previous tutorial, you looked at the script necessary to create the trial account drop and how simple it was. In this tutorial, you'll start a local version of the guest-book app and see how easy it is to integrate and support trial accounts.

:::warning
The UI for trial accounts while in the guest-book app in this tutorial are NOT finalized. Benji sucks at UI design and we're getting a designer to help us out. This is just a placeholder for now and is meant to be a proof of concept.
:::

## Starting the Guest Book

Starting at the `keypom-docs-examples` directory, navigate to the `advanced-tutorials/trial-accounts/guest-book` folder and install the dependencies.

```bash
cd advanced-tutorials/trial-accounts/guest-book && yarn install
```

Once the dependencies have been installed, you can start the app.

```bash
yarn start
```

This should open the guest-book app in your browser and you should see the following:

<p align="center">
  <img src={require("/static/img/docs/trial-accounts/guest-book-homepage.png").default} width="80%" height="15%" alt="ticketing"/>
</p>

:::note
If you're signed in already, it's because you've used the same port for another application that was left signed in. Simply sign out or open the link in a new incognito window.
:::

---

## Creating the Trial Account

Now that the guest-book is running, it's time to run the trial creation script. Open a new terminal and navigate to the `keypom-docs-examples` directory. Navigate to the `advanced-tutorials/trial-accounts` folder and open the `create-trial-drop.js` file.

```bash
cd advanced-tutorials/trial-accounts
```

From here, make sure you change the account ID that is being used to sign transactions to an account that you're currently signed in with:

```js reference
https://github.com/keypom/keypom-docs-examples/blob/f1f634a629808f0d0943e508c2be6576622d32b1/advanced-tutorials/trial-accounts/create-trial-drop.js#L11
```

In addition, change the `guestBookInstance` to whichever URL your app is running on:

```js reference
https://github.com/keypom/keypom-docs-examples/blob/f1f634a629808f0d0943e508c2be6576622d32b1/advanced-tutorials/trial-accounts/create-trial-drop.js#L70
```

Once this is finished, you can run the following command to create the trial account drop.

```bash
node create-trial-drop
```

This should output the following:

```bash
Receipts: GCQ5qw2DYfnH4otYww94sJeVT2hEaEXj58Ky3J8FKdCS, FRCyeeVGgGq1YRRkxFRApjGpDdWyxZn4LQJTDoc22SV1
Log [v2.keypom.testnet]: Warning: Balance is less than absolute minimum for creating an account: 2840000000000000000000
Log [v2.keypom.testnet]: Current Block Timestamp: 1680902177371759044
Log [v2.keypom.testnet]: 31 calls with 155000000000000 attached GAS. Pow outcome: 2.5000782. Required Allowance: 39626233977241600000000
Log [v2.keypom.testnet]: Total required storage Yocto 837110000000000000000000
Log [v2.keypom.testnet]: Current balance: 8.0866179,
          Required Deposit: 3.6777362,
          total_required_storage: 0.83711,
          Drop Fee: 0,
          Key Fee: 0 Total Key Fee: 0,
          allowance: 0.0396262 total allowance: 0.0396262,
          access key storage: 0.001 total access key storage: 0.001,
          deposits less none FCs: 0 total deposits: 0 lazy registration: false,
          deposits for FCs: 2.8 total deposits for FCs: 2.8,
          uses per key: 1
          None FCs: 0,
          length: 1
          GAS to attach: 150000000000000
Log [v2.keypom.testnet]: New user balance 4.4088817
Log [v2.keypom.testnet]: Fees collected 0


  Guest-Book App:
http://localhost:1234/trial-url#v2.keypom.testnet/3HbgYBvVMSfTBpXQ4fSecbPzwup2YkJPipNmT7e2iyw5MfzfMN3rHccsPddWcTGFTehCux7AbmtJiRqd78x4F57g

Good Luck!
```

## Using the Guest Book

Now that the drop is created, it's time to create a brand new account! Open the URL and you should see the following screen:

<p align="center">
  <img src={require("/static/img/docs/trial-accounts/claim-trial-guestbook.png").default} width="80%" height="15%" alt="ticketing"/>
</p>

Enter a valid username and click Create. This will start the claiming process.

<p align="center">
  <img src={require("/static/img/docs/trial-accounts/claiming-trial-guestbook.png").default} width="80%" height="15%" alt="ticketing"/>
</p>

The claiming process should take a few seconds and then you should see the following screen:

<p align="center">
  <img src={require("/static/img/docs/trial-accounts/trial-claimed-guestbook.png").default} width="80%" height="15%" alt="ticketing"/>
</p>

Once you click the button, you should be instantly signed into the guest-book app.

### Signing Your First Transaction

Now that you're signed in, you can instantly begin using the guest-book app. Try signing a message with `0.01 $NEAR` and see what happens!

<p align="center">
  <img src={require("/static/img/docs/trial-accounts/trial-sign-guestbook.png").default} width="80%" height="15%" alt="ticketing"/>
</p>

After a few seconds, the transaction should go through and your message should show up at the bottom of the messages list! Notice how there was no redirects to the NEAR wallet for approval and no sign in.

### Invalid Actions

Recall that the trial account cannot attach more than 1 $NEAR to a given transaction. Try signing a message with `1.1 $NEAR` and you should be greeted with the following modal:

<p align="center">
  <img src={require("/static/img/docs/trial-accounts/trial-invalid-action-guestbook.png").default} width="80%" height="15%" alt="ticketing"/>
</p>

If you then sign the message with `1 $NEAR` or less, it should go through properly.

### Trial Over

After you've spent `1.25 $NEAR` on the app and you try to sign another message, you should see the following trial over modal:

<p align="center">
  <img src={require("/static/img/docs/trial-accounts/trial-over-guestbook.png").default} width="80%" height="15%" alt="ticketing"/>
</p>

In this case, since FastAuth isn't complete, clicking the button will send you somewhere special.

### Losing Access to Local Storage

If the account were to lose access of the local storage or their computer blew up, all they would need is the original trial account link to gain access to their account again. To test this behavior, close the app and open a brand new incognito window. Paste the original link and you should immediately be signed back into the app.

## Behind the Scenes

In order for the guest-book app to be fully compatible with trial accounts, it only needs to add the SDK's wallet selector plugin.

```js reference
https://github.com/keypom/keypom-docs-examples/blob/28444a492c513b8244e25ccaf067ca54f305b090/advanced-tutorials/trial-accounts/guest-book/near-wallet.js#L45-L55
```

You'll notice that there are a couple of parameters that are passed into the `setupKeypom` function. You need to specify:

- `trialAccountSpecs.url` and `instantSignInSpecs.url`: The URL format that must be met in order to trigger the sign-in flow.
  - You may notice the `ACCOUNT_ID` and `SECRET_KEY` markers in the URLs. These define where the account ID and secret key will go for the links you plan to distribute. For more information, see the [TypeDocs](../../keypom-sdk/Selector/welcome.md#trial-account-specs).
- `signInContractId`: The contract ID that regular users create access keys for when signing in.
- [`trialAccountSpecs.modalOptions`](../../keypom-sdk/Selector/welcome.md#modal-options): Information that you can specify that will customize the modals that are shown to the user while on your app. Here, `KEYPOM_OPTIONS` from `./keypom-data` are imported and used. 

### Customizing the Modals

By default, the modals that are shown to the user can be heavily customized to match the look and feel of your website. If you brand the regular wallet selector modal, the CSS will **automatically be applied** to the trial account modals.

In addition, you can specify a suite of titles and descriptions. These will be covered further in a different tutorial.

## Conclusion

In this tutorial, you learned how to create a link that will allow users to experience your app through a trial account. You then created a new testnet account, instantly signed into the guest-book app and went through different scenarios that a user might encounter while using your app.