 // see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsPublicPath: './',
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'source',  //css,js,img资源目录
    assetsStaticCopyToDiretory: path.resolve(__dirname, '../dist'), //静态资源编译后存放目录
    assetsStaticRealDiretory: 'static', //静态资源未编译存放目录
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    assetsPublicPath: '/',
    autoOpenBrowser: false,
    assetsSubDirectory: 'source',  //css,js,img资源目录
    assetsStaticRelativeVisitDiretory: '/static', //静态资源编译后相对访问目录
    assetsStaticRealDiretory: 'static', //静态资源未编译存放目录
    port: 8888,
    proxyTable: {}
  }
}
