---
sidebar_label: 'Solution Architecture'
---
# Solution Architecture
In this section, you'll break down the requirements of the ticketing system in order to better understand how to create a solution architecture. This means translating the features from the [ticketing introduction](introduction.md) into tangible goals for the specific Keypom drop and its configurations.

## Breaking Down the Problem
Recall from earlier, the following features are needed:

### No wallet is needed to enter 
> No wallet is needed to enter the event or receive a Proof-of-Attendence NFT, commonly known as a [POAP](https://academy.binance.com/en/glossary/proof-of-attendance-protocol-poap).

This can be done using Keypom's access keys. With traditional events, you would need to burn an NFT in order to gain entry to the event. This model requires the attendee to have a valid wallet with enough $NEAR to cover transaction costs. 

With a Keypom access key, all you need is a valid private key to gain entrance. This key is a simple string and can be turned into a QR code that is able to be scanned.

### Each ticket is unique and cannot be passed-back 
> Each ticket is unique and once you've entered the event, the ticket cannot be sent to another person to gain them access

In order to satisfy the requirement that each ticket must be unique and can only be scanned once, the key can be claimed once it's been scanned. To prevent ticket pass-backs, the host could check the status of the key and deny entry to the event if the ticket has already been scanned.

When the host scans a QR code and claims the key, it shouldn't do anything more than simply reflect that the key has been used. It shouldn't transfer $NEAR to anyone or create any accounts and should be a lightweight transaction on-chain.

### Attendees are not required to have wifi at the door.
> Attendees are not required to have wifi at the door. Existing NFT ticketing solutions requires wifi for attendees to burn the NFT ticket at the door.

If the actual ticket is simply a private key that has been turned into a QR code, the attendee only needs to keep the webpage open on their phone or take a screenshot in order to gain entry to the event. This eliminates the need for everyone to have wifi as only the hosts that are scanning need wifi to claim the keys.

### NFT POAP available for attendees
> Users that choose to onboard will receive a Proof-of-Attendence NFT.

In order to allow attendees to receive a wallet and an NFT, the key should be multi-use. The first use is a `null` method that gets claimed once they've been scanned by the host. After they've attended, they can claim the key once more and receive $NEAR as well as an NFT.

:::info note
The NFT post-attendance gift (POAP) is optional to include as the event organizer. You may omit it, or replace it with your own function call if you wish. In this tutorial, the POAP will be minted on the second key use. 
:::

### Attendance required for POAP
> The post-attendance gifts can **only** be given to people that physically showed up to the event. You can't receive the NFT if you didn't show up.

Currently, anyone with a ticket could manually claim the key using the Keypom SDK. This means that people could receive the NFT without physically showing up. To solve this, the scanning step could be [password protected](../../../Concepts/Keypom%20Protocol/Github%20Readme/passwordprotect.md) such that only the host knows the password.

### Attendees can setup new NEAR wallet
> People that have attended the event can get setup with a NEAR wallet if they don't have one yet.

With the access key the attendees receive (which act as the ticket), they are able to claim their POAP to a new or existing NEAR wallet. Since the POAP can only be claimed by those who physically attend the event, this means only those that do so can also create a new NEAR wallet. 

## Keypom Solution

From above, the drop must have the following properties to function as intended:

* An FC drop must be used whereby each key has 2 uses.
* The first key use is a `null` method that is password protected. 
* The second key use will have $NEAR to create a new wallet and it will also call `nft_mint` on an NFT contract which will send the new or existing account a POAP.

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
