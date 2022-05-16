<template>
  <div>
    <el-row type="flex" justify="space-around" style="margin-bottom: 0px;">
      <el-col :span="10" style="text-align:left;">
        <h2>{{ roles[0] === 'admin' ? '全部课程' : '我的课程' }}</h2>
      </el-col>
      <el-col :span="10" style="text-align:right">
        <!-- 这里暂时不需要添加按钮, 使用 v-show 隐掉 -->
        <el-button v-show="false" type="primary" size="small" @click="handleClickAdd">添加</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="dataList"
      border
      style="width: 98%"
    >
      <el-table-column
        v-if="roles[0] !== 'teacher'"
        prop="teacher.subjectLabel"
        label="科目"
      />
      <el-table-column
        v-if="roles[0] !== 'student'"
        label="学生姓名"
      >
        <template slot-scope="scope">
          <el-button type="text" style="margin-left: 16px;" @click="open(scope.row)">
            {{ scope.row.student.name }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="课程状态"
      >
        <template slot-scope="scope">
          <el-tag :type="setType(scope.row.courseState)">{{ scope.row.courseStateDesc }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="courseAllowance"
        label="课余量"
      />
      <el-table-column
        v-if="roles[0] === 'teacher'"
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      title="学生信息"
      :visible.sync="drawer"
      direction="rtl"
    >
      <p class="el-drawer-p">姓名:  {{ curData.student.name }}</p>
      <p class="el-drawer-p">年级:  {{ curData.student.gradeLabel }}</p>
      <p class="el-drawer-p">分数:  {{ curData.score }}</p>
      <p class="el-drawer-p">学校:  {{ curData.student.school }}</p>
      <p class="el-drawer-p">电话:  {{ curData.student.phone }}</p>
      <p class="el-drawer-p" style="color: blue;">聊天记录: </p>
      <el-timeline>
        <el-timeline-item
          v-for="(msg, index) in curData.messageList"
          :key="index"
          :timestamp="msg.createTimeStr + ' from ' + msg.from"
        >
          {{ msg.content }}
        </el-timeline-item>
      </el-timeline>
    </el-drawer>

    <el-dialog title="添加公告" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width:80%">
        <el-form-item label="课余量" :label-width="formLabelWidth">
          <el-input v-model="form.courseAllowance" autocomplete="off" />
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-select v-model="form.courseState" placeholder="请选择活动区域">
            <el-option v-if="form.courseState === 'booking'" label="预约中" value="booking" />
            <el-option label="预约成功" value="bookSuccess" />
            <el-option label="上课中" value="inCourse" />
          </el-select>
          <!-- <el-input v-model="form.content" autocomplete="off" /> -->
        </el-form-item>
        <!-- <el-form-item label="时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item> -->
        <el-form-item label="留言" :label-width="formLabelWidth">
          <el-input v-model="form.message" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClickCancel">取 消</el-button>
        <el-button type="primary" @click="updateCourseData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      dialogFormVisible: false,
      dataList: [],
      curData: {
        student: {
          name: '',
          gradeLabel: '',
          school: '',
          phone: ''
        },
        score: '',
        messageList: []
      },
      drawer: false,
      form: {
        id: 0,
        courseAllowance: '',
        courseState: '',
        message: ''
      },
      formLabelWidth: '100px',
      op: 'add',
      curIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.getData()
  },
  methods: {
    open(row) {
      this.drawer = true
      this.curData = row
    },
    setType(status) {
      if (status === 'booking') {
        return ''
      } else if (status === 'bookSuccess') {
        return 'success'
      } else if (status === 'inCourse') {
        return 'warning'
      } else {
        return 'info'
      }
    },
    getData() {
      // 从后端初始化数据
      this.$getCourseList().then((data) => {
        this.dataList = data?.data
      })
    },
    format(percentage) {
      return `${percentage * 5}人`
    },
    handleClick(index, row) {
      console.log(index)
      console.log(row)
      this.op = 'edit'
      this.curIndex = index
      this.form = row
      this.dialogFormVisible = true
    },
    updateCourseData() {
      console.log(this.form)
      if (this.op === 'add') {
        this.dataList.push(this.form)
      } else {
        this.dataList[this.curIndex] = this.form
      }
      this.$updateCourse(this.form).then(() => {
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
        // 后端接口删除用户
        this.$deleteAnnouncement(this.dataList[index]).then(() => {
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
    },
    clickForm() {
      this.form = {
        id: 0,
        title: '',
        content: '',
        date: ''
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
  .el-drawer-p {
    padding-left: 20px;
  }
</style>

