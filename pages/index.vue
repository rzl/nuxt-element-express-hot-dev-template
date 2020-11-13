<template>
  <div class="container">
    <el-tabs style="width: 100%" v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="任务预览" name="calendarPreview">
        <calendarPreview :shareData="shareData" :newTask="newTask" :newTaskLevel="newTaskLevel" :defaultHoliday="defaultHoliday">
        </calendarPreview>
      </el-tab-pane>
      <el-tab-pane label="任务列表" name="newTask">
        <newTask :shareData="shareData" :newTaskLevel='newTaskLevel' :newTask="newTask" @onFresh="m_fresh">
        </newTask>
      </el-tab-pane>
      <el-tab-pane label="假期设定" name="third">
        <workSet :workday="workday" :workHour="workHour" :holiday="holiday" :dayWorkHour="dayWorkHour" :defaultHoliday="defaultHoliday" @onSetChange="m_setChange" @onWorkdayFresh="m_workdayFresh" @onHolidayFresh="m_holidayFresh" @onDayWorkHourFresh="m_dayWorkHourFresh">
        </workSet>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import calendarPreview from './index/calendarPreview'
import newTask from './index/newTask'
import workSet from './index/workSet'
export default {
  components: {
    calendarPreview,
    newTask,
    workSet
  },
  mounted() {

    this.m_resolveDayWorkHour()
    this.m_resolveWorkday()
    this.m_resolveHoliday()
    this.freshFutureTaskList()
  },
  methods: {
    m_resolveDayWorkHour() {
      this.shareData.dayWorkHourArr = []
      this.shareData.dayWorkHourKeyValue = {}
      console.log(this.dayWorkHour)
      this.dayWorkHour.forEach((w) => {
        this.shareData.dayWorkHourArr.push(w.day)
        this.shareData.dayWorkHourKeyValue[w.day] = w
      }, this)
    },
    m_resolveWorkday() {
      this.shareData.workdayArr = []
      this.shareData.workdayKeyValue = {}
      this.workday.forEach((w) => {
        this.shareData.workdayArr.push(w.day)
        this.shareData.workdayKeyValue[w.day] = w
      }, this)
    },
    m_resolveHoliday() {
      this.shareData.holidayArr = []
      this.shareData.holidayKeyValue = {}
      this.holiday.forEach((h) => {
        this.shareData.holidayArr.push(h.day)
        this.shareData.holidayKeyValue[h.day] = h
      }, this)
    },
    m_dayWorkHourFresh(v) {
      this.m_resolveDayWorkHour()
      this.freshFutureTaskList()
    },
    m_workdayFresh(v) {
      this.m_resolveWorkday()
      this.freshFutureTaskList()
    },
    m_holidayFresh(v) {
      this.m_resolveHoliday()
      this.freshFutureTaskList()
    },
    m_setChange(v) {
      this.workHour = v.workHour
      this.defaultHoliday = v.defaultHoliday
      this.freshFutureTaskList()
    },
    m_fresh() {
      this.freshFutureTaskList()
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    freshFutureTaskList() {
      this.shareData.futureTaskList = {}
      var taskList = this.newTask.sort((a, b) => {
        var ai = this.newTaskLevel.indexOf(a.id)
        var bi = this.newTaskLevel.indexOf(b.id)
        if (ai >= 0) {
          if (bi < 0) {
            return -1
          } else {
            return ai - bi
          }
        } else {
          if (bi < 0) {
            return a.id - b.id
          } else {
            return 1
          }
        }
      })


      var day = this.$formatDateTime(new Date(), 'yyyy-MM-dd')
      console.log(day)
      var tmpWorkHour = this.getDayWorkHour(day)
      var taskDoneHour = this.getDayTaskDoneHour(day)
      this.shareData.futureTaskList[day] = []
      taskList.forEach((task) => {
        var taskWorkHour = task.workHour - task.doneHour
        while (taskWorkHour > 0) {

          tmpWorkHour = taskDoneHour > tmpWorkHour ? 0 : tmpWorkHour - taskDoneHour
          console.log(tmpWorkHour)
          if (tmpWorkHour > taskWorkHour) {
            tmpWorkHour = tmpWorkHour - taskWorkHour
            let taskInfo = this.$forkJson(task)
            taskInfo.assignHour = taskWorkHour
            this.shareData.futureTaskList[day].push(taskInfo)
            taskWorkHour = 0
          } else {
            taskWorkHour = taskWorkHour - tmpWorkHour
            let taskInfo = this.$forkJson(task)
            taskInfo.assignHour = tmpWorkHour
            this.shareData.futureTaskList[day].push(taskInfo)
            day = this.getNextDay(day)
            taskDoneHour = this.getDayTaskDoneHour(day)

            this.shareData.futureTaskList[day] = []
            tmpWorkHour = this.getDayWorkHour(day)
          }
        }
      }, this)
      console.log(this.shareData.futureTaskList)
    },
    getNextDay(day) {
      var newDay = this.$formatDateTime(new Date(this.$formatDateTime(day)).getTime() + 24 * 60 * 60 * 1000, 'yyyy-MM-dd')
      if (!this.isWorkday(newDay)) {
        return this.getNextDay(newDay)
      } else {
        return newDay
      }
    },
    getDayTaskDoneHour(day) {
      var taskDoneHour = 0
      if (this.shareData.taskDone[day] != undefined) {
        this.shareData.taskDone[day].forEach((td) => {
          taskDoneHour = taskDoneHour + td.doneHour
        })
      }
      return taskDoneHour
    },
    getDayWorkHour(day) {
      var workHour = this.workHour
      if (this.shareData.dayWorkHourKeyValue[day] != undefined) {
        workHour = this.shareData.dayWorkHourKeyValue[day]['workHour']
      }
      return workHour
    },
    isWorkday(day) {
      var week = new Date(day).getDay()
      if (this.defaultHoliday.indexOf(week) > -1) {
        if (this.shareData.workdayArr.indexOf(day) > -1) {
          return true
        } else {
          return false
        }
      } else {
        if (this.shareData.holidayArr.indexOf(day) > -1) {
          return false
        } else {
          return true
        }
      }
    }
  },
  data() {
    return {
      shareData: {
        workdayKeyValue: {},
        workdayArr: ['2020-11-14'],
        holidayKeyValue: {},
        holidayArr: ['2020-11-23'],
        dayWorkHourKeyValue: {
          '2020-11-16': [
            { id: 1, day: '2020-11-16', workHour: 8, mark: '' }
          ]
        },
        dayWorkHourArr: ['2020-11-23'],
        taskDone: {
          '2020-11-10': [
            { id: 1, taskId: 1, name: '更改部分错误名字', workHour: 8, mark: '', doneHour: 4 }
          ]
        },
        futureTaskList: {}
      },
      activeName: 'newTask',
      workHour: 8,
      value: new Date(),
      newTask: [
        { id: 1, name: '任务1任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务1', workHour: 2, doneHour: 1, taskDoneHistory: [] },
        { id: 2, name: '任务2任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务12', workHour: 4, doneHour: 1, taskDoneHistory: [] },
        { id: 3, name: '任务3任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务13', workHour: 6, doneHour: 0, taskDoneHistory: [] },
        { id: 4, name: '任务4任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务14', workHour: 8, doneHour: 0, taskDoneHistory: [] },
        { id: 5, name: '任务5任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务1', workHour: 10, doneHour: 0, taskDoneHistory: [] },
        { id: 6, name: '任务6任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务1', workHour: 10, doneHour: 0, taskDoneHistory: [] },
        { id: 7, name: '任务7任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务1', workHour: 20, doneHour: 0, taskDoneHistory: [] },
        { id: 8, name: '任务8任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务1', workHour: 30, doneHour: 0, taskDoneHistory: [] },
        { id: 9, name: '任务9任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务1', workHour: 10, doneHour: 0, taskDoneHistory: [] },
        { id: 10, name: '任务10任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务任务1', workHour: 10, doneHour: 0, taskDoneHistory: [] },
      ],
      newTaskLevel: [10, 5, 4, 2, 6, 1, 3],
      workday: [{ day: '2020-11-14', mark: '端午节调休' }],
      holiday: [{ day: '2020-11-23', mark: '端午节放假' }],
      dayWorkHour: [{ id: 1, day: '2020-11-24', workHour: 4, mark: '请假半天' }],
      defaultHoliday: [0, 6]
    }
  }
}

</script>
<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  padding: 5px;
}

</style>
