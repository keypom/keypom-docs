---
sidebar_label: 'Introduction to Keypom'
sidebar_position: 1
---
> To view our debut talk at NEARCON 2022, click [here](https://www.youtube.com/watch?v=J-BOnfhHV50).

Keypom is an access key factory created as a result of 3 common problems that arose in the ecosystem.

1. People want a *cheap, customizable, and unique* onboarding experience for users.
2. Companies don't want to expose **full access keys** in their backend servers.
3. dApps want a *smooth UX* with zero barrier to entry onboarding.

The contract was initially created as a way to handle the 1 $NEAR minimum deposit required for creating linkdrops using the [regular linkdrop contract](https://github.com/near/near-linkdrop/blob/f24f2608e1558db773f2408a28849d330abb3881/src/lib.rs#L18). 

If users wanted to create linkdrops, they needed to attach a **minimum** of 1 $NEAR. This made it costly and unscalable for projects that wanted to mass onboard onto NEAR. Keypom, on the other hand, has been highly optimized to allow for the lowest possible costs.

## Problem

Blockchain technology comes with many benefits such as sovereign ownership, digital rights, privacy, freedom, 
peer to peer coordination and much more. The problem with this technology, however, is that there is an extremely 
high barrier to entry for an everyday individual. None of it matters if nobody can onboard.

It’s confusing to create and fund a crypto wallet. People are unfamiliar with the process, technical jargon, 
and the general flow. NEAR’s account model is powerful, but extremely underutilized because it’s complex for 
developers to take full advantage of. Keypom wraps this up in a single API call.

With NEAR’s goal of onboarding 1 billion users to Web3, there needs to be a solution to this high barrier to 
entry for developers building on NEAR and users onboarding to their apps and the NEAR ecosystem.

Below is a table outlining the minimum costs to onboard a new user onto NEAR with a named account.

|                      | 1 Account       | 1,000 Accounts  | 1,000,000 Accounts |
|----------------------|-----------------|-----------------|--------------------|
| Traditional Linkdrop | ~1 NEAR         | ~1,003 NEAR     | ~1,002,840 NEAR    |
| Keypom               | ~0.0035 NEAR    | ~3.5 NEAR       | ~3,500 NEAR        |
|                      | ~99.65% Cheaper | ~99.65% Cheaper | ~99.65% Cheaper    |

Keypom allows anyone to create highly customizable onboarding experiences for their users. These experiences 
can be both for new, or existing users. If someone already has a wallet, they can still use a Keypom link to 
experience an app, and then transfer the assets later.

## Comparable Solutions

|                                              | **Keypom** | **NEAR Drop** | **Satori** |
|----------------------------------------------|------------|---------------|------------|
| NEAR Drop                                    |      ✅     |       ✅       |      ❌     |
| FT Drop                                      |      ✅     |       ❌       |      ❌     |
| NFT Drop                                     |      ✅     |       ❌       |      ✅     |
| Function Call Drop                           |      ✅     |       ❌       |      ❌     |
| Embeddable in Dapps                          |      ✅     |       ❌       |      ❌     |
| Wallet Selector Integration                  |      ✅     |       ❌       |      ❌     |
| No Fee                                       |      ✅     |     Maybe?    |      ❌     |
| No Backend / 3rd Party                       |      ✅     |       ✅       |      ❌     |
| Campaigns                                    |      ✅     |       ✅       |      ✅     |
| Multi-Step e.g. Tickets click > scan > claim |      ✅     |       ❌       |      ❌     |
| Password Protected Drops                     |      ✅     |       ❌       |      ❌     |
| Timed Drops e.g. recurring payments          |      ✅     |       ❌       |      ❌     |
| Custom Names e.g. user.myapp.near            |      ✅     |       ❌       |      ❌     |
