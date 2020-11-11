var express = require('express');
var router = express.Router();
console.log(router)
router.utils = require('../utils')
router.jwt = require('jsonwebtoken')
router.config = require(__dirname + '/../config/config.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express1111' });
});

module.exports = router;
