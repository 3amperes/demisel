module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        // your wordpress source
        baseUrl: `demiselbijoux.com`,
        protocol: `https`,
        // is it hosted on wordpress.com, or self-hosted?
        hostingWPCOM: false,
        // does your site use the Advanced Custom Fields Plugin?
        useACF: false,
      },
    },
    {
      resolve: "@massivdash/gatsby-source-woocommerce",
      options: {
        // Base URL of Wordpress site
        api: "demiselbijoux.com",

        // This counts controls the API get with ?per_page=
        // default: 10
        itemCount: 20,

        // set to true to see fetch output in console, during build
        // default: false
        verbose: true,

        // true if using https. false if nah.
        https: false,
        api_keys: {
          consumer_key: "ck_6d27a12f193461bb5c7ba05d5d4402203c1cf99f",
          consumer_secret: "cs_5396e9ee07395c40acc760855533ae93087889b6",
        },
        // Array of strings with fields you'd like to create nodes for...
        fields: ["products"],
      },
    },
    // {
    //   resolve: "gatsby-source-woocommerce",
    //   options: {
    //     // Base URL of Wordpress site
    //     api: "demiselbijoux.com",
    //     // true if using https. false if nah.
    //     https: true,
    //     api_keys: {
    //       consumer_key: "ck_6d27a12f193461bb5c7ba05d5d4402203c1cf99f",
    //       consumer_secret: "cs_5396e9ee07395c40acc760855533ae93087889b6",
    //     },
    //     // Array of strings with fields you'd like to create nodes for...
    //     fields: ["products"],
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
