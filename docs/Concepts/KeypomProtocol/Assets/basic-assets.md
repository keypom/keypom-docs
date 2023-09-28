---
sidebar_label: 'NEAR, NFT, & FT Assets'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';

# NEAR, NFT, & FT Assets
<Admonition type="tip" icon="💡" title="tip">
For every use on an Access Key, the different types of assets can be mixed to create an infinite number of experiences! 
</Admonition>

## NEAR Asset
> A NEAR Asset attaches some claimable NEAR to each use it is defined for

Whenever a NEAR asset is present in a key use, the user will receive some NEAR for that particular key use. For example, if a key has 2 uses, and a NEAR asset is defined in the first use but not the second, then the user will only receive NEAR the first time they claim their key. 

### Structure
The structure of a NEAR asset is relatively simple. All that needs to be defined is the amount. Note that if multiple NEAR assets are defined in the same use, the claiming user will receive the sum of `yoctonear` contained in all the NEAR assets.
<Tabs>
<TabItem value="KP" label="📚 Protocol">

```rust reference
https://github.com/keypom/keypom/blob/8f9f8df397cb8cabbda30d1ddffdcddc4a733274/contract/src/models/external/models.rs#L30-L33
```

</TabItem>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```ts reference
https://github.com/keypom/keypom-js/blob/e8c43f4219a79afb3c367296cc90b8d5de977945/src/lib/types/fc.ts#L68-L74
```

</TabItem>
</Tabs>

### Funding
In the case of NEAR assets, defining and funding are synonomous. This is because the drop creation will fail if insufficient NEAR is provided. This NEAR can come from:

* Your [Keypom Balance](../balances.md).
* An [attached deposit](https://docs.near.org/develop/contracts/environment/#environment-variables) when creating the drop.

___

## NFT Asset
> A properly funded NFT Asset will allow a user to receive a Non-fungible Token

Whenever an NFT asset is present and properly funded in a key use, the user will receive an NFT for that particular key use. For example, if a key has 2 uses, and an NFT asset is defined in the first use but not the second, then the user will only receive an NFT the first time they claim their key. 

Note that multiple different tokens can be sent at once by simply including more NFT Assets.
### Structure
When defining an NFT Asset, only one item needs to be specified:
* `nft_contract_id`: the contract that the NFT lives on.

<Tabs>
<TabItem value="KP" label="📚 Protocol">

```rust reference
https://github.com/keypom/keypom/blob/8f9f8df397cb8cabbda30d1ddffdcddc4a733274/contract/src/models/external/models.rs#L50-L53
```

</TabItem>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```ts reference
https://github.com/keypom/keypom-js/blob/e8c43f4219a79afb3c367296cc90b8d5de977945/src/lib/types/fc.ts#L68-L74
```

</TabItem>
</Tabs>

### Funding
:::caution
An improperly loaded NFT Asset will result in **no NFT being sent to the user**
:::

In order to fund an NFT asset, you must transfer it to the Keypom contract: `v3.keypom.near` or `v3.keypom.testnet`. By doing this, you give the Keypom contract the ability to transfer it to the end user when they claim. 

It is important that when transferring, you are transferring from the contract that you defined above. It is also important to include the `dropId` as a `msg`. This tells Keypom to associate the incoming NFT with your drop.
```js reference
https://github.com/keypom/keypom/blob/8a4009be98f263e93d718779983efcdac1b1a9f8/__tests__/creation/nft-creation.ava.ts#L189-L199
```
In the case where you have multiple NFT Assets, you will need to transfer the appropriate number of NFTs. For example, if you have 5 keys with 2 NFT Assets each, you will need to transfer 10 NFTs to Keypom. 

When claiming, the user will receive the lastest NFT that was transferred to Keypom. 

:::note
Only a drop's creator can fund its NFT Assets
:::
___

## FT Asset
> A properly funded FT Asset will send the claiming user a predetermined amount of Fungible Tokens

Whenever an FT asset is present and properly funded in a key use, the user will receive a set amount of FTs for that particular key use. For example, if a key has 2 uses, and an FT asset is defined in the first use but not the second, then the user will only receive an the predefined amount of FTs the first time they claim their key. 

Note that multiple different tokens can be sent at once by simply including more FT Assets.
### Structure
When defining an FT Asset, a few things need to be defined:
* *ft_contract_id*: The Fungible Token contract.  
* *ft_amount*: The amout of Fungible Tokens to be sent. Defined in the smallest divisible unit. For more, see the token's definition of the [decimal value](https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals). 
* *registration_cost*: Specific to each FT contract, this is the cost to register the user on the FT contract. 

<Tabs>
<TabItem value="KP" label="📚 Protocol">

```rust reference
https://github.com/keypom/keypom/blob/8a4009be98f263e93d718779983efcdac1b1a9f8/contract/src/models/external/models.rs#L38-L45
```

</TabItem>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```ts reference
https://github.com/keypom/keypom-js/blob/e8c43f4219a79afb3c367296cc90b8d5de977945/src/lib/types/fc.ts#L68-L74
```

</TabItem>
</Tabs>


### Funding
:::caution
An improperly loaded FT Asset will result in **no FTs being sent to the user**
:::

In order to fund a Fungible Token asset, you must transfer it to the Keypom contract: `v3.keypom.near` or `v3.keypom.testnet`. By doing this, you give the Keypom contract the FT balance necessary to transfer it to the end user when they claim. 

It is important that when transferring, you are transferring from the contract that you defined above. It is also important to include the `dropId` as a `msg`. This tells Keypom to associate the incoming NFT with your drop.
```js reference
https://github.com/keypom/keypom/blob/8a4009be98f263e93d718779983efcdac1b1a9f8/__tests__/utils/ft-utils.ts#L17-L28
```
:::note
Anybody can fund a drop's FT Assets
:::
___