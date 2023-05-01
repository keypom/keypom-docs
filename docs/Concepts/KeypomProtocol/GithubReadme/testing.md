---
sidebar_label: 'Keypom Tests'
sidebar_position: 8
---
# Running the Keypom Tests

We have put together a suite of test cases that can be found in the `__tests__` folder. These range anywhere from simple config tests all the way to full blown ticketing and POAPs.

In the `__tests__` folder, there are sub-folders with each type of test. Some of these sub-folders contain a `utils` folder with some utility functions used.

All the tests use `workspaces-js`. In order to run all the tests, run the following command.

```bash
yarn && yarn test
```

This will run through each test 1 by 1. If you wish to only run a set of specific tests, the full list of commands can be found below.

```bash
"test:internals"
"test:stage1"
"test:stage1:simple"
"test:ticketing"
"test:poaps"
"test:configs"
"test:nft-drops"
"test:ft-drops"
"test:profiling"
"test:passwords"
```