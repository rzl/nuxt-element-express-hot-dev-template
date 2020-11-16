var crypto = require('crypto');
var u = require('../../utils')
module.exports = {
	...u,
  md5(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
  }
}

console.log(module.exports)