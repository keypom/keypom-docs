---
sidebar_label: 'Internals'
sidebar_position: 2
---
# Internals
Contains tests regarding internal features. Primarily dealing with Keypom's internal settings such as changing the linkdrop contract, setting contract-wide gas prices and depositing/withdrawing user balances.  

## Tests Contained in Internals
1) Initial nonce (drop id) is 0  
2) Changing linkdrop contract (root account)  
3) Setting contract metadata  
4) Setting gas prices  
5) Deposit and Withdraw to Keypom user balance  
6) Withdrawing fees earned  
7) Setting custom fees per user  


## Notes from Internal Tests
- When testing, ensure every step is carried out properly unless previously tested.
- First drop ID is zero, and is then incremented for each drop created on the Keypom contract.  
- The default root, based on our config setup for NEAR-Workspaces is testnet.  
- Contract metadata is seperate from drop metadata and others, it specifies properties of the *actual Keypom contract*.  
- Default gas price on Keypom contract (seen through get_gas_price) is 100,000,000 yocto. This can be changed using set_gas_price.  
- drop fees and key fees are fees for the Keypom contract. These are fees that drop owners will need to pay Keypom. i.e if they add keys to their drops, or create drops. deposit_per_use defines the amount of $NEAR deposited to the person who claimed the key
- Accounts are initialized with 0 NEAR. This can be changed with add_to_balance and other functions.  
- Balance changes can be found using BalanceChage and inserting starting and ending balance. This should be equal to your expected value within 1% precision.  
- Fees collected by the contracted can be set using *set_fees* and be monitored with *get_fees_collected* BY KEYPOM CONTRACT OWNER. ❗️*FIND OUT DEFAULT FEES*❗️  
- Fees can be incurred by adding keys to the drop or by creating new drops. This cost is paid for by the drop owner. These fees are both controled by the Keypom contract owner.  
- Fees can be withdrawn but must be called by the Keypom contract and withdrawn to the drop owner. It automatically withdraws all of it but does nothing if the owner account ID provided does not exist.  ❗️*CLARIFY WHY YOU WOULD NEED TO WITHDRAW TO A DIFFERENT ACCOUNT*❗️  
- You can set fees per user as well.
- accountID.availableBalance() returns NEAR wallet balance. add_to_balance adds from NEAR wallet to keypom debit balance.


