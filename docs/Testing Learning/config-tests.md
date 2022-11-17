---
sidebar_label: 'Configs'
sidebar_position: 3
---
# Configuration Tests
These features pretain to configuring the drops. Items such as start and end timestamps, throttle timestamps, custom drop roots etc.  
## Tests contained in Config-Tests
1) Testing Delete on Empty Config  
2) Testing Start Timestamp  
3) Testing Throttle Timestamp  
4) Testing On Claim Refund Deposit  
5) Testing Custom Drop Root  
6) Testing Auto Withdraw  
7) Testing Custom Drop ID  
8) Testing Valid Config  
9) Testing End Timestamp  
10) Testing End Timestamp Key Drainage  
11) Testing Claim Interval  
12) Testing All Time Based Configs   


## Notes from Config Tests
- Configs can be specified explicitely or not at all. By default, delete_on_empty is false and the drop will not be deleted if all the keys are used.
- Claim does not receive an explicit access key. Rather, it claims **using the PK that signed the *claim* transaction**.
    - This means that the key associated with the drop needs to be added to the ?owner or Keypom? account before you can call claim.
    - A target account for claim must be specified.
- In the Sandbox, you set the access key to be used to sign a transaction using the setKey function. You can update the key's perms using updateAccessKey (ONLY AVAILABLE IN SANDBOX, THIS IS A MASSIVE SECURITY BREACH OTHERWISE LOL)
- Full access keys do not have any allowance requirements to cover gas etc.
- If the start timestamp is violated, claim will not work and the access key will not be deleted.
- *CAAC* failure still claims the key
- *CAAC* and *claim* will **ALWAYS DELETE THE KEY BEFORE MAKING THE CROSS CONTRACT CALL** to the linkdrop contract
    - this is to prevent someone from calling claim or CAAC numerous times while the XCC is being made but not finalized and the Keypom contract thinks the access key is still valid
- *CAAC* and *Claim* will **NEVER** panic. This panic can cause a discrepency between the keypom balance of each key (that is book-kept and not updated live) and the actual balance on chain. This is because a panic will roll-back a txn, meaning keypom will think the gas was not spent.
- Custom DropId's must have a value of above a billion, this is to prevent custom IDs from interfering with the automatically increasing nonce drop IDs
- Start timestamps need to be defined using date.now as it uses an "absolute" time reference frame (since Jan 1 1970)
- all timestamps are expressed in nano seconds
- When keys fail due to internal reasons, such as timestamp violations, the key supply for that drop is not decremented
    - internal tests are validated first before making those XCC. If they fail, it can rollback
- Once all key uses are used/claimed, the key is deleted
- when creating a drop, the owner must front all the costs necessary. This means *generally for simple drops* **number_of_keys X uses_per_key X deposit_per_use**
- On Claim Refund Deposit config option is used to avoid people from rugging an onboarding drop. For example, if a drop owner wants onboard people using CAAC, the owner's deposit will only be transfered to those that use CAAC. If the user simply calls claim, the key is used but they are not transfered any of the NEAR as they are not using it for its intended purpose. Instead, the deposit gets refunded back to the owner.
- All accounts created from X drop must use predefined Y drop root. This applies to both default and custom drop roots.
- delete-on-empty deletes a drop once keys are all used
- start and end timestamps must be greater than the current block 
- claim interval allows a controlled flow of key uses. For example, if i want the user to only be able to use the key every 10mins after the drop (NOT THROTTLE BUT JUST 10MINS AFTER START TIME) I can define it that way. From there, they can choose to use right away or wait for X amount to "pile up" before using them. 
- Drop deposit arithemtic something to keep in mind, users calling claim do not sip from owner's debit account. The owner FRONTS the cost first and then the user claims from keypom's NEAR wallet balance.
    - For example, if owner has 10NEAR keypom wallet balance and creates a drop with 1 key, 1NEAR per key use and 1use per key, the owner fronts that cost and now has 9NEAR in their keypom wallet.
- Auto-withdraw allows owners to withdraw their Keypom balance to their NEAR wallets once all their drops have been deleted. This can be used in conjunction with delete-on-empty to clear up the funders' "trail" on keypom. 