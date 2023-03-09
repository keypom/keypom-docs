---
sidebar_label: 'App Design'
---
# App Design

## Introduction
In the previous sections, you've created the foundation for the ticketing system by breaking it down to its functional requirements and designing a drop accordingly. Here, you'll be learning the flow and design of the React app, to create a seamless ticketing experience for *both* the organizers and the attendees.

With this tutorial, 1 React app with seperate scanner and claim pages will be created. Although the attendees can access the scanner, it will be useless to them unless they know the drop password. 

This is also a good time to reiterate that the claimable POAP is optional; you can create a ticketing system just as effectively without the POAP, and even with your own functionality.

## Table of Contents
|         **Section **                                                                     | **Description**                                                                                               |
|------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| [Claim Page Flow](react-outline.md#user-app-flow)                                        | The different stages of claiming that the attendee will see on their device                                   |
| [Scanner Page Flow](react-outline.md#scanner-app-flow)                                   | The scanner's flow of logic for the doorman                                                                   |
| [Keypom Information](react-outline.md#keypom-information)                                | Brief overview of the Keypom information, such as private keys and key uses, that's found and used in the app | 

---

## Claim Page Flow
The claim page is for the attendees and will only consist of 3 stages.

<p align="center">
  <img src={require("/static/img/docs/advanced-tutorials/ticketing/ticket-pink-rounded.png").default} width="100%" height="100%" alt="ticketing" class="rounded-corners"/>
</p>

* **Stage 1:** A page showing their unique QR code, corresponding to their private key from the drop that they received from the event organizers.  
* **Stage 2:** After the QR code has been scanned and claimed, the user can chose to onboard to NEAR and receive a POAP will appear.
* **Stage 3:** If the user chooses to claim their POAP, the third stage will show a page of **your** choice. You can choose to leave it empty or customize it with additional resources or a redirect to your own website.

To trigger a transition from stages 1 &rarr; 2 and 2 &rarr; 3, the following events must occur:
1. [1 &rarr; 2]: The doorman must scan the QR code, which calls `claim` with the event password. Nobody else is able to `claim` as the password is only known by the doorman/event organizers. If this `claim` fails, the page will stay at stage 1.
2. [2 &rarr; 3]: The user chooses to `claim` their POAP. Once that `claim` is complete and the POAP is in their wallet, the page will transition to stage 3.

---

## Scanner Page Flow

The scanner page is for the doorman and consists of 3 stages that repeat in a loop.

<p align="center">
  <img src={require("/static/img/docs/advanced-tutorials/ticketing/scanner-pink-rounded.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/>
</p>

* **Stage 1:** A page with the camera viewport open, constantly scanning for QR codes.  
* **Stage 2:** Once a QR code is detected and information is scanned in, the app attempts to derive the private key from the QR code to `claim` using the event password. During this time, the app will indicate it is in the process of claiming.
* **Stage 3:** After the `claim` is processed, the page will return either as successful or a failed `claim` based on the validity of the ticket.

To transition from stages 1 &rarr; 2 and 2 &rarr; 3, the following events occur:

1. [1 &rarr; 2]: Data must be read in; this is done with a QR code reader library which indicates when that occurs. As soon as data is read in, the app will transition from stage 1 &rarr; 2.
2. [2 &rarr; 3]: The `claim` function call returns. It will either return as successful or failed based on the validity of the ticket.

After stage 3, the entire cycle will loop back to stage 1 after three seconds. 

:::info Event Password
The event password will only be prompted once and before any scanning starts. If the doorman wishes to enter a different password once scanning starts, they can simply refresh the page and be prompted again. 
:::

---

## Keypom Information

There are a few key pieces of information needed from Keypom in order to allow the pages to perform as expected.

### Claim Page
The major parameter that controls what React will render is `cur_key_use` for the given private key. This value represents the key's current use number (1st use, 2nd use etc.) and will be stored in a React state variable called `curUse`. 

**Stage 1 &rarr; 2:** To change between these two stages, the QR code must be scanned and claimed by the doorman using the scanner app. This will change the private key's current key use parameter, `curUse` from 1 to 2.

**Stage 2 &rarr; 3:** To trigger this state change, the user must claim their POAP, which again calls `claim` on the private key and changes the `curUse` from 2 to 0

:::note
Here, notice that the `curUse` returns to 0, the default value for this React state variable. This is because the key is depleted and deleted; and thus reading the actual `cur_key_use` from the Keypom contract will return an error.

For a refresher on React state variables, see the [React Docs](https://reactjs.org/docs/hooks-state.html)
:::

The following variables are needed to allow these state changes: 

* `curUse`, obtained from accessing the `cur_key_use` from calling [`getKeyInformation`](../../../keypom-sdk/modules.md#getkeyinformation) with `pubKey`.
* `pubKey`, derived from `privKey` using the SDK's [`getPubFromSecret`](../../../keypom-sdk/modules.md#getpubfromsecret) method.
* `privKey`, stored in user app link.

### Scanner Page
As the scanner page exclusively scans QR codes and calls `claim` on the private keys that it reads, the app itself does not store any Keypom parameters apart from the event password, which the doorman will manually enter on app mount.

The scanner app obtains the `privKey` by scanning the QR code and parsing the obtained string. With that, it calls `claim`. In order to check if the `claim` succeeded, the scanner app will obtain the `privKey`'s `cur_key_use` in a similar fashion to the user app.

The following list of variable are used in the scanner app:
* `curUse`, obtained from accessing the `cur_key_use` from calling [`getKeyInformation`](../../../keypom-sdk/modules.md#getkeyinformation) with `pubKey`.
* `pubKey`, derived from `privKey` using the SDK's [`getPubFromSecret`](../../../keypom-sdk/modules.md#getpubfromsecret) method.
* `privKey`, read in from the QR code.
* `password`, set by the doorman on app mount.

---

## Conclusion
In this section, you broke down the app's flow of logic for both the user claim page, and the scanner page. You then took that information and found Keypom information that can be used to facilitate that flow. 

In the following sections, you'll be applying what you just learned by going through the actual code for the claim and scanner pages. 

