---
sidebar_label: 'Tradeable Access Keys'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';

# Tradeable Access Keys
## What is a Tradeable Access Key?
<Admonition type="tip" icon="💡" title="Key Concept">
Every Keypom access key is linked with an NFT on the contract, giving your access keys NFT buy-sell functionality!
</Admonition>

A tradeable access key allows you to sell, transfer and buy access keys, all securely on-chain. This creates an entirely new possibility of a secondary market and economy of access keys. This is particularly relevent to the field of event ticketing, where access keys as tickets hold high intrinsic value.

In addition, since the access keys are associated with NFTs and leveraging technology defined by the [NFT standards](https://nomicon.io/Standards/Tokens/NonFungibleToken), they can work interoperably with any popular NFT marketplaces such as [Mintbase](https://www.mintbase.xyz/). 

:::info
In order to put an access key up for sale or transfer it, you must be one of the following:
* In possesion of the keypair and use it to sign transactions
* The key's owner, similar to the owner of an NFT
* An approved account, as per the NFT approval standard ([NEP-178](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement))
:::

___

## Customizing NFTs associated with your Keys
Since your access keys are now linked with NFTs, you can now change the NFT metadata such as media, title, description and more in accordance to the NFT standard ([NEP-177](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata)). This will change the way your access keys appear on NFT marketplaces. 

This customization applies to **all** access keys in your drop. Details on this can be found in the NFT Key Configuration section of the [drop configurations](drop-configurations.md#nft-key-configuration) page.

___

## Owned versus Ownerless Keys
Access Key ownership is similar to NFT ownership in that it allows you transact it directly using the owner's account. This ownership can be transferred between accounts and be forfeitted.

An ownerless access key is one that does not belong to any particular account, and thus cannot be transacted by any particular account. Rather, they can be transacted if the `nft_transfer` or `nft_approve` methods calls are signed by the access key itself. 

:::tip
Owned and Ownerless keys have the same functionality!
:::

:::danger
PUT PROPER SCRIPTS BELOW INSTEAD OF TEST SCRIPTS
:::

### Initializing Owner
When creating a drop with keys or adding keys to a drop, a vector of *key data* is added. 

```rust reference
https://github.com/keypom/keypom/blob/807fea5997987cb1a97bee838c4d2312a7faab51/contract/src/drop_creation/add_keys.rs#L6-L12
```

This vector represents each access key and any additional data associated with it. The key data object includes a field `key_owner` for specifying an owner account ID. 

```rust reference
https://github.com/keypom/keypom/blob/807fea5997987cb1a97bee838c4d2312a7faab51/contract/src/models/external/models.rs#L81-L92
```

### Adding Owner
If you added keys to the drop without an owner and wish to retroactively add owners to them, you can do so by using `nft_transfer` and sending it to the new owner. This transaction will need to be signed with the keypair that you wish to give to the new owner.

Below is a modified example from our contract tests. In this example, the keyair being transferred is used to sign the `nft_transfer` transaction. 

```typescript
// **************** USE KEY *****************
await keypomV3.setKey(keyPairs.keys[0]);

// **************** TRANSFER ****************
let newKeyPair = await generateKeyPairs(1);
await functionCall({
    signer: keypomV3,
    receiver: keypomV3,
    methodName: "nft_transfer",
    args: {
        token_id: found_key_info.token_id,
        receiver_id: bob.accountId,
        memo: newKeyPair.publicKeys[0]
    }
})
```
:::note
The `nft_transfer` function details will be covered [below](#transferring-an-access-key)
:::

___

## Transferring an Access Key
Whether you just sold your access key or are sending it to a friend, transferring ownership of it on-chain is crucial to ensuring that the receiver is secure in knowing that the access key is ***truly*** theirs. If instead, you simply gave someone the keypair, they would have no confirmation that they actually own the key, and that you won't use it to claim the assets or experiences linked with the key.

For that reason, transferring ownership of an access key is not as simple as just handing over the keypair, and rather involves leveraging `nft_transfer` to transfer on-chain ownership.

```rust reference
https://github.com/keypom/keypom/blob/807fea5997987cb1a97bee838c4d2312a7faab51/contract/src/nft_keys/nft_core.rs#L11-L17
```

In order to ensure that you, the previous owner, can no longer transact using the keypair, the access key **must** be swapped with a new keypair, provided as a `publicKey` in the `memo` field. Upon completion of the transfer, the new keypair now holds all the assets and the old keypair is no longer useable. 

### Transfer to Receiver with Account
The simplest case is the one where the receiver already has a NEAR wallet. Here, the transfer is just a normal `nft_transfer` where you include the receiver's account ID. 

:::note
Both owned and ownerless keys can use this method - either with the owner account ID or using the key itself to sign the `nft_transfer` transaction. The `token_id` can be found by calling the method [`get_key_information`](https://github.com/keypom/keypom/blob/807fea5997987cb1a97bee838c4d2312a7faab51/contract/src/views/keys.rs#L31). 
:::

Shown below is when the owner, Ali, invokes the method and transfer it to Bob. Bob then receives the keypair associated with the `publicKey` specified in the `memo` The ownerless case can be found in the exapndable section below it.

```typescript
// ************ GENERATE NEW KEY ************
let newKeyPair = await generateKeyPairs(1);

// **************** TRANSFER ****************
await functionCall({
    signer: ali,
    receiver: keypomV3,
    methodName: "nft_transfer",
    args: {
        token_id: found_key_info.token_id,
        receiver_id: bob.accountId,
        memo: newKeyPair.publicKeys[0]
    }
})
```

<div style={{textAlign: 'center'}}>
  Owner invoked access key transfer
</div>
<br></br>

<details>
<summary>Transfer to Account using Key</summary>
<p>

The key itself can be used to sign the `nft_transfer` method.

```typescript
// **************** USE KEY *****************
await keypomV3.setKey(keyPairs.keys[0]);

// ************ GENERATE NEW KEY ************
let newKeyPair = await generateKeyPairs(1);

// **************** TRANSFER ****************
await functionCall({
    signer: keypomV3,
    receiver: keypomV3,
    methodName: "nft_transfer",
    args: {
        token_id: found_key_info.token_id,
        receiver_id: bob.accountId,
        memo: newKeyPair.publicKeys[0]
    }
})
```

</p>
</details>

After this transfer, the receiver Bob can use this access key or trade/sell it using the same method, signing the `nft_transfer` method with his account ID. Giving Bob the new access key keypair is not necessary as he can sign with his own account but is highly recommended.

### Transfer to Receiver without Account
In this scenario, the transfer works the same way as a receiver with an account, but with one **major** difference. The new keypair defined by the `memo`'s `publicKey` ***must*** be kept track of. This is because the receiver can only transact this access key with this keypair. 

:::caution
If the receiver does not receive the new keypair, they cannot continue to trade or sell the access key.
:::

The rest of the process is exactly the same as the previous case transfering to a receiver with an account, except no `receiverId` is specified

:::note
Both owned and ownerless keys can use this method - either with the owner account ID or using the key itself to sign the `nft_transfer` transaction. The `token_id` can be found by calling the method [`get_key_information`](https://github.com/keypom/keypom/blob/807fea5997987cb1a97bee838c4d2312a7faab51/contract/src/views/keys.rs#L31). 
:::

Shown below is when the owner, Ali, invokes the method and transfer it to no receiver account ID. The receiver should receive the keypair associated with the `publicKey` specified in the `memo` The ownerless case can be found in the exapndable section below it.

```typescript
// ************ GENERATE NEW KEY ************
let newKeyPair = await generateKeyPairs(1);

// **************** TRANSFER ****************
await functionCall({
    signer: ali,
    receiver: keypomV3,
    methodName: "nft_transfer",
    args: {
        token_id: found_key_info.token_id,
        memo: newKeyPair.publicKeys[0]
    }
})
```

<div style={{textAlign: 'center'}}>
  Owner invoked access key transfer
</div>
<br></br>

<details>
<summary>Transfer to Account using Key</summary>
<p>

The key itself can be used to sign the `nft_transfer` method.

```typescript
// **************** USE KEY *****************
await keypomV3.setKey(keyPairs.keys[0]);

// ************ GENERATE NEW KEY ************
let newKeyPair = await generateKeyPairs(1);

// **************** TRANSFER ****************
await functionCall({
    signer: keypomV3,
    receiver: keypomV3,
    methodName: "nft_transfer",
    args: {
        token_id: found_key_info.token_id,
        memo: newKeyPair.publicKeys[0]
    }
})
```

</p>
</details>

After this transfer, the receiver Bob can use this access key or trade/sell it using the same method, signing the `nft_transfer` method with his account ID. Giving Bob the new access key keypair is not necessary as he can sign with his own account but is highly recommended.


## Approving Marketplaces to Transact your Access Key
In order for your access key to be listed on a marketplace, such that the marketplace can sell and transfer your key for you, you must approve them, according to the NFT approval standard, [NEP-178](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement).

You can generate new approvals for different accounts/marketplaces by using the `nft_approve` method shown below. 

```rust reference
https://github.com/keypom/keypom/blob/807fea5997987cb1a97bee838c4d2312a7faab51/contract/src/nft_keys/approval.rs#L7C5-L7C105
```

:::note
Both owned and ownerless keys can use this method - either with the owner account ID or using the key itself to sign the `nft_approve` transaction. The `token_id` can be found by calling the method [`get_key_information`](https://github.com/keypom/keypom/blob/807fea5997987cb1a97bee838c4d2312a7faab51/contract/src/views/keys.rs#L31). 
:::

Shown below is when the owner invokes the method. The ownerless case can be found in the exapndable section below it.

```typescript
// **************** APPROVE ****************
await functionCall({
    signer: ali,
    receiver: keypomV3,
    methodName: "nft_approve",
    args: {
        token_id: token_id,
        account_id: mintbase.accountId,
    }
})
```

<div style={{textAlign: 'center'}}>
  Owner invoked access key approval
</div>
<br></br>


<details>
<summary>Approval using the Key</summary>
<p>

The key itself can be used to sign the `nft_approve` method.

```typescript
// **************** USE KEY *****************
await keypomV3.setKey(keyPairs.keys[0]);

// **************** APPROVE ****************
await functionCall({
    signer: keypomV3,
    receiver: keypomV3,
    methodName: "nft_approve",
    args: {
        token_id: token_id,
        account_id: mintbase.accountId,
    }
})
```

</p>
</details>
