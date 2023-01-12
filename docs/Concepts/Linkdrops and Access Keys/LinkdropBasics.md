---
sidebar_label: 'Linkdrop Basics'
sidebar_position: 5
---
# How Linkdrops Work

For some background as to how linkdrops works on NEAR: 

*The funder that has an account and some $NEAR:* 
- creates a keypair locally `(pubKey1, privKey1)`. The blockchain doesn't know of this key's existence yet since it's all local for now.
- calls `send` on the contract and passes in the `pubKey1` as an argument as well as the desired `balance` for the linkdrop.
    - The contract will map the `pubKey1` to the desired `balance` for the linkdrop.
    - The contract will then add the `pubKey1` as a **function call access key** with the ability to call `claim` and `create_account_and_claim`. This means that anyone with the `privKey1` that was created locally, can claim this linkdrop. 
- Funder will then create a link to send to someone that contains this `privKey1`. The link follows the following format: 
```
    wallet.testnet.near.org/linkdrop/{fundingContractAccountId}/{linkdropKeyPairSecretKey}?redirectUrl={redirectUrl}
```
* `fundingContractAccountId`: The contract accountId that was used to send the funds.
* `linkdropKeyPairSecretKey`: The corresponding secret key to the public key sent to the contract.
* `redirectUrl`: The url that wallet will redirect to after funds are successfully claimed to an existing account. The URL is sent the accountId used to claim the funds as a query param.

*The receiver of the link that is claiming the linkdrop:* 
- Receives the link which includes `privKey1` and sends them to the NEAR wallet.
- Wallet creates a new keypair `(pubKey2, privKey2)` locally. The blockchain doesn't know of this key's existence yet since it's all local for now.
- Receiver will then choose an account ID such as `new_account.near`. 
- Wallet will then use the `privKey1` which has access to call `claim` and `create_account_and_claim` in order to call `create_account_and_claim` on the contract.
    - It will pass in `pubKey2` which will be used to create a full access key for the new account.
- The contract will create the new account and transfer the funds to it alongside any NFT or fungible tokens pre-loaded.


# Getting Started

There are several ways to get started using Keypom. You can use the NEAR CLI, our Keypom application, our Keypom SDK and more. In this section, we will go over how you can interact with Keypom and create drops using the NEAR-API-JS library and write simple node scripts.

## Prerequisites

In order to successfully interact with this contract using the deploy scripts, you should have the following: 

- [NEAR account](https://docs.near.org/concepts/basics/account)
- [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Deploy Scripts

There are 4 deploy scripts that have been made available for you to use and easily create Keypom links. These are for:
- Simple Drops
- NFT Drops
- FT Drops
- Function Call Drops

In order to use these scripts, open the `deploy/` directory and modify the `configurations.js` file for the drop you want to create. In this file, you can specify important information such as the number of keys you wish to create, the amount of $NEAR you want to send, how many uses per key etc.

You must specify the account that you will fund the drops with under the `FUNDING_ACCOUNT_ID` variable. This account needs to have keys stored in your `~/.near-credentials` folder. To do this, simply run `near login` on your terminal and follow the prompts using the NEAR CLI.

Once the `configurations.js` file has been modified to your liking, navigate back to the
root directory and run the deploy script.

For simple drops:
```
yarn simple
```
For FT drops:
```
yarn ft
```
For NFT drops:
```
yarn nft
```
For Function Call drops:
```
yarn fc
```