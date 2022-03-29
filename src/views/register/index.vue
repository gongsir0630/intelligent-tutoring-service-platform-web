<template>
  <el-container>
    <el-header>用户注册</el-header>
    <el-main>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="8">
          <div class="grid-content bg-purple">
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
    onCancel() {
      this.$router.push(`/login`)
    },
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
