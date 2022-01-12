module.exports = {
  devServer: {
    port: 8083,
    proxy: 'http://localhost:8080'

  },
  runtimeCompiler: true,
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: true
    }
  },

  transpileDependencies: [
    'quasar'
  ]
}
