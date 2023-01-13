---
sidebar_label: 'Keypom Balances'
---

# Keypom Balances
*WIP*  

Keypom balances are an important aspect of Keypom. Every account that uses Keypom carries an internal balance (in $NEAR) on the Keypom contract. Effectively, the Keypom balance is similar to a debit card. You can overload your balance and sip from it as you interact with the contract.  

For example, Alice wants to add 10 $NEAR to her Keypom balance. She will do this by calling `add_to_balance` and transfering 10 $NEAR to the Keypom contract. Then, if Alice wants to create a drop that costs her 5 $NEAR, she can simply create the drop and Keypom will automatically deduct from her internal Keypom balance rather than needing to transfer 5 $NEAR to the contract.  

This allows someone, lets say an event organizer who will be creating many drops and keys, to simply preload their Keypom balance with loads of $NEAR and then go about their business without needing to worry about transfering $NEAR numerous times.