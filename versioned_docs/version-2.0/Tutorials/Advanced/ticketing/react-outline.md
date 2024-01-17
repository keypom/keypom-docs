---
sidebar_label: 'App Design'
---
# App Design

## Introduction
In the previous sections, you've created the foundation for the ticketing system by breaking it down to its functional requirements and designing a drop accordingly. Here, you'll be learning the flow and design of the React app, to create a seamless ticketing experience for *both* the organizers and the attendees.

With this tutorial, a React app with separate scanner and claim pages will be created. Although the attendees can access the scanner, it will be useless to them unless they know the drop password. 

---

## Attendee Ticket Page Flow
This page is for the attendees and will only consist of 3 stages.

<p align="center">
  <img src={require("/static/img/docs/advanced-tutorials/ticketing/ticket-pink.png").default} width="100%" height="100%" alt="ticketing" class="rounded-corners"/>
</p>

* **Stage 1, Pre-entry:** Page showing a unique QR code, corresponding to the private key from their ticket.  
* **Stage 2, Post-entry:** After the QR code has been scanned by the host, the user can choose to onboard to NEAR and receive a POAP.  
* **Stage 3, Post-gift:** If the user chooses to claim their POAP, the third stage will show a page of **your** choice. You can choose to leave it empty or customize it with additional resources or a redirect to your own website.

To trigger a transition from Pre-entry to Post-entry and Post-entry and Post-gift, the following events must occur:
1. **Pre-entry &rarr; Post-entry**: The host must scan the QR code and call `allowEntry` with the event password and private key.
2. **Post-entry &rarr; Post-gift**: The user chooses to `claim` their POAP. Once that `claim` is complete and the POAP is in their wallet, the page will transition to post-gift.

---

## Host Scanner Page Flow

The scanner page is for the host and consists of 3 stages that repeat in a loop.

<p align="center">
  <img src={require("/static/img/docs/advanced-tutorials/ticketing/scanner-pink.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/>
</p>

The event password will only be prompted once on app mount. If the host wishes to enter a different password once scanning starts, they can simply refresh the page and be prompted again. 

* **Stage 1, Pre-claim:** A page with the camera viewport open, constantly scanning for QR codes.  
* **Stage 2, Claiming:** Once a QR code is detected and information is scanned in, the app attempts to derive the private key from the QR code and calls `allowEntry` using the event password. During this time, the app will indicate it is in the process of claiming.
* **Stage 3, Post-claim:** After the claim is processed, the page will indicate whether or not to admit the attendee depending on the return value of `allowEntry`.

After post-claim, the entire cycle will loop back to pre-claim after three seconds. This time interval was set so the host could read any error messages that may appear. You can modify this time by changing the values passed into `timeout()`.

---

## Keypom Information

There are a few key pieces of information needed from Keypom in order to allow the pages to perform as expected.

### Claim Page
The major parameter that controls what React will render is `cur_key_use` for the given private key. This value represents the key's current use number (1st use, 2nd use etc.) and will be stored in a React state variable called `curUse`. 

**Pre-entry &rarr; Post-entry:** To change between these two stages, the key's current use must be changed from 1 to 2. This is done when the QR code is scanned by the host.  

**Post-entry &rarr; Post-gift:** To change between these two stages, the key must be deleted and fully claimed. This happens when they claim the post attendance gifts.  

The following variables are needed to allow these state changes: 

* `curUse`, obtained from accessing the `cur_key_use` from calling [`getKeyInformation`](../../../keypom-sdk/Core/modules.md#getkeyinformation) with `pubKey`.
* `pubKey`, derived from `privKey` using the SDK's [`getPubFromSecret`](../../../keypom-sdk/Core/modules.md#getpubfromsecret) method.
* `privKey`, stored in the user's app link.

### Scanner Page
As the scanner page exclusively scans QR codes and admits people using the `allowEntry` utility function, the app itself does not store any Keypom parameters apart from the event password, which the host will manually enter on app mount.

The scanner app obtains the `privKey` by scanning the QR code and parsing the obtained string. It then calls `allowEntry` and passes in the event password and the `privKey`.

The following list of variables are used in the scanner app:
* `privKey`, read in from the QR code.
* `password`, set by the host on app mount.

---

## Conclusion
In this section, you broke down the app's flow of logic for both the user claim page, and the scanner page. You then took that information and found Keypom information that can be used to facilitate that flow. 

In the following sections, you'll be applying what you just learned by going through the actual code for the claim and scanner pages. 

