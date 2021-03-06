const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  phone: state => state.user.phone,
  school: state => state.user.school,
  roles: state => state.user.roles,
  userList: state => state.user.userList,
  studentGradeList: state => state.user.studentGradeList,
  permission_routes: state => state.permission.routes
}
export default getters
