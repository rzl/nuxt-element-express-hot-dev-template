var http = require('http')
var server = require('./server.js')
var { Nuxt, Builder } = require('nuxt');
var config = require('./nuxt.config.js');
config.dev = true
var nuxt = new Nuxt(config);
var builder = new Builder(nuxt);
builder.build();



server.use(nuxt.render);
var http = http.createServer(server);
http.listen(3001);

if (module.hot) {
  module.hot.accept(['./server.js'], (a) => {
    console.log('server hot load')
    http.removeListener('request', server);
    server = require('./server.js')
    server.use(nuxt.render);
    http.on('request', server);
  });
}
