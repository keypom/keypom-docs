---
sidebar_label: 'Testing the Drop'
---
# Testing the Drop

## Introduction
In the last section you designed and created a drop according to the specifications you learned about in the [Solution Architecture](architecture.md#keypom-solution).

In this tutorial, you'll create a generalized method that will determine whether or not to allow someone entry into the event. It will be used to both test the drop logic and power the core functionality of the ticketing app.

Starting at the `keypom-docs-examples` directory, navigate to `advanced-tutorials/ticket-app-skeleton/utils` folder and open the `allowEntry.js` file.

```bash
cd advanced-tutorials/ticket-app-skeleton/utils
```

This should show the following skeleton code.

``` js reference
https://github.com/keypom/keypom-docs-examples/blob/4c8f86dab842c16e9c2bc6ad6f22e1eee2dced9e/advanced-tutorials/ticket-app-skeleton/utils/allowEntry.js#L1-L14
```

---

## Host Claiming Code

In order to test the drop logic, a utility function will be created to emulate the host scanning tickets at the door and will be used by the frontend.

The primary purpose of this function is to ingest a private key and password, and determine whether or not a ticket is valid. This means it will check for a few conditions before returning a success value. 

* The ticket is valid and has not been scanned yet.
* The password entered by the host was correct and the claim was successful

The `allowEntry` utility function takes in a private key, and a `basePassword`.

```js reference
https://github.com/keypom/keypom-docs-examples/blob/4c8f86dab842c16e9c2bc6ad6f22e1eee2dced9e/advanced-tutorials/ticket-app/utils/allowEntry.js#L9-L49
```

## Testing Logic

Now that the utility function has been created, it can be used to test the drop logic. This will be done in a new file called `testTickDrop.js` that will live in the same util directory. It will contain two different test functions:

* `wrongPasswordCheck` - This will test the case where the wrong password is used to claim the ticket.
* `doubleClaimCheck` - This is meant to check for invalid tickets. In this case, it will try to claim the same ticket twice in a row.
  
```js reference
https://github.com/keypom/keypom-docs-examples/blob/4c8f86dab842c16e9c2bc6ad6f22e1eee2dced9e/advanced-tutorials/ticket-app-skeleton/utils/testTickDrop.js#L1-L26
```

With both the drop created utility function defined, some code can be written to test the actual logic to ensure that the ticket claiming process works as expected. This will be broken down into phases, similar to the actual ticketing experience. 

### Wrong Password Check

The first phase of the ticketing experience can be labelled as `pre-entry`, when the attendee is looking to enter the event. Here, you want to ensure that only the host can allow them in, meaning the first key use must only be claimable with the correct password.

The following code can be used to test this logic, following the drop creation. 

```js reference
https://github.com/keypom/keypom-docs-examples/blob/4c8f86dab842c16e9c2bc6ad6f22e1eee2dced9e/advanced-tutorials/ticket-app/utils/testTickDrop.js#L5-L30
```

It's expected that after claiming with the incorrect password, `allowEntry` will return `false` since the key use remains at 1. However, once the correct password is provided, the `allowEntry` function should return `true`. In the tests, an `assert` function is used to ensure the proper behavior.

### Preventing Multiple Entries

Once an attendee has been scanned into the event, they may try to give their ticket to someone else. To test and prevent this, `allowEntry` can be called multiple times on the same ticket. It is expected that the first call should return `true` but once it scans the same ticket again, `false` should be returned.

```js reference
https://github.com/keypom/keypom-docs-examples/blob/4c8f86dab842c16e9c2bc6ad6f22e1eee2dced9e/advanced-tutorials/ticket-app/utils/testTickDrop.js#L32-L57
```

With the drop functionality tested, you can be confident in the logic behind the scenes and focus on the app behavior. 

---


## Full Code
Now that everything has been put together, the final code can be seen below.

<details>
<summary>Full Testing Code</summary>
<p>

```js reference
https://github.com/keypom/keypom-docs-examples/blob/4c8f86dab842c16e9c2bc6ad6f22e1eee2dced9e/advanced-tutorials/ticket-app/utils/testTickDrop.js#L1-L75
```
</p>
</details>


---

## Running the Script
Here, you'll learn how to run the code that was just covered, and what to expect. It's assumed that you have already cloned the code from the [Keypom Docs Examples](https://github.com/keypom/keypom-docs-examples) repo.

:::caution
Prior to running these scripts, ensure you replace all instances of `minqi.testnet` with an account found in your `~/.near-credentials` folder
:::

To run the script, run the following command inside the `keypom-docs-examples/advanced-tutorials/ticket-app-skeleton` directory:

```bash
yarn test-ticket-drop
```

:::note
If you'd like to run the already completed code found in the `ticket-app` directory instead of the skeleton code, run the same `yarn test-ticket-drop` command but inside of the `keypom-docs-examples/advanced-tutorials/ticket-app` directory instead.
:::

This should return a successful test after outputting logs:

```bash
Password Test Responses:
Expected false, got: false
Expected true, got: true

Double Claim Test Responses:
Expected true, got: true
Expected false, got: false
```

<details>
<summary>Full Script Output</summary>
<p>

```bash
Retrying transaction v2.keypom.testnet:2JdTtqWLNqLUjBL9CYJ1qkdUtYpDLXydvnCfHiW3LG3S with new nonce.
Receipts: DL3AwUHW22wqEvJ24Soh39Zgsa8iQhyNNKsqzfUggDCn, Dt1yEoGZ36avyKqwF82GL54emJkfmUx2AM3fUtkhC1Vv
	Log [v2.keypom.testnet]: Current Block Timestamp: 1680294425065581261
	Log [v2.keypom.testnet]: 21 calls with 105000000000000 attached GAS. Pow outcome: 1.8602935. Required Allowance: 20248156910387200000000
	Log [v2.keypom.testnet]: Total required storage Yocto 16330000000000000000000
	Log [v2.keypom.testnet]: Current balance: 3.5921299,
            Required Deposit: 0.2578263,
            total_required_storage: 0.01633,
            Drop Fee: 0,
            Key Fee: 0 Total Key Fee: 0,
            allowance: 0.0404963 total allowance: 0.0404963,
            access key storage: 0.001 total access key storage: 0.001,
            deposits less none FCs: 0.1 total deposits: 0.1 lazy registration: false,
            deposits for FCs: 0.1 total deposits for FCs: 0.1,
            uses per key: 2
            None FCs: 1,
            length: 1
            GAS to attach: 100000000000000
	Log [v2.keypom.testnet]: New user balance 3.3343036
	Log [v2.keypom.testnet]: Fees collected 0
Retrying transaction nft-v2.keypom.testnet:2iHrE9ooY2N4kUn9eqsScAyNjXkRkUBiQdzxYsXwFawm with new nonce.
Receipts: 6jzxKRXmGjrtSKP9V38puWLZPcDHaVYRrohtj29rsMxR, FCmjrSPxuyKEXdghJAkrz8H8AH3GaCPnceoZKuHazmrN
	Log [v2.keypom.testnet]: Current Block Timestamp: 1680294427597789158
	Log [v2.keypom.testnet]: 21 calls with 105000000000000 attached GAS. Pow outcome: 1.8602935. Required Allowance: 20248156910387200000000
	Log [v2.keypom.testnet]: Total required storage Yocto 16330000000000000000000
	Log [v2.keypom.testnet]: Current balance: 3.6040689,
            Required Deposit: 0.2578263,
            total_required_storage: 0.01633,
            Drop Fee: 0,
            Key Fee: 0 Total Key Fee: 0,
            allowance: 0.0404963 total allowance: 0.0404963,
            access key storage: 0.001 total access key storage: 0.001,
            deposits less none FCs: 0.1 total deposits: 0.1 lazy registration: false,
            deposits for FCs: 0.1 total deposits for FCs: 0.1,
            uses per key: 2
            None FCs: 1,
            length: 1
            GAS to attach: 100000000000000
	Log [v2.keypom.testnet]: New user balance 3.3462426
	Log [v2.keypom.testnet]: Fees collected 0
Retrying transaction nft-v2.keypom.testnet:CysD3CnodxvarnxUpQKKWWV1x9uhjEkCbWosy1DuDo7D with new nonce.


    Ticket Links:

    http://localhost:1234/v2.keypom.testnet/3aJq6s8pNYFGbuUVG5fj7nJ9bpfKZD7iH4oak27yZnjQytcyCAFMioJEZrVJBf3itMgrs3gm8U1UszewfhXbfKUH




    Ticket Links:

    http://localhost:1234/v2.keypom.testnet/2KxZarBh9hWy7JZGDvsJhdzP8Q3JtCy7ocZ4hvohHKEsSNjxTx3LWd8EDpHNfD2du8MQVftCNJKRCp99At1qigQU


Claiming with wrong password...
Receipt: BHH2ENLdWLpYDQDD8SmgbAXzVFGi9odnGwhgHxg6ifCR
	Log [v2.keypom.testnet]: Beginning of process claim used gas: 479192976105 prepaid gas: 100000000000000
	Log [v2.keypom.testnet]: passed global check
	Log [v2.keypom.testnet]: hashed password: [97, 68, 238, 197, 167, 108, 73, 163, 74, 105, 140, 127, 22, 87, 3, 98, 76, 179, 110, 208, 118, 51, 58, 3, 88, 44, 22, 240, 45, 89, 85, 65]
	Log [v2.keypom.testnet]: actualPass password: [61, 214, 44, 95, 159, 234, 2, 185, 182, 48, 134, 31, 65, 88, 184, 51, 51, 13, 201, 173, 75, 158, 56, 59, 33, 46, 185, 178, 239, 3, 44, 94] cur use: 1
	Log [v2.keypom.testnet]: Incorrect password. Decrementing allowance by 1244250690277300000000. Used GAS: 2442506902773
	Log [v2.keypom.testnet]: Allowance is now 39252063130497100000000
	Log [v2.keypom.testnet]: Invalid claim. Returning.
Claim has failed, check password
claiming with correct password...
Receipt: 4gAycg2B1jVNoJtUT3snHWDA1Ffdkxt1oPu8vH1TwoSC
	Log [v2.keypom.testnet]: Beginning of process claim used gas: 479192976105 prepaid gas: 100000000000000
	Log [v2.keypom.testnet]: passed global check
	Log [v2.keypom.testnet]: hashed password: [61, 214, 44, 95, 159, 234, 2, 185, 182, 48, 134, 31, 65, 88, 184, 51, 51, 13, 201, 173, 75, 158, 56, 59, 33, 46, 185, 178, 239, 3, 44, 94]
	Log [v2.keypom.testnet]: actualPass password: [61, 214, 44, 95, 159, 234, 2, 185, 182, 48, 134, 31, 65, 88, 184, 51, 51, 13, 201, 173, 75, 158, 56, 59, 33, 46, 185, 178, 239, 3, 44, 94] cur use: 1
	Log [v2.keypom.testnet]: passed local check
	Log [v2.keypom.testnet]: Key usage last used: 0 Num uses: 2 (before)
	Log [v2.keypom.testnet]: Key has 1 uses left. Decrementing allowance by 10000000000000000000000. Allowance left: 29252063130497100000000
	Log [v2.keypom.testnet]: Total storage freed: 0. Initial storage: 33083530. Final storage: 33083530
	Log [v2.keypom.testnet]: Empty function call. Returning.
Receipts: D2TGQDXYR4um28CgTt8Z1aU1LMSABMChW9MZJPfVBcpd, 7FKbgHx6eFnfMM15B1Tw7U8wpeQe2WKwYUQG7Hbqe69L
	Log [v2.keypom.testnet]: Current Block Timestamp: 1680294442058016014
	Log [v2.keypom.testnet]: 21 calls with 105000000000000 attached GAS. Pow outcome: 1.8602935. Required Allowance: 20248156910387200000000
	Log [v2.keypom.testnet]: Total required storage Yocto 16330000000000000000000
	Log [v2.keypom.testnet]: Current balance: 3.6160078,
            Required Deposit: 0.2578263,
            total_required_storage: 0.01633,
            Drop Fee: 0,
            Key Fee: 0 Total Key Fee: 0,
            allowance: 0.0404963 total allowance: 0.0404963,
            access key storage: 0.001 total access key storage: 0.001,
            deposits less none FCs: 0.1 total deposits: 0.1 lazy registration: false,
            deposits for FCs: 0.1 total deposits for FCs: 0.1,
            uses per key: 2
            None FCs: 1,
            length: 1
            GAS to attach: 100000000000000
	Log [v2.keypom.testnet]: New user balance 3.3581815
	Log [v2.keypom.testnet]: Fees collected 0


    Ticket Links:

    http://localhost:1234/v2.keypom.testnet/2LNJU2adYHgvyuczoNFkvdL92vuunNCESaZiWYh6cQJXcwVSJpHqgQpGVUHsEDDee2oQrSELAkRGPeYroW6hoPaN


Claiming with correct password...
Receipt: G7y6MWapxNwCCmCPAQ6iRWdvT292dq8hWp8ZQAnTbXwQ
	Log [v2.keypom.testnet]: Beginning of process claim used gas: 479192976105 prepaid gas: 100000000000000
	Log [v2.keypom.testnet]: passed global check
	Log [v2.keypom.testnet]: hashed password: [105, 193, 27, 134, 73, 227, 30, 80, 12, 73, 201, 126, 217, 0, 80, 239, 38, 5, 216, 62, 44, 177, 19, 137, 73, 50, 159, 32, 38, 11, 59, 94]
	Log [v2.keypom.testnet]: actualPass password: [105, 193, 27, 134, 73, 227, 30, 80, 12, 73, 201, 126, 217, 0, 80, 239, 38, 5, 216, 62, 44, 177, 19, 137, 73, 50, 159, 32, 38, 11, 59, 94] cur use: 1
	Log [v2.keypom.testnet]: passed local check
	Log [v2.keypom.testnet]: Key usage last used: 0 Num uses: 2 (before)
	Log [v2.keypom.testnet]: Key has 1 uses left. Decrementing allowance by 10000000000000000000000. Allowance left: 30496313820774400000000
	Log [v2.keypom.testnet]: Total storage freed: 0. Initial storage: 33085324. Final storage: 33085324
	Log [v2.keypom.testnet]: Empty function call. Returning.
claiming the same key twice...
Key has already been scanned. Admission denied

        Password Test Responses:
        Expected false, got: false
        Expected true, got: true

        Double Claim Test Responses:
        Expected true, got: true
        Expected false, got: false

✨  Done in 26.50s.
```

</p>
</details>

---

## Conclusion

So far, you've learned how to set up your React app, as well as break down the ticketing system into functional requirements. You then took those requirements and wrote a script to create the drop.

In the next tutorial, the ticketing process will be broken down into stages for both the user side and event organizer side. From there, the flow of the app, and the Keypom variables that control it, can be established.


