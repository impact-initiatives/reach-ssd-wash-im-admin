module.exports = {
  siteMetadata: {
    title: 'South Sudan WASH Platform',
    description: '',
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
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown',
        path: `${__dirname}/src/markdown`,
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
  ],
};
