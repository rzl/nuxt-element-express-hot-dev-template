var BaseService = require('./BaseService')

function HolidayService() {
  BaseService.call(this)
  this.model = this.models['Holiday']
  return this
}




module.exports = new HolidayService()
