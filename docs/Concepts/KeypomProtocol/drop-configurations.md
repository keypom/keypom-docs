---
sidebar_label: Drop Configurations
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';

# Drop Configurations

> Drop configurations are ways you can customize your drops **globally**. This means they apply to the entire drop, for all keys and key uses

:::info
These configurations apply to your entire drop. For more granular configurations see [key use configurations](./Assets/key-use-configurations)
:::

# What are Drop Configurations?
Drop configuration define the expected behaviour for an entire drop in the following aspects:

* [**Add Key Allowlist**](#add-key-allowlist): Allow others to add keys to your drop, useful for selling tickets.
* [**NFT Key Configuration**](#nft-key-configuration): Customize NFTs associated with your access keys.
* [**Delete Empty Drop**](#delete-empty-drop): What happens when all the keys in your drop are used?
* [**Drop Metadata**](#drop-metadata): Drop specific information
* [**Extra Key Allowance**](#extra-key-allowance): The amount of extra key allowance to be added to dynamically calculated allowance.

Below is the structure of the drop configuration struct, `DropConfig`:

```rust reference
https://github.com/keypom/keypom/blob/807fea5997987cb1a97bee838c4d2312a7faab51/contract/src/models/config.rs#L59-L78
```

___

## Add Key Allowlist
> *Default: null*

`add_key_allowlist` is a vector of account IDs that controls which accounts have permissions to add keys to drop using the [`add_keys`](https://github.com/keypom/keypom/blob/807fea5997987cb1a97bee838c4d2312a7faab51/contract/src/drop_creation/add_keys.rs#L6) method. 

:::caution
Note that this ***must*** be defined at the time of *drop creation* and cannot be modified once the drop has been created.
:::

### Use Case
Whilst linking NFTs with Access Keys has helped open up a secondary market for Access Keys, `add_key_allowlist` enables you to create a primary market. This was the technique leveraged to sell NEARCON 2023 tickets!

<p align="center">
  <img src={require("/static/img/nearcon-tickets.png").default} width="80%" height="15%" alt="ticketing"/>
</p>


To do this, you can allow a primary market, in this case [Veriken](https://nearcon2023.veriken.app/), to add keys to your NEARCON drop using `add_key_allowlist`. Then, once Veriken handles and confirms the customer's payment, they simply call `add_keys` for each ticket purchased and then distribute the ticket to the customer. 
___

## NFT Key Configuration
> *Default: [Keypom NFT](https://www.mintbase.xyz/meta/ncon23.keypom.near%3A46d3371766753c9d1a29e2b486438c7c) with metadata defined [here](https://github.com/keypom/keypom/blob/807fea5997987cb1a97bee838c4d2312a7faab51/contract/src/nft_keys/metadata.rs#L73-L81) and null royalties*

Every access key in your drop is linked with an NFT, opening up the possibility of buying, selling and trading access keys using [NFT standards](https://nomicon.io/Standards/Tokens/NonFungibleToken) methods such as `nft_transfer` and `nft_approve`. This NFT contains metadata and royalties defined in the `NFTKeyConfigurations` object at time of drop creation. 

```rust reference
https://github.com/keypom/keypom/blob/807fea5997987cb1a97bee838c4d2312a7faab51/contract/src/nft_keys/metadata.rs#L45-L51
```

:::caution
NFT Key Configurations can only be specified at drop creation, and cannot be changed after that. 
:::

This NFT metadata follows the definition specified in the NFT Metadata standard ([NEP-177](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata)).

```rust reference
https://github.com/keypom/keypom/blob/807fea5997987cb1a97bee838c4d2312a7faab51/contract/src/nft_keys/metadata.rs#L15-L22
```

### Use Case
Suppose Benji is hosting his own conference known as BenjiCON. He wishes to create a seamless ticketing experience for his guests and chooses Keypom accordingly. When listing tickets on trusted secondary marketplaces such as Mintbase, he wants them to be represented by NFTs depicting him holding Moon. He also wishes to send 30% of all proceeds from secondary ticket sales to his beloved pomeranian Moon. 

To do this, he initializes a drop, whith the following `NFTKeyConfigurations`. 

```javascript
myNFTKeyConfig = {
    token_metadata: {
        title: "BenjiCON 2024",
        description: 'Welcome to BenjiCON!',
        media: '${IPFS link of image of Benjis face}',
        media_hash: undefined,
        .
        .
        reference_hash: undefined
    },
    royalties: {
        moon: 3000
        originalOwner: 7000
    }
}
```

:::note
Royalties are expressed as integers out of 10,000
:::

___

## Delete Empty Drop
> *Default: True, empty drops will automatically be deleted*

This configuration specifies whether or not drops that have depleted all their keys should be deleted or not. By default, they will be deleted. 

### Use Case
Moon is running his annual MoonCON conference and chooses to use Keypom access keys linked with NFTs to represent tickets. Tickets can be bought at the door and only have 1 key use that is used to enter the conference. 

In this scenario, since Moon does not know how many people will attend the event, he chooses to set `delete_empty_drop` to false. This way, if he has 5 tickets and they end up being used right away, a 6th person buying a ticket at the event can still do so using the same drop.

:::note
Drops can only be deleted by calling `delete_keys` and deleting all the keys. That is, creating a drop with 0 keys will **not** result in the drop being deleted right away. To delete an empty drop, simply call `delete_keys` with the empty drop's `drop_id`
:::

___

## Extra Key Allowance
> *Default: 0*

An extra amount of NEAR to be added to an access key's allowance.

___

## Drop Metadata
> *Default: null*

`drop_metadata` is a string that allows you to store any other information you wish to associate with the drop, such as the drop's purpose.

___

