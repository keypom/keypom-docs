---
sidebar_label: 'Function Call Asset'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Function Call Asset

The function call asset is by far Keypom's most powerful asset class. FC assets allow **any** method on **any**
contract to be executed (with some exceptions). In addition, there are a huge variety of customizations and features you can choose from when defining the drop that come on top of the global options. The possibilities are almost endless. State of the art NFT ticketing, lazy minting NFTs, auto registration into DAOs, analytics for marketing at events and much more.

## How does it work?
    
When an a key use containing a Function Call asset is claimed, Keypom will make the predetermined function call. This call works as any normal function call and has a preset receiver, method, and attached deposit. Beyond these predefined aspects, Function Call assets can also include dynamically defined arguments such as user inputs, and immutable Keypom basis-of-truth arguments.  


## Structure

A Function Call Asset is defined by a **vector of function calls**, which is *represented by a vector of `MethodData`*. Each `MethodData` represents a single function call. Since a Function Call asset is defined with a vector of `MethodData`, multiple function calls can be made in a single key use. 

The `MethodData` object outlines the following:

* `receiver_id`: The contract on the receiving end of the function call.
* `method_name`: The desired method to be called.
* `args`: Arguments to be included in the function call, JSON stringified. 
* `attached_deposit`: Amount of yoctoNEAR to attach to the function call.
* `attached_gas`: Amount of gas for this method
* `keypom_args`: Immutable Keypom populated basis-of-truth arguments, you specify the location and Keypom will inject certain values into these JSON locations within `args`. These cannot be spoofed, for more info see [below](#keypom-arguments)
* `receiver_to_claimer`: Boolean that allows the claimer to become the receiver
* `user_args_rule`: Rules outlining the behaviour of user inputs and predefined `args` when claiming.


<Tabs>
<TabItem value="KP" label="📚 Protocol">

```rust reference
https://github.com/keypom/keypom/blob/8f9f8df397cb8cabbda30d1ddffdcddc4a733274/contract/src/assets/function_call/models.rs#L6-L26
```

</TabItem>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```ts reference
https://github.com/keypom/keypom-js/blob/e8c43f4219a79afb3c367296cc90b8d5de977945/src/lib/types/fc.ts#L68-L74
```

</TabItem>
</Tabs>

## Execution

For **every Function Call Asset**, you can specify a *vector* of `MethodData` which allows you to execute multiple function calls for each asset. These calls are scheduled 1 by 1 using a simple for loop. This means that most of the time, the function calls will be executed in the order specified in the vector but it is not *guaranteed*.

## Injecting Keypom Arguments
Injected Keypom Arguments are arguments that are automatically populated into a function call's outgoing arguments. These arguments are immutable and cannot be spoofed, meaning they allow receiving contracts to use them as a source of truth for certain pieces of information. The following arguments can be injected automatically by Keypom:

* **Claiming Account ID**: This is the account ID that is claiming that particular key use.
* **Drop ID**: This is a unique identifier for each drop.
* **Drop Funder Account ID**: The account ID of the account that created the drop, this can be useful for ensuring only trusted users can trigger certain behaviours in your receiving contract
* **Key ID**: Each key in a drop is identified with an integer key ID. This is **unique in to that specific drop** but not accross multiple different drops. 

 Prior to function execution, the Keypom contract will **automatically** modify the outgoing arguments according to the defined `keypom_args`. The desired location for these arguments to be injected can be specified using the following data structure. These locations must be specified at drop creation and cannot be changed. 

```rust reference
https://github.com/keypom/keypom/blob/8f9f8df397cb8cabbda30d1ddffdcddc4a733274/contract/src/assets/function_call/models.rs#L32-L45
```

For example, if the `account_id_field` is set to `"claiming_account"`, then Keypom will inject the claiming account's IDs into the `claiming_account` field in the args. 

Arguments can be injected into nested fields by using object dot notation; `funder_id_field: "creator.account_id"` will inject the drop funder's account ID into the `creator` object under the field `account_id`. If specified fields do not exist, Keypom will create them. Attempting to nest into a non-object will cause the drop creation to fail. 

### Protect your Contracts and Validate Information with Keypom Args
Take the perspective of the receiver contract form the previous examples. If you expect a certain funder account ID under the `creator` field, how do you know that this value has actually been injected by Keypom and not maliciously hardcoded?  That is, how can you know that somebody else didn't create a malicious drop and hardcode the `creator` field to the expected value? 

Here, `keypom_args` comes in handy. When a key is used and a function is called, a seperate data structure is **automatically** attached to the arguments, known as the `keypom_args`. This object contains informs the receiver contract of the arguments that have been automatically injected and the location in which they were injected. This is information that the drop creator specified in the `MethodData.keypom_args` during drop creation. 

This additional data structure allows receiving contracts to protect themselves from malicious calls by ensuring that critical pieces of information are correct. For example, if a contract 

* Knows that the field `claiming_account_id` should contain information automatically injected by Keypom
* Only wants to work with drops from a particular funder `moon.near`
  
They can leverage the `keypom_args` in the following manner. 

To ensure that `claiming_account_id` is being injected by Keypom rather than hardcoded, the receiving contract can check that `keypom_args.account_id_field` is set to `claiming_account_id`. Since Keypom injected arguments cannot be overriden, you know with 100% certainty that whatever value you read in the `claiming_account_id` has been injected by Keypom. 

To make sure that all claims come from a drop funded by `moon.near`, a similar strategy can be employed but this time while also checking the value. The drop can first inject the funder's account ID using `keypom_args` into any arbitrary field such as `creator`. The receiver contract can then check the value `creator` is `moon.near`, **and** check that `keypom_args.funder_id_field` is set to `creator`. If both checks pass, you know with 100% certainty that Keypom populated the `creator` field and that the drop funder was `moon.near`

:::info
The receiver contract's validation of injected arguments per the examples given above looks like this

```rust
#[payable]
pub fn myFunction(&mut self, mint_id: String, claiming_account_id: String, drop_funder: data, keypomArgs: keypom_args) -> Promise {
        // If the function call is coming from Keypom, validate arguments
        if(env::predecessor_account_id() == "v3.keypom.near"){
            //Ensure claiming_account_id was not hardcoded
            assert!(keypomArgs.account_id_field == "claiming_account_id", "Call must come from valid Keypom drop");

            // Ensure drop_funder is moon.near AND is not hardcoded
            assert!(drop_funder == "moon.near" && keypomArgs.funder_id_field == "drop_funder", "Call must come from valid Keypom drop");
        }
        ...
}
```
:::
  

## Prohibited Methods

Since all function calls will be signed by the Keypom contract, there are a few restrictions in place to avoid malicious behaviors.
To avoid users from stealing registered assets from other assets, the following methods cannot be called via FC assets:

```rust reference
https://github.com/keypom/keypom/blob/7a654aa847f2ce9dedf65755c6a08817eece4666/contract/src/lib.rs#L926-L934
```

In addition, the Keypom contract cannot be the receiver of any function call. This is to avoid people
from calling private methods through FC assets.

## Use Cases

Function call assets are the bread and butter of the Keypom contract. They are the most powerful and complex assets that can currently be created.
With this complexity, there are an almost infinite number of use-cases that arise.

### Proof of Attendance Protocols [➜](../../../Cookbook/drops/fc.md#attaching-nfts-to-your-fc-drop)

A very common use case in the space is what's known as Proof of Attendance. Often times when people go to events, they want a way to prove
that they were there. Some traditional approaches would be to submit your wallet address and you would be sent an NFT or some other form of
proof at a later date. The problem with this is that it has a very high barrier to entry. Not everyone has a wallet.

With Keypom, you can create a function call drop that allows people to onboard onto NEAR if they don't have a wallet or if they do, they can
simply use that. As part of the onboarding / claiming process, they would receive some sort of proof of attendance such as an NFT. This can
be lazy minted on-demand such that storage isn't paid up-front for all the tokens.

At this point, the event organizers or the funder can distribute links to people that attend the event in-person. These links would then be
claimed by users and they would receive the proof of attendance.

### Auto Registration into DAOs [➜](../../../Tutorials/Advanced/daos/introduction.md)

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

### NFT Ticketing [➜](../../../Tutorials/Advanced/ticketing/introduction.md)

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