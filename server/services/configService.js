var BaseService = require('./BaseService')

function ConfigService() {
  BaseService.call(this)
  this.model = this.models['Config']
  return this
}

ConfigService.prototype.getConfig = function getConfig(cb) {
  return this.model.findAll({
    where: {
      [this.dbOp.or]: [
        { key: 'workHour' },
        { key: 'defaultHoliday' },
        { key: 'newTaskLevel' }
      ]
    }
  })
}

ConfigService.prototype.getConfigByKey = function getConfigByKey(opt, cb) {
  return this.model.findOne({
    where: {
    	key: opt.key
    }
  })
}

ConfigService.prototype.updateConfig = function updateConfig(key, value, cb) {
  return this.model.update({ value: value }, {
    where: {
      key: key
    }
  })
}



module.exports = new ConfigService()
