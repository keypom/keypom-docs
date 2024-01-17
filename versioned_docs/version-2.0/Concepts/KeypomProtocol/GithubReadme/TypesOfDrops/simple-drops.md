---
sidebar_label: 'Simple Drops'
sidebar_position: 2
---

# Simple Drops

The most basic type of drop is the simple kind. Any keys that are part of a simple drop can
only be used for 1 thing: **transferring $NEAR**. Once the key is claimed, the claiming account
will receive the $NEAR specified in the `deposit_per_use`. Simple drops are a great way to send $NEAR to claiming accounts while not storing a lot
of information on the contract. Below are a couple use cases.

## Backend Servers

Let's say you have a backend server that should send 10 $NEAR to the first 3
people that redeem an NFT. Rather than exposing your full access key in the backend server,
you could create a simple drop that either has 3 keys or 1 key that is claimable 3 times.
In the drop, you'd specify that each time the key is claimed, the specified account would
receive 10 $NEAR.

## Recurring Payments

Recurring payments are quite a common situation. If you need to send someone 10 $NEAR once a
month for 6 months, you could create a simple drop that has a `claim_interval` of 1 month with
a `start_timestamp` of next week. Every time the key is used, 10 $NEAR is sent to the account. If
the contractor missed a month's payment, they can claim the key late but can never use the key more
than what is intended.

<p align="center"> <img src={require("/static/img/recurring_payments.png").default} alt="recurring payments" width="60%"/> </p>

## Quick Onboarding

If you need to quickly onboard users onto NEAR, you could create a simple drop with a
small amount of $NEAR (enough to create a wallet) and set the claim permission to be
`CreateAccountAndClaim`. This means that the key can only be used to create accounts.
You can then add keys as you wish to the drop and give them out to users so they can create
accounts and be onboarded onto NEAR.