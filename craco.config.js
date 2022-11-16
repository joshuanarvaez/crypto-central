const CracoLessPlugin = require('craco-less');

// This plugin adds Less support. We can use it to create a custom theme or style antd components.
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#d4b106', // primary color for all components
                            '@link-color': '#d4b106', // link color
                        },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};