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