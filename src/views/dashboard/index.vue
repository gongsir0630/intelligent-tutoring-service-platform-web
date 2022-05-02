<template>
  <div>
    <el-row type="flex" justify="space-around" style="margin-top: 20px;background-color: #EBEEF5; align-items: center;">
      <el-col :span="5">
        <el-row>
          <el-col :span="24">
            <el-col :span="12">
              <el-avatar :src="avatar" :size="100" style="margin-top: 10px;" />
            </el-col>
            <el-col :span="12" style="margin-top: 30px;">
              <strong>{{ name }}</strong>
              <p>{{ roles[0] }}</p>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light">{{ personalIntroduction }}</div>
          </el-col>
        </el-row>
      </el-col>
      <template v-if="roles[0] === 'admin'">
        <el-col :span="5">
          <div class="grid-content bg-purple-light">
            <p>新学生({{ stuCnt }}人)</p>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple-light">
            <p>新老师({{ teacherCnt }}人)</p>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple-light">
            <p>新教务({{ teachingAffairsCnt }}人)</p>
          </div>
        </el-col>
      </template>
      <template v-else>
        <el-col :span="5">
          <div class="grid-content">
            <el-badge :value="messageList.filter(m => m.toSeeState === false).length" class="item">
              <!-- <el-button type="">新留言</el-button> -->
              <el-button type="warning" icon="el-icon-message" @click="seeMessage">消息</el-button>
            </el-badge>
          </div>
        </el-col>
      </template>
    </el-row>

    <el-row type="flex" justify="space-around" style="margin-top: 20px;">
      <el-col v-if="roles[0] === 'admin'" :span="5" style="text-align:left">
        <div class="my-border" style="border:1px solid #000">
          <h2 class="span-class">学校数据</h2>
          <hr>
          <span class="span-class">学生总数</span><el-progress :text-inside="true" :percentage="stuSum" :format="format" color="#f56c6c" :stroke-width="strokeWidth" />
          <span class="span-class">老师总数</span><el-progress :text-inside="true" :percentage="5" :format="format" color="#e6a23c" :stroke-width="strokeWidth" />
          <span class="span-class">教务总数</span><el-progress :text-inside="true" :percentage="12" :format="format" :stroke-width="strokeWidth" />
          <span class="span-class">兼职总数</span><el-progress :text-inside="true" :percentage="3" :format="format" color="#6f7ad3" :stroke-width="strokeWidth" />
        </div>
      </el-col>

      <el-col :span="17" style="text-align:center">
        <div class="my-border" style="border:1px solid #000">
          <el-row type="flex" justify="space-around" style="margin-bottom: 0px; align-items: center;">
            <template v-if="roles[0] === 'admin'">
              <el-col :span="10" style="text-align:left;">
                <h2>校区备注</h2>
              </el-col>
              <el-col :span="10" style="text-align:right">
                <el-button type="primary" size="small" @click="handleClickAdd">添加</el-button>
              </el-col>
            </template>
            <template v-else>
              <el-col :span="24" style="text-align:left;">
                <h2>校区备注</h2>
              </el-col>
            </template>
          </el-row>
          <hr>
          <el-table
            :data="noticeList"
            border
            style="width: 98%"
          >
            <el-table-column
              prop="title"
              label="标题"
            />
            <el-table-column
              prop="content"
              label="内容"
            />
            <el-table-column
              prop="date"
              label="时间"
            />
            <el-table-column
              v-if="roles[0] === 'admin'"
              fixed="right"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.$index, scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="添加备注" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width:80%">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <!-- <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select> -->
          <el-input v-model="form.content" autocomplete="off" />
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClickCancel">取 消</el-button>
        <el-button type="primary" @click="save2TableData">确 定</el-button>
      </div>
    </el-dialog>

    <el-drawer
      title="消息盒子 (点击卡片即可将消息标记为已读)"
      :visible.sync="drawer"
      direction="rtl"
    >
      <el-card v-for="msg in messageList" :key="msg.id" class="box-card" @click.native="markRead(msg)">
        <div slot="header" class="clearfix">
          <el-badge :is-dot="!msg.toSeeState" style="padding-right:5px;">
            <span>{{ msg.from + '  ' + msg.createTimeStr }}</span>
          </el-badge>
          <el-button style="float: right; padding: 2px 0" type="primary" @click="openReplayMessage(msg)">回复</el-button>
        </div>
        <div class="text item">
          {{ msg.content }}
        </div>
      </el-card>
    </el-drawer>

    <el-dialog title="回复留言" :visible.sync="replayFormVisible">
      <el-form :model="replayForm" style="width:80%">
        <el-form-item :label="'回复@' + replayForm.to" :label-width="formLabelWidth">
          <el-input v-model="replayForm.message" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="replayCancel">取 消</el-button>
        <el-button type="primary" @click="replayMessage">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      stuCnt: 15,
      teacherCnt: 3,
      teachingAffairsCnt: 1,
      personalIntroduction: '个人介绍',
      strokeWidth: 20,
      stuSum: 90,
      dialogFormVisible: false,
      noticeList: [],
      form: {
        id: 0,
        title: '',
        content: '',
        date: ''
      },
      formLabelWidth: '100px',
      op: 'add',
      curIndex: 0,
      drawer: false,
      messageList: [{
        id: 0,
        from: '何双宝',
        createTimeStr: '2022-05-01',
        content: '这是留言内容',
        toSeeState: true
      }, {
        id: 1,
        from: '何双宝',
        createTimeStr: '2022-05-01',
        content: '这是留言内容',
        toSeeState: false
      }],
      replayFormVisible: false,
      replayForm: {
        id: 0,
        message: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'avatar'
    ])
  },
  created() {
    this.getData()
  },
  methods: {
    replayCancel() {
      this.replayFormVisible = false
      this.replayForm = {
        id: 0,
        message: '',
        to: ''
      }
    },
    openReplayMessage(msg) {
      console.log(msg)
      this.replayFormVisible = true
      this.replayForm = {
        id: msg.id,
        message: '',
        to: msg.from
      }
    },
    replayMessage() {
      this.$replayMessage(this.replayForm).then(() => {
        this.replayCancel()
        this.$message({
          type: 'success',
          message: `消息回复成功!`
        })
      })
    },
    seeMessage() {
      this.drawer = true
      this.getMessageData()
    },
    markRead(msg) {
      console.log(msg)
      this.$markRead(msg.id).then(data => {
        console.log(data)
        msg.toSeeState = true
        // 刷新数据
        this.getMessageData()
      })
    },
    getMessageData() {
      this.$getMessageList().then(data => {
        this.messageList = data?.data
      }).catch(() => {
        this.messageList = []
      })
    },
    getData() {
      // 从后端初始化数据
      this.$getAnnouncementList().then((data) => {
        this.noticeList = data?.data
      })
      // 留言数据
      this.getMessageData()
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
    save2TableData() {
      console.log(this.form)
      if (this.op === 'add') {
        this.noticeList.push(this.form)
      } else {
        this.noticeList[this.curIndex] = this.form
      }
      this.$saveAnnouncement(this.form).then(() => {
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
        this.noticeList.splice(index, 1)
        // 后端接口删除用户
        this.$deleteAnnouncement(this.noticeList[index]).then(() => {
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
  .el-row {
    margin-bottom: 20px;
    margin-left: 10px;
    display: flex;
    align-items: flex-start;
  }
  .el-col {
    border-radius: 4px;
    align-items: center;
    text-align: center;
    border: 1px black;
  }
  .bg-purple-dark {
    background: #f9fafc;
  }
  .bg-purple {
    background: #f9fafc;
  }
  .bg-purple-light {
    background: #f9fafc;
    align-items: center;
  }
  .grid-content {
    border-radius: 4px;
    line-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-progress {
    margin-bottom: 40px;
    margin-top: 10px;
    margin-left: 10px;
    width: 80%;
  }
  .el-progress__text {
    color: #fff;
  }
  .el-progress-bar__innerText {
    color: black;
  }
  .span-class {
    margin-top: 10px;
    margin-left: 10px;
  }
  #my-border {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-table {
    margin: 10px 10px 10px 10px;
  }
  .el-form-item .el-date-picker {
    width: 100%;
  }
  .box-card {
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
