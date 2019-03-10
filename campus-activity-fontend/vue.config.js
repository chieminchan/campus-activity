module.exports = {
    baseUrl: '/',
    outputDir: 'dist',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
      open: '　true',
      port: 8090,
      https: false,
      hotOnly: false,
    },
  };