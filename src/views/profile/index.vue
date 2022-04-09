<template>
  <el-container>
    <!-- <el-header>个人信息</el-header> -->
    <el-main>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model="form.username" disabled />
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="form.password" type="password" />
              </el-form-item>
              <el-form-item label="重复密码">
                <el-input v-model="form.passwordAgain" type="password" />
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="form.name" />
              </el-form-item>
              <el-form-item label="自我介绍">
                <el-input v-model="form.introduction" />
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input v-model="form.phone" />
              </el-form-item>
              <el-form-item v-show="form.role=='student'" label="学校">
                <el-input v-model="form.school" />
              </el-form-item>
              <el-form-item
                v-show="form.role=='student'"
                label="年级"
              >
                <el-select v-model="form.grade" placeholder="请选择年级">
                  <el-option v-for="item in studentGradeList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item
                v-show="form.role=='teacher'"
                label="校区"
              >
                <el-input
                  v-model="form.campus"
                  auto-complete="off"
                />
              </el-form-item>
              <el-form-item
                v-show="form.role=='teacher'"
                label="教授科目"
              >
                <el-select v-model="form.subject" placeholder="请选择科目">
                  <el-option v-for="item in subjectList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">提交更新</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        passwordAgain: '',
        name: '',
        introduction: '',
        phone: '',
        role: 'student',
        school: '',
        grade: '',
        campus: '',
        subject: '',
        display: ''
      },
      subjectList: []
    }
  },
  computed: {
    ...mapGetters([
      'userList',
      'studentGradeList'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    ...mapActions('user', ['getStudentGradeList', 'getInfo', 'logout']),
    async fetchData() {
      // 查询个人信息
      await this.getInfo({}).then(info => {
        this.form = info
      })
      // 查询年级信息
      if (this.form.role === 'student') {
        await this.getStudentGradeList()
      }
      // 查询科目信息
      if (this.form.role === 'teacher') {
        const { data } = await this.$getSubjectList()
        this.subjectList = data
      }
    },
    onSubmit() {
      console.log(this.form)

      this.$update(this.form).then(() => {
        this.$alert('个人信息更新成功, 请重新登录', '提示信息', {
          confirmButtonText: '确定',
          callback: () => {
            this.logout().then(() => {
              this.$router.push(`/login`)
            })
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style>
  body {
    background-color: #E9EEF3;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-form-item .el-select {
    width: 100%;
  }
</style>
