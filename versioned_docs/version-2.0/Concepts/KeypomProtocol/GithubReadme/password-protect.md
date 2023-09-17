---
sidebar_label: 'Password Protected Keys'
sidebar_position: 3
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Password Protected Keys

Password protecting key uses is an extremely powerful feature that can unlock many use-cases. Keypom has baked flexibility and customization
into the contract such that almost all use-cases involving password protection can be accomplished. Whenever a key is added to a drop, it can
have a unique password for each individual use, or it can one password for all uses in general.

## How Does It Work?

The Keypom implementation has been carefully designed so that users can't look at the NEAR Explorer to view what was passed into the contract
either when the drop was created or when a key was used to try and copy those passwords. We also want passwords to be unique across keys so that
if you know the password for 1 key, it doesn't work on a different key. In order to accomplish this, we use the concept of hashing.

Imagine you have a drop with 2 keys and you want to password protect each key. Rather than forcing the drop funder to input a unique password for 
each key and having them remember each one, we can have them input a single **base password** and derive unique passwords from it that are paired 
with the key's public key.

This is the most scalable option as it allows the drop funder to only need to remember 1 password and they can derive all the other ones using the
hashing algorithm and public key.

In the above scenario, let's say the funder inputs the base password as `mypassword1`. If a user wanted to claim the first key, they would need to input
into the contract:

`hash("mypassword1" + key1_public_key)`

The funder would need to give the user this hash somehow (such as embedding it into the link or having an app that can derive it). It's important to note 
that the funder should probably **NOT** give them the base password otherwise the user could derive the passwords for all other keys (assuming those keys have 
the same base password).

## What is Stored On-Chain?

How does Keypom verify that the user passed in the correct password? If the funder were to simply pass in `hash("mypassword1" + key1_public_key)` into the
contract as an argument when the key is created, users could just look at the NEAR Explorer and copy that value. 

Instead, the funder needs to pass in a double hash when the key is created: `hash(hash("mypassword1" + key1_public_key))`. 

This is the value that is stored on-chain and when the user tries to claim the key, they would pass in just the single hash: `hash("mypassword1" + key1_public_key)`.  
The contract would then compute `hash(hash("mypassword1" + key1_public_key))` and compare it to the value stored on-chain. If they match, the key is claimed.

Using this method, the base password is not exposed to the user, nobody can look on-chain or at the NEAR explorer and derive the password, and the password is unique
across multiple keys.

# Passwords Per Key Use

Unlike the passwords per key which is the same for all uses of a key, the drop creator can specify a password for each individual key use. This password follows
the same pattern as the passwords per key in that the funder inputs a `hash(hash(SOMETHING))` and then the user would input `hash(SOMETHING)` and the contract
would hash this and compare it to the value stored on-chain.

The difference is that each individual key use can have a different value stored on-chain such that the user can be forced to input a different hash each time.
This `SOMETHING` that is hashed can be similar to the global password per key example but this time, the desired key use is added: `hash("mypassword1" + key1_public_key + use_number)`

In order to pass in the passwords per use, a new data structure is introduced so you only need to pass in passwords for the uses that have them. This is known as the 
`JsonPasswordForUse` and is as follows:

<Tabs>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```ts reference
https://github.com/keypom/keypom-js/blob/29c10f949f02f673d4a3cecc21b0f74bca600075/src/lib/types/drops.ts#L193-L198
```

</TabItem>
<TabItem value="KP" label="📚 Protocol">

```rust reference
https://github.com/keypom/keypom/blob/7a654aa847f2ce9dedf65755c6a08817eece4666/contract/src/models/json_types.rs#L152-L157
```

</TabItem>
</Tabs>

## Adding Your First Password

Whenever keys are added to Keypom, if there's passwords involved, they must be passed in using the following format. 

```rust
passwords_per_use: Option<Vec<Option<Vec<JsonPasswordForUse>>>>,
passwords_per_key: Option<Vec<Option<String>>>,
```

Each key that is being added either has a password, or doesn't. This is through the `Vec<Option<>`. This vector **MUST** be the same length as the number of keys created.This doesn't 
mean that every key needs a password, but the Vector must be the same length as the keys.

As an example, if you wanted to add 3 keys to a drop and wanted only the first and last key to have a password_per_key, you would pass in:
```rust
passwords_per_key: Some(vec![Some(hash(hash(STUFF))), None, Some(hash(hash(STUFF2)))])
```

# Complex Example

To help solidify the concept of password protected keys, let's go through a complex example. Imagine Alice created a drop with a `uses_per_key` of 3.
She wants to create 4 keys: 
- Key A: No password protection.
- Key B: Password for uses 1 and 2.
- Key C: Password for use 1 only.
- Key D: Password that doesn't depend on the use.

In this case, for Keys B and C, they will have the same base password but Alice wants to switch things up and have a different base password for Key D.
When these keys are added on-chain, the `passwords_per_key` will be passed in as such:

```rust
passwords_per_key: Some(vec![
    None, // Key A
    None, // Key B
    None, // Key C
    // Key D
    Some(
        hash(hash("key_d_base_password" + key_d_public_key))
    ), 
]),
```
The passwords for Key B and Key C will be passed in as such:

```rust
passwords_per_key: Some(vec![
    None, // Key A

    // Key B
    vec![
        {
            pw: hash(hash("keys_bc_base_password" + key_b_public_key + "0")),
            key_use: 0
        },
        {
            pw: hash(hash("keys_bc_base_password" + key_b_public_key + "1")),
            key_use: 1
        }
    ]

    // Key C
    vec![
        {
            pw: hash(hash("keys_bc_base_password" + key_c_public_key + "0")),
            key_use: 0
        }
    ]

    None // Key D
]),
```

The drop funder would then give the keys out to people:

## Key A
Alice gives Bob Key A and he would be able to claim it 3 times with no password required.

## Key D
Alice gives Charlie Key D and he would be able to claim it 3 times with the hashed global key password: `hash("key_d_base_password" + key_d_public_key)`.
When Charlie claims the key, he would input the password `hash("key_d_base_password" + key_d_public_key)` and the contract would hash that and check to see
if it matches what is stored on-chain (which it does).

If anyone tried to look at what Charlie passes in through the explorer, it wouldn't work since his hash contains the public key for key D and as such it is only
valid for Key D.

Similarly, if Charlie tried to look at the explorer when Alice created the keys and attempted to pass in `hash(hash("key_d_base_password" + key_d_public_key))`, 
the contract would attempt to hash this and it would NOT match up with what's in the storage.

## Key B
Alice gives Eve Key B and she would need a password for claim 1 and 2. For the first claim, she needs to pass in: `hash("keys_bc_base_password" + key_b_public_key + "0")`.
The contract would then check and see if the hashed version of this matches up with what's stored on-chain for that use.

The second time Eve uses the key, she needs to pass in hash("keys_bc_base_password" + key_b_public_key + "1") and the same check is done.

If Eve tries to pass in `hash("keys_bc_base_password" + key_b_public_key + "0")` for the second key use, the contract would hash it and check:

hash(hash("keys_bc_base_password" + key_b_public_key + "0")) == hash(hash("keys_bc_base_password" + key_b_public_key + "1"))

Which is incorrect and the key would not be claimed.

Once Eve claims the key 2 times, the last claim is not password protected and she's free to claim it.

Key C is similar to Key B except that it only has 1 password for the first use.

# Use-Cases

Password protecting key uses is a true game changer for a lot of use-cases spanning from ticketing to simple marketing and engagement.

### Ticketing and POAPs

Imagine you had an event and wanted to give out exclusive POAPs to people that came. You didn't want to force users to: 
- Have a NEAR wallet
- Have wifi at the door.
- Burn NFTs or tokens to get into the event.

The important thing to note is that by using password protected key uses, you can **GUARANTEE** that anyone that received a POAP had to
**PHYSICALLY** show up to the event. This is because the POAP would be guarded by a password.

You could create a ticketing event using Keypom as outlined in the [Ticketing](#nft-ticketing) section and have a key with 2 uses. The first use 
would be password protected and the second use is not. The first use will get you through the door and into the event and the second
contains the exclusive POAP and can onboard you. This means that anyone with the ticket, or key, can only receive the POAP if they know the password.

You can have a scanner app that would scan people's tickets (tickets are just the private key). In this scanner app, the *base password* is stored and 
whenever the ticket is scanned, the public key is taken and the following hash is created:

`hash(base password + public key)`

This hash is then used to claim a use of the key and you will be let into the party. The scanner app can deterministically generate all the
necessary hashes for all the tickets by simply scanning the QR code (which has the private key exposed). The tickets are worthless unless
you actually show up to the event and are scanned.

Once you're scanned, you can refresh your ticket page and the use the second key claim which is not password protected. This use contains the
exclusive POAP and you can onboard onto NEAR.

### Marketing and Engagement

Let's say that you're at an event and want people to show up to your talks and learn about your project. You can have a scanner app similar to the
one mentioned in the ticketing scenario that derives the password for any use on any key.

At the beginning of the event, you can give out a bunch of keys that have progressively increasing rewards gated by a password. At the end, the last
key use contains a special reward that is only unlocked if the user has claimed all the previous key uses.

In order for these uses to be unlocked, People must show up to your talks and get scanned. The scanner will derive the necessary password and unlock 
the rewards. Users will only get the exclusive reward if they come to ALL your talks.

This idea can be further expanded outside the physical realm to boost engagement on your websites as an example:

You want users to interact with new features of your site or join your mailing list.

You can have links where uses are ONLY unlocked if the user interacts with special parts of your site such as buying a new NFT or joining your mailing list 
or clicking an easter egg button on your site etc.

## dApp Free Trials for Users

In the upcoming Keypom V2.0, dApps will be able to integrate the Keypom wallet selector plugging to allow for free trials for their users. One of the biggest pain-points with Web3 at the moment is the fact that users need to fund wallets *before* they interact with a dApp.

In Web2, a user can find value in an application by using it before they go through the messy onboarding process. Why can't Web3 be the same?

Keypom will allow apps to create links that will automatically sign users into their applications and give them a free trial of the app. The user will be able to interact with things, spend $NEAR, sign transactions and gather assets through the trial. A unique feature of this is that the user will *never be redirected to the NEAR wallet* to approve transactions.

Keypom will provide a seamless user experience where users can find value in applications. Once the free trial is over and users have collected assets / $NEAR through interacting with the dApp, they can *THEN* choose to onboard.

With Keypom's technology, users will be locked into only interacting with the dApp specified in the link. Users can't rug the application and steal the $NEAR embedded in the link. The funds are allocated for 1 thing and 1 thing only: free trials of that one specific dApp.

<p align="center">
  <img src={require("/static/img/trial_accounts.png").default} width="65%" height="65%" alt="trial accounts"/>
</p>
