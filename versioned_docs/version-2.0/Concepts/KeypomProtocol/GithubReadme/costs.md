---
sidebar_label: 'Costs'
sidebar_position: 4
---
# Costs

It is important to note that the Keypom contract is 100% **FEE FREE** and will remain that way for the *foreseeable future*. This contract is a public good and is meant to inspire change in the NEAR ecosystem.

With that being said, there are several mandatory costs that must be taken into account when using Keypom. These costs are broken down into two categories: per key and per drop.

> **NOTE:** Creating an empty drop and then adding 100 keys in separate calls will incur the same cost as creating a drop with 100 keys in the same call.

## Per Drop

When creating an empty drop, there is only one cost to keep in mind regardless of the drop type:
- Storage cost (**~0.006 $NEAR** for simple drops)

## Per Key
Whenever keys are added to a drop (either when the drop is first created or at a later date), the costs are outlined below.

### Key Costs for Simple Drop

- $NEAR sent whenever the key is used (can be 0).
- Access key allowance (**~0.0187 $NEAR per use**).
- Storage for creating access key (**0.001 $NEAR**).
- Storage cost (**~0.006 $NEAR** for simple drops)

### Additional Costs for NFT Drops

Since keys aren't registered for use until **after** the contract has received the NFT, we don't know how much storage the token IDs will use on the contract. To combat this, the Keypom contract will automatically measure the storage used up for storing each token ID in the `nft_on_transfer` function and that $NEAR will be taken from the funder's balance.

### Additional Costs for FT Drops

Since accounts claiming FTs may or may not be registered on the Fungible Token contract, Keypom will automatically try to register **all** accounts. This means that the drop creators must front the cost of registering users depending on the `storage_balance_bounds` returned from the FT contract. This applies to every use for every key.

In addition, Keypom must be registered on the FT contract. If you create a FT drop and are the first person to ever do so for a specific FT contract on Keypom, Keypom will be automatically registered when the drop is created. This is a one time cost and once it is done, no other account will need to register Keypom for that specific FT contract.

### Additional Costs for FC Drops

Drop creators have a ton of customization available to them when creation Function Call drops. A cost that they might incur is the attached deposit being sent alongside the function call. Keypom will charge creators for all the attached deposits they specify.

> **NOTE:** The storage costs are dynamically calculated and will vary depending on the information you store on-chain.

## Deleting Keys and Drops

Creators have the ability to delete drops and keys at any time. In this case, **all** the initial costs they incurred for the remaining keys will be refunded to them (minus Gas fees of course).

## Automatic Refunds When Keys are Used

One way that Keypom optimizes the fee structure is by performing automatic refunds for some of the initial costs that creators pay for when keys are used. All the storage that is freed along with any unused allowance is automatically sent back to the creator whenever a key is used. This model drastically reduces the overall costs of creating drops and creates incentives for the keys to be used. 

## Account Balances for Smooth UX

In order to make the UX of using Keypom seamless, the contract introduces a debiting account model. All costs and refunds go through your account's balance which is stored on the contract. This balance can be topped up or withdrawn at any moment using the `add_to_balance()`  and `withdraw_from_balance()` functions.

This account balance is not *required*, however. You can create a drop by attaching a deposit to the call. Keep in mind that this will create an account balance for you behind the scenes, however.


## Built With

- [near-sdk-rs](https://github.com/near/near-sdk-rs)
- [near-api-js](https://github.com/near/near-api-js)