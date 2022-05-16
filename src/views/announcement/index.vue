<template>
  <div>
    <el-row type="flex" justify="space-around" style="margin-bottom: 0px;">
      <el-col :span="10" style="text-align:left;">
        <h2>公告列表</h2>
      </el-col>
      <el-col :span="10" style="text-align:right">
        <el-button type="primary" size="small" @click="handleClickAdd">添加</el-button>
      </el-col>
    </el-row>
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
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加公告" :visible.sync="dialogFormVisible">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
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
      curIndex: 0
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      // 从后端初始化数据
      this.$getAnnouncementList().then((data) => {
        this.noticeList = data?.data
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
        // 后端接口删除
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
      this.clickForm()
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
</style>

