---
sidebar_label: 'View Event Analytics'
---
# View Event Analytics
## Introduction
In this section you'll learn how to track your event's analytics, such as number of attendees that showed up, those that claimed POAPs and more! This can be broken down into two approaches:

1) Creating a script.  
2) Using existing BOS tools.  

The focus for now will be the script. The next tutorial section will showcase the existing BOS tools. 

Starting at the `keypom-docs-examples` directory, navigate to the `ticket-app-skeleton/others` folder and open the `event-analytics.js` file. 

```bash
cd advanced-tutorials/ticket-app-skeleton/others
```

There, you can see the following skeleton code in the file `event-analytics.js`.
``` js reference
https://github.com/keypom/keypom-docs-examples/blob/449992de80888934dcbccfadefd88601d9d6638d/advanced-tutorials/ticket-app-skeleton/others/event-analytics.js#L1-L31
```

---

## Connecting to NEAR
Connecting to the NEAR network is done with `NEAR-API-JS` and consists of:

* Selecting which network to connect to (testnet or mainnet).

* Specifying the location where the keys are stored for the drop funder's account. This location is commonly in the `~/.near-credentials` folder on your local machine.

```js reference
https://github.com/keypom/keypom-docs-examples/blob/449992de80888934dcbccfadefd88601d9d6638d/advanced-tutorials/ticket-app/others/event-analytics.js#L21-L38
```

---

## Getting Drop and Keys
Here, you want to make sure you get the proper drop that represents your event. To do this, you want to use the drop's `dropId`. In order to include the keys in the returned data, ensure that `withKeys` is true.


```js reference
https://github.com/keypom/keypom-docs-examples/blob/449992de80888934dcbccfadefd88601d9d6638d/advanced-tutorials/ticket-app/others/event-analytics.js#L42-L55
```
:::note
If you don't have your `dropId`, you can use a key from the drop as well. This is done by passing in either `publicKey` or `secretKey` into `getDropInformation`
:::

The total number of tickets can also be found by using the drop's `next_key_id`. This will be helpful to determine how many keys have been fully claimed

---

## Compiling Data
From the original [design of the ticket drop](architecture.md#keypom-solution), you know the following.

* The first key use indicates when an attendee is scanned into the event. 
* The second key use sends the attendee a POAP, after which the key is deleted

From this, you can derive the following about a key's [remaining uses](../../../keypom-sdk/Core/interfaces/ProtocolReturnedKeyInfo.md#remaining_uses).

* `remaining_uses == 2`: the ticket has not yet been scanned, hence the ticket holder did not attend. 
* `remaining_uses == 1`: the attendee was scanned in and thus attended

Notice how there is no case for when `remaining_uses` = 0. This is because when keys are fully used, they are deleted. This is when collecting the total number of keys above becomes helpful. The number of fully used keys can be found by subtracting the number of found keys from the total.

* `drop.next_key_id - keys.length` = number of fully used keys. 

All this can be put into the following code block.

```js reference
https://github.com/keypom/keypom-docs-examples/blob/449992de80888934dcbccfadefd88601d9d6638d/advanced-tutorials/ticket-app/others/event-analytics.js#L57-L73
```

---

## Conclusion
In this short bonus section, you saw how to get analytics for your events. This consisted of getting the keys from your drop and keeping track of the number of remaining uses for each key. 

In the following section, you'll see some pre-built BOS tooling for a no-code solution! 