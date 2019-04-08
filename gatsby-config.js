module.exports = {
  siteMetadata: {
    title: `demiselbijoux lab`,
    description: `desc`,
    author: `@wabdsgn`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "zgsfe4tu",
        dataset: "production",
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/products`,
        name: "products",
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-snipcart",
      options: {
        apiKey:
          "MDE1NWM1NjItMDc2Yy00NTYxLWJlM2EtMDFjNWMwNGNkYzg1NjM2ODU2NTM2NjM1NTU0MzQ0",
        autopop: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
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
