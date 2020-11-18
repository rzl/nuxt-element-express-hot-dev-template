var newTask = require('./newTaskService')
var config = require('./configService')
var dayWorkHour = require('./dayWorkHourService')
var workday = require('./workdayService')
var holiday = require('./holidayService')
var taskDoneHistory = require('./taskDoneHistoryService')

module.exports = {
	newTask,
	config,
	dayWorkHour,
	holiday,
	workday,
	taskDoneHistory
}