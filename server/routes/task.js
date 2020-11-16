var express = require('express');
var router = express.Router();
var utils = require('../utils')
var services = require('../services')
/* GET home page. */
router.get('/config', function(req, res, next) {
	services.config.getConfig((config) => {
		res.json({code: 0, data: config, msg: ''})
	})
});

module.exports = router;