// const { BootstrapVueNextResolver} = require("bootstrap-vue-next");
// const { defineConfig } = require('@vue/cli-service')
// const { Components } = require('unplugin-vue-components/webpack')

// module.exports = defineConfig({
//   chainWebpack: (config) => {
//     config.module
//       .rule('vue')
//       .use('vue-loader')
//   },
//   configureWebpack: {
//     plugins: [
//       Components({ resolvers: [BootstrapVueNextResolver()], }),
//     ]
//   }
// })

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
  },
  configureWebpack: {
    plugins: [
      require('unplugin-vue-components/webpack').default({ /* options */ }),
    ],
  }
}