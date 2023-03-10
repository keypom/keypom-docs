/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
//a
  // module.exports = {
  //   tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
  //   // tutorialSidebar: [
  //   //   {
  //   //     type: 'category',
  //   //     label: 'Tutorial',
  //   //     items: [
  //   //       {
  //   //         type: 'category',
  //   //         label: 'Tutorial Basics',
  //   //         items: ['tutorial-basics/congratulations', 'tutorial-basics/create-a-blog-post', 'tutorial-basics/create-a-document', 'tutorial-basics/create-a-page', 'tutorial-basics/deploy-your-site', 'gm'],
  //   //       },
  //   //       {
  //   //         type: 'category',
  //   //         label: 'Tutorial Extras',
  //   //         items: ['tutorial-extras/manage-docs-versions', 'tutorial-extras/translate-your-site'],
  //   //       }
  //   //     ],
  //   //   }
  //   // ],
  // };'

const sidebars = {
  Concepts: [
    "Concepts/welcome",
    "exec-summary",
    {
      type: 'category',
      label: 'Linkdrops and Access Keys',
      // link: {
      //   type: 'concepts/Linkdrops and Access Keys/linkdrop-welcome',
      // },
      collapsed: false,
      items: [
            'Concepts/Linkdrops and Access Keys/NEAR-Access-Keys',
            'Concepts/Linkdrops and Access Keys/LinkdropBasics',
      ],
    },
    {
      type: 'category',
      label: 'Keypom Protocol',
      // link: {
      //   type: 'concepts/Keypom Protocol/keypom-protocol-welcome',
      // },
      collapsed: false,
      items: [
                'Concepts/Keypom Protocol/overview',
                'Concepts/Keypom Protocol/balances',
                {
                  type: 'category',
                  label: 'Types of Drops',
                  // link: {
                  //   item: 'Concepts/Keypom Protocol/Github Readme/Types of Drops/introduction',
                  // },
                  collapsed: true,
                  items: [
                    'Concepts/Keypom Protocol/Github Readme/Types of Drops/introduction',
                    'Concepts/Keypom Protocol/Github Readme/Types of Drops/simpledrops',
                    'Concepts/Keypom Protocol/Github Readme/Types of Drops/nftdrops',
                    'Concepts/Keypom Protocol/Github Readme/Types of Drops/ftdrops',
                    'Concepts/Keypom Protocol/Github Readme/Types of Drops/fcdrops',
                  ],
                },
                {
                  type: 'category',
                  label: 'Configuring Your Drop',
                  // link: {
                  //   type: 'doc',
                  //   id: 'Concepts/Keypom Protocol/Github Readme/Types of Drops/customization-homepage',
                  // },
                  collapsed: true,
                  items: [
                    'Concepts/Keypom Protocol/Github Readme/Types of Drops/customization-homepage',
                    'Concepts/Keypom Protocol/Github Readme/Types of Drops/drop-customization',
                    'Concepts/Keypom Protocol/Github Readme/Types of Drops/time-customization',
                    'Concepts/Keypom Protocol/Github Readme/Types of Drops/usage-customization',
                    'Concepts/Keypom Protocol/Github Readme/Types of Drops/sale-customization',
                  ],
                },
                'Concepts/Keypom Protocol/Github Readme/passwordprotect',
                {
                  type: 'category',
                  label: 'Overhead Items',
                  // link: {
                  //   type: 'concepts/Linkdrops and Access Keys/linkdrop-welcome',
                  // },
                  collapsed: true,
                  items: [
                    'Concepts/Keypom Protocol/Github Readme/costs',
                    'Concepts/Keypom Protocol/Github Readme/Querying',
                    'Concepts/Keypom Protocol/Github Readme/testing',
                    'Concepts/Keypom Protocol/Github Readme/contribute',
                    'Concepts/Keypom Protocol/Github Readme/Licenses',
                  ],
                  },
                    
                    
              ],
            },
            
      ],
  Tutorials: [
    "Tutorials/welcome",
    {
      type: 'category',
      label: 'Basics',
      collapsed: false,
      items: [
            'Tutorials/Basics/getting-started',
            'Tutorials/Basics/simple-drops',
            'Tutorials/Basics/nft-drops',
            'Tutorials/Basics/ft-drops',
            'Tutorials/Basics/fc-drops',
                    
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      collapsed: false,
      items: [
            {
              type: 'category',
              label: 'Ticketing',
              // link: {
              //   type: 'concepts/Linkdrops and Access Keys/linkdrop-welcome',
              // },
              collapsed: true,
              items: [
                'Tutorials/Advanced/ticketing/introduction',
              ],
            },
            // {
            //   type: 'category',
            //   label: 'Progressive Onboarding',
            //   // link: {
            //   //   type: 'concepts/Linkdrops and Access Keys/linkdrop-welcome',
            //   // },
            //   collapsed: true,
            //   items: [
            //     'Tutorials/Advanced/customized-onboarding/introduction',
            //   ],
            // },
            {
              type: 'category',
              label: 'DAO Onboarding',
              // link: {
              //   type: 'concepts/Linkdrops and Access Keys/linkdrop-welcome',
              // },
              collapsed: true,
              items: [
                'Tutorials/Advanced/daos/introduction',
              ],
            },
            {
              type: 'category',
              label: 'Recurring Payments',
              // link: {
              //   type: 'concepts/Linkdrops and Access Keys/linkdrop-welcome',
              // },
              collapsed: true,
              items: [
                'Tutorials/Advanced/subscriptions/introduction',
              ],
            },
            'Tutorials/Advanced/homepage',
      ],
    },
    // {
    //   type: 'category',
    //   label: 'Others',
    //   collapsed: true,
    //   items: [
    //         'Tutorials/Misc/sign-txn',
                    
            
    //   ],
    // },
  ],
  // KeypomV2: [
  //   "KeypomV2/welcome"
  // ],
  TypeDocSDK: [
    {
      type: 'autogenerated',
      dirName: 'keypom-sdk', // 'api' is the 'out' directory
    },
  ],
};
module.exports = sidebars;





