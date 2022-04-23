import { login, logout, getInfo, register, getUserList, getStudentGradeList } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    userList: [],
    phone: '',
    school: '',
    studentGradeList: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_SCHOOL: (state, school) => {
    state.school = school
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER_LIST: (state, userList) => {
    state.userList = userList
  },
  SET_GRADE_LIST: (state, studentGradeList) => {
    state.studentGradeList = studentGradeList
  }
}

const actions = {
  // query studentGradeList
  getStudentGradeList({ commit }, queryParam) {
    return new Promise((resolve, reject) => {
      getStudentGradeList(queryParam).then(response => {
        const { data } = response
        console.log(data)
        commit('SET_GRADE_LIST', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // query userList
  getUserList({ commit }, queryParam) {
    return new Promise((resolve, reject) => {
      getUserList(queryParam).then(response => {
        const { data } = response
        console.log(data)
        commit('SET_USER_LIST', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user register
  register({ commit }, userInfo) {
    const { username, role, name, password, introduction, phone, mail, school, grade, campus, subject } = userInfo
    console.log(userInfo)
    return new Promise((resolve, reject) => {
      register({
        username: username.trim(),
        name: name,
        role: role,
        password,
        introduction,
        phone,
        mail,
        avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
        school,
        grade,
        campus,
        subject
      }).then(response => {
        const { data } = response
        console.log(data)
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, phone, school } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_SCHOOL', school)
        commit('SET_PHONE', phone)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

