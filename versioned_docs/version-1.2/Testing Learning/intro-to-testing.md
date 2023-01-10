---
sidebar_label: 'Intro to Testing'
sidebar_position: 1
---
# Testing/Contract Notes
Notes that I jot down for my own reference to understand the contract and test-case writing better.  

## Basics of Ava and Near Workspaces
All testing is built using [Near Workspaces] (https://github.com/near/workspaces-js) and leverages Ava to run tests concurrently. The general gist is that a worker is initialized in order to spin up a NEAR sandbox which essentially provides a mini-NEAR blockchain.  

The worker has a root account and can be used to create subaccounts of root to interact with the chain and deploy contracts to it etc. Typically a subacount is deployed on root, and the contract is deployed on root.  

This setup process can be specified to occur for each defined test, in order to "wipe the slate clean" by using *test.beforeEach* and *test.afterEach*.  
