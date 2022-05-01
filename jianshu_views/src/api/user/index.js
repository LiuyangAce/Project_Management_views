export default {
  //用户登录
  USERS_LOGIN: {
    path: 'http://localhost:3000/users/login',
    method: 'post',
  },
  //用户注册
  USERS_REG: {
    path: 'http://localhost:3000/users/reg',
    method: 'post'
  },
  // 获取当前用户信息
  GET_USER_INFO: {
    path: 'http://localhost:3000/users/findOne',
    method: 'post',
  },
  // 修改密码
  UPDATE_PWD: {
    path: 'http://localhost:3000/users/updatePwd',
    method: 'post',
  },
  // 修改个人信息
  UPDATE_PERSONAL: {
    path: 'http://localhost:3000/users/update/personal',
    method: 'post'
  }
}