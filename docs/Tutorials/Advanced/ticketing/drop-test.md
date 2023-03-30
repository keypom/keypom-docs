---
sidebar_label: 'Testing the Drop'
---
# Creating the Drop

## Introduction
In this section you'll take the first step to creating the ticketing experience by designing the drop. This drop will be tailored according to the functionality and specifications found in the [Solution Architecture](architecture.md#keypom-solution).

Recall that the drop needs the following properties:

* An FC drop must be used whereby each key has 2 uses.
* The first key use is a `null` method that is password protected.
* The second key use will have $NEAR to create a new wallet and it will also call `nft_mint` on an NFT contract which will send the new or existing account a POAP.


:::info note
The NFT POAP is optional to include as the event organizer. You may omit it, or replace it with your own function call if you wish. In this tutorial, the POAP will be minted on the second key use. 
:::

The process for creating this drop can be broken down into three stages.

1) Connect to the NEAR blockchain.  
2) Create the drop with function call data.  
3) Make the NFT series for POAPs.

Starting at the `keypom-js` directory, navigate to `docs-advanced-tutorials/frontend/utils`. 
```bash
cd docs-advanced-tutorials/ticket-app-skeleton/frontend/utils
```

There, you can see the following skeleton code in the file `createTickDrop.js`.
``` js reference
https://github.com/keypom/keypom-js/blob/8b52d854bf8bc39b92e28c0150dbeceb97ad5ddf/docs-advanced-tutorials/ticket-app-skeleton/frontend/utils/createTickDrop.js#L1-L22
```

## Getting Started
In this section, you'll be addressing the first step: connecting to NEAR. 

This is done with `NEAR-API-JS` and consists of:

1) Create a Keystore, which stores your access keys used to sign transactions   
  * select a network, either `testnet` or `mainnet`  
  * choose a location where the keypairs live, either a folder on your local machine, or in-memory      

2) Define a NEAR configuration using the Keystore  
3) Use the configuration to initialize a connection to NEAR  

More information about this process can be found [here](https://docs.near.org/tools/near-api-js/quick-reference#key-store).

:::note
For simplicity, this tutorial will choose a file-based keystore and point to the `~/.near-credentials` folder on your local machine since this is where most of your keys are stored. For more information about KeyStores, visit NEAR's [official docs](https://docs.near.org/tools/near-api-js/quick-reference#key-store).
:::

```js reference
https://github.com/keypom/keypom-js/blob/63db8ff15510db8acffc849e46a0a6b1f6889cef/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L9-L27
```

---

## Host Claiming Code
Before testing the drop logic, a utility script `hostClaim` will be introduced. This script will be used both to test the drop logic and in the host scanner page. 

The primary purpose of this script is to work with the host's scanner and allow entry to attendees with valid tickets that have not yet entered the event. This means it will check for a few conditions before returning a success value. 

* The ticket contains a valid key embedded in the QR code.
* The ticket has not been scanned yet.
* The password entered by the host was correct and the claim was successful

The `hostClaim` utility function receives a private key, `privKey`, and an optional `basePassword`. It defaults to a failed claim, and the failure to meet any of the above conditions causes the entire function to end early and return the failed claim. Only once all the checks have passed, does the function return a successful claim. 

With this approach, it can fulfill the previous conditions using the following code.

```js reference
https://github.com/keypom/keypom-js/blob/63db8ff15510db8acffc849e46a0a6b1f6889cef/docs-advanced-tutorials/ticket-app/frontend/utils/utilFunctions.js#L8-L56
```

## Testing Drop Logic
With the drop created and a host claiming utility function defined, some code can be written to test the actual logic to ensure that the ticket claiming process works as expected. This will be broken down into phases, similar to the actual ticketing experience. 

The [`hostClaim`](drop.md#host-claiming-code) utility function will be used to emulate the host scanning tickets at the door.

### Gaining Entry
The first phase of the ticketing experience can be labelled as pre-entry, when the attendee is looking to enter the event. Here, you want to ensure that only the host can allow them in, meaning the first key use must only be claimable with the correct password. 

The following code can be used to test this logic, following the drop creation. 

```js reference
https://github.com/keypom/keypom-js/blob/2ba843c79fbcbab8c97627d6b52024ec53b7997d/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L95-L119
```

It's expected that after a `hostClaim` with the incorrect password, the current key use would remain at 1, while  it would increment to 2 after a successful `hostClaim`. Asserts are used to catch any discrepencies from expected behavior.

### Preventing Multiple Entries
Once an attendee has been admitted, they may try to share their ticket, or pass the ticket back to admit multiple people. To test and prevent this, another `hostClaim` call can be made on the same key using the same parameters. If `hostClaim` correctly detects that the key has already been scanned and refuses to claim, the current key use will remain at 2.

```js reference
https://github.com/keypom/keypom-js/blob/2ba843c79fbcbab8c97627d6b52024ec53b7997d/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L121-L127
```

### Claiming the POAP
The next phase of the ticketing experience is allowing the attendee to claim their POAP. As this is done on their own as opposed to using the scanner, there should be no password protecting this `claim`. This can be testing by simply calling `claim`. 

If successful, its expected that the key will be depleted and deleted, as it has used up all of its key uses. This should mean any attempt to get key information using `getKeyInformation` should fail as the key no longer exists. 

```js reference
https://github.com/keypom/keypom-js/blob/afb4765d1102552348af7fe73e04ed3dd1a46079/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L130-L143
```

### The Edge Cases
The last two cases to be tested are claiming with a depleted key, and claiming with a fake key. The following tests can be used. Similar to the last scenario, it's expected that both of these should throw errors.

``` js reference
https://github.com/keypom/keypom-js/blob/2ba843c79fbcbab8c97627d6b52024ec53b7997d/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L145-L176
```

With the drop functionality tested, you can be confident in the logic behind the scenes and focus on the app behaviour. 

---


## Full Code
Now that everything has been put together, the final code can be seen below.

```js reference
https://github.com/keypom/keypom-js/blob/2ba843c79fbcbab8c97627d6b52024ec53b7997d/docs-advanced-tutorials/ticket-app/frontend/utils/createTickDrop.js#L1-L179
```

---

## Running the Script
Here, you'll learn how to run the code that was just covered, and what to expect. It's assumed that you have already cloned the code from the [Keypom SDK repo](https://github.com/keypom/keypom-docs).

:::caution
Prior to running these scripts, ensure you replace all instances of `minqi.testnet` and its private key in the script with the credentials of your account found in your `~/.near-credentials` folder
:::

To run the script, use the following command from the `keypom-js/docs-advanced-tutorials/ticket-app-skeleton/frontend/utils` directory:
```bash
node createTickDrop
```

If you would like to run the completed script, you can run the command below from the `keypom-js` directory:
```bash
cd docs-advanced-tutorial/ticket-app && node frontend/utils/createTickDrop
```
This should return a successful drop creation, console log your public keys, linkdrops, and the expected test messages.
<details>
<summary>Drop Creation Example Output</summary>
<p>

```bash
Receipts: 5JhgCP75aA1sqRzWNuTBKzNMd3g3nqG4aocoryyqzC2R, 8JVKutFDS7HqZt9wz3tLd2ByN6zYLBcUHkAZKCPgrtF6
        Log [v2.keypom.testnet]: Current Block Timestamp: 1679957159824749662
        Log [v2.keypom.testnet]: 21 calls with 105000000000000 attached GAS. Pow outcome: 1.8602935. Required Allowance: 20248156910387200000000
        Log [v2.keypom.testnet]: Total required storage Yocto 108990000000000000000000
        Log [v2.keypom.testnet]: Current balance: 4.6006428, 
            Required Deposit: 2.5239531, 
            total_required_storage: 0.10899,
            Drop Fee: 0, 
            Key Fee: 0 Total Key Fee: 0,
            allowance: 0.0404963 total allowance: 0.4049631,
            access key storage: 0.001 total access key storage: 0.01,
            deposits less none FCs: 0.1 total deposits: 1 lazy registration: false,
            deposits for FCs: 0.1 total deposits for FCs: 1,
            uses per key: 2
            None FCs: 1,
            length: 10
            GAS to attach: 100000000000000
        Log [v2.keypom.testnet]: New user balance 2.0766897
        Log [v2.keypom.testnet]: Fees collected 0
Public Keys and Linkdrops:  {
  'ed25519:8UBt5JDAnyQUivd35vrrRJFiKoE7u4e5KE3dzksN6wax': [
    'http://localhost:1234/v2.keypom.testnet/4jhgJ9i5N91KNRmBrRGHvzMxt2uLJcuwQys5ZMBHBNNAa1yvxW7uqrp77NbYC7xx323UxfdQv3kVD9nRKKAusHsW'
  ],
  'ed25519:BKn8sjsieNzTwk6mkH49H4E3JaQmxzY2prx9miG98f7r': [
    'http://localhost:1234/v2.keypom.testnet/27G9DTNAUGUwAdNRt9hu1ScnyAyQc7wg75DiCSuMJFpkFtqSymWQ42Nuji6tEVTYsuR6Y1LHYwHEhvDoArDLMh9W'
  ],
  'ed25519:AofHhEcmyteic3sxgMQiWSzWxf5PmhffjhebcrKeFU6K': [
    'http://localhost:1234/v2.keypom.testnet/3W2YKogGjVbAKZx6fBVFnqYiRMQmWYSdtkrkQ7obGjW3TQFF1qrqpykFELXV6L8Kbfnji2nNyaYAu8PPpgCV5Un3'
  ],
  'ed25519:DZ3EY8RRnTW7A5YQZxnPyn9EAEYPq32jLm7VHDa24fYP': [
    'http://localhost:1234/v2.keypom.testnet/p8iKBAqAiLB46outV7xLyu1ConE6PqTHDJtvZd5r3D2qV7zmywDjSywartFKuDjr4oDqF8NddYo3KcVJrxQ6nc3'
  ],
  'ed25519:FVnPx5FL6zs4LKTYA6oWJ4PgkMG9EbToZFcbnAxxb9vT': [
    'http://localhost:1234/v2.keypom.testnet/4Lcyspd3j3iWYdtjnRkVssr7UqgYxGTh4MCnfopJ9RRLz4SPhEmHbj2dFBNwtWz3vXtVqaYzrUcPwK7tm1vNaYEw'
  ],
  'ed25519:D3zTjNBmMtttJx3EkWkYoCsxm65kTqGreSsCQNqrwAGa': [
    'http://localhost:1234/v2.keypom.testnet/5cjPgbPUwcL2LePV9gEcTSZyRKGTuXd92z2ye3w3SHSPtnPTZYgZ3NPqkzvGfJQdETH41GoAiX5LgCANrYdnTyVt'
  ],
  'ed25519:BCETK27WTmG4YGPHp9RPK3umuX7QykSuRsr7bfF2ZxCU': [
    'http://localhost:1234/v2.keypom.testnet/wMn36LU15Dp29h7DX1Fu9deZorFGZ9jMtc76BbRtru5GYHcChUKc59ojVE1Nfc9V6VCL1uKw7oC3JSpq8Jmkstx'
  ],
  'ed25519:FUneyc8RxgWCod3WTUY4VNbfCUXc7aJkqz1oXT1VbVsQ': [
    'http://localhost:1234/v2.keypom.testnet/nkkdy7X8J7fv21J3vVEuRQFPZYvQGi4gdnbEjbG4ZtZozQTGS4nsg87Meths6zgK1rwWDzetDcZPxhXw5axcPrr'
  ],
  'ed25519:DpsbYJXeZNBZzwH2i6wuZ5YUqrFojzXjytoDc2a1jYsi': [
    'http://localhost:1234/v2.keypom.testnet/3Fn42MrTYqwYLUNuuDQ16xeViBf9ewJWGrp9yX513e7JYeA1QqURcxZ5erWKBsvw4sMBA6mwFfVQ3iNhG9F7QFMJ'
  ],
  'ed25519:Dw7JTenr6ifFcduktqZ5ydRri2UbHFFBeiWtPxVFKT9i': [
    'http://localhost:1234/v2.keypom.testnet/62awbYYBWeRn6wnHHNJ1x6eMmqfa3aJjVgsf95LQ8JRgSLwn6DJqBCUo4AWEpttZYJVuaThjzPYB3Hznk5tTGbR2'
  ]
}
Keypom Contract Explorer Link: explorer.testnet.near.org/accounts/v2.keypom.testnet.com
Private Key: 4jhgJ9i5N91KNRmBrRGHvzMxt2uLJcuwQys5ZMBHBNNAa1yvxW7uqrp77NbYC7xx323UxfdQv3kVD9nRKKAusHsW
Public Key: ed25519:8UBt5JDAnyQUivd35vrrRJFiKoE7u4e5KE3dzksN6wax
Claiming with wrong password...
Receipt: 8WxSwDC1acLaxZMkwK4zUQ57X4YYm2mb3LzgvoDCAV45
        Log [v2.keypom.testnet]: Beginning of process claim used gas: 479618717607 prepaid gas: 100000000000000
        Log [v2.keypom.testnet]: passed global check
        Log [v2.keypom.testnet]: hashed password: [247, 168, 220, 199, 222, 213, 55, 110, 164, 90, 126, 223, 16, 37, 184, 4, 189, 186, 158, 240, 167, 175, 104, 48, 254, 111, 118, 201, 148, 144, 37, 63]
        Log [v2.keypom.testnet]: actualPass password: [144, 154, 135, 246, 51, 113, 137, 139, 121, 193, 70, 40, 223, 50, 130, 183, 168, 41, 197, 181, 48, 104, 9, 159, 95, 204, 129, 29, 36, 25, 242, 107] cur use: 1
        Log [v2.keypom.testnet]: Incorrect password. Decrementing allowance by 1313903824899700000000. Used GAS: 3139038248997
        Log [v2.keypom.testnet]: Allowance is now 39182409995874700000000
        Log [v2.keypom.testnet]: Invalid claim. Returning.
Claim Failed: Error: Claim has failed, check password
claiming with correct password...
Receipt: AjHEjCKRChfn9HnG4YXqW7bDbTBE6RSNn8wZefc2nQsf
        Log [v2.keypom.testnet]: Beginning of process claim used gas: 479618717607 prepaid gas: 100000000000000
        Log [v2.keypom.testnet]: passed global check
        Log [v2.keypom.testnet]: hashed password: [144, 154, 135, 246, 51, 113, 137, 139, 121, 193, 70, 40, 223, 50, 130, 183, 168, 41, 197, 181, 48, 104, 9, 159, 95, 204, 129, 29, 36, 25, 242, 107]
        Log [v2.keypom.testnet]: actualPass password: [144, 154, 135, 246, 51, 113, 137, 139, 121, 193, 70, 40, 223, 50, 130, 183, 168, 41, 197, 181, 48, 104, 9, 159, 95, 204, 129, 29, 36, 25, 242, 107] cur use: 1
        Log [v2.keypom.testnet]: passed local check
        Log [v2.keypom.testnet]: Key usage last used: 0 Num uses: 2 (before)
        Log [v2.keypom.testnet]: Key has 1 uses left. Decrementing allowance by 10000000000000000000000. Allowance left: 29182409995874700000000
        Log [v2.keypom.testnet]: Total storage freed: 0. Initial storage: 31942023. Final storage: 31942023
        Log [v2.keypom.testnet]: Empty function call. Returning.
Second scanner claim, should fail
Claim Failed: Error: The Key has already been scanned
Normal second claim with no password
Receipts: 331MsGSg6EzL2dgqRLRYx9wZHcwrwjon6S6RCaWrPaoz, AonSdxyUcCKuknN28oG9wmS1SN5LA68RxqSdCLk6Qu1C, ASJa1QrnkNPQBqH23o5y9nQnVj8N9rRY2Dz3SD5P8LLJ, 6FKYYiKwRtHVAkHfpT9s9fit15U4B4iFmVRXyhzMTP5t
        Log [v2.keypom.testnet]: Beginning of process claim used gas: 475823370903 prepaid gas: 100000000000000
        Log [v2.keypom.testnet]: passed global check
        Log [v2.keypom.testnet]: hashed password: [227, 176, 196, 66, 152, 252, 28, 20, 154, 251, 244, 200, 153, 111, 185, 36, 39, 174, 65, 228, 100, 155, 147, 76, 164, 149, 153, 27, 120, 82, 184, 85]
        Log [v2.keypom.testnet]: actualPass password: [227, 176, 196, 66, 152, 252, 28, 20, 154, 251, 244, 200, 153, 111, 185, 36, 39, 174, 65, 228, 100, 155, 147, 76, 164, 149, 153, 27, 120, 82, 184, 85] cur use: 2
        Log [v2.keypom.testnet]: passed local check
        Log [v2.keypom.testnet]: Key usage last used: 0 Num uses: 1 (before)
        Log [v2.keypom.testnet]: Key has no uses left. It will be deleted
        Log [v2.keypom.testnet]: Key being deleted. Will refund: 1000000000000000000000
        Log [v2.keypom.testnet]: User balance incremented by 0.001. Old: 2.0766897 new: 2.0776897
        Log [v2.keypom.testnet]: Total storage freed: 7320000000000000000000. Initial storage: 31942023. Final storage: 31941291
        Log [v2.keypom.testnet]: End of regular claim function: 65419517657243 prepaid gas: 100000000000000
Receipts: Dabne31y6WnjWY3gZkitLCEduXE3WZLe4o1MXoaPrTM5, 2kgt2dgR5v37vqpU3uSknpTHuCrPJrronxqcCRqcohkG
        Log [v2.keypom.testnet]: Beginning of on claim Function Call used gas: 562123805871 prepaid gas: 89416500417528
        Log [v2.keypom.testnet]: received empty string as success value
        Log [v2.keypom.testnet]: Has function been executed via CCC: true
        Log [v2.keypom.testnet]: Refund Amount (storage used): 0.00732. Auto withdraw: false
        Log [v2.keypom.testnet]: User balance incremented by 0.00732. Old: 2.0776897 new: 2.0850097
        Log [v2.keypom.testnet]: (TOP of for loop): initial receiver ID: "nft-v2.keypom.testnet" for method: "nft_mint"
        Log [v2.keypom.testnet]: Adding claimed account ID: AccountId("minqi.testnet") to specified field: "receiver_id"
        Log [v2.keypom.testnet]: Adding drop ID: 1679957155172 to specified field "mint_id"
Receipts: 8NTKsKcVQLRwUTzxEinxzTkMkQ1ognyN1Uh9SqkdziXD, Bs6sD4cK8YrARkfsSLU6FwLNNoeJ7KgwvhTRVzA851Q9
        Log [v2.keypom.testnet]: EVENT_JSON:{"standard":"nep171","version":"nft-1.0.0","event":"nft_mint","data":[{"owner_id":"minqi.testnet","token_ids":["339:1"]}]}
Second claim successful. Key has been depleted and deleted
Claim with depleted key
Claim Failed: Error: Key does not exist
Claim failed, as expected
Claim with fake key
Claim Failed: Error: Key does not exist
Claim failed, as expected
```

</p>
</details>

---

## Conclusion

So far, you've learned how to set up your React app, as well as break down the ticketing system into functional requirments. You then took those requirements and wrote a script to create the drop.

In the next tutorial, the ticketing process will be broken down into stages for both the user side and event organizer side. From there, the flow of the app, and the Keypom variables that control it, can be established.


