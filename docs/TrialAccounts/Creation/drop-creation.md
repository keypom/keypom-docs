---
sidebar_label: 'Create Your First Drop'
---


# Keypom Trial Accounts



Keypom Trial Accounts are an exciting new opportunity for Web3 apps to seamlessly onboard users whether they’re completely new to crypto or seasoned veterans. With the click of a link, users require no software, wallet setup, wallet connection, and are **instantly signed into apps** with their trial account, ready to make on-chain transactions.


<p align="center">
  <img src={require("/static/img/docs/trial-accounts/trial-landing-page.png").default} width="100%" height="15%" alt="ticketing"/>
</p>

:::info
Check out this slick [demo of Keypom Trial Accounts (4min)](https://www.youtube.com/watch?v=rQf_wlA5eEw).
:::

## Benefits

The key benefit of using trial accounts is that the app developers, also referred to as the funders of the trial accounts, have granular control over the smart contracts, methods and amounts of NEAR tokens used during the trial. These rules are specified when the trial account is created and ensure that the funder **cannot be rugged by the user**.

Traditionally on NEAR, [linkdrops](Concepts/Linkdrops%20and%20Access%20Keys/LinkdropBasics.md) have been used to create accounts containing $NEAR. Since this $NEAR is unlocked, users could simply take it and spend it *anywhere in the ecosystem*, exactly like giving someone cash. This defeated the purpose for app developers to provide users with a small amount of $NEAR to trial their applications.

With trial accounts, $NEAR is placed inside a smart contract deployed to the user's account along with rules specified by the app developer when the account is created. This means that giving away a trial account is not like giving cash, but instead **a gift card**.

Trial Accounts support all types of NEAR FunctionCall actions, including those with attached deposits e.g. 1 yocto for FT and NFT transfers, making them the ideal choice as a first touch point for new users to NEAR applications.

Our vision is for trial accounts to be the point of entry for onboarding onto any NEAR application. Once the trial is over, the user can exit to a full and unrestricted NEAR Account, retaining any assets they received during the trial period. The exit process happens through any external onboarding mechanism that supports the linkdrop standard such as FastAuth, MyNEARWallet etc.

## Creating Trial Accounts

The basic tutorials are meant as introductory guides that will help you create your first Keypom drops and understand the differences between the [types](/Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/introduction.md) of drops and the assets they contain. All drops created in these tutorials skip [drop configurations](../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/customization-homepage.md) to keep it simple.`


It is recommended you read through the [Getting Started](Basics/getting-started.md) guide before going into the tutorials.

<div class="container">
  <div class="row">
    <div class="col">
      <a href="Basics/simple-drops">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Simple Drop</h3>
            <p class="neutraltext">Onboarding with $NEAR.</p>
          </div>
        </div>
      </a>
    </div>
    <div class="col">
      <a href="Basics/nft-drops">
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
      <a href="Basics/ft-drops">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Fungible Token Drop</h3>
              <p class="neutraltext">Send users FTs</p>
          </div>
        </div>
      </a>
    </div>
    <div class="col">
      <a href="Basics/fc-drops">
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
<br></br>

## Integrating Trial Accounts Into Your App

These tutorials are meant to provide examples of real world use cases. These can range from ticketing, to subscriptions and customized onboarding experiences.

These pages are currently in progress, stay tuned!
