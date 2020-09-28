var fs = require('fs')
var _copy = function(src, dst) {
  fs.readdir(src, function(err, paths) {
    if (err) { throw err }
    paths.forEach(function(path) {
      var _src = src + '/' + path,
        _dst = dst + '/' + path,
        readable, writable
      fs.stat(_src, function(err, st) {
        if (err) { throw err }
        if (st.isFile()) {
          readable = fs.createReadStream(_src)
          writable = fs.createWriteStream(_dst)
          readable.pipe(writable)
        } else if (st.isDirectory()) {
          exists(_src, _dst, copy)
        }
      })
    })
  })
}
var exists = function(src, dst, callback) {
  fs.exists(dst, function(exists) {
    if (exists) {
      callback(src, dst)
    } else {
      fs.mkdir(dst, function() {
        callback(src, dst)
      })
    }
  })
}

var copy = function(src, dst) {
  fs.stat(src, function(err, st) {
    if (err) { throw err }
    if (st.isFile()) {
      readable = fs.createReadStream(src)
      writable = fs.createWriteStream(dst)
      readable.pipe(writable)
    } else if (st.isDirectory()) {
      exists(src, dst, _copy)
    }
  })
}

module.exports = copy
