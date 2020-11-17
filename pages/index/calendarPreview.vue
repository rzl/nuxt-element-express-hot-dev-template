<template>
  <div class="container">
    <div>
      <el-calendar v-model="value">
        <template slot="dateCell" slot-scope="{date, data}">
          <div v-if="isWorkday(data.day)" class="box">
            <div v-if="new Date(data.day).getTime() > new Date().getTime()" class="future-date">
              <p :class="data.isSelected ? 'is-selected  date-day' : 'date-day'">
                {{ data.day }} {{ data.isSelected ? '✔️' : ''}}
              </p>
              <div class="date-day">
                {{ shareData.workdayKeyValue[data.day] !== undefined ? shareData.workdayKeyValue[data.day]['mark'] : '' }}
              </div>
              <div class="future-date-task-done-color">
                <div>
                  {{ shareData.dayWorkHourKeyValue[data.day] !== undefined ? '当天工时：' + shareData.dayWorkHourKeyValue[data.day]['workHour'] : '' }}
                </div>
                <template v-for="(v, i) in shareData.taskDone[data.day]">
                  <div class="date-task" :key="i">{{i+1}} . {{v.name}} ( {{v.workHour}} ) ( {{v.doneHour}} )</div>
                </template>
              </div>
              <div>
                <template v-for="(v, i) in shareData.futureTaskList[data.day]">
                  <div class="date-task" :key="i">{{i+1}} . {{v.name}} ( {{v.workHour}} ) ( {{v.assignHour}} )</div>
                </template>
              </div>
            </div>
            <div v-else-if="new Date().getTime() - new Date(data.day).getTime() > 24 * 60 * 60 * 1000" class="history-date">
              <p :class="data.isSelected ? 'is-selected  date-day' : 'date-day'">
                {{ data.day }} {{ data.isSelected ? '✔️' : ''}}
              </p>
              <div>
                <template v-for="(v, i) in shareData.taskDone[data.day]">
                  <div class="date-task" :key="i">{{i+1}} . {{v.name}} ( {{v.workHour}} ) ( {{v.doneHour}} )</div>
                </template>
              </div>
            </div>
            <div v-else class="today-date">
              <p :class="data.isSelected ? 'is-selected  date-day' : 'date-day'">
                {{ data.day }} {{ data.isSelected ? '✔️' : ''}}
              </p>
              <div class="future-date-task-done-color">
                <template v-for="(v, i) in shareData.taskDone[data.day]">
                  <div class="date-task" :key="i">{{i+1}} . {{v.name}} ( {{v.workHour}} ) ( {{v.doneHour}} )</div>
                </template>
              </div>
              <div>
                <template v-for="(v, i) in shareData.futureTaskList[data.day]">
                  <div class="date-task" :key="i">{{i+1}} . {{v.name}} ( {{v.workHour}} ) ( {{v.assignHour}} )</div>
                </template>
              </div>
            </div>
          </div>
          <div v-else class="box">
            <div class="holiday-date">
              <p :class="data.isSelected ? 'is-selected  date-day' : 'date-day'">
                {{ data.day }} {{ data.isSelected ? '✔️' : ''}}
              </p>
              <div class="date-day">
                假期
              </div>
              <div class="date-day">
                {{ shareData.holidayKeyValue[data.day] !== undefined ? shareData.holidayKeyValue[data.day]['mark'] : '' }}
              </div>
            </div>
          </div>
        </template>
      </el-calendar>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    shareData: {
      type: Object,
      default: function() {
        return {
          holidayKeyValue: {}
        }
      }
    },
    newTask: {
      type: Array,
      default: function() {
        return []
      }
    },
    defaultHoliday: {
      type: Array,
      default: function() {
        return []
      }
    }

  },
  data() {
    return {
      workHour: 8,
      value: new Date(),
    }
  },
  methods: {
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
  }
}

</script>
<style>
.container .el-calendar-day {
  height: unset;
}

</style>
<style scoped>
.box {
  width: 100%;
  height: 100%;
  font-size: 13px;
}

.date-task {
  text-align: left;
}

.future-date-task-done-color {
  /*  background-color: #f4f4f5;
*/
  color: #F56C6C;
}

.history-date {
  /*  background-color: #f4f4f5;
*/
  color: #909399;
  width: 100%;
  height: 100%;
}

.history-date .date-day {
  background-color: #f4f4f5;
}

.holiday-date {
  /*  background-color: #f0f9eb;
*/
  color: #67c23a;
  width: 100%;
  height: 100%;
}

.holiday-date .date-day {
  background-color: #f0f9eb;
}

.future-date {
  /*  background-color: #fdf6ec;
*/
  color: #e6a23c;
  width: 100%;
  height: 100%;
}

.future-date .date-day {
  background-color: #fdf6ec;
}

.today-date {
  background-color: #ecf5ff;
  color: #8cc5ff;
  width: 100%;
  height: 100%;
}

.today-date .date-day {
  background-color: #ecf5ff;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  text-align: center;
}

</style>
