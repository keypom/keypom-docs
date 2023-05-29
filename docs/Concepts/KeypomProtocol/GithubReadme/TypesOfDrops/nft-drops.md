---
sidebar_label: 'Non Fungible Token Drops'
sidebar_position: 3
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Non-Fungible Token Drops

Non-Fungible Token drops are a special type that allows users to "preload" the drop with NFTs.
These tokens will then be *automatically* sent to the **claiming user**. The claiming flow
is fairly similar to simple drops in that users can either create an account or claim to an
existing one.

NFT drops are essentially a wrapper around simple drops. All the functionalities that simple
drops have are carried over but now, users can receive an NFT as well as $NEAR. This brings
introduces some customization and uniqueness to the use-cases.

## How does it work?

Every drop has a field known as `registered_uses`. This tells the contract how many uses the
drop has across all its keys. For simple drops, this field doesn't matter since all the uses
are paid for up-front when the drop is created or when keys are added. With NFT drops, however,
there is a 2 step process:
- Firstly, the drop is created and all the $NEAR required is pre-paid for. This is the same as
simple drops, however, the `registered_uses` are set to 0.
- Once the drop is created, the owner must send the contract the NFTs in order for keys to be
usable. This process is done through the `nft_transfer_call` workflow baked into the NFT standards.
It's up to the owner to facilitate this process.

Whenever the contract receives tokens, it will push the ID to a vector. These IDs are **popped** off
whenever a key is used. A user will receive the most recent token sent to the contract as the
vector is acting like a *stack*.

## NFT Config

Along with the default global configurations for drops, if you'd like to create an NFT drop,
you must specify the following pieces of information when the drop is created.

<Tabs>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```ts reference
https://github.com/keypom/keypom-js/blob/e8c43f4219a79afb3c367296cc90b8d5de977945/src/lib/types/nft.ts#L4-L15
```

</TabItem>
<TabItem value="KP" label="📚 Protocol">

```rust reference
https://github.com/keypom/keypom/blob/7a654aa847f2ce9dedf65755c6a08817eece4666/contract/src/models/json_types.rs#L78-L81
```

</TabItem>
</Tabs>

By specifying this information, the drop is locked into only accepting NFTs from the sender and contract.

## Use Cases

NFT drops work really well for when you want to send a *pre-existing* NFT to a user along with
some $NEAR. Since NFT drops are a light wrapper around simple drops, most of the use-cases are
the same although people can now get NFTs as well. This means you can onboard a user with some
$NEAR **and** they *get an NFT* too.