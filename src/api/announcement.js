import request from '@/utils/request'

export function getAnnouncementList(params) {
  return request({
    url: '/intelligent-tutoring-service-platform/announcement/list',
    method: 'get',
    params
  })
}

export function saveAnnouncement(data) {
  return request({
    url: '/intelligent-tutoring-service-platform/announcement/save',
    method: 'post',
    data
  })
}

export function deleteAnnouncement(data) {
  return request({
    url: '/intelligent-tutoring-service-platform/announcement/delete',
    method: 'post',
    data
  })
}
