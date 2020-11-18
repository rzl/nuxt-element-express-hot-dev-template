var BaseService = require('./BaseService')

function TaskDoneHistoryService() {
  BaseService.call(this)
  this.model = this.models['TaskDoneHistory']
  this.getList = function getList(opt) {
    return this.model.findAll({
      include: [{
        model: this.models['NewTask'],
        as: 'newTask',
        required: true
      }]
    })
  }
  return this
}


TaskDoneHistoryService.prototype.getListByNewTaskId = function getListByNewTaskId(opt) {
  return this.model.findAll({ where: { newTaskId: opt.newTaskId } })
}


module.exports = new TaskDoneHistoryService()
