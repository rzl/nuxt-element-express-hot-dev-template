var http = require('http')
var server = require('./server.js')
var { Nuxt, Builder } = require('nuxt');
var config = require('./nuxt.config.js');
config.dev = false
var nuxt = new Nuxt(config);
server.use(nuxt.render);
var http = http.createServer(server);
http.listen(3001);
