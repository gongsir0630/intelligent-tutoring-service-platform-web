<template>
  <div class="register-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户角色">
        <el-select v-model="form.role" placeholder="请选择角色">
          <el-option label="学生" value="student" />
          <el-option label="老师" value="teacher" />
        </el-select>
      </el-form-item>

      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="重复密码">
        <el-input v-model="form.passwordAgain" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即注册</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        passwordAgain: '',
        name: '',
        phone: '',
        role: 'student'
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)

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
  }
}
</script>

<style lang="scss" scoped>
// $bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.register-container {
  min-height: 100%;
  width: 50%;
  // background-color: $bg;
  overflow: hidden;
  align-content: center;
  margin-top: 50px;
  margin-left: 30%;
}
</style>
