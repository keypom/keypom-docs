# Keypom Executive Summary

> To discover the features and details of Keypom, begin your journey [here](Concepts/welcome).

Keypom provides **zero friction onboarding** and transactions for NEAR. We allow people to **experience** the value of blockchain technology *regardless of if they have a wallet or not*. 

All of the complications such as seed-phrases, private keys, transactions and other crypto jargon can be abstracted away from the end-user. We provide a means for people to use decentralized applications **without knowing they’re on-chain**.

Our goal is to be a community driven, public good that aims to show the world what is possible when you push NEAR’s technology to its limits. For the foreseeable future, our APIs (the Keypom Protocol) will be completely **fee-free**. Our entire solution is on-chain. There are no centralized databases and everything is run using NEAR smart contracts.

Our debut talk at NEARCON can be found [here](https://www.youtube.com/watch?v=J-BOnfhHV50&ab_channel=MattLockyer).

## The Blockchain Problem
Blockchain technology comes with many benefits such as sovereign ownership, digital rights, privacy, freedom, peer to peer coordination and much more. The problem with this technology, however, is that there is an *extremely high barrier to entry for an everyday individual*. None of it matters if nobody can onboard.

*It’s confusing to create and fund a crypto wallet*. People are unfamiliar with the process, technical jargon, general flow, and need to go through barriers such as KYC. *Why go through such hurdles just to experience an app?* In Web2, users can accrue value from applications without being forced to onboard first. Why can’t Web3 be the same?

## The Keypom Solution
On other chains, a common approach to onboarding users is to send them a pre-created, pre-loaded wallet. Keypom operates on the basis of NEAR’s unique [access key model](https://docs.near.org/concepts/basics/accounts/access-keys) which allows for much more flexibility in the end user-experience. With Keypom, you give the user a special type of access key that can be turned into a wallet. This key can be embedded within a simple Web2 style link that, once clicked, will allow them to input a desired account ID to be created.

The immediate benefit of this approach is that it allows the end-user to *customize their wallet with a name of their choosing* as opposed to being given a pre-created account.

### Sending Assets with Keypom
One of the simplest ways to onboard a user into the NEAR ecosystem is to use the Keypom protocol to create a link and load it with $NEAR and other assets. Behind the scenes, the protocol will associate the access key (embedded within the link) to the specified amount of $NEAR. Anyone who has the link can then gain access to the funds. 

These funds can be used to either create an entirely new named account, or can be sent to an existing wallet if the user already has one. 

The concept of sending NEAR can then be expanded to allow someone to not only load a link with native $NEAR, but also with Fungible Tokens and Non-Fungible Tokens as well.

The end user journey would be that an organization or funder deposits assets (either fungible or non-fungible) into the Keypom contract and generates a unique link. This link is then given to the user that wishes to onboard onto NEAR. When the link is clicked, the user either creates a new account or uses an existing one for the assets to be automatically sent to.

In the NEAR ecosystem, this process is known as a linkdrop.

### Customizable Linkdrops
The Keypom Protocol allows for a huge variety of customizations that can be embedded into the onboarding experience. For example, as the funder, you can specify the amount of times a link can be used before it’s invalidated. Rather than someone using a link once, they can potentially use it many times and receive assets over a long period of time.

### Function Calls with Keypom
The Keypom Protocol can also be used to execute predefined function calls on smart contracts when a link is used. For example, you could create a link that, when claimed, will automatically call a function to register the user into a DAO. This simple idea carries many powerful use-cases that, when paired with the customizable configurations and multi-use links, can create truly immersive and amazing onboarding experiences.


