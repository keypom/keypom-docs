const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Keypom Docs',
  tagline: 'Web3 Onboarding',
  url: 'https://minqianlu.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/moon.svg',
  organizationName: 'minqianlu', // Usually your GitHub org/user name.
  projectName: 'minqianlu.github.io', // Usually your repo name.
  trailingSlash: false,
  themes: ['@docusaurus/theme-live-codeblock', '@saucelabs/theme-github-codeblock',
  [
    require.resolve("@easyops-cn/docusaurus-search-local"),
    ({
      hashed: true,
      language: ["en"],
      ignoreFiles: ["docs/1.1/nothing-page", "docs/nothing-page", "docs/1.2/nothing-page", "docs/next/Tutorials/Misc/sign-txn"]
    }),
  ],
  ],

  // plugins: [
  //   require.resolve('docusaurus-lunr-search')
  // ],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // routeBasePath: '/',
          //homePageId: 'Github ReadMe/Introduction/Introduction',
          sidebarPath: require.resolve('./sidebars.js'),
          // remarkPlugins: [
          //   [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          // ],
          // Please change this to your repo.
          editUrl: 'https://github.com/keypom/keypom-docs',
          versions: {
            current: {
              banner: 'none',
            },
          },

        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig: {
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      // metadata: [{name: 'Keypom Developer Documentation', 
      //             content: 'Keypom, Documentation, NEAR, Onboarding, Web3'
      //           }],
      navbar: {
        title: '',
        logo: {
          alt: 'MOON',
          src: 'img/newMoonCrop.svg',
          srcDark: 'img/moon_white.png',
          href: '/'
        },
        items: [
          {
            to: "docs/next/Concepts/welcome",
            label: "📖Concepts",
            position: "left",
          },
          {
            to: "docs/next/Tutorials/welcome",
            label: "💻 Tutorials",
            position: "left",
          },
          // {
          //   to: "docs/next/KeypomV2/welcome",
          //   label: "🤖 Keypom V2",
          //   position: "left",
          // },
          {
            to: "docs/next/TrialAccounts/introduction",
            label: "🎁 Trial Accounts",
            position: "left",
          },
          {
            to: "docs/next/keypom-sdk/welcome",
            label: "📚 SDK TypeDocs",
            position: "left",
          },
          {
            to: "docs/next/exec-summary",
            label: "💡 Executive Summary",
            position: "left",
          },
          {
            href: 'https://github.com/keypom/keypom-docs/tree/main',
            label: 'GitHub',
            position: 'right',
          },
          // {
          //   type: 'docsVersionDropdown',
          // },
        ],
      },
      footer: {
        style: 'dark',
        //position: 'center',
        links: [
          //docs
          {
            title: 'Docs',
            items: [
              {
                label: '📖Concepts',
                to: 'docs/next/Concepts/welcome',
              },
              {
                label: '💻Tutorials',
                to: 'docs/next/Tutorials/welcome',
              },
              {
                label: "📚 SDK TypeDocs",
                to: "docs/next/keypom-sdk/welcome",
              },
              {
                label: "💡 Keypom Executive Summary",
                to: "docs/next/exec-summary",
              }
              // {
              //   label: "🤖Keypom V2",
              //   to: "docs/next/KeypomV2/welcome",
              // },
            ],
          },
          //community
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/keypomxyz',
              },
            ],
          },
          //more
          {
            title: 'More',
            items: [
              {
                label: 'Protocol Github',
                href: 'https://github.com/keypom/keypom',
              },
              {
                label: 'JavaScript SDK Github',
                href: 'https://github.com/keypom/keypom-js',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Keypom, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['rust', 'java'],
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
      image: 'img/newMoonCrop2.png',
      metadata: [
        {
          property: 'og:image',
          content: 'https://docs.keypom.xyz/img/newMoonCrop2.png',
        },
        {
          name: 'twitter:card', 
          content: 'summary_large_image'
        },
        {
          name: 'twitter:title', 
          content: 'Keypom Developer Documentation'
        },
        {
          name: 'twitter:image',
          content: 'https://docs.keypom.xyz/img/newMoonCrop2.png',
        }
      ],
      // algolia: {
      //   // The application ID provided by Algolia
      //   appId: "KWAT5GJATX",
      //   // Public API key: it is safe to commit it
      //   apiKey: "2e5d96bd04a718b0ae636859f5478336",
      //   indexName: "keypom",
      //   // Optional: see doc section below
      //   contextualSearch: true,
      //   // Optional: Algolia search parameters
      //   searchParameters: {
      //     clickAnalytics: true,
      //     analytics: true,
      //     enableReRanking: true,
      //   },
      //   //... other Algolia params
      //   placeholder: "Search the Docs...",
      // },
  },
});
