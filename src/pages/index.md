---
id: index
hide_table_of_contents: true
---
import {FeatureList, Column, Feature} from "../components/featurelist.js"

<center>
  <p class="pink-main-header-text"> Keypom Developer Docs </p>
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
      <a href="/docs/exec-summary">
        <div class="card mb-3">
          <div class="card__image">
            <img src={require("/static/img/newMoonCrop2.png").default} alt="Learn" />
            <div class="card__body">
              <h3 class="small-bottom-padding-only">Understanding Keypom</h3>
                <p class="neutraltext">Learn about the power and features of Keypom</p>
            </div>
          </div>
        </div>
      </a>
    </div>
    <div class="col col--6">
      <a href="/docs/Tutorials/welcome">
        <div class="card mb-3">
          <div class="card__image">
            <img src={require("/static/img/docs/homepage-banner-2.png").default} alt="Examples and Tutorials" />
            <div class="card__body">
              <h3 class="small-bottom-padding-only">Build with Keypom</h3>
                <p class="neutraltext">Learn how to use Keypom for your Web3 needs.</p>
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
    <Feature url="../../docs/Concepts/KeypomProtocol/overview" title="What is Keypom?" subtitle="Learn the Basics of Keypom" image="docs/icons/key.png" />
    <Feature url="../../docs/Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/introduction" title="Types of Drops" subtitle="Find out what you can send using Keypom" image="docs/icons/tutorials.png" />
    <Feature url="../../docs/Concepts/KeypomProtocol/GithubReadme/TypesOfDrops/drop-customization" title="Customize your Drops" subtitle="Learn to configure your Keypom drop" image="docs/icons/update.png" />
  </Column>

  <Column title="Use Cases" size="3">
    <Feature url="../../docs/Tutorials/Advanced/ticketing/introduction" title="Ticketing" subtitle="Power your next event with Keypom" image="docs/icons/nft.png" />
    <Feature url="../../docs/Tutorials/Advanced/daos/introduction" title="DAO Onboarding" subtitle="Level up your DAO with seamless onboarding" image="docs/icons/dao.png" />
    <Feature url="../../docs/TrialAccounts/introduction" title="Trial Accounts" subtitle="Web2 Onboarding in Web3" image="docs/icons/trial-accounts.png" />
    <Feature url="../../docs/Tutorials/BOS/welcome" title="Keypom on BOS" subtitle="Use Keypom in your BOS componets" image="docs/icons/bos.png" />

  </Column>

  <Column title="Beginner Tutorials" size="3">
    <Feature url="../../docs/Tutorials/Basics/simple-drops" title="Simple Drop" subtitle="Send $NEAR" image="docs/icons/random.png" />
    <Feature url="../../docs/Tutorials/Basics/nft-drops" title="Non-Fungible Token Drop" subtitle="Send Non-Fungible Tokens" image="docs/icons/near_place.png" />
    <Feature url="../../docs/Tutorials/Basics/ft-drops" title="Fungible Token Drop" subtitle="Send Fungible Tokens" image="docs/icons/ft.png" />
    <Feature url="../../docs/Tutorials/Basics/fc-drops" title="Function Call Drop" subtitle="Keypom's most customizable drop" image="docs/icons/oracle.png" />
  </Column>

  <Column title="Developer Documentation" size="3">
    <Feature url="docs/keypom-sdk/Core/welcome" title="Keypom TypeDocs" subtitle="Spin-up your first dApp" image="docs/icons/typedocs.png" />
    <Feature url="https://github.com/keypom/keypom-docs-examples" title="Tutorial Source Code" subtitle="Begin building with examples" image="docs/icons/code.png" />
    <Feature url="https://github.com/keypom/keypom-js" title="JavaScript SDK Repo" subtitle="Keypom SDK behind the scenes" image="moon.svg" />
    <Feature url="https://docs.near.org/tools/near-api-js/quick-reference" title="NEAR-API-JS" subtitle="Interact with NEAR using JavaScript" image="docs/icons/near-api-js.png" />
  </Column>


</FeatureList>


---

<center><h1 class="text-center big-title" > Source Code </h1></center>
<center><h4 class="text-center big-title" > Explore Keypom's source code in the Github Repos. </h4></center>

<div class="container">
  <div class="row">
    <div class="col">
      <a href="https://github.com/keypom/keypom">
        <div class="card h-100">
          <div class="card__body">
            <h3 class="small-bottom-padding-only">Keypom Protocol</h3>
              <p class="neutraltext">Discover the inner workings of the Keypom Protocol.</p>
          </div>
        </div>
      </a>
    </div>
    <div class="col">
      <a href="https://github.com/keypom/keypom-js">
        <div class="card h-100">
          <div class="card__body">
            <h3 class="small-bottom-padding-only">Keypom JavaScript SDK</h3>
              <p class="neutraltext">See how the SDK interacts with NEAR.</p>
          </div>
        </div>
      </a>
    </div>
  </div>
   <div class="row">
    <div class="col">
      <a href="https://github.com/keypom/keypom-docs-examples">
        <div class="card h-100">
          <div class="card__body">
            <h3 class="small-bottom-padding-only">Tutorial Examples</h3>
              <p class="neutraltext">Explore the code used in the tutorials</p>
          </div>
        </div>
      </a>
    </div>
    <div class="col">
      <a href="https://github.com/keypom/keypom-docs">
        <div class="card h-100">
          <div class="card__body">
            <h3 class="small-bottom-padding-only">Keypom Developer Documentation</h3>
              <p class="neutraltext">The code behind the docs.</p>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>

<hr class="subsection" />

<ContactUs />