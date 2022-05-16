<template>
  <div>
    <el-row type="flex" justify="space-around" style="margin-bottom: 0px;">
      <el-col :span="10" style="text-align:left;">
        <h2>教学成果</h2>
      </el-col>
      <el-col :span="10" style="text-align:right">
        <el-button type="primary" size="small" @click="handleClickAdd">新增</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="dataList"
      border
      style="width: 98%"
    >
      <el-table-column
        prop="courseVO.student.name"
        label="学生姓名"
      />
      <el-table-column
        prop="courseVO.courseStateDesc"
        label="课程状态"
      />
      <el-table-column
        prop="date"
        label="学生成绩趋势"
        width="400px"
      >
        <template slot-scope="scope">
          <div :id="`myEcharts-${scope.row.id}`" :ref="`myEcharts-${scope.row.id}`" style="width:100%; height:200px;" />
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <div ref="myEcharts" style="width:400px; height:200px;" /> -->

    <el-dialog title="添加成果" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width:80%">
        <el-form-item label="学生" :label-width="formLabelWidth">
          <el-select v-model="form.courseId" placeholder="选择学生">
            <el-option v-for="item in courseDataList" :key="item.id" :label="`${item.student.name}-${item.teacher.subjectLabel} (${item.courseStateDesc})`" :value="item.id" />
          </el-select>
          <!-- <el-input v-model="form.title" autocomplete="off" /> -->
        </el-form-item>
        <el-form-item label="第一次月考" :label-width="formLabelWidth">
          <el-input v-model="form.score0" autocomplete="off" />
        </el-form-item>
        <el-form-item label="第二次月考" :label-width="formLabelWidth">
          <el-input v-model="form.score1" autocomplete="off" />
        </el-form-item>
        <el-form-item label="期中考试" :label-width="formLabelWidth">
          <el-input v-model="form.score2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="第三次月考" :label-width="formLabelWidth">
          <el-input v-model="form.score3" autocomplete="off" />
        </el-form-item>
        <el-form-item label="第四次月考" :label-width="formLabelWidth">
          <el-input v-model="form.score4" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClickCancel">取 消</el-button>
        <el-button type="primary" @click="save2TableData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import * as echarts from 'echarts'

export default {
  data() {
    return {
      dialogFormVisible: false,
      dataList: [],
      form: {
        id: '',
        score0: '',
        score1: '',
        score2: '',
        score3: '',
        score4: '',
        courseId: ''
      },
      formLabelWidth: '100px',
      op: 'add',
      curIndex: 0,
      courseDataList: []
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  created() {
    this.getData()
  },
  // mounted() {
  //   this.init()
  // },
  methods: {
    init() {
      console.log(this.$refs)
      // 渲染表格里面
      setTimeout(() => {
        this.dataList.forEach(e => {
          const myChart = echarts.init(document.querySelector(`#myEcharts-${e.id}`))
          // console.log(myChart)
          // debugger
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption({
            xAxis: {
              type: 'category',
              data: ['第一次月考', '第二次月考', '期中考试', '第三次月考', '第四次月考'],
              show: false
            },
            yAxis: {
              type: 'value',
              show: false
            },
            series: [
              {
                data: [e.score0, e.score1, e.score2, e.score3, e.score4],
                type: 'line',
                label: {
                  show: true,
                  position: 'bottom'
                }
              }
            ]
          })
          console.log(myChart)
        })
      }, 1)
      // debugger
    },
    getData() {
      // 从后端初始化数据
      this.$getAchievementList().then((data) => {
        this.dataList = data?.data
        this.$nextTick(() => {
          this.init()
        })
      })
      this.$getCourseList().then((data) => {
        this.courseDataList = data?.data
      })
    },
    handleClick(index, row) {
      console.log(index)
      console.log(row)
      this.op = 'edit'
      this.curIndex = index
      this.form = row
      this.dialogFormVisible = true
    },
    save2TableData() {
      console.log(this.form)
      if (this.op === 'edit') {
        this.dataList[this.curIndex] = this.form
      }
      this.$saveAchievement(this.form).then(() => {
        this.$message({
          type: 'success',
          message: `保存成功!`
        })
        // 刷新数据
        this.getData()
      })
      this.dialogFormVisible = false
      this.clickForm()
    },
    deleteRow(index) {
      this.$confirm(`此操作将永久删除数据, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 后端接口删除数据
        this.$deleteAchievement(this.dataList[index]).then(() => {
          this.$message({
            type: 'success',
            message: `删除成功!`
          })
          // 刷新数据
          this.getData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleClickAdd() {
      this.dialogFormVisible = true
      this.op = 'add'
      this.clickForm()
    },
    clickForm() {
      this.form = {
        id: '',
        score0: '',
        score1: '',
        score2: '',
        score3: '',
        score4: '',
        courseId: ''
      }
    },
    handleClickCancel() {
      this.dialogFormVisible = false
      this.clickForm()
      this.op = 'add'
      this.curIndex = 0
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.el-row {
    margin-bottom: 20px;
    margin-left: 10px;
    display: flex;
    align-items: center;
  }
  .el-col {
    border-radius: 4px;
    align-items: center;
    text-align: center;
    border: 1px black;
  }
  .el-table {
    margin: 10px 10px 10px 10px;
  }
  .el-form-item .el-date-picker {
    width: 100%;
  }
</style>

