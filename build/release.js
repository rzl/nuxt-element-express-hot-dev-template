require('./buildPackageJson')('./package.json', './release/package.json')
var sb = require('./server.build')
var nb = require('./nuxt.build')