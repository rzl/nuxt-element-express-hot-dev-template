var fs = require('fs')
var webpack = require('webpack')
var cf = require('./webpack.build.config.js')
var copy = require('./copy')
webpack(cf, (err, stats) => { // Stats Object
  if (err || stats.hasErrors()) {
    console.log(err)
  }
  fs.existsSync('./release/server') || fs.mkdirSync('./release/server')
  fs.existsSync('./release/server/config') || fs.mkdirSync('./release/server/config')
	copy('./server/views','./release/server/views')
	copy('./server/public','./release/server/public')
	copy('./server/config/config.json','./release/server/config/config.json')
  console.log('server done')
});
