---
sidebar_label: 'NEAR Access Key Model'
sidebar_position: 1
---
# NEAR Access Key Model

A Keypair is generated locally and the pubkey is add to your account. 

Access keys with numerous types are unique to NEAR. There are Full Access (similar to traditional keypairs) and Function Call Access Keys.  These Function Call Access Keys can only call specified accounts and methods. It cannot be used to send any NEAR, deploy a contract, create an account etc.  

This means the Function Call Access key can be used as a throwaway key.

Your account can have any number of Access Keys, including ZERO. If there are zero, the account cannot deploy or withdraw funds (rugging). This is done as a form of trust for users.  