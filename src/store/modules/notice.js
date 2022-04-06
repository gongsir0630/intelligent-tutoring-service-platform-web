const getDefaultState = () => {
  return {
    noticeList: [{ // 对象
      title: '何双宝', // 字段
      content: '上海',
      date: '2016-05-02'
    }, {
      title: '何双宝',
      content: '上海',
      date: '2016-05-02'
    }, {
      title: '何双宝',
      content: '成都',
      date: '2016-05-02'
    }, {
      title: '张三',
      content: '上海',
      date: '2016-05-02'
    }]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  }
}

const actions = {
  // 获取备注
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

