<template>
  <el-container>
    <el-header>用户注册</el-header>
    <el-main>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form ref="form" :model="form" :rules="dataRules" label-width="80px">
              <el-form-item label="用户角色">
                <el-select v-model="form.role" placeholder="请选择角色">
                  <el-option label="学生" value="student" />
                  <el-option label="老师" value="teacher" />
                </el-select>
              </el-form-item>

              <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password" />
              </el-form-item>
              <el-form-item label="重复密码" prop="passwordAgain">
                <el-input v-model="form.passwordAgain" type="password" />
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="form.name" />
              </el-form-item>
              <el-form-item label="自我介绍">
                <el-input v-model="form.introduction" />
              </el-form-item>
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model="form.phone" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.mail" />
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
                <el-button type="primary" @click="onSubmit">注册</el-button>
                <el-button @click="onCancel">取消</el-button>
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
    const validatePhone = (rule, value, callback) => {
      if (value.length !== 11) {
        callback(new Error('手机号码必须是11位'))
      } else {
        callback()
      }
    }
    const reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,12}$/
    var validateNewPwd = (rule, value, callback) => {
      console.log(value)
      if (!reg.test(value)) {
        callback(new Error('密码应是6-12位数字、字母或字符！'))
      } else {
        callback()
      }
    }
    var validateConfirmPwd = (rule, value, callback) => {
      console.log(value)
      if (this.form.password !== value) {
        callback(new Error('两次输入的密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        passwordAgain: '',
        name: '',
        introduction: '',
        phone: '',
        mail: '',
        role: 'student',
        school: '',
        grade: '',
        campus: '',
        subject: '',
        display: ''
      },
      subjectList: [],
      dataRules: {
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { validator: validatePhone, trigger: 'blur' }],
        password: [{ required: true, message: '请输入新密码', trigger: 'blur' }, { validator: validateNewPwd, trigger: 'blur' }],
        passwordAgain: [{ required: true, message: '请输入确认密码', trigger: 'blur' }, { trigger: 'blur', validator: validateConfirmPwd }],
        username: [{ required: true, message: '请输入用户名(推荐使用学号或者手机号)', trigger: 'blur' }]
      }
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
    ...mapActions('user', ['getStudentGradeList']),
    async fetchData() {
      // 从后端查询数据
      await this.getStudentGradeList()
      const { data } = await this.$getSubjectList()
      this.subjectList = data
    },
    onCancel() {
      this.$router.push(`/login`)
    },
    onSubmit() {
      console.log(this.form)

      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/register', this.form).then(() => {
            this.$alert('注册成功', '提示信息', {
              confirmButtonText: '确定',
              callback: () => {
                this.$router.push(`/login`)
              }
            })
          }).catch(() => {
          })
        }
      })
    }
  }
}
</script>

<style scoped>
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
