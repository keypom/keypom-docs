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
- Registered uses here are dependant on the number of NFTs minted and sent to Keypom
- SendNFTs requires a dropID to be specified, as well as token IDs to be transfered
- In this test, the beforeEach setup mints 1 NFT. Therefore, all mints inside of tests increase the total supply by num_minted_during_test + 1
- NFT owner is KEYPOM, not drop owner. This means all transfers come from Keypom
- From my understanding, sendNFTs has a cost that the receiver needs to cover
- 