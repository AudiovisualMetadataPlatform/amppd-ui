const { BootstrapVueNextResolver } = require("bootstrap-vue-next/resolvers");

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
  },
  configureWebpack: {
    plugins: [
      require('unplugin-vue-components/webpack').default({
        resolvers: [BootstrapVueNextResolver()]
      }),
    ],
  }
}