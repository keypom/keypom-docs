---
id: index
hide_table_of_contents: true
---
import {FeatureList, Column, Feature} from "../components/featurelist.js"

<center>
  <p class="pink-main-header-text" > Keypom Developer Docs </p>
</center>
<center>
  <p class="white-main-subheader-text" > Create Instant Web3 Experiences </p>
</center>
<br></br>
<br></br>
<br></br>




<div class="container">
  <div class="row">
    <div class="col col--6">
      <a href="/docs/next/exec-summary">
        <div class="card mb-3">
          <div class="card__image">
            <img src={require("/static/img/newMoonCrop.png").default} alt="Learn" />
            <div class="card__body">
              <h3>Understanding Keypom</h3>
              Learn about the power and intricacies of Keypom
            </div>
          </div>
        </div>
      </a>
    </div>
    <div class="col col--6">
      <a href="/docs/next/Tutorials/welcome">
        <div class="card mb-3">
          <div class="card__image">
            <img src={require("/static/img/docs/homepage-banner-2.png").default} alt="Examples and Tutorials" />
            <div class="card__body">
              <h3>Build with Keypom</h3>
                Learn how to use Keypom for your Web3 needs.
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>

<hr class="subsection" />

<center><h1 class="text-center big-title" > Browse the Docs By Topic </h1></center>

<FeatureList width = "100%">

  <Column title="Understanding Keypom" size ="3">
    <Feature url="../../docs/next/Concepts/Keypom%20Protocol/overview" title="What is Keypom?" subtitle="Learn the Basics of Keypom" image="docs/icons/key.png" />
    <Feature url="../../docs/next/Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/introduction" title="Types of Drops" subtitle="Find out what you can send using Keypom" image="docs/icons/tutorials.png" />
    <Feature url="../../docs/next/Concepts/Keypom%20Protocol/Github%20Readme/Types%20of%20Drops/drop-customization" title="Customize your Drops" subtitle="Learn to configure your Keypom drop" image="docs/icons/update.png" />
  </Column>

  <Column title="Beginner Tutorials" size="3">
    <Feature url="../../docs/next/Tutorials/Basics/simple-drops" title="Simple Drop" subtitle="Send $NEAR" image="docs/icons/random.png" />
    <Feature url="../../docs/next/Tutorials/Basics/nft-drops" title="Non-Fungible Token Drop" subtitle="Send Non-Fungible Tokens" image="docs/icons/near_place.png" />
    <Feature url="../../docs/next/Tutorials/Basics/ft-drops" title="Fungible Token Drop" subtitle="Send Fungible Tokens" image="docs/icons/ft.png" />
    <Feature url="../../docs/next/Tutorials/Basics/fc-drops" title="Function Call Drop" subtitle="Keypom's most powerful drop" image="docs/icons/oracle.png" />
  </Column>

  <Column title="Advanced Tutorials" size="3">
    <Feature url="../../docs/next/Tutorials/Advanced/ticketing/introduction" title="Ticketing" subtitle="Power your next event with Keypom" image="docs/icons/nft.png" />
    <Feature url="../../docs/next/Tutorials/Advanced/daos/introduction" title="DAO Onboarding" subtitle="Level up your DAO with a seamless onboarding experience" image="docs/icons/dao.png" />
    <Feature url="../../docs/next/Tutorials/Advanced/subscriptions/introduction" title="Subscriptions using Web3" subtitle="Make a Web3 subscription service" image="docs/icons/subscription.png" />
  </Column>

  <Column title="Developer Documentation" size="3">
    <Feature url="docs/next/keypom-sdk/welcome" title="Keypom TypeDocs" subtitle="Spin-up your first dApp" image="docs/icons/typedocs.png" />
    <Feature url="https://github.com/keypom/keypom-js" title="JavaScript SDK Repo" subtitle="Keypom SDK behind the scenes" image="moon.svg" />
    <Feature url="https://docs.near.org/tools/near-api-js/quick-reference" title="NEAR-API-JS" subtitle="Learn to interact with NEAR using JavaScript" image="docs/icons/near-api-js.png" />
  </Column>


</FeatureList>


---

## Source Code

Explore Keypom's source code in the Github Repos.

<div class="container">
  <div class="row">
    <div class="col">
      <a href="https://github.com/keypom/keypom">
        <div class="card h-100">
          <div class="card__body">
            <h3>Keypom Protocol</h3>
            Discover the inner workings of the Keypom Protocol.
          </div>
        </div>
      </a>
    </div>
    <div class="col">
      <a href="https://github.com/keypom/keypom-js">
        <div class="card h-100">
          <div class="card__body">
            <h3>Keypom JavaScript SDK</h3>
              See how the SDK interacts with NEAR.
          </div>
        </div>
      </a>
    </div>
  </div>
</div>

<hr class="subsection" />

<ContactUs />