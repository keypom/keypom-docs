const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Keypom',
  tagline: 'Web3 Onboarding',
  url: 'https://minqianlu.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/moon.png',
  organizationName: 'minqianlu', // Usually your GitHub org/user name.
  projectName: 'minqianlu.github.io', // Usually your repo name.
  trailingSlash: false,
  themes: ['@docusaurus/theme-live-codeblock', '@saucelabs/theme-github-codeblock'],

  // plugins: [
  //   [
  //     'docusaurus-plugin-typedoc',

  //     // Plugin / TypeDoc options
  //     {
  //       entryPoints: ['../keypom-js/src/index.ts'],
  //       tsconfig: '../keypom-js/tsconfig.json',
  //       includeVersion: true,
  //       entryPointStrategy: 'expand',
  //       excludeNotDocumented: false,
  //       out: '.',
  //       hideGenerator: false,
  //       entryDocument: 'welcome.md',
  //       hideMembersSymbol: true,

  //       out: 'keypom-sdk',
  //       sidebar: {
  //         categoryLabel: 'SDK TypeDocs',
  //         collapsed: false,
  //         position: 0,
  //         fullNames: true,
  //       },
  //     },
  //   ],
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
      navbar: {
        title: 'KEYPOM',
        logo: {
          alt: 'MOON',
          src: 'img/moon.png',
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
                label: 'Javascript SDK Github',
                href: 'https://github.com/keypom/keypom-js',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Keypom, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['rust', 'java'],
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
  },
});
