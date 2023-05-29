---
sidebar_label: 'Offboarding Trial Accounts'
---
# Introduction

In this tutorial, you'll learn how to support trial accounts exiting into your wallet.

Trial Accounts are a great way to onboard new users to applications with the click of a link. The in-app experience is seamless but at some point, the trial must end. This process should remove all restrictions from the user's account and allow them to interact with the any app on NEAR. This process is known as offboarding and is a critical part of the user's journey.

As part of the offboarding process, a full access key will be added to the account and this should be stored somewhere safe. For this reason, we wanted to make sure trial accounts could be exited into any wallet or app that supports the official linkdrop standard (e.g MyNEARWallet / FastAuth).

The desired user experience is as follows:
1. Click a link or scan a QR code.
2. Enter a username.
3. Immediately get signed into the app and start using it.
4. Once your trial is over, a modal pops up with options for onboarding.
5. Click the desired option (such as MyNEARWallet) and get redirected.
6. Offboard with the app and get a new private key based on the option you chose (seedphrase, biometrics etc.)
7. The trial account has now been converted into a full, unrestricted NEAR account that can interact with the rest of the ecosystem.

<p align="center">
  <img src={require("/static/img/docs/trial-accounts/trial-over-guestbook.png").default} width="60%" height="15%" alt="ticketing"/>
</p>

## Utilizing Linkdrops

Most wallets support linkdrop claiming since it leads to more opportunities for them to gain new users. This can be used to our advantage if the trial account offboarding process is treated as a regular linkdrop, then the account can be offboarded into almost every wallet. Before learning how this is accomplished, you should first understand the basics of claiming linkdrops.

### Claiming

As per the official linkdrop standard, there are 3 methods that are important for claiming linkdrops:

```ts
/// Returns the KeyInfo associated with a given public key
/// Panics if the key does not exist
function get_key_information(key: string) -> KeyInfo

/// Transfer assets linked to a given public key to an `account_id`.
///
/// Arguments:
/// * `account_id` the account that should receive the linkdrop assets.
///
/// Returns `true` if the claim was successful meaning all assets were sent to 
/// the `account_id`.
function claim(account_id: string) -> Promise<boolean>

/// Creates a new NEAR account and transfers all assets linked to a given public 
/// key to the *newly created account*.
/// 
/// Arguments:
/// * `new_account_id`: the valid NEAR account which is being created and should 
///   receive the linkdrop assets
/// * `new_public_key`: the valid public key that should be used for the access 
//    key added to the newly created account.     
///
/// Returns `true` if the claim was successful meaning the `new_account_id` was 
/// created and all assets were sent to it.
function create_account_and_claim(new_account_id: string, new_public_key: string) -> Promise<boolean>
```

For an arbitrary linkdrop (a URL containing the contract and secret key), the flow is as follows:
1. The user clicks a link or scans a QR code representing the linkdrop.
2. The app calls `get_key_information` to check what's in the linkdrop.
    - If the linkdrop was already claimed (or doesn't exist), the call will panic and the frontend should indicate that the drop is invalid.
3. Depending on what is returned from the call, the app should display what assets the user is about to claim (e.g NFTs, FTs, $NEAR etc.)
4. The frontend exposes a form field and the user either inputs a new account or an existing one.
5. If a new account is created, the frontend will call `create_account_and_claim` and pass in the new account ID and an access key that will have full access permission over the account.
    - This key is generated based on what the app allows. For example, MyNEARWallet generates the key using a seedphrase while FastAuth generates it using biometrics.
6. The linkdrop is claimed and the assets are sent to the user's account.

### Trial Account Linkdrops

Now that the basics of linkdrop claiming have been covered, you'll look at how trial accounts can be treated as a linkdrop. From above, there are a few requirements that need to be met:
- The URL should contain a contract and secret key
- The trial contract should implement the `get_key_information` method so that frontends know when a drop is valid.
- The trial contract should implement the `create_account_and_claim` method for claiming.

Recall that for claiming assets to a new account, linkdrop contracts will create the account and add the public key as a full access key to the account. This access key is generated on a per-app basis. For example, MyNEARWallet generates the key using a seedphrase while FastAuth generates it using biometrics. 

In the case of the trial account contract, the exact same flow can happen except the account creation is *already done*. When calling `create_account_and_claim`, the contract should accept the new public key and do the following (assuming the account can exit):
1. Delete the existing limited access key used during the trial.
2. Create a new access key with the `new_public_key` and give it full access to the account.
3. Repay the funder for any required $NEAR.
4. Delete any state that is being used by the contract.
5. Delete the trial contract and free up all the storage.

Notice that the only parameter that was *actually* used was `new_public_key` but in the official linkdrop standard, the `create_account_and_claim` function takes two parameters:

```ts
function create_account_and_claim(new_account_id: string, new_public_key: string)
```

The `new_account_id` field is disregarded by the trial account contract since the account already exists. You can pass in any value for this field and it will be ignored.

For example, the following code could be used to completely offboard a trial account using `near-api-js`. The pseudo code is:
1. Initialize the NEAR connection.
2. Set the trial account key in the keystore.
3. Get the key information and check if the account can exit the trial.
4. Generate a random keypair that will be used as the account's new full access key.
5. Call `create_account_and_claim` with the new public key and the required gas coming from the call to get key information.

```ts
const NETWORK_ID = 'testnet';
// Generate a new keystore and connect to the NEAR network
let keyStore = new keyStores.InMemoryKeyStore();  

let nearConfig = {
    networkId: NETWORK_ID,
    keyStore: keyStore,
    nodeUrl: `https://rpc.${NETWORK_ID}.near.org`,
    walletUrl: `https://wallet.${NETWORK_ID}.near.org`,
    helperUrl: `https://helper.${NETWORK_ID}.near.org`,
    explorerUrl: `https://explorer.${NETWORK_ID}.near.org`,
};  

let near = await connect(nearConfig);

// Account ID of the trial account
const trialAccountId = "benji-demo-12345.testnet";

// Trial Account Secret Key
const trialAccountSecretKey = "5XorwuVXhTpscqddyyrRB9QVZDTn3mut9Zeu7drtdxexurhgf2V4WHJ8RyLoJppmHagMg6gcdAQrG8gJf9JA2XB"
const keyPair = KeyPair.fromString(trialAccountSecretKey);
await keyStore.setKey(NETWORK_ID, trialAccountId, keyPair);

// Create the account object for the trial
const trialAccountObj = new Account(near.connection, trialAccountId);

// Check if the trial account is able to exit
const keyInfo = await trialAccountObj.viewFunction(trialAccountId, 'get_key_information', {key: keyPair.getPublicKey().toString()});
if (keyInfo.trial_data?.exit == true) {
    // This will be the full access key for the new account
    const newKeyPair = KeyPair.fromRandom('ed25519');
    
    // How much gas should be attached to the create account call
    const requiredGas = keyInfo.required_gas;

    // If the account can exit, generate a new random access key which will be used for the full access key
    await trialAccountObj.functionCall({
        contractId: trialAccountId, 
        methodName: 'create_account_and_claim', 
        args: {
            new_account_id: "",
            new_public_key: newKeyPair.getPublicKey().toString()
        }, 
        attachedDeposit: 0, 
        gas: requiredGas
    });
}
```

### Rendering Linkdrops

Wallets and apps that support the claiming of linkdrops should render their claim pages differently depending on what assets are contained in the linkdrop. For example, if the linkdrop contains $NEAR, the page could look like this:

<p align="center">
  <img src={require("/static/img/docs/trial-accounts/keypom-claim-near.png").default} width="60%" height="15%" alt="ticketing"/>
</p>

If the linkdrop contains NFTs, the page could look like this:

<p align="center">
  <img src={require("/static/img/docs/trial-accounts/keypom-claim-nft.png").default} width="30%" height="15%" alt="ticketing"/>
</p>

This is done using the `get_key_information` method and rendering the page depending on the result. In the official linkdrop standard, the return value is an object `KeyInfo` that looks as follows:

```ts
/// Information about a specific public key.
type KeyInfo = {
   /// How much Gas should be attached when the key is used to call `claim` or `create_account_and_claim`.
   /// It is up to the smart contract developer to calculate the required gas (which can be done either automatically on the contract or on the client-side).
   required_gas: string,

   /// yoctoNEAR$ amount that will be sent to the account that claims the linkdrop (either new or existing)
   /// when the key is successfully used.
   yoctoNEAR: string,

   /// If using the NFT standard extension, a set of NFTData can be linked to the public key      
   /// indicating that all those assets will be sent to the account that claims the linkdrop (either new or   
   /// existing) when the key is successfully used.
   nft_data: NFTData[] | null,
  
   /// If using the FT standard extension, a set of FTData can be linked to the public key      
   /// indicating that all those assets will be sent to the account that claims the linkdrop (either new or   
   /// existing) when the key is successfully used.
   ft_data: FTData[] | null

   /// ... other types can be introduced and the standard is easily extendable.
}
```

The frontend can check what's contained and render the page accordingly.

## Supporting Trial Account Offboarding

This idea of conditional rendering is the key to supporting trial account offboarding. In general, when a frontend renders the page for users that will call `create_account_and_claim`, the flow is as follows:
1. Show the user what assets they've received
2. Prompt the user for a new username
3. Give the user their private key (biometrics, seedphrase, etc.)
4. Call `create_account_and_claim` with the new username and the generated public key

While this approach *could* work with trial accounts, it is not ideal as there's no need to ask for a username since the account already exists.

### Rendering Trial Account Linkdrops

A better flow for offboarding trial accounts would be to skip the new username prompt mentioned above. This means that the user's journey would look like this:

1. Show the user a screen indicating that they're about to exit the trial account
3. Give the user their private key (biometrics, seedphrase, etc.)
4. Call `create_account_and_claim` with an empty username and the generated public key

In order to support this flow, the frontend should check if the linkdrop contains a trial account. This can be done by checking the information returned from `get_key_information`. The trial accounts will return the following object:

```ts
/// Information about a specific public key.
type KeyInfo = {
  /// How much Gas should be attached when calling `create_account_and_claim` in order to exit the account
  required_gas: string,

  /// This will always be zero for trial accounts since the linkdrop doesn't contain $NEAR and instead contains the actual account
  yoctoNEAR: '0',

  /// Specific data that is used to determine whether or not a linkdrop is a trial account
  trial_data: {
    /// If the trial account can exit, this will be true.
    exit: boolean
  }
}
```

If the `trial_data` field is present, the frontend can assume that the linkdrop is a trial account and render the page accordingly.

### In Summary

Frontends that support the official linkdrop standard should be able to ingest an arbitrary linkdrop and render their claim page based on the assets contained in the drop. While the standard officially supports only 3 types of drops: $NEAR, NFTs, and FTs, it is easily extendable to support other types of assets. 

In the case of trial accounts, the key information will return a new field `trial_data` that will indicate whether or not the account can exit. If the exit boolean is set to true, the frontend should skip the prompt for a new username and directly call `create_account_and_claim` while passing in an empty username and the corresponding public key that should be added as full access.