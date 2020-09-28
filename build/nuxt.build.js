var { Nuxt, Builder } = require('nuxt');
var config = require('../nuxt.config.js');//nuxt的配置文件
var copy = require('./copy') 

var nuxt = new Nuxt(config);
var builder = new Builder(nuxt);

config.dev = false
builder.build().then(()=>{
	copy('./.nuxt','./release/.nuxt')
	copy('./nuxt.config.js','./release/nuxt.config.js')
	copy('./static','./release/static')
	console.log('nuxt done')
});
