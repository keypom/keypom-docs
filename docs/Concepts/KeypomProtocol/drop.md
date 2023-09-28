---
sidebar_label: 'The Keypom Drop'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';

# The Keypom Drop
> A Keypom Drop is a collection of access keys that all share the same traits - such as assets and configurations. .

* ***Access Key***: A NEAR keypair, this is what each user receives to start their Keypom experience. 
  * Can have assets, such an NFT, FTs, NEAR or FunctionCalls, associated with them.  
  * When a user receives a key and claims it, they will receive those assets.  
* ***Drop***: A collection of access keys that all share the same traits - such as assets and configurations. 
  * As a funder, you create the drop and fund all the assets
  * You can add as many keys as you want to the drop, even after its creation.

An easy way to think about it is that you *create a drop* but you *distrubute keys*. 

___

## What are Assets?
> In the Keypom Protocol, an asset it something you attach to every key in your drop. When someone obtains and uses a key, they will receive the assets - either to a new or existing account. 

Assets can be NEAR, Fungible Tokens, Non-Fungible Tokens, or FunctionCalls. Each key in a drop holds the same assets, meaning a user can receive any key from the drop and be guarenteed the same set of assets. 

Access Keys can have multiple uses and their assets are defined **per use**. These can be mix-and-matched to craft any experience you want. An example can be seen below:


| **Key Use** | **Assets**                        |
|-------------|-----------------------------------|
| 1           | NEAR, FunctionCall, Fungible Token|
| 2           | Non-Fungible Token                |
| 3           | Fungible Token, NEAR              |


This means when the user claims their key for the first time, they will receive a FT, some NEAR and call a set of functions. On the second claim, they will receive an NFT while on the third and final claim, they will receive some NEAR and FTs. 

This behaviour is the same accross all the keys in the drop. As the drop funder, you would need to ensure your drop has all the necessary assets to fund all of the keys. For example, if each FT asset represents 1 Go-Team Token and you have 10 keys, you would need to fund your drop with 20 Go-Team Tokens. For more on how to use each asset, see the pages below. 

<div class="container">
  <div class="row">
    <div class="col">
      <a href="Assets/asset-types">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Asset Types</h3>
            <p class="neutraltext">Keypom building blocks.</p>
          </div>
        </div>
      </a>
    </div>
    <div class="col">
      <a href="Assets/basic-assets">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Simple Assets</h3>
              <p class="neutraltext">NEAR, NFTs and FTs</p>
          </div>
        </div>
      </a>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <a href="Assets/function-call">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Function Call Assets</h3>
            <p class="neutraltext">Supercharge your drop</p>
          </div>
        </div>
      </a>
    </div>
    <div class="col">
      <a href="Assets/asset-configurations">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Asset Configuration</h3>
              <p class="neutraltext">Change claim behaviour</p>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>
