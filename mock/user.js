
const tokens = {
  admin: {
    token: 'admin-token'
  },
  teacher: {
    token: 'teacher-token'
  },
  student: {
    token: 'student-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
    name: 'Super Admin'
  },
  'teacher-token': {
    roles: ['teacher'],
    introduction: 'I am a teacher',
    avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
    name: 'Normal Teacher'
  },
  'student-token': {
    roles: ['student'],
    introduction: 'I am a student',
    avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
    name: 'Normal Student'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // user register
  {
    url: '/vue-admin-template/user/register',
    type: 'post',
    response: config => {
      const { username, name, role } = config.body
      let token = tokens[username]

      // mock error
      if (!token) {
        // 复制一份token信息
        tokens[username] = {
          token: username
        }
        // 创建user信息
        const copy = users[role + '-token']
        users[username] = {
          roles: copy.roles,
          introduction: copy.introduction,
          avatar: copy.avatar,
          name: name
        }

        token = tokens[username]
        console.log(tokens)
        console.log(users)
        console.log(token)
      }

      return {
        code: 20000,
        data: token
      }
    }
  }
]
