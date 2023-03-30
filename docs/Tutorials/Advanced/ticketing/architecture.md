---
sidebar_label: 'Solution Architecture'
---
# Solution Architecture
In this section, you'll break down the requirements of the ticketing system in order to better understand how to create a solution architecture. This means translating the features from the [ticketing introduction](introduction.md) into tangible goals for the specific Keypom drop and its configurations.

## Breaking Down the Problem
Recall from earlier, the following features are needed:

### No wallet is needed to enter 
> No wallet is needed to enter the event.

This can be done using Keypom's access keys. With traditional events, you would need to burn an NFT in order to gain entry to the event. This model requires the attendee to have a valid wallet with enough $NEAR to cover transaction costs. 

With a Keypom access key, all you need is a valid private key to gain entrance. This key is a simple string and can be turned into a QR code that is able to be scanned.

### Each ticket is unique and cannot be passed-back 
> Each ticket is unique and can only be used by one person.

In order to satisfy the requirement that each ticket must be unique and can only be scanned once, the key can be claimed once it's been scanned. To prevent ticket pass-backs, the host could check the status of the key and deny entry to the event if the ticket has already been scanned.

When the host scans a QR code and claims the key, it shouldn't do anything more than simply reflect that the key has been used. It shouldn't transfer $NEAR to anyone or create any accounts and should be a lightweight transaction on-chain.

To do this, an FC drop with 2 key uses can be used. In addition, to ensure that only the host can 

### Attendees are not required to have wifi at the door.
> Attendees are not required to have wifi at the door. 

If the actual ticket is simply a private key that has been turned into a QR code, the attendee only needs to keep the webpage open on their phone or take a screenshot in order to gain entry to the event. This eliminates the need for everyone to have wifi as only the hosts that are scanning need wifi to claim the keys.

### Attendees can setup a new NEAR wallet
> Attendees that did not have a NEAR wallet can get one for free.

A second key use pre-loaded with a small amount of $NEAR can be added. This $NEAR will cover costs for account creation and sponsor a few transanctions. This can be used by attendees who do not have a NEAR wallet.


### NFT POAP available for attendees
> Attendees can choose to receive an NFT proving their attendence at the event. This is commonly known as a [POAP](https://academy.binance.com/en/glossary/proof-of-attendance-protocol-poap).

In order to send the attendees a POAP, the second key use will mint an NFT to their new or existing NEAR wallet. 

:::info note
The NFT post-attendance gift (POAP) is optional to include as the event organizer. You may omit it, or replace it with your own function call if you wish. In this tutorial, the POAP will be minted on the second key use. 
:::

### Attendance required for POAP
> The post-attendance gifts can **only** be given to people that physically showed up to the event. You can't receive the NFT if you didn't show up.

Currently, anyone with a ticket could manually claim the key using the Keypom SDK. This means that people could receive the NFT without physically showing up. 

To solve this, the first key use can be protected with a [password](../../../Concepts/Keypom%20Protocol/Github%20Readme/passwordprotect.md) that only the host knows, preventing them from receiving the NFT unless they have been let in by the host.


## Keypom Solution

From above, the drop must have the following properties to function as intended:

* A [Function Call drop](../../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/fcdrops.md) must be used and configured so that each key has 2 uses.
* The first key use is password protected and `null`. 
* The second key use will have a small amount of $NEAR to cover account creation costs and sponsor the first few transactions.
* The second key use will also call `nft_mint` on an NFT contract which will send the new or existing account a POAP.

:::tip
The first key use being `null` will allow for a lightweight transaction on-chain to reflect the key use decrement without needing to transfer any $NEAR to anyone or create any accounts.
:::

A flow chart of this process can be seen below.

<p align="center">
  <img src={require("/static/img/docs/advanced-tutorials/ticketing/ticketing.png").default} width="65%" height="65%" alt="ticketing"/>
</p>

---

## Conclusion
In this section, you learned the solutions that would help meet the required features outlined in the introduction. These included using an access key as a ticket to remove the need for attendees to have both a wallet and an internet connection at the door. You also saw how using a multi-use function call drop could allow you to add a Proof-of-Attendance NFT to gift attendees who show up to your event.

In the next section, you'll be taking the Keypom drop architecture you just created and using it to create the drop.
