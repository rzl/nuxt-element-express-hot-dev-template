var fs = require('fs')
var webpack = require('webpack')
var cf = require('./webpack.build.config.js')
var copy = require('./copy') 
webpack(cf, (err, stats) => { // Stats Object
  if (err || stats.hasErrors()) {
    console.log(err)
  }
  fs.mkdirSync('./release/server')
	copy('./server/views','./release/server/views')
	copy('./server/public','./release/server/public')
  console.log('server done')
});