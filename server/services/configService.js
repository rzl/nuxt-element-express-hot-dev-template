var BaseService = require('./BaseService') 

function ConfigService() {
	BaseService.call(this)
	return this 
}

ConfigService.prototype.getConfig = function getConfig(cb) {
	this.db.Config.findAll({
	  where: {
	    [this.dbOp.or]: [
	      { key: 'workHour' },
	      { key: 'defaultHoliday' }
	    ]
	  }
	}).then((rows) => {
		cb(rows)
	})
}

module.exports = new ConfigService()