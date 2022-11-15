---
sidebar_label: 'Internals'
sidebar_position: 2
---

## Notes from Internal Tests
- First drop ID is zero, and is then incremented for each drop created on the Keypom contract.  
- The default root, based on our config setup for NEAR-Workspaces is testnet.  
- Contract metadata is seperate from drop metadata and others, it specifies properties of the *actual Keypom contract*.  
- Default gas price on Keypom contract (seen through get_gas_price) is 100,000,000 yocto. This can be changed using set_gas_price.  
- Accounts are initialized with 0 NEAR. This can be changed with add_to_balance and other functions.  
- Balance changes can be found using BalanceChage and inserting starting and ending balance. This should be equal to your expected value within 1% precision.  
- Fees collected by the contracted can be set using *set_fees* and be monitored with *get_fees_collected* BY KEYPOM CONTRACT OWNER. ❗️*FIND OUT DEFAULT FEES*❗️  
- Fees can be incurred by adding keys to the drop or by creating new drops. This cost is paid for by the drop owner. These fees are both controled by the Keypom contract owner.  
- Fees can be withdrawn but must be called by the Keypom contract and withdrawn to the drop owner. It automatically withdraws all of it but does nothing if the owner account ID provided does not exist.  ❗️*CLARIFY WHY YOU WOULD NEED TO WITHDRAW TO A DIFFERENT ACCOUNT*❗️  
- You can set fees per user as well.


