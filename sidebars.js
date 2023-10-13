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
      collapsed: true,
      items: [
            'Concepts/LinkdropsAndAccessKeys/near-access-keys',
            'Concepts/LinkdropsAndAccessKeys/linkdrop-basics',
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
                'Concepts/KeypomProtocol/intro-to-keypom',
                'Concepts/KeypomProtocol/terminology',
                {
                  type: 'category',
                  label: 'Keypom Drop Assets',
                  // link: {
                  //   item: 'Concepts/Keypom Protocol/Github Readme/Types of Drops/introduction',
                  // },
                  collapsed: false,
                  items: [
                    'Concepts/KeypomProtocol/Assets/asset-types',
                    'Concepts/KeypomProtocol/Assets/basic-assets',
                    'Concepts/KeypomProtocol/Assets/function-call',
                    'Concepts/KeypomProtocol/Assets/asset-configurations',
                    'Concepts/KeypomProtocol/Assets/time-customization',
                  ],
                },
                'Concepts/KeypomProtocol/nft-keys',
                'Concepts/KeypomProtocol/drop-configurations',
                'Concepts/KeypomProtocol/balances',
                'Concepts/KeypomProtocol/GithubReadme/password-protect',
                {
                  type: 'category',
                  label: 'Overhead Items',
                  // link: {
                  //   type: 'concepts/Linkdrops and Access Keys/linkdrop-welcome',
                  // },
                  collapsed: true,
                  items: [
                    'Concepts/KeypomProtocol/GithubReadme/costs',
                    'Concepts/KeypomProtocol/GithubReadme/querying',
                    'Concepts/KeypomProtocol/GithubReadme/testing',
                    'Concepts/KeypomProtocol/GithubReadme/contribute',
                    'Concepts/KeypomProtocol/GithubReadme/licenses',
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
                'Tutorials/Advanced/ticketing/architecture',
                'Tutorials/Advanced/ticketing/drop',
                'Tutorials/Advanced/ticketing/drop-test',
                'Tutorials/Advanced/ticketing/react-outline',
                'Tutorials/Advanced/ticketing/user-code',
                'Tutorials/Advanced/ticketing/scanner-code',
                'Tutorials/Advanced/ticketing/final',
                'Tutorials/Advanced/ticketing/analytics',
                'Tutorials/Advanced/ticketing/bos-tool',
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
              label: 'DAO Auto-Registration',
              // link: {
              //   type: 'concepts/Linkdrops and Access Keys/linkdrop-welcome',
              // },
              collapsed: true,
              items: [
                'Tutorials/Advanced/daos/introduction',
                'Tutorials/Advanced/daos/architecture',
                'Tutorials/Advanced/daos/drop',
                'Tutorials/Advanced/daos/daobot',
                'Tutorials/Advanced/daos/security',
                'Tutorials/Advanced/daos/final',
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
            

      ],
    },
    {
      type: 'category',
      label: 'BOS',
      collapsed: false,
      items: [
            'Tutorials/BOS/welcome',
      ],
    },
    'Tutorials/Advanced/homepage',

  ],
  TrialAccounts: [
    "TrialAccounts/introduction",
    {
      type: 'category',
      label: 'Creating Trial Experiences',
      collapsed: false,
      items: [
          'TrialAccounts/Creation/getting-started',
          'TrialAccounts/Creation/understanding-trial-accounts',
          'TrialAccounts/Creation/drop-creation',
          'TrialAccounts/Creation/integration'
      ],
    },
    "TrialAccounts/offboarding",
  ],
  Cookbook: [
    "Cookbook/welcome",,
    {
      type: 'category',
      label: 'Drops',
      collapsed: false,
      items: [
            "Cookbook/drops/NEAR",
            "Cookbook/drops/nft",
            "Cookbook/drops/ft",
            "Cookbook/drops/fc",
            "Cookbook/drops/trial",
            {
              type: 'category',
              label: 'Customizations',
              collapsed: true,
              items: [
                    "Cookbook/drops/customizations/password",
                    "Cookbook/drops/customizations/dropConfig",
                    "Cookbook/drops/customizations/timeConfig",
                    "Cookbook/drops/customizations/saleConfig",
                    "Cookbook/drops/customizations/usageConfig",
              ],
            },
      ],
    },
    "Cookbook/keys",
    "Cookbook/balances",
            
  ],

  // Drops
  //   NEAR
  //   Fungible Tokens -> 1
  //   nft - > 1
  //   function call drop -> customized use cases, links out to simples use case
  //   Customizations
  //       -> Time Based
  //       -> Blah Blah
  //       -> Sales

    // {
    //   type: 'category',
    //   label: 'Others',
    //   collapsed: true,
    //   items: [
    //         'Tutorials/Misc/sign-txn',
                    
            
    //   ],
    // },
  
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





