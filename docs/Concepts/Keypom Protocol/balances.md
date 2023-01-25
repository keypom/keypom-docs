---
sidebar_label: 'Keypom Balances'
---

# Keypom Balances
## What is a Keypom Balance?
Let's put on our imagination caps for a second; pretend you're an event host and you are in charge of ticketing for numerous events. You deduce that for the sake of organization, the best approach would be to create seperate drops for seperate events. 

Being the busy event organizer that you are, sometimes you need to create these drops and keys while on the road. As we can see in the [basic tutorials](../../Tutorials/Basics/simple-drops.md), you need to attach a deposit to every one of your function calls: everytime you create a drop, add keys, delete keys etc. This can be a real headache for a busy event organizer!

This is where the concept of a **Keypom Balance** comes in real handy!

Every account that uses Keypom carries an internal balance (in $NEAR) on the Keypom contract. Effectively, the Keypom balance is similar to a debit card. You can overload your balance and sip from it as you interact with the contract.  

Let's go back to your event organizer persona; this Keypom Balance allows you to simply preload your "debit card" with loads of $NEAR and then go about your business without needing to worry about transferring $NEAR for ever function call!
## Interacting with Balances
There are a few functions that you can use to interact with your Keypom balance. Let's quickly run through their meanings, and then show some examples!
```rust
pub fn add_to_balance(&mut self)
// Every account that interacts with the Keypom contract gets a balance assigned. This function 
// allows you to transfer your $NEAR from your wallet to the Keypom contract to add to your balance.

pub fn withdraw_from_balance(&mut self)
// Should you overload your Keypom Balance beyond what is needed, you can withdraw your balance 
//back into your wallet. 

pub fn get_user_balance(&self, account_id: AccountId) -> U128
//This allows you to view your own or other people's Keypom balance. This can be useful to determine 
//if you need to top up if you are on the verge of creating a large drop
```

## Use Cases
*WIP*

For example, Alice wants to add 10 $NEAR to her Keypom balance. She will do this by calling `add_to_balance` and transfering 10 $NEAR to the Keypom contract. Then, if Alice wants to create a drop that costs her 5 $NEAR, she can simply create the drop and Keypom will automatically deduct from her internal Keypom balance rather than needing to transfer 5 $NEAR to the contract.  
