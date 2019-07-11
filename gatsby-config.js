module.exports = {
  siteMetadata: {
    title: 'South Sudan WASH Platform (Admin)',
    description: 'A repository of documents by the WASH cluster in South Sudan',
    author: '@maxmalynowsky',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'South Sudan WASH Platform',
        short_name: 'SSD WASH IM',
        start_url: '/',
        background_color: '#009999',
        theme_color: '#009999',
        display: 'minimal-ui',
        icon: 'src/images/wash-icon.svg',
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        globPatterns: [
          '**/*.{js,css,html}',
          '**/*/page-data.json',
          'manifest.json',
          'manifest.webmanifest',
        ],
        globIgnores: ['idb-keyval-iife.min.js'],
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-plugin-netlify',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-plugin-typescript',
    'gatsby-transformer-sharp',
  ],
};
