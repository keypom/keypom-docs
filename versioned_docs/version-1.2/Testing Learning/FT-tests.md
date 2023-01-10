---
sidebar_label: 'FT tests'
sidebar_position: 4
---

# FT Tests
This suite of tests is meant to test all FT functionality

## Tests Contained in FT-Tests
1) Claim Multi FT Drop And Ensure Keypom Balance Increases  
2) OverRegister FTs and add multi use key later  
3) Deleting Keys and Drops 
4) Refunding Assets and Deleting Multi Use Keys and Drops 
5) Paying with Attached Deposit. FT Contract DOes Not Exist 
6) Paying with Attached Deposit. Not Enough Deposit to Cover Callback Registration Fee  
7) Paying with User Balance. FT Contract Does Not Exist  
8) Automatically Register Keypom Contract

## Notes from FT-Tests
- Minter is the user that is sending the FT
- When a drop is created and keys are added, registered uses is technically still 0. It is only when FTs are added does *registered_uses* increment automatically. 
    - registered uses = amount / FTData.balance_per_use
    - As FTs are claimed or CAAC, *registered uses* decrements
- At the end of each test, keypom's balance should NOT decrease relative to the beginning. This is usually checked using the following code block:
``` javascript
//make sure that keypom contract did not lose $NEAR during this process
    await owner.call(keypom, 'delete_keys', {drop_id: "0"})
    let ownerBal = await keypom.view('get_user_balance', {account_id: owner});
    t.assert(ownerBal !== "0");
    await owner.call(keypom, 'withdraw_from_balance', {});
    ownerBal = await keypom.view('get_user_balance', {account_id: owner});
    t.assert(ownerBal === "0");

    let keypomBalance = await keypom.balance();
    console.log('keypom available FINAL: ', keypomBalance.available.toString())
    t.assert(keypomBalance.available > keypomInitialBalance);
}); 
```
- When creating a drop, you can attach a deposit from the drop owner's NEAR wallet OR Keypom balance (implcit, withdraws from Keypom unless deposit attached).
- FT drops work in two stages. 
    1) Keypom internal drop creation
    2) XCC to FT contract to get storage costs and everything
- If the drop creation fails in the latter stage,the $NEAR attached to the *create_drop* call is refunded and the drop owner only has to cover the cost of Gas.