var path = require('path');
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  mode:'production',
  entry: [
    './server.prod.js'
  ],
  output: {
    path: path.resolve(__dirname, ''),
    filename: '../release/server.release.js'
  },
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
  }
};

