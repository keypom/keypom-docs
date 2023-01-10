---
sidebar_label: 'General Notes'
sidebar_position: 1
---
:::info

Most of the stuff in here that resembles function prototypes are grabbed from the [source code](https://github.com/keypom/keypom-js/tree/ben/docs-refactor-continued) comments . 

:::

It seems a lot of these functions operate on setting up the framework and a creating a vector of keypom functions to call, and then calling it last through the NEAR JS SDK in our execute function.  

### Wallet Selector Txns
With the JS SDK, the user has the option of using a wallet from the NEAR wallet selector to sign txns etc. If this is the case, the wallet can sign do some but will need a redirect to confirm a FAK for certain transactions that have an attached deposit (same rules as usual) OR where receiverID is not the Keypom contract. This is handled in the execute function, if(wallet), then it will flag txns as needing redirects and then will try to execute from there. 

## Keypom.ts
#### initKeypom()
Initializes the SDK to allow for interactions with the Keypom Protocol. By default, a new NEAR connection will be established but this can be overloaded by
 * passing in an existing connection object. In either case, if a funder is passed in, the credentials will be added to the keystore to sign transactions.
 * To update the funder account, refer to the `updateFunder` function. If you only wish to use view methods and not sign transactions, no funder account is needed.
 * If you wish to update the Keypom Contract ID being used, refer to the `updateKeypomContractId` function.
 * @param {Near} near (OPTIONAL) The NEAR connection instance to use. If not passed in, it will create a new one.
 * @param {string} network The network to connect to either `mainnet` or `testnet`.
 * @param {Funder=} funder (OPTIONAL) The account that will sign transactions to create drops and interact with the Keypom contract. This account will be added to the KeyStore if provided.
 * @param {string} keypomContractId The account ID of the Keypom contract. If not passed in, it will use the most up-to-date account ID for whichever network is selected.
 * @returns {Promise<Account | null>} If a funder is passed in, its account object is returned. Otherwise, it null is returned.  

#### updateFunder()
Once the SDK is initialized, this function allows the current funder account to be updated. Having a funder is only necessary if you wish to sign transactions on the Keypom Protocol.
 * @param {Funder} funder The account that will sign transactions to create drops and interact with the Keypom contract. This account will be added to the KeyStore if provided.
 * @returns Promise(Account) The funder's account object is returned.

#### updateKeypomContractId
This allows the desired Keypom contract ID to be set. By default
 * @param {string} keypomContractId The account ID that should be used for the Keypom contract.

## drops.ts
#### createDrop()
Capable of creating the 4 main drop types but not password protected. The FTs and NFTs associated with the drop are also added to the drop right away. 

 @param {Account=} account (OPTIONAL) If specified, the passed in account will be used to sign the txn instead of the funder account.
 * @param {BrowserWalletBehaviour=} wallet (OPTIONAL) If using a browser wallet through wallet selector and that wallet should sign the transaction, pass it in.
 * @param {string=} dropId (OPTIONAL) Specify a custom drop ID rather than using the incrementing nonce on the contract.
 * @param {string[]=} publicKeys (OPTIONAL) Add a set of publicKeys to the drop when it is created. If not specified, the drop will be empty.
 * @param {Number=} depositPerUseNEAR (OPTIONAL) How much $NEAR should be contained in each link. Unit in $NEAR (i.e 1 = 1 $NEAR)
 * @param {string=} depositPerUseYocto (OPTIONAL) How much $yoctoNEAR should be contained in each link. Unit in yoctoNEAR (1 yoctoNEAR = 1e-24 $NEAR)
 * @param {string=} metadata (OPTIONAL) String of metadata to attach to the drop. This can be whatever you would like and is optional. Often this is stringified JSON.
 * @param {DropConfig=} config (OPTIONAL) Allows specific drop behaviors to be configured such as the number of uses each key / link will have.
 * @param {FTData=} ftData (OPTIONAL) For creating a fungible token drop, this contains necessary configurable information about the drop.
 * @param {NFTData=} nftData (OPTIONAL) For creating a non-fungible token drop, this contains necessary configurable information about the drop.
 * @param {FCData=} fcData (OPTIONAL) For creating a function call drop, this contains necessary configurable information about the drop.
 * @param {SimpleData=} simpleData (OPTIONAL) For creating a simple drop, this contains necessary configurable information about the drop.
 * @param {boolean=} hasBalance (OPTIONAL) If the account has a balance within the Keypom contract, set this to true to avoid the need to attach a deposit.

#### getDrops
Gets drop per user and keys for each drop per user.  

#### deleteDrops
Refunds all assets, Deletes keys, withdraws from balance

## claim.ts
Allows a specific Keypom drop to be claimed via the secret key.
 * @param {string} secretKey The private key associated with the Keypom link. This can either contain the `ed25519:` prefix or not.
 * @param {string=} accountId (OPTIONAL) The account ID of an existing account that will be used to claim the drop.
 * @param {string=} newAccountId (OPTIONAL) If passed in, a new account ID will be created and the drop will be claimed to that account. This must be an account that does not exist yet.
 * @param {string=} newPublicKey (OPTIONAL) If creating a new account, a public key must be passed in to be used as the full access key for the newly created account.
 
