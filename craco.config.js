const CracoLessPlugin = require('craco-less');

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