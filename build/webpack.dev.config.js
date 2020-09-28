var path = require('path');
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals');
var StartServerPlugin = require('start-server-webpack-plugin')
var devPlugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  // 用来热更新
  new webpack.HotModuleReplacementPlugin(),
  // 启动服务
  new StartServerPlugin({
    // 启动的文件
    name: 'server.release.tmp.js',
    // 开启signal模式的热加载
    keyboard: true,
    nodeArgs: ['--inspect']
  }),
]
module.exports = {
  target: 'node',
  mode:'development',
  entry: [
    'webpack/hot/poll?1000',
    //'webpack/hot/signal',
    './server.dev.js'
  ],
  output: {
    path: path.resolve(__dirname, '..'),
    filename: 'server.release.tmp.js',
    hotUpdateChunkFilename: 'hotdata/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'hotdata/[hash].hot-update.json'
  },
  plugins:devPlugins,
  externals: [
    {'./nuxt.config.js': 'require(\'./nuxt.config.js\')'},
    nodeExternals({
      allowlist: ['webpack/hot/poll?1000']
    })
  ],
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true
  },
  watch: true,
  watchOptions: {
    poll: 1000, // 每秒询问多少次
    aggregateTimeout: 500,  //防抖 多少毫秒后再次触发
    ignored: /node_modules/ //忽略时时监听
  }
};

