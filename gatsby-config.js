require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Demisel Bijoux`,
    description: `desc`,
    author: `@wabdsgn`,
  },
  plugins: [
    { resolve: `gatsby-plugin-react-helmet` },
    { resolve: `gatsby-transformer-remark` },
    { resolve: `gatsby-transformer-sharp` },
    { resolve: `gatsby-plugin-sharp` },
    { resolve: `gatsby-plugin-styled-components` },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Nunito Sans:400,400i,600,600i'],
        },
        typekit: {
          id: 'kcj8veb',
        },
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@src': 'src',
          '@components': 'src/components',
          '@layouts': 'src/layouts',
          '@pages': 'src/pages',
          '@utils': 'src/utils',
          '@theme': 'src/theme',
        },
        extensions: ['js'],
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.GATSBY_SANITY_PROJECT_ID,
        dataset: process.env.GATSBY_SANITY_DATASET,
        // To enable preview of drafts, copy .env-example into .env,
        // and add a token with read permissions
        token: process.env.GATSBY_SANITY_TOKEN,
        watchMode: false,
        overlayDrafts: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Demisel Bijoux`,
        short_name: `demisel`,
        background_color: `#fff`,
        theme_color: `#e33450`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `demiselbijoux`,
      },
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'fr',
      },
    },
    {
      resolve: 'gatsby-plugin-mixpanel',
      options: {
        apiToken: 'aa68bf08fe5bdce4733e42efb3084e44', // required
        pageViews: {
          '/': "Page d'accueil", // an event 'Page blog view' will be send to mixpanel on every visit on the /blog page
          '/collections': 'Page collections',
          '/contact': 'Page contact',
          '/outlets': 'Page points de vente',
          '/cgu': 'Page cgv',
          '/legal': 'Page mentions légales',
          '/404': 'Page 404',
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
