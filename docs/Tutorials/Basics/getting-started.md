import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

# Getting Started
The primary goal of a Keypom drop is to send assets to new *or* existing users. These assets can take on many forms.

The basic tutorials are meant as introductory guides that will help you create your first Keypom drops and understand the differences between the [types](/Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/introduction.md) of Keypom drops and the assets they send. 

There are **four** types of Keypom drops. Each drop type holds different types of assets and can be sent to new **or** existing users.

| Drop Type                 | Assets Embedded in Web2 Style Link                                                                                     |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [Simple Drop](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/simpledrops.md)             | $NEAR                              |
| [Non-Fungible Token Drop](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/nftdrops.md)    | $NEAR and an NFT                   |
| [Fungible Token Drop](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/ftdrops.md)         | $NEAR and FTs                      |
| [Function Call Drop](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/fcdrops.md)          | $NEAR and a set of callable methods|


The [Simple Drop](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/simpledrops.md) is the most basic type of drop, it allows you to $NEAR to new or existing users. 

[NFT Drop](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/nftdrops.md) and [FT Drop](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/ftdrops.md) are extensions of the Simple drop, they allow you to send NFTs and FTs in addition to $NEAR. 

The [Function Call Drop](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/fcdrops.md) is Keypom's most powerful type of drop. They allow you send a link that is capable of calling almost any function on any smart contract that you predefine. A simple example of this is lazy-minting NFTs, where the NFT is minted once the user claims their key. 

While there are many [drop configurations](../../Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/customization-homepage.md) that can be used to extract the full potential of Keypom, in these basic tutorials, a single use key with no additional configurations will be created.

Throughout each tutorial, two simple NodeJS scripts will be created that use both NEAR's native [NEAR-API-JS](https://docs.near.org/tools/near-api-js/reference) library, and Keypom's [JS-SDK](https://github.com/keypom/keypom-js).

---

## Prerequisites
For the basic tutorials, you can choose to run the scripts on your own machine. To do so, you must have the following:

1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [NEAR-API-JS](https://docs.near.org/tools/near-api-js/quick-reference#install)  
3. To [install the SDK](https://github.com/keypom/keypom-js#installation), simply run the following in your command prompt.  
```bash
npm -i keypom-js
```

At this point, you are ready to start the tutorials.

Alternatively, if you wish to use ready-to-use scripts that can be customized to your liking in order to quickly create Keypom drops, visit the [Keypom Protocol](https://github.com/keypom/keypom#deploy-scripts). 


