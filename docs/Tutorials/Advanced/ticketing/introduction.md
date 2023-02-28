---
sidebar_label: 'Introduction'
---
# Introduction
The problem with current Web3 ticketing systems is that it requires users to have a wallet. You receive an NFT as your ticket and when you enter the venue, it is burnt. This is a huge barrier to entry for people that are either non crypto-native or use ledgers. In addition, there is often no proof of attendance for the event as the NFT is burnt (which also requires an internet connection).

With Keypom, instead of your ticket being an NFT, users can now get into events by using an access key embedded in a simple Web2 style link. When clicked a QR code containing the access key, which can only be scanned and claimed by the doorman, is exposed. Only a screenshot of the QR code is exposed which means no wifi is needed to get into the event. With this new system in mind:
* No wallet is needed to enter the event or receive a POAP.
* No wifi is needed at the door.
* An NFT is minted on-demand for each user that attends the event.
* Users can optionally onboard onto NEAR if they don't have a wallet.

In addition, since everything lives on-chain, we can provide analytics to event organizers that contains information such as links that were:
* Given out but not clicked at all.
* Clicked but not attended.
* Partially claimed indicating the number of people that attended but did not onboard or receive a POAP.
* Fully claimed indicating the number of people that attended and received a POAP.

<p align="center">
  <img src={require("/static/img/docs/advanced-tutorials/ticketing/ticketing.png").default} width="65%" height="65%" alt="ticketing"/>
</p>

In this tutorial, you'll learn how to create this unparalleled ticketing experience.

:::info
🚧 Full tutorial coming soon... 🚧
:::