// vue.config.js
const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const plugins = [
  new webpack.ProvidePlugin({
    mapActions: ['vuex', 'mapActions'],
    mapMutations: ['vuex', 'mapMutations'],
    mapGetters: ['vuex', 'mapGetters'],
    mapState: ['vuex', 'mapState']
  })
]
let externals = {}
if (process.env.analyze === 'true') {
  plugins.push(new BundleAnalyzerPlugin())
}
if (process.env.NODE_ENV === 'production') {
  externals = {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    'element-ui': `'element-ui'`,
    moment: 'moment',
    marked: 'marked'
  }
}

module.exports = {
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(config.module.rule('stylus').oneOf(type))
    )
  },
  // 去掉sourceMap
  productionSourceMap: process.env.NODE_ENV === 'production',
  configureWebpack: {
    externals,
    plugins
  }
}
// 这个就有点厉害了，所有的页面，都不需要再引入color.styl文件了，可以直接使用color.styl里面的颜色变了了。相当于 全局声明了这个文件里的变量。
function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('vue-stylus-resources-loader')
    .options({
      resources: [
        path.resolve(__dirname, './src/style/color.styl'),
        path.resolve(__dirname, './src/style/mixin.styl')
      ]
    })
}
