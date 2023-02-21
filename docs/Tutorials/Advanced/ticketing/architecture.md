---
sidebar_label: 'Solution Architecture'
---
# Solution Architecture
In this section, you'll be breaking down the functionality of the ticketing system into project requirements and a solution architecture. This means translating the features from the [ticketing introduction](introduction.md) into tangible goals for our Keypom drop.

## Breaking Down the Problem
Recall from earlier, the following features are needed:

* No wallet is needed to enter the event or receive a POAP.
* No wifi is needed at the door.
* An NFT is minted on-demand for each user that attends the event.
* Users can optionally onboard onto NEAR if they don't have a wallet.

These can be broken down one by one. First is the requirement for no wallets. This can be done with any Keypom drop, using the `create_account_and_claim` method. 

Next is the no wifi requirement. This can be achieved by seperating the ticketing into two stages, admission and receiving the POAP. This allows the attendee to screenshot their ticket to enter anytime and then claim their POAP once they are connected to the internet. This can be done with a Keypom drop with 2 key-uses for each key in the drop.

To mint an NFT on demand, a function call drop can be used. This function call can call `nft_mint` on an NFT contract and will allow the user to create and claim their POAP anytime. 

Lastly, onboarding to NEAR is made possible with the `create_account_and_claim` method.

## Keypom Solution

From above, the drop must have the following properties to function as intended:

* The drop must have 2 key uses for each key
* A function call drop must be used
* The second key use should call `nft_mint`
* the method `create_account_and_claim` must be made available

The ticketing system will be created using a [function call drop](../../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/fcdrops.md) with the following 2 key uses.

1. The first `claim`/key use allows the attendee to enter into the event, this will be done by the doorman scanning the attendee's QR code  
2. The second `claim` will send the attendee a POAP, either to a new or existing NEAR wallet.  

In the first claim, **the doorman must be the only person capable of calling `claim`**. This is to prevent anyone else from admitting people into the event. The easiest way to do this would be to protect the first `claim` with a password only known by the doorman. More on [password-protected keys](../../../Concepts/Keypom%20Protocol/Github%20Readme/passwordprotect.md).

A flow chart of this process can be seen below.

<p align="center">
  <img src={require("/static/img/docs/advanced-tutorials/ticketing/ticketing.png").default} width="65%" height="65%" alt="ticketing"/>
</p>

To do this, the [Keypom JS SDK](https://github.com/keypom/keypom-js#installation) will be used in a React app.

:::info
Two React apps will be created, one for the event organizers capable of claiming tickets and another for the attendees that is only capable of showing the QR code and sending a POAP. 
:::