export default {
  //用户登录
  USERS_LOGIN: {
    path: '/users/login',
    method: 'post',
  },
  //用户注册
  USERS_REG: {
    path: '/users/reg',
    method: 'post'
  },
  // 获取当前用户信息
  GET_USER_INFO: {
    path: '/users/findOne',
    method: 'post',
  },
  // 修改密码
  UPDATE_PWD: {
    path: '/users/updatePwd',
    method: 'post',
  },
  // 修改个人信息
  UPDATE_PERSONAL: {
    path: '/users/update/personal',
    method: 'post'
  },
  FIND_USERS: {
    path: '/users/find',
    method: 'get'
  },
  COMPONENT_USERS: {
    path: '/users/component',
    method: 'get'
  }
  
}