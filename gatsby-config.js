module.exports = {
  siteMetadata: {
    title: `demiselbijoux lab`,
    description: `desc`,
    author: `@wabdsgn`,
  },
  plugins: [
    { resolve: `gatsby-plugin-react-helmet` },
    { resolve: `gatsby-transformer-remark` },
    { resolve: `gatsby-transformer-sharp` },
    { resolve: `gatsby-plugin-sharp` },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'zgsfe4tu',
        dataset: 'staging',
        // To enable preview of drafts, copy .env-example into .env,
        // and add a token with read permissions
        // token: process.env.SANITY_TOKEN,
        // watchMode: true,
        // overlayDrafts: true
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
        name: `demisel`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
