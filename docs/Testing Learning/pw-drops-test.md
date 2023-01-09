---
sidebar_label: 'Password Protected Drops'
sidebar_position: 6
---
# Password Protected Drops Tests
This section tests the functionality of the password protected drops. They can be defined as per_use or per_key etc.
## Tests contained in Password-Tests
1) Multi-use keys with local passwords  
2) 2 keys have local (first with all use pw second with only 1 use pw), 1 has global, 1 has none. Global and local have different base pws  
3) Add keys after drop is created with passwords  
4) 50 FT Keys Fails in Step 2 Check Storage  
5) Create 50 key drop and delete after 


## Notes from Password Tests
- Passwords are classified as Global (password_per_key) and local (password_per_use). Password per use allows owner to create diff passwords for diff claims. Password per key sets a universal pw for all uses of a particular key
- both password_per_key and password_per_use need to be the same length as the number of public keys. Otherwise, they cannot be mapped to eachother
- password_per_use is an array (llength: number of keys in drop) of arrays (length: number of uses)
- if there is no password on the key use, any password given will just claim and ignore the password given.
- If there IS a password and none is passed in, the claim should fail