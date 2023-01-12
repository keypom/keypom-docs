---
sidebar_label: 'NFT tests'
sidebar_position: 5
---

# NFT Tests
This suite of tests is meant to test all NFT functionality

## Tests Contained in NFT-Tests
1) Claim Multi NFT Drop And Ensure Keypom Balance Increases  
2) OverRegister NFTs and add multi use key later  
3) Not enough funder balance stage 2  
4) Deleting Keys and Drop  
5) Refunding Assets and Deleting Multi Use Keys and Drops  

## Notes from NFT-Tests
- when creating an NFT drop, the NFTs data such as contract ID and sender ID are wrapped in a JSON wrapper and passed into the drop initialization
- Registered uses here are dependant on the number of NFTs minted and sent to Keypom
- SendNFTs requires a dropID to be specified, as well as token IDs to be transfered. It sends from minter (who owned the NFTs after they were minted) over to Keypom  
- In this test, the beforeEach setup mints 1 NFT. Therefore, all mints inside of tests increase the total supply by num_minted_during_test + 1
- process of minting NFTs to keypom goes from contract -> minter (intermediate acct.) using mintNFTs -> keypom using sendNFTs
- NFT owner is KEYPOM, not drop owner. This means all transfers come from Keypom
- From my understanding, sendNFTs has a cost that the owner of the drop needs to cover. This cost is the cost of storing the tokenIDs on chain.
    - this is considered STAGE 2 of the NFT drop creation. First is the actual drop and configs, second is registering the NFTs with Keypom by sending them to the contract.  
- OverRegistering and NFT drop entails registered uses > keys * uses_per_key. In the case of this test, 10 NFTs were registered with Keypom while there were no keys added to the drop ❗️clarify use case for this❗️
- When refunding unused assets, the NFTs are sent back to minter. This does not return any balance back to the drop owner though.
- Deleting unused keys here works the same way as with simple drops. The cost of fronting them is returned to the drop owner.
