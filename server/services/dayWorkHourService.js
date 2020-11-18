var BaseService = require('./BaseService')

function DayWorkHourService() {
  BaseService.call(this)
  this.model = this.models['DayWorkHour']
  return this
}




module.exports = new DayWorkHourService()
