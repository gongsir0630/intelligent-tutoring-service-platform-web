<template>
  <el-container>
    <!-- <el-header>个人信息</el-header> -->
    <el-main>
      <el-row type="flex" justify="space-around">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form ref="form" :model="form" :rules="dataRules" label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model="form.username" disabled />
              </el-form-item>
              <el-form-item label="更改密码">
                <el-radio v-model="radioShow" label="1">更改</el-radio>
                <el-radio v-model="radioShow" label="2">不更改</el-radio>
              </el-form-item>
              <template v-if="radioShow === '1'">
                <el-form-item label="原密码" prop="oldPassword">
                  <el-input v-model="form.oldPassword" type="password" placeholder="请输入原密码" />
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                  <el-input v-model="form.password" type="password" placeholder="请输入新密码" />
                </el-form-item>
                <el-form-item label="确认密码" prop="passwordAgain">
                  <el-input v-model="form.passwordAgain" type="password" placeholder="请再次输入新密码" />
                </el-form-item>
              </template>
              <el-form-item label="姓名">
                <el-input v-model="form.name" placeholder="请输入姓名" />
              </el-form-item>
              <el-form-item label="自我介绍">
                <el-input v-model="form.introduction" placeholder="请输入自我介绍" />
              </el-form-item>
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model="form.phone" placeholder="请输入手机号" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.mail" placeholder="请输入电子邮箱" />
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
    const validatePhone = (rule, value, callback) => {
      if (value.length !== 11) {
        callback(new Error('手机号码必须是11位'))
      } else {
        callback()
      }
    }
    const reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,12}$/
    var validateOldPwd = (rule, value, callback) => {
      console.log(value)
      if (this.oldPassword !== value) {
        callback(new Error('原密码不正确！'))
      } else {
        callback()
      }
    }
    var validateNewPwd = (rule, value, callback) => {
      console.log(value)
      if (!reg.test(value)) {
        callback(new Error('新密码应是6-12位数字、字母或字符！'))
      } else {
        callback()
      }
    }
    var validateConfirmPwd = (rule, value, callback) => {
      console.log(value)
      if (this.form.password !== value) {
        callback(new Error('确认密码与新密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      radioShow: '2',
      oldPassword: '',
      form: {
        username: '',
        oldPassword: '',
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
      dataRules: {
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { validator: validatePhone, trigger: 'blur' }],
        oldPassword: [{ required: false, message: '请输入原密码', trigger: 'blur' }, { validator: validateOldPwd, trigger: 'blur' }],
        password: [{ required: false, message: '请输入新密码', trigger: 'blur' }, { validator: validateNewPwd, trigger: 'blur' }],
        passwordAgain: [{ required: false, message: '请输入确认密码', trigger: 'blur' }, { trigger: 'blur', validator: validateConfirmPwd }]
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
        // 记录原密码
        this.oldPassword = this.form.password
        // 清空密码
        this.form.password = ''
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

      this.$refs.form.validate(valid => {
        if (valid) {
          // 不更改密码, 需要还原旧密码, 否则密码会被清空
          if (this.radioShow === '2') {
            this.form.password = this.oldPassword
          }
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
        } else {
          console.log('error submit!!')
          return false
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
    /* background-color: #E9EEF3; */
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
