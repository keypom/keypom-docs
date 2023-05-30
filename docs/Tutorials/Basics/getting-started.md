import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

# Getting Started
The primary goal of a Keypom drop is to send assets to users with the click of a link regardless of whether they have a wallet or not. These assets can come in many forms which will be broken down below.

The basic tutorials are meant as introductory guides that will help you create your first Keypom drops and understand the differences between the [types](/Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/introduction.md) of Keypom drops and the assets they contain. 

There are **four** types of drops, each with different types of assets. These drops can be claimed either with a brand new NEAR account or an existing one.


| Drop Type                                                                                          | Assets                                     |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------|
| [Simple Drop](../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/simple-drops.md)             | $NEAR                                      |
| [Non-Fungible Token Drop](../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/nft-drops.md)    | NFT and optionally $NEAR                   |
| [Fungible Token Drop](../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/ft-drops.md)         | Fungible Tokens and optionally $NEAR       |
| [Function Call Drop](../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/fc-drops.md)          | Set of function-calls and optionally $NEAR |


The [Simple Drop](../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/simple-drops.md) is the most basic type of drop, it allows you to send $NEAR via a link to new or existing users. 

[NFT Drops](../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/nft-drops.md) and [FT Drops](../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/ft-drops.md) are extensions of the Simple drop, they allow you to send NFTs and FTs in addition to $NEAR. 

The [Function Call Drop](../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/fc-drops.md) is Keypom's most powerful type of drop. It allows you send a link that is capable of calling almost any function on any smart contract that you predefine. A simple example of this is auto-registering users into a DAO as part of the onboarding process.

While there are many [drop configurations](../../Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/customization-homepage.md) available to developers such as multi-use keys or time-based restrictions, in these basic tutorials, a single use key with no additional configurations will be created.

Throughout each tutorial, two simple NodeJS scripts will be created that use both NEAR's native [NEAR-API-JS](https://docs.near.org/tools/near-api-js/reference) library, and Keypom's [JS-SDK](https://github.com/keypom/keypom-js).

---

## Prerequisites
For the basic tutorials, you can choose to run the scripts on your own machine. To do so, you must have the following:

1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [NEAR-API-JS](https://docs.near.org/tools/near-api-js/quick-reference#install)  
3. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)

At this point, you are ready to start the tutorials.

Alternatively, if you wish to use ready-to-use scripts that can be customized to your liking in order to quickly create Keypom drops, visit the [Keypom Protocol](https://github.com/keypom/keypom#deploy-scripts). 


