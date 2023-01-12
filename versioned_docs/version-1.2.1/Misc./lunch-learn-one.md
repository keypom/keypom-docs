# Lunch and Learn 1
Start of a series hosted by Ben and Keypom. Written notes jotted down throughout the session for quick reference. Full videos available on youtube as well.  

### NEAR Access Key Model

A Keypair is generated locally and the pubkey is add to your account. 

Access keys with numerous types are unique to NEAR. There are Full Access (similar to traditional keypairs) and Function Call Access Keys.  These Function Call Access Keys can only call specified accounts and methods. It cannot be used to send any NEAR, deploy a contract, create an account etc.  

This means the Function Call Access key can be used as a throwaway key.

Your account can have any number of Access Keys, including ZERO. If there are zero, the account cannot deploy or withdraw funds (rugging). This is done as a form of trust for users.  

  
### Accounts on NEAR

Implicit accounts are free to make and usually take on the form of a random generated name (h35b2f...etc). Named accounts are stored on the root/parent account. Ex. min.near is a subaccount of near. These named accounts require a payment to create as it is being stored on the parent account.  

Root accounts do no have any control over their subaccounts. Creating account on NEAR requires account ID and a public key, from which the contract will create a full access key from.  

### Linkdrops

Linkdrops work to send $NEAR to new or existing users through a link rather than a transfer command. On the NEAR linkdrop contract, you can call a function *send*.  
1) You create a keypair locally.  
2) You load a Public Key and X $NEAR using the *send* method.  
3) You give the corresponding Private Key to the desired recipient.  
4) Recipient gives Private Key to a Wallet such as MyNearWallet (MNW), which indicates the reciepient is the one intended.  
5) MNW will call create account and claim on the NEAR contract with a NEW public key and account id. The public key is added to the account id and the $NEAR is transfered to the new account.  

Problem: 1 $NEAR is taken every time an account is created. This makes it expensive for scaling up.  