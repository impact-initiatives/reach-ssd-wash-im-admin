const site = require('./src/config/site');

module.exports = {
  siteMetadata: {
    title: site.name,
    description: site.description,
    author: '@maxmalynowsky',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: site.googleAnalyticsId,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/config`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: site.name,
        short_name: site.nameShort,
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: site.themeColor,
        display: 'minimal-ui',
        icon: 'src/config/icon.svg',
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: { offlineGoogleAnalytics: true },
    },
    'gatsby-plugin-netlify',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-plugin-typescript',
    'gatsby-transformer-sharp',
  ],
};
