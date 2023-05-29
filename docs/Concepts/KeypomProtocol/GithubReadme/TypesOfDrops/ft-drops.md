---
sidebar_label: 'Fungible Token Drops'
sidebar_position: 4
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fungible Token Drops

A Fungible Token drop is also a light wrapper around the simple drop. It works very similarly to how its NFT
counterpart does. First, you'll need to create the drop and then you can fund it with assets and register
key uses.

You can preload a drop with as many FTs as you'd like even if you don't have the keys yet. This will spike the
`registered_uses` and then you can create keys and slowly eat away from this "total supply" overtime. If the
drop runs out, you can send it more FTs to top up. All the keys in the FT drop will share from this supply
and every time a key is used, the `registered_uses` will decrement and the "total supply" will get smaller.

## How does it work?

As mentioned in the NFT section, every drop has a field known as `registered_uses`. This tells the contract
how many uses the drop has across all its keys. For simple drops, this field doesn't matter since all the uses
are paid for up-front when the drop is created or when keys are added. With FT drops, however,
there is a 2 step process:
- Firstly, the drop is created and all the $NEAR required is pre-paid for. This is the same as
simple drops, however, the `registered_uses` are set to 0.
- Once the drop is created, the owner must send the contract the FTs in order for keys to be
usable. This process is done through the `ft_transfer_call` workflow baked into the FT standards.
It's up to the owner to facilitate this process.

## FT Config

Along with the default global configurations for drops, if you'd like to create a FT drop,
you must specify the following pieces of information when the drop is created.

<Tabs>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```ts reference
https://github.com/keypom/keypom-js/blob/e8c43f4219a79afb3c367296cc90b8d5de977945/src/lib/types/ft.ts#L4-L23
```

</TabItem>
<TabItem value="KP" label="📚 Protocol">

```rust reference
https://github.com/keypom/keypom/blob/7a654aa847f2ce9dedf65755c6a08817eece4666/contract/src/models/json_types.rs#L119-L123
```

</TabItem>
</Tabs>


By specifying this information, the drop is locked into only accepting FTs coming from the sender and contract. While
you can send as many FTs as you'd like and can over-pay, you *must* send at **least** enough FTs in one call to cover
1 use. As an example, if a drop is created such that 10 FTs will be sent when a key is used, you must send **at least 10**
and cannot break it up into separate calls where you send 5 one time and 5 another.

## Use Cases

FT drops have some awesome flexibility due to the fact that they support all the functionalities of the Simple drops, just with
more use-cases and possibilities. Let's look at some use cases to see how fungible token drops can be used.

### Recurring Payments

Recurring payments are quite a common situation. Let's say you need to send someone $50 USDC every week. You
could create a key with 5 claims that has a claim_interval` of 1 week. You would then pre-load maybe the
first week's deposit of $50 USDC and register 1 use or you could send $500 USDC for the first 10 weeks. At that
point, you would simply hand over the key to the user and they can claim once a week.

### Backend Servers

Taking the recurring payments problem to another level, imagine that instead of leaving the claims up to the
contractor, you wanted to automatically pay them through a backend server. They would give you their NEAR account
and you would send them FTs. The problem is that you don't want to expose your full access key in the server.
By creating a FT drop, you can store **only the function call access key** created by Keypom in the server.
Your backend would them use the key to call the `claim` function and pass in the user's account ID to send
them the FTs.

### Creating a Wallet with FTs

Another awesome use-case is to allow users to be onboarded onto NEAR and **also** receive FTs. As an example,
You could do a promotion where you're giving away $10 USDC to the first 100 users that sign up to your mailing
list. You can also give away QR codes at events that contain a new fungible token that you're launching. You can
simply create a FT drop and pre-load it with the FT of your choice. In addition, you can give it 0.02 $NEAR for
new wallets that are created.

You can pair this with setting the `on_claim_refund_deposit` flag to true which would make it so that if anyone claims
the fungible tokens and they *already have a wallet*, it will automatically refund you the 0.02 $NEAR. That money should
only be used for the creation of new wallets. Since your focus is on the fungible tokens, you don't want to **force users**
to create a new wallet if they have one already by specifying the claim permission to be `CreateAccountAndClaim` but instead,
you want to be refunded in case they do.
