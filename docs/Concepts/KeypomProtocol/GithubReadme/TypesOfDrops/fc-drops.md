---
sidebar_label: 'Function Call Drops'
sidebar_position: 5
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Function Call Drops

Function call drops are by far the most powerful feature that Keypom provides. FC drops allow **any** method on **any**
contract to be executed (with some exceptions). In addition, there are a huge variety of customizations and features you can choose from when
defining the drop that come on top of the global options. The possibilities are almost endless. State of the art NFT ticketing,
lazy minting NFTs, auto registration into DAOs, analytics for marketing at events and much more.

## How does it work?

Unlike NFT and FT drops, the function calls must have everything paid for **upfront**. There is no two step process
so the creation is similar to Simple drops. Once the drop is created and keys are added, you can immediately start using it.

### Function Call Config

When creating the drop, you have quite a lot of customization available. At the top level, there is a FC drop global
config similar to how the *general* config works.


<Tabs>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```ts reference
https://github.com/keypom/keypom-js/blob/e8c43f4219a79afb3c367296cc90b8d5de977945/src/lib/types/fc.ts#L68-L74
```

</TabItem>
<TabItem value="KP" label="📚 Protocol">

```rust reference
https://github.com/keypom/keypom/blob/7a654aa847f2ce9dedf65755c6a08817eece4666/contract/src/models/fc_model.rs#L53-L58
```

</TabItem>
</Tabs>


### `Method`/`MethodData`

In addition to the global config, the user can specify a set of what's known as `Method`. This represents the
information for the function being called. Within this data, there are also a few optional configurations you can use
to extend your use cases. You'll see how powerful these can be in the use cases [section](#use-cases).

<Tabs>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```ts reference
https://github.com/keypom/keypom-js/blob/e8c43f4219a79afb3c367296cc90b8d5de977945/src/lib/types/fc.ts#L7-L63
```

</TabItem>
<TabItem value="KP" label="📚 Protocol">

```rust reference
https://github.com/keypom/keypom/blob/7a654aa847f2ce9dedf65755c6a08817eece4666/contract/src/models/fc_model.rs#L18-L48
```

</TabItem>
</Tabs>


`Method`/`MethodData` keeps track of the method being called, receiver, arguments, and attached deposit. In addition, there are
some optional fields that can be used to extend the use cases. If you have a contract that requires some more context from
Keypom such as the drop ID, key ID, or account ID that used the key, these can all be specified.

We've kept it generic such that you can specify the actual argument name that these will be passed in as. For example, if you
had a contract that would lazy mint an NFT and it required the account to be passed in as `receiver_id`, you could specify
an `account_id_field` set to `receiver_id` such that Keypom will automatically pass in the account ID that used the key under the
field `receiver_id`.

This logic extends to the drop ID, and key Id as well.

### Key Uses

For **every key use**, you can specify a *vector* of `Method`/`MethodData` which allows you to execute multiple function calls each
time a key is used. These calls are scheduled 1 by 1 using a simple for loop. This means that most of the time, the function
calls will be executed in the order specified in the vector but it is not *guaranteed*.

It's important to note that the Gas available is split evenly between *all* the function calls and if there are too many,
you might run into issues with not having enough Gas. You're responsible for ensuring that this doesn't happen.

The vector of `Method`/`MethodData` is *optional* for each key use. If a key use has `null` rather than `Some(Vector<MethodData>)` or `Maybe<Array<Method>>`,
it will decrement the uses and work as normal such that the `throttle_timestamp, `start_timestamp` etc. are enforced. The only
difference is that after the key uses are decremented and these checks are performed, the execution **finishes early**. The null
case does **not** create an account or send *any* funds. It doesn't invoke any function calls and simply *returns once the
checks are done*. This makes the null case act as a "burner" where you disregard any logic. This has many uses which will
be explored in the use cases [section](#use-cases).

If a key has more than 1 use, you can specify a *different vector* of `Method`/`MethodData` for **each use**. As an example, you could
specify that the first use will result in a null case and the second use will result in a lazy minting function being called.
If you have multiple uses but want them all to do the same thing, you don't have to repeat the same data. Passing in only 1
vector of `Method`/`MethodData` will result in  **all the uses** inheriting that data.

## Security

Since all FC drops will be signed by the Keypom contract, there are a few restrictions in place to avoid malicious behaviors.
To avoid users from stealing registered assets from other drops, the following methods cannot be called via FC Drops:

```rust reference
https://github.com/keypom/keypom/blob/7a654aa847f2ce9dedf65755c6a08817eece4666/contract/src/lib.rs#L926-L934
```

In addition, the Keypom contract cannot be the receiver of any function call. This is to avoid people
from calling private methods through FC Drops.

### Keypom Arguments

When a key is used and a function is called, there is a data structure that is **automatically** attached to the arguments.
This is known as the `keypom_args`. It contains the information that the drop creator specified in the `Method`/`MethodData`. 

```rust reference
https://github.com/keypom/keypom/blob/7a654aa847f2ce9dedf65755c6a08817eece4666/contract/src/stage1/function_call.rs#L17-L22
```

#### Motivation

Let's say there was an exclusive NFT contract that allowed the Keypom contract to mint NFTs as part of an FC drop. Only Keypom
was given access to mint the NFTs so they could be given out as linkdrops. The organizer only wanted links that were part of their
drop to be valid. For this reason, the NFT contract would only mint if Keypom called the `nft_mint` function and there was a field 
`series` passed in and it was equal to the drop ID created by the organizer.

Let's say the owner created an exclusive drop that happened to have a drop ID of 5. They could then go to the NFT contract
and restrict NFTs to only be minted if:
- `series` had a value of 5.
- The Keypom contract was the one calling the function.

In order for this to work, when creating the drop, the owner would need to specify that the`drop_id_field` was set to a value of `series`
such that the drop ID is correctly passed into the function.

The problem with this approach is that the NFT contract has no way of knowing which arguments were sent by the **user** when the drop 
was created as part of the MethodData `args` and which arguments are automatically populated by the Keypom contract. There is nothing 
stopping a malicious user from creating a new drop that has an ID of 6 but hard-coding in the actual arguments that `series` should have 
a value of 5. In this case, the malicious drop would have *no* `drop_id_field` and the NFT contract would have no way of knowing that the 
`series` value is malicious.

This can be prevented if a new field is introduced representing what was automatically injected by the Keypom contract itself. At the
end of the day, Keypom will **always** send correct information to the receiving contracts. If those contracts have a way to know what has
been sent by Keypom and what has been manually set by users, the problem is solved. In the above scenario, the NFT contract would simply add
an assertion that the `keypom_args` had the `account_id_field` set to `Some(series)` meaning that the incoming `series` field was set by Keypom
and not by a malicious user.

## Use Cases

Function call drops are the bread and butter of the Keypom contract. They are the most powerful and complex drops that can currently be created.
With this complexity, there are an almost infinite number of use-cases that arise.

### Proof of Attendance Protocols

A very common use case in the space is what's known as Proof of Attendance. Often times when people go to events, they want a way to prove
that they were there. Some traditional approaches would be to submit your wallet address and you would be sent an NFT or some other form of
proof at a later date. The problem with this is that it has a very high barrier to entry. Not everyone has a wallet.

With Keypom, you can create a function call drop that allows people to onboard onto NEAR if they don't have a wallet or if they do, they can
simply use that. As part of the onboarding / claiming process, they would receive some sort of proof of attendance such as an NFT. This can
be lazy minted on-demand such that storage isn't paid up-front for all the tokens.

At this point, the event organizers or the funder can distribute links to people that attend the event in-person. These links would then be
claimed by users and they would receive the proof of attendance.

### Auto Registration into DAOs

DAOs are a raging topic in crypto. The problem with DAOs, however, is there is a barrier to entry for users that aren't familiar with the
specific chain they're built on top of. Users might not have wallets or understand how to interact with contracts. On the contrary, they
might be very well versed or immersed in the DAO's topics. They shouldn't be required to create a wallet and learn the onboarding process.

With Keypom, you can create a function call drop with the main purpose of registering users into a DAO. For people that have a wallet,
this will act as an easy way of registering them with the click of a link. For users that don't have a wallet and are unfamiliar with
NEAR, they can be onboarded and registered into the DAO with the same click of a link.

### Multisig Contracts

Another amazing use-case for Keypom is allowing multisig contracts to have ZERO barrier to entry. Often times when using a multisig contract,
you will entrust a key to a trusted party. This party might have no idea what NEAR is or how to interact with your contract. With Keypom,
you can create a drop that will allow them to sign their transaction with a click of a link. No NEAR wallet is needed and no knowledge of the
chain is required.

At the end of the day, from the users perspective, they are given a link and when they click it, their portion of the multisig transaction is
signed. The action is only performed on the multisig contract once all links have been clicked. This is an extremely powerful way of doing
accomplishing multisig transactions with zero barrier to entry.

The users don't even need to create a new account. They can simply call `claim` when the link is clicked which will fire the cross-contract call
to the multisig contract and pass in the keypom arguments that will be cross-checked by that contract.

### NFT Ticketing

The problem with current NFT ticketing systems is that they require users to have a wallet. This is a huge barrier to entry for people that
are attending events but don't have wallets. In addition, there is often no proof of attendance for the event as the NFT is burned in order
to get into the event which requires an internet connection.

Keypom aims to solve these problems by having a ticketing system that has the following features.
* Users are not required to have a wallet to enter the event.
* Each ticket is unique and can only be used by one person.
* Attendees are not required to have wifi to gain entry to the event.
* Attendees that did not have a NEAR wallet can get one for free.
* Attendees can choose to receive an NFT proving their attendance at the event. This is commonly known as a [POAP](https://academy.binance.com/en/glossary/proof-of-attendance-protocol-poap).

In addition, some way to provide analytics to event organizers that contains information such as links that were:
- Given out but not clicked at all.
- Clicked but not attended.
- Partially claimed indicating the number of people that attended but did not onboard or receive a POAP.
- Fully claimed indicating the number of people that attended and received a POAP.

In order to accomplish this, you can create a drop that has 3 uses per key. These uses would be:
1. Array(`null`)
2. Array(`null`)
3. Array(function call to POAP contract to lazy mint an NFT)

The event organizer would create the links and distribute them to people however they see fit. When a user receives the link, the first
claim is automatically fired. This is a `null` case so nothing happens except for the fact that the key uses are decremented. At this point,
the organizer knows that the user has clicked the link since the uses have been decremented.

The next claim happens **only** when the user is at the door. Keypom would expose a QR code that can only be scanned by the host's phone.
This QR code would appear once the first link is clicked and contains the private key for the link. At the event, they wouldn't need any wifi
to get in as they only need to show the host the QR code. Once the host scans it, the site would ensure that they have exactly 2 out of
the 3 uses left. If they don't, they're not let in. At that point, a use is decremented from the key and the next time they visit the
ticket page (when they have internet), they would be able to claim the final use and be onboarded / receive a POAP.

<p align="center"> <img src={require("/static/img/ticketing.png").default} alt="ticketing" width="65%" height="65%"/> </p>