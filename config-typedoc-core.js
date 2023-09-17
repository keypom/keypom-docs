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
  themes: ['@docusaurus/theme-live-codeblock'],

  plugins: [
    [
      'docusaurus-plugin-typedoc',

      // Plugin / TypeDoc options
      {
        entryPoints: ['../keypom-js/packages/core/src/index.ts'],
        tsconfig: '../keypom-js/packages/core/tsconfig.json',
        includeVersion: true,
        entryPointStrategy: 'expand',
        excludeNotDocumented: false,
        out: '.',
        hideGenerator: false,
        entryDocument: 'welcome.md',
        hideMembersSymbol: true,

        out: 'keypom-sdk/Core',
        sidebar: {
          categoryLabel: 'Core TypeDocs',
          collapsed: false,
          position: 0,
          fullNames: true,
        },
      },
    ],
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // routeBasePath: '/',
          //homePageId: 'Github ReadMe/Introduction/Introduction',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'KEYPOM',
        logo: {
          alt: 'MOON',
          src: 'img/moon.png',
        },
        items: [
          {
            to: "docs/2.0/Concepts/welcome",
            label: "📖 Concepts",
            position: "left",
          },
          {
            to: "docs/2.0/Tutorials/welcome",
            label: "📚 Tutorials",
            position: "left",
          },
          {
            to: "docs/2.0/KeypomV2/welcome",
            label: "🤖 Keypom V2",
            position: "left",
          },
          {
            to: "docs/2.0/keypom-sdk/welcome",
            label: "💻 SDK TypeDocs",
            position: "left",
          },
          // {
          //   type: 'doc',
          //   docId: './Github ReadMe/Introduction/Introduction',
          //   position: 'left',
          //   label: 'Tutorial',
          // },
          // {to: '/blog', label: 'Blog', position: 'left'},
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
                to: 'docs/2.0/Concepts/welcome',
              },
              {
                label: '📚Tutorials',
                to: 'docs/2.0/Tutorials/welcome',
              },
              {
                label: "🤖Keypom V2",
                to: "docs/2.0/KeypomV2/welcome",
              },
            ],
          },
          //community
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          //more
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
