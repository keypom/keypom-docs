---
sidebar_label: 'Getting Started'
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

Traditionally on NEAR, [linkdrops](../Concepts/LinkdropsAndAccessKeys/linkdrop-basics.md) have been used to create accounts containing $NEAR. Since this $NEAR is unlocked, users could simply take it and spend it *anywhere in the ecosystem*, exactly like giving someone cash. This defeated the purpose for app developers to provide users with a small amount of $NEAR to trial their applications.

With trial accounts, $NEAR is placed inside a smart contract deployed to the user's account along with rules specified by the app developer when the account is created. This means that giving away a trial account is not like giving cash, but instead **a gift card**.

Trial Accounts support all types of NEAR FunctionCall actions, including those with attached deposits e.g. 1 yocto for FT and NFT transfers, making them the ideal choice as a first touch point for new users to NEAR applications.

Our vision is for trial accounts to be the point of entry for onboarding onto any NEAR application. Once the trial is over, the user can exit to a full and unrestricted NEAR Account, retaining any assets they received during the trial period. The exit process happens through any external onboarding mechanism that supports the linkdrop standard such as FastAuth, MyNEARWallet etc.

## Getting Started

To learn how to create trial accounts and integrate them into your app, there are a few basic tutorials to get you started.

:::note
Trial Accounts are still in early stage development and are not meant to be used for production. The Keypom team is working on finalizing the contract and getting it audited as soon as possible.
:::

<div class="container">
  <div class="row">
    <div class="col">
      <a href="Creation/understanding-trial-accounts">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Trial Accounts</h3>
            <p class="neutraltext">In-depth guide on Trial Accounts</p>
          </div>
        </div>
      </a>
    </div>
    <div class="col">
      <a href="Creation/drop-creation">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Integrate In Your Apps</h3>
              <p class="neutraltext">Learn how to be fully compatible with Trial Accounts!</p>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>
<br></br>