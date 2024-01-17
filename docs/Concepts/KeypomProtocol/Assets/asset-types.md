---
sidebar_label: 'Asset Types'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';

# Asset Types
## Basics

<Admonition type="tip" icon="💡" title="Key Concept">
In the Keypom Protocol, an asset is something that is attached to every key in your drop. When someone obtains and uses a key, they will receive the assets - either to a new or existing account. 
</Admonition>

Assets are meant to create new experience and bring value to your users. There can be any number of mixed and matched assets for each key use. Assets can take on the following types: 

* **NEAR**
* **Fungible Tokens**
* **Non-Fungible Tokens**
* **Function Calls** 

Each key in a drop holds the same assets, meaning a user can receive any key from the drop and be guarenteed the same set of assets. 

Access Keys can have multiple uses and their assets are defined **per use**. These can be mix-and-matched to craft any experience you want. An example can be seen below:




| **Key Use** | **Assets**                        |
|-------------|-----------------------------------|
| 1           | NEAR, FunctionCall, Fungible Token|
| 2           | Non-Fungible Token                |
| 3           | Fungible Token, NEAR              |


This means when the user claims their key for the first time, they will receive some FTs, some NEAR and call a set of functions. On the second claim, they will receive an NFT while on the third and final claim, they will receive some NEAR and FTs. 

New with Keypom V3, you can mix-and-match and add multiple different types of assets per use, for as many key uses/claims as you want! 

<div class="container">
  <div class="row">
    <div class="col">
      <a href="basic-assets">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">NEAR, NFT, & FT Assets</h3>
            <p class="neutraltext">Add value to your drop using tokens!</p>
          </div>
        </div>
      </a>
    </div>
    <div class="col">
      <a href="function-call">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Function Call Assets</h3>
              <p class="neutraltext">Call any NEAR smart contract </p>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>

___

## Defining vs Funding Assets
An important distinction to be made is the difference between defining and funding assets. Defining an asset is similar to creating a blueprint for your drop while funding is the process of building it.

:::caution
If assets are not properly funded, your drop may not perform as expected. Proper funding is formally defined in [next section](basic-assets.md).
:::