---
sidebar_label: 'Password Protected Keys'
sidebar_position: 3
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Password Protected Keys

Password protecting key uses is an extremely powerful feature that can unlock many use-cases. Keypom has baked flexibility and customization
into the contract such that almost all use-cases involving password protection can be accomplished. Whenever a key is added to a drop, it can
have a unique password for each individual use, a set of uses or the same password for all uses.

___

## How Does It Work?

The Keypom implementation has been carefully designed so that users can't look at the NEAR Explorer to view what was passed into the contract
either when the drop was created or when a key was used to try and copy those passwords. We also want passwords to be unique across keys so that
if you know the password for 1 key, it doesn't work on a different key. In order to accomplish this, we use the concept of hashing.

Imagine you have a drop with 2 keys and you want to password protect each key. Rather than forcing the drop funder to input a unique password for 
each key and having them remember each one, we can have them input a single **base password** and derive unique passwords from it that are paired 
with the key's public key.

This is the most scalable option as it allows the drop funder to only need to remember 1 password and they can derive all the other ones using the
hashing algorithm, public key, and current key use.

In the above scenario, let's say the funder inputs the base password as `basepassword1`. If a user wanted to claim the first key, they would need to input
into the contract:

`hash("basepassword1" + key1_public_key + key_use)`

The funder would need to give the user this hash somehow (such as embedding it into the link or having an app that can derive it). It's important to note 
that the funder should probably **NOT** give them the base password otherwise the user could derive the passwords for all other keys.

___

## What is Stored On-Chain?

How does Keypom verify that the user passed in the correct password? If the funder were to simply pass in `hash("mypassword1" + key1_public_key + key_use)` into the
contract as an argument when the key is created, users could just look at the NEAR Explorer and copy that value. 

Instead, the funder needs to pass in a double hash when the key is created: `hash(hash("mypassword1" + key1_public_key + key_use))`. 

This is the value that is stored on-chain and when the user tries to claim the key, they would pass in just the single hash: `hash("mypassword1" + key1_public_key + key_use)`.  
The contract would then compute `hash(hash("mypassword1" + key1_public_key + key_use))` and compare it to the value stored on-chain. If they match, the key is claimed.

Using this method, the base password is not exposed to the user, nobody can look on-chain or at the NEAR explorer and derive the password, and the password is unique
across multiple keys.

___

## Defining Passwords

New with Keypom V3, passwords are *no longer global*. This means that differfent access keys within your drop can have entirely different passwords, or some can have passwords while others have no passwords. 

This is done when adding keys to a drop, either when using `create_drop` or `add_keys`. These methods accept a **vector of keys objects** defined by the following:

```rust reference
https://github.com/keypom/keypom/blob/807fea5997987cb1a97bee838c4d2312a7faab51/contract/src/models/external/models.rs#L81-L92
```

Notice that `password_by_use` is mapped to each individual key, meaning you have control over the password design for each access key. 

Here, you need to define the key use number and associated password. The password you pass in should be the double hash, `hash(hash("mypassword1" + key1_public_key + key_use))`. An example `password_by_use` implementation is shown below. 

```javascript
password_by_use = {
    1: hash(hash(`${BASE_PASSWORD}${PUBLIC_KEY}1`))
    3: hash(hash(`${BASE_PASSWORD}${PUBLIC_KEY}3`))
    5: hash(hash(`${BASE_PASSWORD}${PUBLIC_KEY}5`))
}
```
:::note
Notice that not all uses are defined. Undefined uses will have no password
:::

### Example Helper Function
You'll notice that this process of manually defining each key use password can grow tedious for each key. Below is an example helper function that was used during contract testing and NEARCON ticket generation. This function would return the record shown above.

<details>
<summary>Example Password Generation Helper Function</summary>
<p>

```javascript
let basePassword = "my-example-password"
let password = await generatePasswordsForKey(publicKey.toString(), [1, 3, 5], basePassword);

async function generatePasswordsForKey(pubKey, usesWithPassword, basePassword) {
    let passwords = {};

    // Loop through usesWithPassword
    for (var use of usesWithPassword) {
      let pw = basePassword + pubKey + use.toString()
      console.log('pw before double hash: ', pw)
      let firstHash = hash(pw)
      passwords[use] = hash(firstHash, true);
    }
    
    console.log(`pw after double hash: ${passwords[use]}`)
    return passwords;
}

function hash(string, double=false) {
    if (double) {
        return createHash('sha256').update(Buffer.from(string, 'hex')).digest('hex');
    }
    return createHash('sha256').update(Buffer.from(string)).digest('hex');
}
```

</p>
</details>


___





## OLD

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

