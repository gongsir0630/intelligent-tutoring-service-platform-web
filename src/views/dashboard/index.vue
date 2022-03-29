<template>
  <div>
    <el-row type="flex" justify="space-around" style="margin-top: 20px;background-color: #EBEEF5;">
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
    </el-row>

    <el-row type="flex" justify="space-around" style="margin-top: 20px;">
      <el-col :span="5" style="text-align:left">
        <div class="my-border" style="border:1px solid #000">
          <h2 class="span-class">学校数据</h2>
          <hr>
          <span class="span-class">学生总数</span><el-progress :text-inside="true" :percentage="80" :format="format" color="#f56c6c" :stroke-width="strokeWidth" />
          <span class="span-class">老师总数</span><el-progress :text-inside="true" :percentage="5" :format="format" color="#e6a23c" :stroke-width="strokeWidth" />
          <span class="span-class">教务总数</span><el-progress :text-inside="true" :percentage="12" :format="format" :stroke-width="strokeWidth" />
          <span class="span-class">兼职总数</span><el-progress :text-inside="true" :percentage="3" :format="format" color="#6f7ad3" :stroke-width="strokeWidth" />
        </div>
      </el-col>
      <el-col :span="5" style="text-align:center">
        <div class="my-border" style="border:1px solid #000">
          <p />
          <span class="span-class">学生总数</span><el-progress :text-inside="true" :percentage="80" :format="format" color="#f56c6c" :stroke-width="strokeWidth" />
          <span class="span-class">老师总数</span><el-progress :text-inside="true" :percentage="5" :format="format" color="#e6a23c" :stroke-width="strokeWidth" />
          <span class="span-class">教务总数</span><el-progress :text-inside="true" :percentage="12" :format="format" :stroke-width="strokeWidth" />
          <span class="span-class">兼职总数</span><el-progress :text-inside="true" :percentage="3" :format="format" color="#6f7ad3" :stroke-width="strokeWidth" />
        </div>
      </el-col>
      <el-col :span="5" style="text-align:center">
        <div class="my-border" style="border:1px solid #000">
          <p />
          <span class="span-class">学生总数</span><el-progress :text-inside="true" :percentage="80" :format="format" color="#f56c6c" :stroke-width="strokeWidth" />
          <span class="span-class">老师总数</span><el-progress :text-inside="true" :percentage="5" :format="format" color="#e6a23c" :stroke-width="strokeWidth" />
          <span class="span-class">教务总数</span><el-progress :text-inside="true" :percentage="12" :format="format" :stroke-width="strokeWidth" />
          <span class="span-class">兼职总数</span><el-progress :text-inside="true" :percentage="3" :format="format" color="#6f7ad3" :stroke-width="strokeWidth" />
        </div>
      </el-col>
      <el-col :span="5" style="text-align:center">
        <div class="my-border" style="border:1px solid #000">
          <p />
          <span class="span-class">学生总数</span><el-progress :text-inside="true" :percentage="80" :format="format" color="#f56c6c" :stroke-width="strokeWidth" />
          <span class="span-class">老师总数</span><el-progress :text-inside="true" :percentage="5" :format="format" color="#e6a23c" :stroke-width="strokeWidth" />
          <span class="span-class">教务总数</span><el-progress :text-inside="true" :percentage="12" :format="format" :stroke-width="strokeWidth" />
          <span class="span-class">兼职总数</span><el-progress :text-inside="true" :percentage="3" :format="format" color="#6f7ad3" :stroke-width="strokeWidth" />
        </div>
      </el-col>
    </el-row>
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
      strokeWidth: 20
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'avatar'
    ])
  },
  methods: {
    format(percentage) {
      return `${percentage * 5}人`
    }
  }
}
</script>

<style>
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
</style>
