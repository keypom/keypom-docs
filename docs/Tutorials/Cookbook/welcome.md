---
sidebar_label: 'Introduction'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Introduction
Welcome to the Keypom cookbook! Here you can explore Keypom's building blocks that help create awesome onboarding experiences. The idea of these pages is for them to act as a quick reference for common use cases when using Keypom protocol. Every use case will have a corresponding code snippet, using the Keypom JS SDK and Rust. 
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)
3. *Insert rust one here, i actually have no idea how to do that*

## Connection to NEAR and Initializing the SDK
When working with the SDK, you will always need to connect to NEAR and initiate Keypom using the `initKeypom` function. This will always be the first function you call to interact with the SDK. 

`initKeypom` initializes the SDK to allow for interactions with the Keypom smart contracts. Without it, none of the other SDK functions would work as expected. [More info](../../keypom-sdk/Core/modules.md#initkeypom) on the `initKeypom` function.

```js reference
https://github.com/keypom/keypom-docs-examples/blob/8202f0ef88205bfca644ccf5d4d3cfb460f88f15/basic-tutorials/simple-drop/simple-example.js#L10-L35
```

---

## Cookbook Sections
<div class="container">
  <div class="row">
    <div class="col">
      <a href="drops">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Drops</h3>
            <p class="neutraltext">A collection of keys.</p>
          </div>
        </div>
      </a>
    </div>
    <div class="col">
      <a href="keys">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Keys</h3>
              <p class="neutraltext">Keypom's core building block</p>
          </div>
        </div>
      </a>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <a href="balances">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Keypom Balances</h3>
              <p class="neutraltext">Debit Card</p>
          </div>
        </div>
      </a>
    </div>
    <div class="col">
      <a href="utilities">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Utilities</h3>
              <p class="neutraltext">Extending Keypom's use cases</p>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>
<br></br>
