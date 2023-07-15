---
sidebar_label: '🚀 BOS Version'
---
# BOS Version
During the [ETHGlobal Waterloo Hackathon](https://ethglobal.com/showcase/keypom-x-bos-event-ticketing-pow2e), a chunk of this tutorial was ported over to BOS. This section is a quick guide on how to use it.

> If you run into any bugs or issues, don't hesitate to reach out to [Min on Telegram](https://t.me/minlu00)!

## Using the BOS Tool
The BOS version of the ticket app is located [here](https://near.org/mintlu.near/widget/kp-ticket-homepage). On this page, you can view your previous tickets, as well as create a new ticket drop. 

<p align="center">
    <img src={require("/static/img/docs/advanced-tutorials/ticketing/bos-homepage.png").default} width="80%" height="80%" alt="BOS ticketing" class="rounded-corners"/>
</p>

:::note
**All** your drops will appear in the viewer, not just the ticket drops. 
:::

### Creating Ticket Drops
This section of the tool allows you to create a standard ticket drop. These drops use the following structure:
- 2 Key uses
  - First is null and password protected. 
  - Second mints the POAP
- A customizable password and POAP. The POAP is minted as part of a series on `nft-v2.keypom.near`

<p align="center">
    <img src={require("/static/img/docs/advanced-tutorials/ticketing/bos-create.png").default} width="80%" height="80%" alt="create ticketing drop" class="rounded-corners"/>
</p>

When using the tool, there are a few tips to keep in mind: 
- **Save your POAP information before creating the drop**
  - This is **very** important, if you do not, the drop will be created without the POAP 😢
- The name of the event will automatically be hyphenated and lowercased
- When creating the drop, the password will not appear in the transaction information. This will populate after you press "Confirm"
<p align="center">
    <img src={require("/static/img/docs/advanced-tutorials/ticketing/bos-password-bad.png").default} width="40%" height="80%" alt="bad ticketing password" class="rounded-corners"/>
</p>

---

## Using the Scanner
To open the scanner on your own machine, you can clone the code from the [Keypom Docs Examples](https://github.com/keypom/keypom-docs-examples) repository and run the following command in the root folder `keypom-docs-examples/`:

``` bash
cd advanced-tutorials/ticket-app-mainnet && yarn && yarn start
```

This should bring you to the following page at `localhost:1234`

<p align="center">
    <img src={require("/static/img/docs/advanced-tutorials/ticketing/claim-0.png").default} width="80%" height="80%" alt="ticketing" class="rounded-corners"/>
</p>

From there, you can navigate to the following URL:
```
http://localhost:1234/v2.keypom.near/scanner
```

It will immediately prompt you for a password. This is the password you set in the [creating tickets section](#creating-ticket-drops). If you enter it incorrectly, you can refresh the page and re-enter the password. From there, you can begin presenting tickets and allowing people into your event! 

