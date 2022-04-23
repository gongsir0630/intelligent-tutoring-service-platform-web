<template>
  <div class="app-container">
    <el-row class="margin-bottom">
      <el-button type="danger" round>批量删除</el-button>
    </el-row>
    <el-row>
      <el-table
        v-loading="listLoading"
        :data="list ? list.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase())) : []"
        element-loading-text="数据加载中~"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <!-- <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column> -->
        <el-table-column label="用户账号" width="200">
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column label="昵称" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="110" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.avatar"
            />
          </template>
        </el-table-column>
        <el-table-column label="手机号" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.mail }}</span>
          </template>
        </el-table-column>
        <el-table-column label="自我介绍" width="210" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.introduction }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出生年月" width="210" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.birthday }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学校" width="210" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.school }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年级" width="210" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.gradeLabel }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" fixed="right" width="300">
          <template slot="header">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
              prefix-icon="el-icon-search"
            />
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              round
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              round
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!-- 编辑时候的弹出层 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="dialogFormVisible"
      width="500px"
      top="200px"
    >
      <el-form :model="current">
        <el-form-item
          label="用户账号"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="current.username"
            auto-complete="off"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="current.name"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="current.password"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="current.phone"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item
          label="邮箱"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="current.mail"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item
          label="自我介绍"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="current.introduction"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item
          label="出生年月"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="current.birthday"
            type="date"
            placeholder="选择出生年月"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item
          label="学校"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="current.school"
            auto-complete="off"
          />
        </el-form-item>
        <el-form-item
          label="年级"
          :label-width="formLabelWidth"
        >
          <el-select v-model="current.grade" placeholder="请选择年级">
            <el-option v-for="item in studentGradeList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSet(current.username)"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      list: [],
      listLoading: true,
      search: '',
      dialogFormVisible: false, // 弹出层默认为关闭
      // 弹出层中的表单
      current: {
        username: '',
        password: '',
        name: '',
        avatar: '',
        phone: '',
        mail: '',
        introduction: '',
        birthday: '',
        school: '',
        grade: ''
      },
      formLabelWidth: '110px'
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
    ...mapActions('user', ['getUserList', 'getStudentGradeList']),
    handleEdit(index, row) {
      console.log(index, row)
      this.dialogFormVisible = true
      this.current = this.list[index]
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm(`此操作将永久删除该用户「${row.username}」, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(index, 1)
        // 后端接口删除用户
        this.$deleteUser({
          username: row.username
        })
        this.$message({
          type: 'success',
          message: `用户「${row.username}」删除成功!`
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async fetchData() {
      this.listLoading = true
      // 从后端查询数据
      await this.getUserList({})
      this.getStudentGradeList()
      this.list = this.userList?.filter(data => data.role === 'student')
      this.listLoading = false
    },
    async handleSet(userId) {
      console.log(this.current)
      console.log(userId)
      // 更新数据并刷新列表
      this.$update(this.current).then(() => {
        this.fetchData()
      })
      this.dialogFormVisible = false
    }
  }
}
</script>
