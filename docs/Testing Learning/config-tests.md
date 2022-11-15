---
sidebar_label: 'Configs'
sidebar_position: 3
---
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
