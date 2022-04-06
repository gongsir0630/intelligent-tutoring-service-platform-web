import request from '@/utils/request'

export function deleteUser(data) {
  return request({
    url: '/vue-admin-template/user/delete',
    method: 'post',
    data
  })
}

export function getSubjectList(data) {
  return request({
    url: '/vue-admin-template/user/subject',
    method: 'get',
    data
  })
}

export function update(data) {
  return request({
    url: '/vue-admin-template/user/update',
    method: 'post',
    data
  })
}

export function getStudentGradeList(data) {
  return request({
    url: '/vue-admin-template/user/grade',
    method: 'get',
    data
  })
}

export function getUserList(data) {
  return request({
    url: '/vue-admin-template/user/list',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/vue-admin-template/user/register',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
