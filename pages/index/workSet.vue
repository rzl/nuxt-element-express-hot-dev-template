<template>
  <div>
    <el-row>
      <el-form ref="form" label-width="120px">
        <el-form-item label="每天工时">
          <el-input v-model="form.workHour"></el-input>
        </el-form-item>
        <el-form-item label="默认休息日">
          <el-checkbox-group class="week-checkbox-group" v-model="form.defaultHoliday">
            <template v-for="(day, index) in week">
              <div :key="index" style="width:90px;display:inline-block;">
                <el-checkbox :label="day">{{ weekName[index] }}</el-checkbox>
              </div>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="m_save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span='8' style="padding: 5px">
        <el-button type="primary" style="width: 100%" @click="dialogVisibleNewWorkday= true">添加指定的日期工时</el-button>
        <el-table :data="workday" border style="width: 100%">
          <el-table-column label="序号" type="index">
          </el-table-column>
          <el-table-column prop="id" label="日期">
            <template slot-scope="scope">
              {{scope.row.day}}
            </template>
          </el-table-column>
          <el-table-column prop="mark" label="备注">
            <template slot-scope="scope">
              {{scope.row.mark}}
            </template>
          </el-table-column>
          <el-table-column label="">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span='8' style="padding: 5px">
        <el-button type="primary" style="width: 100%" @click="dialogVisibleNewWorkday= true">添加指定的工作日</el-button>
        <el-table :data="workday" border style="width: 100%">
          <el-table-column label="序号" type="index">
          </el-table-column>
          <el-table-column prop="id" label="日期">
            <template slot-scope="scope">
              {{scope.row.day}}
            </template>
          </el-table-column>
          <el-table-column prop="mark" label="备注">
            <template slot-scope="scope">
              {{scope.row.mark}}
            </template>
          </el-table-column>
          <el-table-column label="">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span='8' style="padding: 5px">
        <el-button type="primary" style="width: 100%" @click="dialogVisibleNewHoliday = true">添加指定的节假日</el-button>
        <el-table :data="holiday" border style="width: 100%">
          <el-table-column label="序号" type="index">
          </el-table-column>
          <el-table-column prop="id" label="日期">
            <template slot-scope="scope">
              {{scope.row.day}}
            </template>
          </el-table-column>
          <el-table-column prop="mark" label="备注">
            <template slot-scope="scope">
              {{scope.row.mark}}
            </template>
          </el-table-column>
          <el-table-column label="">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="添加指定的工作日工时" :visible.sync="dialogVisibleNewWorkday" width="30%">
      <el-form ref="form" :model="newWorkday" label-width="80px">
        <el-form-item label="工作日">
          <el-date-picker value-format="yyyy-MM-dd" v-model="newWorkday.day" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="newWorkday.mark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleNewWorkday = false">取 消</el-button>
        <el-button type="primary" @click="m_addNewWorkday">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加指定的工作日" :visible.sync="dialogVisibleNewWorkday" width="30%">
      <el-form ref="form" :model="newWorkday" label-width="80px">
        <el-form-item label="工作日">
          <el-date-picker value-format="yyyy-MM-dd" v-model="newWorkday.day" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="newWorkday.mark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleNewWorkday = false">取 消</el-button>
        <el-button type="primary" @click="m_addNewWorkday">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加指定的节假日" :visible.sync="dialogVisibleNewHoliday" width="30%">
      <el-form ref="form" :model="newWorkday" label-width="80px">
        <el-form-item label="工作日">
          <el-date-picker value-format="yyyy-MM-dd" v-model="newHoliday.day" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="newHoliday.mark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleNewHoliday = false">取 消</el-button>
        <el-button type="primary" @click="m_addNewHoliday">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    workHour: {
      type: Number,
      default: ''
    },
    workday: {
      type: Array,
      default: function() {
        return []
      }
    },
    holiday: {
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
      dialogVisibleNewWorkday: false,
      dialogVisibleNewHoliday: false,
      newWorkday: {
        day: this.$formatDateTime(new Date(), 'yyyy-MM-dd'),
        mark: ''
      },
      newHoliday: {
        day: this.$formatDateTime(new Date(), 'yyyy-MM-dd'),
        mark: ''
      },
      form: {
        workHour: this.workHour,
        defaultHoliday: this.defaultHoliday
      },
      week: [1, 2, 3, 4, 5, 6, 0],
      weekName: [
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期日'
      ]
    }
  },
  methods: {
    m_save() {
      this.$emit('onSetChange', this.form)
    },
    m_addNewWorkday() {
      var newWorkday = this.$forkJson(this.newWorkday)
      this.workday.push(newWorkday)
      this.$emit('onWorkdayFresh', newWorkday)
      this.dialogVisibleNewWorkday = false
    },
    m_addNewHoliday() {
      var newHoliday = this.$forkJson(this.newHoliday)
      this.holiday.push(newHoliday)
      this.$emit('onHolidayFresh', newHoliday)
      this.dialogVisibleNewHoliday = false

    }
  }
}

</script>
