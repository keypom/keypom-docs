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
                'Tutorials/Advanced/ticketing/architecture',
                'Tutorials/Advanced/ticketing/drop',
                'Tutorials/Advanced/ticketing/drop-test',
                'Tutorials/Advanced/ticketing/react-outline',
                'Tutorials/Advanced/ticketing/user-code',
                'Tutorials/Advanced/ticketing/scanner-code',
                'Tutorials/Advanced/ticketing/final',
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
    }
  ],

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





