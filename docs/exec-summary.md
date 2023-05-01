# Keypom Executive Summary

> To discover the features and details of Keypom, begin your journey [here](Concepts/welcome.md).

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

In the NEAR ecosystem, this process is known as a linkdrop. With Keypom, a series of identical linkdrops can be created at once and is referred to as **a drop**.

### Customizable Linkdrops
The Keypom Protocol allows for a huge variety of customizations that can be embedded into the onboarding experience. For example, as the funder, you can specify the amount of times a link can be used before it’s invalidated. Rather than someone using a link once, they can potentially use it many times and receive assets over a long period of time.

### Function Calls with Keypom
The Keypom Protocol can also be used to execute predefined function calls on smart contracts when a link is used. For example, you could create a link that, when claimed, will automatically call a function to register the user into a DAO. This simple idea carries many powerful use-cases that, when paired with the customizable configurations and multi-use links, can create truly immersive and amazing onboarding experiences.

Learn more about Keypom's Drop types below

<div class="container">
  <div class="row">
    <div class="col">
      <a href="Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/simple-drops">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Simple Drop</h3>
            <p class="neutraltext">Onboarding with $NEAR.</p>
          </div>
        </div>
      </a>
    </div>
    <div class="col">
      <a href="Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/nft-drops">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Non-Fungible Token Drops</h3>
              <p class="neutraltext">Share an NFT with a link</p>
          </div>
        </div>
      </a>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <a href="Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/ft-drops">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Fungible Token Drop</h3>
            <p class="neutraltext">Send users FTs</p>
          </div>
        </div>
      </a>
    </div>
    <div class="col">
      <a href="Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/fc-drops">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Function Call Drops</h3>
              <p class="neutraltext">Onboard with Keypom's most powerful drop</p>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>

## Use Cases

Here are just a few of the possibilities with Keypom

### NFT Ticketing
The problem with current NFT ticketing systems is that they require users to have a wallet. This is a huge barrier to entry for people that are attending events but don’t have wallets. In addition, there is often no proof of attendance for the event as the NFT is burned in order to get into the event which requires an internet connection.

Keypom aims to solve these problems by having a ticketing system that has the following features.

* Users are not required to have a wallet to enter the event.
* Each ticket is unique and can only be used by one person.
* Attendees are not required to have wifi to gain entry to the event.
* Attendees that did not have a NEAR wallet can get one for free.
* Attendees can choose to receive an NFT proving their attendance at the event. This is commonly known as a [POAP](https://academy.binance.com/en/glossary/proof-of-attendance-protocol-poap).


In addition, some way to provide analytics to event organizers that contains information such as links that were:
* Given out but not clicked at all.
* Clicked but not attended.
* Partially claimed indicating the number of people that attended but did not onboard or receive a POAP.
* Fully claimed indicating the number of people that attended and received a POAP.

### Recurring Payments/Subscriptions
Recurring payments are quite a common situation. Let’s say you need to send someone $50 USDC every week. You could create a key with 5 claims that has a throttle_timestamp of 1 week. You would then pre-load maybe the first week’s deposit of $50 USDC and register 1 use or you could send $500 USDC for the first 10 weeks. At that point, you would simply hand over the key to the user and they can claim once a week.


### Auto-Registration in to DAOs
DAOs are a raging topic in crypto. The problem with DAOs, however, is there is a barrier to entry for users that aren’t familiar with the specific chain they’re built on top of. Users might not have wallets or understand how to interact with contracts. On the contrary, they might be very well versed or immersed in the DAO’s topics. They shouldn’t be required to create a wallet and learn the onboarding process.

With Keypom, you can create a function call drop with the main purpose of registering users into a DAO. For people that have a wallet, this will act as an easy way of registering them with the click of a link. For users that don’t have a wallet and are unfamiliar with NEAR, they can be onboarded and registered into the DAO with the same click of a link.

