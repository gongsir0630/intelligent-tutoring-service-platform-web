import request from '@/utils/request'

export function getAchievementList(params) {
  return request({
    url: '/intelligent-tutoring-service-platform/achievement/list',
    method: 'get',
    params
  })
}

export function saveAchievement(data) {
  return request({
    url: '/intelligent-tutoring-service-platform/achievement/save',
    method: 'post',
    data
  })
}

export function deleteAchievement(data) {
  return request({
    url: '/intelligent-tutoring-service-platform/achievement/delete',
    method: 'post',
    data
  })
}
