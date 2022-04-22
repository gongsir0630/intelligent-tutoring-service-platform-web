<template>
  <div>
    <el-carousel :interval="4000" type="card" :height="bannerH+'px'" style="margin-top: 15px">
      <el-carousel-item v-for="(item,index) in teacherList" :key="index">
        <!--走马灯中也可以添加一些文字信息-->
        <!-- <p align="center" style="font-size: x-large;font-family: 华文新魏;color: #f56c6c">{{item.txt}}</p>-->
        <img ref="imgHeight" :src="item.display" width="100%" height="100%" object-fit="cover">
      </el-carousel-item>
    </el-carousel>

    <el-row>
      <el-col :span="24" style="text-align:center">
        科目:
        <el-select v-model="selectedSubject" placeholder="请选择科目" :clearable="true" @change="searchTeacher">
          <el-option v-for="item in subjectList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
    </el-row>

    <el-row>
      <!--就改这里一行-->
      <el-col v-for="(item,index) in searchTeacherList" :key="index" :span="7" :offset="1" style="margin-bottom:40px">
        <el-card :body-style="{ padding: '0px', height:'360px'}" shadow="hover" style="width:300px; height:320px;">
          <el-row>
            {{ item.name }} -- {{ item.subjectLabel }}
          </el-row>
          <el-row>
            <el-image :src="item.display" :preview-src-list="displayList" style="width: 100%; height: 180px" object-fit="cover" />
          </el-row>
          <el-row>
            <el-button type="primary" @click="book(item.username)">预约</el-button>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="预约" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width:80%">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="name" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="phone" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="学校" :label-width="formLabelWidth">
          <el-input v-model="school" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="当前分数" :label-width="formLabelWidth">
          <el-input v-model="form.score" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item label="时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClickCancel">取 消</el-button>
        <el-button type="primary" @click="submitBook">确 定</el-button>
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
      teacherList: [],
      searchTeacherList: [],
      displayList: [],
      bannerH: 300,
      subjectList: [],
      selectedSubject: '',
      form: {
        score: ''
      },
      formLabelWidth: '100px',
      op: 'add',
      curIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'phone',
      'school'
    ])
  },
  created() {
    this.getData()
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.setBannerH()
    }, false)
  },
  methods: {
    book(tUsername) {
      console.log(tUsername)
      this.dialogFormVisible = true
    },
    searchTeacher(subject) {
      console.log(subject)
      if (this.selectedSubject === '') {
        this.searchTeacherList = this.teacherList
      } else {
        this.searchTeacherList = this.teacherList.filter(t => t.subject === subject)
      }
    },
    // 设置走马灯高度
    setBannerH() {
      this.bannerH = document.body.clientWidth / 4
    },
    getData() {
      // 从后端初始化数据
      this.$getUserList({}).then((data) => {
        this.teacherList = data?.data.filter(u => u.role === 'teacher')
        this.searchTeacherList = this.teacherList
        this.displayList = this.teacherList.map(t => {
          return t.display
        })
      })
      // 科目信息
      this.$getSubjectList().then((data) => {
        this.subjectList = data.data
      })
    },
    format(percentage) {
      return `${percentage * 5}人`
    },
    submitBook() {
      console.log(this.form)
      this.$message({
        type: 'success',
        message: `提交成功!`
      })
      // 刷新数据
      this.getData()
      this.dialogFormVisible = false
      this.clickForm()
    },
    clickForm() {
      this.form = {
        score: ''
      }
    },
    handleClickCancel() {
      this.dialogFormVisible = false
      this.clickForm()
    }
  }
}
</script>

<style>
  .el-row {
    margin-bottom: 20px;
    margin-top: 20px;
    text-align: center;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

