import request from '@/utils/request'

export function bookCourse(data) {
  return request({
    url: '/intelligent-tutoring-service-platform/course/book',
    method: 'post',
    data
  })
}

export function getCourseList(data) {
  return request({
    url: '/intelligent-tutoring-service-platform/course/list',
    method: 'get',
    data
  })
}

export function updateCourse(data) {
  return request({
    url: '/intelligent-tutoring-service-platform/course/update',
    method: 'post',
    data
  })
}

export function deleteCourse(data) {
  return request({
    url: '/intelligent-tutoring-service-platform/course/delete',
    method: 'post',
    data
  })
}
