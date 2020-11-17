var BaseService = require('./BaseService')

function TaskService() {
  BaseService.call(this)
  this.model = this.models['NewTask']
  return this
}




module.exports = new TaskService()
