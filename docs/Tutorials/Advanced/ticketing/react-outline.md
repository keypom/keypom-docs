---
sidebar_label: 'App Design'
---
# App Design

## Introduction
In the previous sections, you've created the foundation for the ticketing system by breaking it down to its functional requirements and designing a drop accordingly. Here, you'll be learning the flow and design of the React app, to create a seamless ticketing experience for *both* the organizers and the attendees.

With this tutorial, a React app with separate scanner and claim pages will be created. Although the attendees can access the scanner, it will be useless to them unless they know the drop password. 


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
  <img src={require("/static/img/docs/advanced-tutorials/ticketing/ticket-pink.png").default} width="100%" height="100%" alt="ticketing" class="rounded-corners"/>
</p>

* **Stage 1:** Page showing a unique QR code, corresponding to the private key from their ticket.  
* **Stage 2:** After the QR code has been scanned by the host, the user can choose to onboard to NEAR and receive a POAP.  
* **Stage 3:** If the user chooses to claim their POAP, the third stage will show a page of **your** choice. You can choose to leave it empty or customize it with additional resources or a redirect to your own website.

To trigger a transition from stages 1 &rarr; 2 and 2 &rarr; 3, the following events must occur:
1. [1 &rarr; 2]: The doorman must scan the QR code, which calls `claim` with the event password. Nobody else is able to `claim` as the password is only known by the doorman/event organizers. If this `claim` fails, the page will stay at stage 1.
2. [2 &rarr; 3]: The user chooses to `claim` their POAP. Once that `claim` is complete and the POAP is in their wallet, the page will transition to stage 3.

---

## Scanner Page Flow

The scanner page is for the doorman and consists of 3 stages that repeat in a loop.

<p align="center">
  <img src={require("/static/img/docs/advanced-tutorials/ticketing/scanner-pink.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/>
</p>

The event password will only be prompted once on app mount. If the doorman wishes to enter a different password once scanning starts, they can simply refresh the page and be prompted again. 

* **Stage 1:** A page with the camera viewport open, constantly scanning for QR codes.  
* **Stage 2:** Once a QR code is detected and information is scanned in, the app attempts to derive the private key from the QR code to `claim` using the event password. During this time, the app will indicate it is in the process of claiming.
* **Stage 3:** After the `claim` is processed, the page will return either as successful or a failed `claim` based on the validity of the ticket.

To transition from stages 1 &rarr; 2 and 2 &rarr; 3, the following events occur:

1. [1 &rarr; 2]: Data must be read in; this is done with a QR code reader library which indicates when that occurs. As soon as data is read in, the app will transition from stage 1 &rarr; 2.
2. [2 &rarr; 3]: The `claim` function call returns. It will either return as successful or failed based on the validity of the ticket.

After stage 3, the entire cycle will loop back to stage 1 after three seconds. This time interval was set so the host could read any error messages that may appear. You can modify this time by changing the values passed into `timeout()`.



---

## Keypom Information

There are a few key pieces of information needed from Keypom in order to allow the pages to perform as expected.

### Claim Page
The major parameter that controls what React will render is `cur_key_use` for the given private key. This value represents the key's current use number (1st use, 2nd use etc.) and will be stored in a React state variable called `curUse`. 

**Stage 1 &rarr; 2:** To change between these two stages, the key's current use must be changed from 1 to 2. This is done when the QR code is scanned by the host.  

**Stage 2 &rarr; 3:** To change between these two stages, the key must be deleted and fully claimed. This happens when they claim the post attendance gifts.  

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

The scanner app obtains the `privKey` by scanning the QR code and parsing the obtained string. It then calls `claim` and checks whether or not the claim was successful based on if the key's current use decremented.

The following list of variables are used in the scanner app:
* `curUse`, obtained from accessing the `cur_key_use` from calling [`getKeyInformation`](../../../keypom-sdk/modules.md#getkeyinformation) with `pubKey`.
* `pubKey`, derived from `privKey` using the SDK's [`getPubFromSecret`](../../../keypom-sdk/modules.md#getpubfromsecret) method.
* `privKey`, read in from the QR code.
* `password`, set by the doorman on app mount.

---

## Conclusion
In this section, you broke down the app's flow of logic for both the user claim page, and the scanner page. You then took that information and found Keypom information that can be used to facilitate that flow. 

In the following sections, you'll be applying what you just learned by going through the actual code for the claim and scanner pages. 

