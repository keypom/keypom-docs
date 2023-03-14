---
sidebar_label: 'Solution Architecture'
---
# Solution Architecture
In this section, you'll break down the requirements of the ticketing system in order to better understand how to create a solution architecture. This means translating the features from the [ticketing introduction](introduction.md) into tangible goals for the specific Keypom drop and its configurations.

## Breaking Down the Problem
Recall from earlier, the following features are needed:

* No wallet is needed to enter the event or receive a POAP.
* Each ticket is unique and once you've entered the event, the ticket cannot be sent to another person to gain them access
* No wifi is needed at the door.
* An optional NFT POAP can be minted on-demand for each user that attends the event.
* The post-attendance gifts can **only** be given to people that physically showed up to the event. You can't receive the NFT if you didn't show up.
* People that have attended the event can get setup with a NEAR wallet if they don't have one yet.

:::info note
The NFT POAP is optional to include as the event organizer. You may omit it, or replace it with your own function call if you wish. In this tutorial, the POAP will be minted on the second key use. 
:::

These can be broken down one by one, starting with the requirement for no wallets. This can be done using Keypom's access keys. With traditional events, you would need to burn an NFT in order to gain entry to the event. This model requires you to have a valid wallet with enough $NEAR to cover transaction costs.

With a Keypom access key, all you need is a valid private key to gain entrance. This key is a simple string and can be turned into a QR code that is able to be scanned.

In order to satisfy the requirement that each ticket must be unique and can only be scanned once, the key can be claimed once it's scanned by the doorman. Currently, there is nothing stopping someone from being scanned into the event and then sending a screenshot of their QR code to other people in line. In the above scenario, if the original key was claimed, when the next person goes to show the duplicate QR code, the scanner could check the status of the key and deny entry to the event for that person.

When the host scans a QR code and claims the key, it shouldn't do anything more than simply reflect that the key has been used. It shouldn't transfer $NEAR to anyone or create any accounts. For this reason, Keypom allows methods to be `null` as part of the FC data which will result in the key use decrementing and only a fraction of $NEAR being spent on gas. 

Next is the no wifi requirement. This can be achieved by seperating the ticketing into two stages, admission and receiving the optional POAP. This allows the attendee to screenshot their ticket at home and enter the event anytime without the need for wifi at the door to access the ticket. Afterwards, they can claim their POAP once they are connected to the internet. This can be done with a Keypom drop with 2 key-uses for each key in the drop.

To mint an NFT on demand, a function call drop can be used. This function call can invoke the `nft_mint` method on an NFT contract and will allow the user to create and claim their POAP anytime. 

Lastly, onboarding to NEAR is made possible with the `create_account_and_claim` method.

## Keypom Solution

From above, the drop must have the following properties to function as intended:

* The drop must have 2 key uses for each key.
* A function call drop must be used.
* The second key use should call `nft_mint` to allow the attendee to mint and claim their own POAP NFT.

The ticketing system will be created using a [function call drop](../../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/fcdrops.md) with the following 2 key uses.

1. The first `claim`/key use allows the attendee to enter into the event. This will be done by the doorman scanning the attendee's QR code and calling `claim` on the private key embedded in the QR code. 
2. The second `claim` will send the attendee a POAP, either to a new or existing NEAR wallet.  

In the first claim, **the doorman must be the only person capable of calling `claim`**. This is to prevent anyone else from admitting people into the event. The easiest way to do this would be to protect the first `claim` with a password only known by the doorman. More on [password-protected keys](../../../Concepts/Keypom%20Protocol/Github%20Readme/passwordprotect.md).

A flow chart of this process can be seen below.

<p align="center">
  <img src={require("/static/img/docs/advanced-tutorials/ticketing/ticketing.png").default} width="65%" height="65%" alt="ticketing"/>
</p>

To create this drop, the [Keypom JS SDK](https://github.com/keypom/keypom-js#installation) will be used.

---

## Conclusion
In this section, you started with the desired features and converted them to requirements. You then addressed those requirements by designing the architecture of a Keypom drop. You also learned how a password protected first key use can be used to ensure the integrity of the ticketing app. 

In the next section, you'll be taking the Keypom drop architecture you just created and using it to create the drop.
