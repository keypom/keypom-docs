---
sidebar_label: 'Final Product'
---
# Final Product
Welcome to the last section of this ticketing app tutorial! Here, you'll be seeing the full app in action! 

:::note
To run this app on your local machine, you will need a computer with working camera.
:::

## Getting Started
To follow along with the app on your own machine, you can clone the code from the [Keypom Docs Examples](https://github.com/keypom/keypom-docs-examples) repository and run the following command in the root folder `keypom-docs-examples/`:

``` bash
cd advanced-tutorials/ticket-app-skeleton && yarn && yarn start
```

:::note
If you'd like to run the already completed code found in the `ticket-app` directory instead of the skeleton code, run:

``` bash
cd advanced-tutorials/ticket-app && yarn && yarn start
```
:::

This should bring you to the following page at `localhost:1234`

<p align="center">
    <img src={require("/static/img/docs/advanced-tutorials/ticketing/claim-0.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/>
</p>

---

## Starting the Claim and Scanner Pages

To begin the app, first you'll need to run the create drop script:

```bash
yarn create-ticket-drop
```

This will return a link:

```bash
Ticket Links:

http://localhost:1234/v2.keypom.testnet/3pGPvPGiXUiMfW6TME1EPWGWHzx1FrLSLgu68UADpyjg6c9DPix1v2bxUWuY5K7ChWE5G5BNszMNTPmecTz7C15w
```

This should bring you to the following page. Feel free to take a picture of your QR code with another device, you will need to hold this QR code up to your computer's camera later.

<p align="center">
    <img src={require("/static/img/docs/advanced-tutorials/ticketing/claim-1.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/>
</p>

From there, you can duplicate this window and modify the URL to be:
```
http://localhost:1234/v2.keypom.testnet/scanner
```
It will immediately prompt you for a password. By default, the `createTickDrop` script you ran earlier has a password set to `event-password` but for now enter an incorrect password:
```
wrong-password
``` 

Once you enter this password, the scanner should appear, shown below. 
 
 <p align="center">
    <img src={require("/static/img/docs/advanced-tutorials/ticketing/scan-unread.png").default} width="50%" height="50%" alt="ticketing" class="rounded-corners"/>
</p>

---

## Scanning and Claiming
### Incorrect Password Claim

Now, you can begin testing the scanner by holding the photo of the QR code up to the camera of your computer. Ensure it has a clear unobstructed view of the code. Once the data is read in, the scanner's frame should change to yellow as it tries to claim.

<p align="center">
    <img src={require("/static/img/docs/advanced-tutorials/ticketing/scan-claiming.png").default} width="50%" height="50%" alt="ticketing" class="rounded-corners"/>
</p>

This should promptly return a failed claim, shown below.

<p align="center">
    <img src={require("/static/img/docs/advanced-tutorials/ticketing/scan-claim-bad.png").default} width="50%" height="50%" alt="ticketing" class="rounded-corners"/>
</p>

If you right click and inspect the page and go to the console, you should see the following error indicating an incorrect password.

<p align="center">
    <img src={require("/static/img/docs/advanced-tutorials/ticketing/claim-error.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/>
</p>

### Correct Password Claim
To enter the correct password, simply refresh the scanner page. This should prompt you for the password again. You can now enter the correct password for your private key. By default, the `createTickDrop` script you ran earlier has a password of `event-password`.

```
event-password
```

Once the correct password has been entered, you can repeat the same steps as before and try to claim your ticket by holding the QR code up to the scanner. This time around after the yellow claiming frame, you will see the following successful claim page. 

<p align="center">
    <img src={require("/static/img/docs/advanced-tutorials/ticketing/scan-claim-good.png").default} width="50%" height="50%" alt="ticketing" class="rounded-corners"/>
</p>

### Double Scanning
Now that the ticket has been successfully scanned and claimed, you can try to double scan the ticket. Recall that, if the second scan succeeds the attendee loses the opportunity to claim their POAP. 

Same as before, hold up the QR code up to your computer camera. Once the scanner reads the data and tries to claim, you should see this resultant page.

<p align="center">
    <img src={require("/static/img/docs/advanced-tutorials/ticketing/scan-claim-bad.png").default} width="50%" height="50%" alt="ticketing" class="rounded-corners"/>
</p>

---
 
## Claiming POAP
Now, after the ticket has been claimed **once**, if you go back and refresh your ticket page the QR code should now disappear and in its place is a button to claim your POAP.

<p align="center">
    <img src={require("/static/img/docs/advanced-tutorials/ticketing/claim-2.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/>
</p>

Clicking this should bring you to a MyNearWallet claim page. Once you claim, either to a new or existing NEAR account, you should be able to see our mascot, Moon, as an NFT in your collectibles tab!

<p align="center">
    <img src={require("/static/img/docs/advanced-tutorials/ticketing/claim-nft.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/>
</p>

---
 
## Claiming Deleted Keys
Now that you've claimed the POAP, the private key is now deleted. If you go back to the ticket page and refresh it again, you should see the following page; indicating your key is depleted. 

<p align="center">
    <img src={require("/static/img/docs/advanced-tutorials/ticketing/claim-3.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/>
</p>

If you try to holding up the screenshot of your QR code up to the QR reader, you will be greeted with the following failed claim page.

<p align="center">
    <img src={require("/static/img/docs/advanced-tutorials/ticketing/scan-claim-bad.png").default} width="50%" height="50%" alt="ticketing" class="rounded-corners"/>
</p>

---

## Conclusion
In this tutorial, you learned how you can use Keypom to create a seamless and powerful ticketing experience. You started from a few simple goals, translated those to tangible customizations to make to your Keypom function call drop, and then built a React app around the drop leveraging Keypom values to make it all run. 

In the next advanced tutorial, you will learn how you can auto-register people into a DAO with a simple link.