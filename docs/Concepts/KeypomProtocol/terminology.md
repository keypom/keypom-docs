---
sidebar_label: 'Foundational Concepts'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Foundational Concepts
## Drops vs. Keys
At its core, Keypom is revolves around Access Keys and Drops. These two concepts are closely related.

* **Access Key**: A NEAR keypair, this is what each user receives to start their Keypom experience. 
  * Can have assets, such an NFT, FTs, NEAR or FunctionCalls, associated with them.  
  * When a user receives a key and claims it, they will receive those assets.  
* **Drop**: A collection of access keys that all share the same traits - such as assets and configurations. 
  * As a funder, you create the drop and fund all the assets
  * You can add as many keys as you want to the drop, even after its creation.

An easy way to think about it is that you *create a drop* but you *distrubute keys*. 

## What are Assets?
In the Keypom Protocol, assets can be NEAR, Fungible Tokens, Non-Fungible Tokens, or FunctionCalls. Each key in a drop holds the same assets, meaning a user can receive any key from the drop and be guarenteed the same set of assets. Assets are defined **per use** and can be mix-and-matched to craft any experience you want. An example can be seen below:


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
      <a href="AssetLoading/asset-types">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Asset Types</h3>
            <p class="neutraltext">Keypom building blocks.</p>
          </div>
        </div>
      </a>
    </div>
    <div class="col">
      <a href="AssetLoading/basic-assets">
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
      <a href="AssetLoading/function-call">
        <div class="card h-100 card-body">
          <div class="card__body">
            <h3 class="small-bottom-padding">Function Call Assets</h3>
            <p class="neutraltext">Supercharge your drop</p>
          </div>
        </div>
      </a>
    </div>
    <div class="col">
      <a href="AssetLoading/asset-configurations">
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



<Tabs>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```ts
// Deposit some amount of $NEAR or yoctoNEAR$ into the Keypom contract. This amount can then be used to create drops or add keys without having to explicitly attach a deposit every time. It can be thought of like a bank account.
export const addToBalance{
	/** Account object that if passed in, will be used to sign the txn instead of the funder account. */
	account?: Account,
	/** If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. */
	wallet?: AnyWallet,
	/** Amount of tokens to add but considering the decimal amount (non human-readable).
	Transferring one $NEAR should be passed in as "1000000000000000000000000" and NOT "1" */
	amountYocto?: string
	/** Human readable format for the amount of tokens to add.
	Transferring one $NEAR should be passed in as "1" and NOT "1000000000000000000000000" */
	amountNear?: string,
	/** When signing with a wallet, a success URl can be included that the user will be redirected to once the transaction has been successfully signed. */
	successUrl?: string
}

// Withdraw your balance back into your wallet. 
export const withdrawBalance {
	/** Account object that if passed in, will be used to sign the txn instead of the funder account. */
	account?: Account,
	/** If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. */
	wallet?: AnyWallet,
}

//This allows you to view your own or other people's Keypom balance. This can be useful to determine 
//if you need to top up if you are on the verge of creating a large drop
export const getUserBalance{ 
	accountId: string 
}
```

</TabItem>
<TabItem value="KP" label="📚 Protocol">

```rust
// Deposit some amount of $NEAR or yoctoNEAR$ into the Keypom contract. This amount can then be used to create drops or add keys without having to explicitly attach a deposit every time. It can be thought of like a bank account.
pub fn add_to_balance(&mut self)

// Allows users to withdraw their balance
pub fn withdraw_from_balance(&mut self) 

// Return the current balance for a given account
pub fn get_user_balance(&self, account_id: AccountId) -> U128
```

</TabItem>
</Tabs>



For example, Alice wants to add 10 $NEAR to her Keypom balance. She will do this by calling `addToBalance` and transferring 10 $NEAR to the Keypom contract. Then, if Alice wants to create a drop that costs her 5 $NEAR, she can simply create the drop and Keypom will automatically deduct from her internal Keypom balance rather than needing to transfer 5 $NEAR to the contract.  

Once she has created the drop, she can check her balance using `getUserBalance`, which will return 5 $NEAR. Then, she can withdraw this 5 $NEAR into her NEAR wallet; this will cause her Keypom balance to go down to 0 $NEAR. 
