---
sidebar_label: 'Time Configurations'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Time Configurations
This part of the cookbook contains everything related to time configurations, including start and end times, a time throttled drop, and using it to create a recurring payment tool.
## Getting Started
For the cookbook, you will need the following installed. 
1. [Node JS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
2. [Keypom JS SDK](https://github.com/keypom/keypom-js#getting-started)


:::info note
These scripts will not run without the proper setup shown in the [introduction page](../../welcome.md#connection-to-near-and-initializing-the-sdk).
:::

:::tip
All time values are measured in Unix Time (non-leap-nanoseconds since January 1, 1970 0:00:00 UTC). 
:::

## Drop with a Start and End Time
The drop below is only active for 1.5 minutes, starting 15 seconds after the drop is created. Any claims before or after that window will fail. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
const ONE_SECOND_NS = 1e9;

// Creating timed drop with 1 double use keys
const {keys, dropId} = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    config:{
        time: {
            // Start time is 15 seconds from now
            start: (Date.now() * 1000000) + ONE_SECOND_NS * 15,
            // End time is 90 seconds from start time
            end: (Date.now() * 1000000) + ONE_SECOND_NS * 105,
        },
    },
    depositPerUseNEAR: "0.1",
});

console.log(keys)
```

</TabItem>

</Tabs>

___

## Time Throttled Drop
A drop with a define time throttle will not allow consecutive `claims` on the same key within the indicated time. With the drop below, users can only claim their key every 15 seconds. If they try to `claim` twice in ten seconds, the second `claim` will fail as 15 seconds has not elapsed since the first `claim`. 

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
const ONE_SECOND_NS = 1e9;

// Creating time throttled drop with a double use keys
const {keys} = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    config:{
        usesPerKey: 2,
        time: {
            // Time between use is 15 seconds
            throttle: ONE_SECOND_NS * 30,
        },
    },
    depositPerUseNEAR: "0.1",
});

console.log(keys)
```

</TabItem>

</Tabs>

___

## Creating Recurring Payments
Recurring payments are quite a common situation. Say you need to send a contractor 50 $NEAR every week for 4 weeks. With Web2, they would need to provide a payment method and trust the you with this sensitive information. 

By leveraging a time configuration, you can eliminate this risk by sending them a key with limited funds attached. You could create a drop where there is one key with 4 uses, usable once a week.

First is the `start` and `end` time. These define a period time for which the drop is active and can be used by the contractor, in this case 30 days after the drop is created. 

Next, the `interval` parameter is specified. This is set to 1 week, meaning each week after the start time, a new `claim` is made available for the contractor. This is different from the `throttle` parameter as that uses the previous claim as a reference.

**This allows the contractor to `claim` multiple times if they miss one week rather than being forced to wait a week after each claim and potentially get pushed out of the drop's 30 day validity and lose out on funds they are entitled to.**

<Tabs>
<TabItem value="SDK" label="🔑 Keypom SDK">

```js
const ONE_SECOND_NS = 1e9;

// Creating timed drop with 1 key with 4 uses
const {keys} = await createDrop({
    account: fundingAccount,
    numKeys: 1,
    config:{
        usesPerKey: 4,
        time: {
            // Start time is now + 5s
            start: (Date.now() * 1000000) + ONE_SECOND_NS * 5,
            // End time is 30 day after start time
            end: (Date.now() * 1000000) + ONE_SECOND_NS * 2592000,
            // Time after start for first use is 1 week
            interval: ONE_SECOND_NS * 604800,
        },
    },
    depositPerUseNEAR: "50",
});

console.log(keys)
```

</TabItem>

</Tabs>

___

