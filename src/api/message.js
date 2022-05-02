import request from '@/utils/request'

export function getMessageList(data) {
  return request({
    url: '/intelligent-tutoring-service-platform/message/list',
    method: 'get',
    data
  })
}

export function markRead(data) {
  data = {
    id: data
  }
  return request({
    url: '/intelligent-tutoring-service-platform/message/read',
    method: 'post',
    data
  })
}

export function replayMessage(data) {
  return request({
    url: '/intelligent-tutoring-service-platform/message/replay',
    method: 'post',
    data
  })
}
