var BaseService = require('./BaseService')

function WorkdayService() {
  BaseService.call(this)
  this.model = this.models['Workday']
  return this
}




module.exports = new WorkdayService()
