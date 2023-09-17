---
sidebar_label: 'Keypom Balances'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Keypom Balances
## What is a Keypom Balance?
Let's put on our imagination caps for a second; pretend you're an event host and you are in charge of ticketing for numerous events. You deduce that for the sake of organization, the best approach would be to create separate drops for separate events. 

Being the busy event organizer that you are, sometimes you need to create these drops and keys while on the road. As we can see in the [basic tutorials](../../Tutorials/Basics/simple-drops.md), you need to attach a deposit to every one of your function calls: every time you create a drop, add keys, delete keys etc. This can be a real headache for a busy event organizer!

This is where the concept of a **Keypom Balance** comes in real handy!

Every account that uses Keypom carries an internal balance (in $NEAR) on the Keypom contract. Effectively, the Keypom balance is similar to a debit card. You can overload your balance and sip from it as you interact with the contract.  

Let's go back to your event organizer persona; this Keypom Balance allows you to simply preload your "debit card" with loads of $NEAR and then go about your business without needing to worry about transferring $NEAR for ever function call!
## Interacting with Balances
There are a few functions that you can use to interact with your Keypom balance. Let's quickly run through their meanings, and then show some examples!

<Tabs>
<TabItem value="KPJS" label="🔑 Keypom SDK">

```ts
// Deposit some amount of $NEAR or yoctoNEAR$ into the Keypom contract. This amount can then be used to create drops or add keys without having to explicitly attach a deposit every time. It can be thought of like a bank account.
export const addToBalance{
	/** Account object that if passed in, will be used to sign the txn instead of the funder account. */
	account?: Account,
	/** If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. */
	wallet?: AnyWallet,
	/** Amount of tokens to add but considering the decimal amount (non human-readable).
	Transferring one $NEAR should be passed in as "1000000000000000000000000" and NOT "1" */
	amountYocto?: string
	/** Human readable format for the amount of tokens to add.
	Transferring one $NEAR should be passed in as "1" and NOT "1000000000000000000000000" */
	amountNear?: string,
	/** When signing with a wallet, a success URl can be included that the user will be redirected to once the transaction has been successfully signed. */
	successUrl?: string
}

// Withdraw your balance back into your wallet. 
export const withdrawBalance {
	/** Account object that if passed in, will be used to sign the txn instead of the funder account. */
	account?: Account,
	/** If using a browser wallet through wallet selector and that wallet should sign the transaction, pass in the object. */
	wallet?: AnyWallet,
}

//This allows you to view your own or other people's Keypom balance. This can be useful to determine 
//if you need to top up if you are on the verge of creating a large drop
export const getUserBalance{ 
	accountId: string 
}
```

</TabItem>
<TabItem value="KP" label="📚 Protocol">

```rust
// Deposit some amount of $NEAR or yoctoNEAR$ into the Keypom contract. This amount can then be used to create drops or add keys without having to explicitly attach a deposit every time. It can be thought of like a bank account.
pub fn add_to_balance(&mut self)

// Allows users to withdraw their balance
pub fn withdraw_from_balance(&mut self) 

// Return the current balance for a given account
pub fn get_user_balance(&self, account_id: AccountId) -> U128
```

</TabItem>
</Tabs>



For example, Alice wants to add 10 $NEAR to her Keypom balance. She will do this by calling `addToBalance` and transferring 10 $NEAR to the Keypom contract. Then, if Alice wants to create a drop that costs her 5 $NEAR, she can simply create the drop and Keypom will automatically deduct from her internal Keypom balance rather than needing to transfer 5 $NEAR to the contract.  

Once she has created the drop, she can check her balance using `getUserBalance`, which will return 5 $NEAR. Then, she can withdraw this 5 $NEAR into her NEAR wallet; this will cause her Keypom balance to go down to 0 $NEAR. 
