<template>
  <div>
    <el-row style="padding-bottom: 10px;">
      <el-button type="primary" @click="m_openNewTaskForm">增加任务</el-button>
    </el-row>
    <el-table :data="newTask" border style="width: 100%">
      <el-table-column label="序号" type="index">
      </el-table-column>
      <el-table-column prop="id" label="任务ID" width="80">
      </el-table-column>
      <el-table-column prop="name" label="任务名称">
      </el-table-column>
      <el-table-column prop="workHour" label="工时" width="80">
      </el-table-column>
      <el-table-column prop="doneHour" label="已用工时" width="80">
      </el-table-column>
      <el-table-column label="剩余工时" width="80">
        <template slot-scope="scope">
          {{scope.row.workHour - scope.row.doneHour}}
        </template>
      </el-table-column>
      <el-table-column label="优先级" width="105">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-top" circle @click="m_upNewTaskLevel(scope,scope.row,scope.$index)"></el-button>
          <el-button type="primary" icon="el-icon-bottom" circle @click="m_downNewTaskLevel(scope,scope.row,scope.$index)"></el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="270">
        <template slot-scope="scope">
          <el-button type="warning" icon="el-icon-time" @click="m_workHour(scope,scope.row,scope.$index)">工时</el-button>
          <el-button type="warning" icon="el-icon-edit" @click="m_openEditTaskForm(scope,scope.row,scope.$index)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="m_delete(scope,scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="" :visible.sync="dialogVisibleNewTaskForm" width="30%">
      <el-form ref="form" :model="newTaskRow" label-width="80px">
        <el-form-item label="任务名称">
          <el-input v-model="newTaskRow.name"></el-input>
        </el-form-item>
        <el-form-item label="工时">
          <el-input-number :precision="1" :step="0.1" v-model="newTaskRow.workHour"></el-input-number>
        </el-form-item>
        <el-form-item label="优先级">
          <el-input-number v-model="newTaskRow.$level"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleNewTaskForm = false">取 消</el-button>
        <el-button v-if="newTaskRow.id === 0" type="primary" @click="m_addNewTaskRow">确 定</el-button>
        <el-button v-else type="primary" @click="m_editNewTaskRow">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="工时状态变更" :visible.sync="dialogVisibleWorkHour" width="60%">
      <el-row>
        <el-col :span="24" style="padding: 5px">
          <el-form ref="form" :model="newTaskRow" label-width="80px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="任务ID">
                  <el-input disabled v-model="currentRow.id"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="工时">
                  <el-input-number :precision="1" :step="0.1" disabled v-model="currentRow.workHour"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="优先级">
                  <el-input-number disabled v-model="currentRow.$level"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="任务名称">
              <el-input disabled v-model="currentRow.name"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="24" style="padding: 5px">
          <el-row style="padding-bottom: 5px;">
            <el-button style="width: 100%; " @click="m_addTaskHistory">增加已用工时</el-button>
          </el-row>
          <el-row>
            <el-table :data="currentRowHistory" border style="width: 100%">
              <el-table-column label="序号" type="index">
              </el-table-column>
              <el-table-column label="日期" width="150">
                <template slot-scope="historyScope">
                  <div v-if="historyScope.row.$edit">
                    <el-date-picker style="width: 130px;" value-format="yyyy-MM-dd" v-model="historyScope.row.day" type="date" placeholder="选择日期">
                    </el-date-picker>
                  </div>
                  <div v-else>{{historyScope.row.day}}</div>
                </template>
              </el-table-column>
              <el-table-column label="已用工时" width="150">
                <template slot-scope="historyScope">
                  <div v-if="historyScope.row.$edit">
                    <el-input-number :precision="1" :step="0.1" v-model="historyScope.row.doneHour"></el-input-number>
                  </div>
                  <div v-else>{{historyScope.row.doneHour}}</div>
                </template>
              </el-table-column>
              <el-table-column label="备注">
                <template slot-scope="historyScope">
                  <div v-if="historyScope.row.$edit">
                    <el-input v-model="historyScope.row.mark"></el-input>
                  </div>
                  <div v-else>{{historyScope.row.mark}}</div>
                </template>
              </el-table-column>
              <el-table-column label="" width="100">
                <template slot-scope="historyScope">
                  <el-button v-if="!historyScope.row.$edit" type="warning" icon="el-icon-edit" circle @click="m_editTaskHistory(historyScope,historyScope.row,historyScope.$index)"></el-button>
                  <el-button v-else type="primary" icon="el-icon-check" circle @click="m_saveTaskHistory(historyScope,historyScope.row,historyScope.$index)"></el-button>
                  <el-button v-if="!historyScope.row.$edit" type="danger" icon="el-icon-delete" circle @click="m_deleteTaskHistory(historyScope,historyScope.row,historyScope.$index)"></el-button>
                  <el-button v-else type="danger" icon="el-icon-close" circle @click="m_cancelTaskHistory(historyScope,historyScope.row,historyScope.$index)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    newTask: {
      type: Array,
      default: function() {
        return []
      }
    },
    newTaskLevel: {
      type: Array,
      default: function() {
        return []
      }
    },
    shareData: {
      type: Object,
      default: function() {
        return {}
      }
    },
  },
  data() {
    return {
      newTaskRow: { id: 0, name: '新任务', workHour: 4, doneHour: 0, $level: 0 },
      dialogVisibleNewTaskForm: false,
      dialogVisibleWorkHour: false,
      currentRow: {
      	taskDoneHistory: [
	        { id:1, taskId:1, day: '2020-11-03', doneHour: 4, mark: '' }
	      ]
      },
			currentRowHistory:[]
    }
  },
  methods: {
  	m_editTaskHistory(scope, row, index) {
  		var oldRow = this.$forkJson(row)
  		delete oldRow.$edit
  		row.$oldRow = oldRow
  		this.$set(row, '$edit', true)
  	},
  	m_saveTaskHistory(scope, row, index) {
  		console.log(row.id)
  		if (row.id > 0) {
  			this.shareData.taskDone[row.day].forEach((td) => {
  				if (td.id === row.id) {
  					td.doneHour = row.doneHour
  				}
  			})
  		} else {
  			row.id = index
  			var newTaskDone = this.$forkJson(row)
  			newTaskDone.name = this.currentRow.name
  			newTaskDone.workHour = this.currentRow.workHour
  			if (this.shareData.taskDone[row.day]!==undefined) {
  				this.shareData.taskDone[row.day].push(newTaskDone)
  			} else {
  				this.$set(this.shareData.taskDone,row.day, [newTaskDone])
  			}
  		}
  		var h = 0
  		this.currentRow.taskDoneHistory.forEach((tdh) => {
  			h = h + tdh.doneHour
  		})
  		this.currentRow.doneHour = h
  		this.$emit('onFresh')
  		row.$edit = false
  	},
  	m_cancelTaskHistory(scope, row, index) {
  		if (row.id > 0) {
  			row.$edit = false
  			for (var x in row.$oldRow) {
  				row[x] = row.$oldRow[x]
  			}
  			delete row.$oldRow
  		} else {
  		this.currentRowHistory.splice(index, 1)
  		}
  	},
    m_addTaskHistory() {
      var newTaskHistory = {
      	taskId: this.currentRow.id,
        day: this.$formatDateTime(new Date(), 'yyyy-MM-dd'),
        doneHour: 4,
        mark: '',
        $edit: true
      }
      this.currentRowHistory.push(newTaskHistory)

    },
    m_deleteTaskHistory(scope, row, index) {
    	this.currentRowHistory.splice(index, 1)
    },
    m_addNewTaskRow() {
      this.dialogVisibleNewTaskForm = false
      var newTaskRow = JSON.parse(JSON.stringify(this.newTaskRow))
      var i = this.newTask.push(newTaskRow)
      newTaskRow.id = i
      this.newTaskLevel.splice(newTaskRow.$level, 0, newTaskRow.id)
      console.log(this.newTaskLevel)
      this.$emit('onFresh')
    },
    m_openNewTaskForm() {
      this.newTaskRow.$level = this.newTask.length
      this.dialogVisibleNewTaskForm = true
    },
    m_workHour(scope, row, index) {
      this.currentRow = row
      this.currentRow['$level'] = this.newTaskLevel.indexOf(row.id)
      this.dialogVisibleWorkHour = true
      this.currentRowHistory = this.currentRow.taskDoneHistory
    },
    m_delete(scope, row, index) {
      this.newTask.splice(index, 1)
      let i = this.newTaskLevel.indexOf(row.id)
      if (i > 0) { this.newTaskLevel.splice(i, 1) }
      this.$emit('onFresh')
    },
    m_openEditTaskForm(scope, row, index) {
      this.dialogVisibleNewTaskForm = true
      this.currentRow = row
      for (var x in this.newTaskRow) {
        this.newTaskRow[x] = row[x]
      }
      this.newTaskRow['$level'] = this.newTaskLevel.indexOf(row.id)
    },
    m_editNewTaskRow() {
      this.dialogVisibleNewTaskForm = false
      for (var x in this.currentRow.row) {
        if (this.newTaskRow[x] !== undefined) {
          this.currentRow.row[x] = this.newTaskRow[x]
        }
      }

      var lastLevel = this.newTaskLevel.indexOf(this.currentRow.id)
      if (this.newTaskRow.$level !== lastLevel) {
        this.newTaskLevel.splice(lastLevel, 1)
        this.newTaskLevel.splice(this.newTaskRow.$level, 0, this.currentRow.id)
      }
      this.$emit('onFresh')
    },
    swapArray(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    movedown(arr, index, length) {
      if (index + 1 != length) {
        this.swapArray(arr, index, index + 1);
      } else {
        this.$message.error('优先级已经最低');
      }
    },
    moveup(arr, index, length) {
      if (index != 0) {
        this.swapArray(arr, index, index - 1);
      } else {
        this.$message.error('优先级已经最高');
      }
    },
    m_upNewTaskLevel(scope, row, index) {
      var i = this.newTaskLevel.indexOf(row.id)
      if (i < 0) return this.$message.error('该任务未设置优先级')
      this.moveup(this.newTaskLevel, i, this.newTaskLevel.length)
      this.$emit('onFresh')
    },
    m_downNewTaskLevel(scope, row, index) {
      var i = this.newTaskLevel.indexOf(row.id)
      if (i < 0) return this.$message.error('该任务未设置优先级')

      this.movedown(this.newTaskLevel, i, this.newTaskLevel.length)
      this.$emit('onFresh')
    }
  }
}

</script>
