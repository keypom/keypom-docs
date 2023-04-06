---
sidebar_label: 'Solution Architecture'
---
# Solution Architecture
In this section, you'll break down the requirements of the ticketing system in order to better understand how to create a solution architecture. This means translating the features from the [ticketing introduction](introduction.md) into tangible goals for the specific Keypom drop and its configurations.

## Breaking Down the Problem
Recall from earlier, the following features are needed:

### No wallet is needed to enter 

With traditional events, you would need to burn an NFT in order to gain entry to the event. This model requires the attendee to have a valid wallet with enough $NEAR to cover transaction costs.

With a Keypom access key, all you need is the private key to gain entrance. This can be turned into a simple QR code that is scanned at the door to gain entrance.

### Each ticket is unique and cannot be passed-back 

In order to satisfy the requirement that each ticket must be unique and can only be scanned once, the key should be used to sign a simple transaction when it's scanned. This will prevent ticket pass-backs since the host can check the on-chain status of each key. If it's been used already, the host can deny entry.

When the host scans the QR code and signs the transaction using the key, it should simply modify some state on the contract reflecting that the key has been used. It shouldn't transfer $NEAR to anyone or create any accounts and should be a lightweight transaction on-chain.

By default, every key has a counter of how many uses it has left before being deleted. In the above scenario, you could create a key with 1 use and once it has been scanned, it will be deleted. If the same QR code would be given to multiple people, the host would realize that the key no longer exists and deny entry.

To make this transaction extremely lightweight, Keypom allows keys to have `null` function calls whose entire purpose is to decrement the key use counter to prove that the key has been used. These special types of function calls use up a very small amount of gas and are extremely cheap to execute.

### Attendees are not required to have wifi at the door.

If the ticket is just a private key in the form of a QR code, the attendee only needs to keep a screenshot or the webpage open on their phone to gain entry to the event. In addition, Apple users can add it to their Apple Wallets as well. This eliminates the need for everyone to have wifi as only the hosts that are scanning and making transactions need wifi to admit attendees.

### Attendees can setup a new NEAR wallet

Up until this point, tickets are single-use function calls that execute a `null` method on Keypom. In order for attendees to receive a NEAR wallet after the event for free, the key can be set with 2 uses instead of 1. The first is the `null` method and the second is pre-loaded with a small amount of $NEAR. This $NEAR will cover costs for account creation and sponsor their first couple transactions.

### NFT POAP available for attendees

In order to send the attendees a POAP, the second key use will need to not only contain a small amount of $NEAR but also mint an NFT to their new or existing NEAR wallet. This can be done by call a minting function on an existing NFT contract that will create an NFT and send it to the account.

### Attendance required for POAP

Currently, anyone with a ticket could manually claim the key (sign transactions) using the Keypom SDK. This means that people could first claim the `null` case and then claim the key again to receive the NFT without physically showing up.

To solve this, the first key use can be protected with a [password](../../../Concepts/KeypomProtocol/GithubReadme/password-protect.md) that only the host knows. This password will be provided when the QR code is scanned. By password protected the uses, the only way to receive the NFT even if you have the ticket, is to be physically scanned by the host.


## Keypom Solution

From above, the drop must have the following properties to function as intended:

* A [Function Call drop](../../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/fc-drops.md) must be used and configured so that each key has 2 uses.
* The first key use is password protected and `null` (for when the host scans attendees into the event). 
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
