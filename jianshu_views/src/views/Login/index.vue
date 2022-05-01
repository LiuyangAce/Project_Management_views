<template>
  <div class="loginBg">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <img
        src="https://www.madpecker.com/system/static/main/logo.png"
        alt=""
        width="200px"
        height="50px"
      />
      <el-tab-pane label="登录" name="login" class="login">
        <el-card class="loginCard">
          <el-form ref="formLogin" :model="formLogin">
            <el-form-item label="用户名:">
              <el-input v-model="formLogin.username"></el-input>
            </el-form-item>
            <el-form-item label="密码:">
              <el-input v-model="formLogin.pwd"></el-input>
            </el-form-item>
            <el-button @click="loginHandler">登录</el-button>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="注册" name="reg">
        <el-card class="regCard">
          <el-form ref="formReg" :model="formReg" :rules="rules">
            <el-form-item label="用户名:" prop="username">
              <el-input v-model="formReg.username"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="pwd">
              <el-input v-model="formReg.pwd"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="checkPwd">
              <el-input v-model="formReg.checkPwd"></el-input>
            </el-form-item>
            <el-button @click="regHandler">注册</el-button>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import api from '@/api/index.js'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formReg.checkPwd !== '') {
          this.$refs.formReg.validateField('checkPwd')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formReg.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      formLogin: {
        username: null,
        pwd: null,
      },
      formReg: {
        username: null,
        pwd: null,
        checkPwd: null,
      },
      activeName: 'login',
      rules: {
        pwd: [{ validator: validatePass, trigger: 'blur' }],
        checkPwd: [{ validator: validatePass2, trigger: 'blur' }],
      },
    }
  },
  created() {},
  methods: {
    handleClick(tab, event) {},
    loginHandler() {
      const option = {
        ...api.USERS_LOGIN,
        params: {
          ...this.formLogin,
        },
      }
      this.$http(option)
        .then((res) => {
          console.log('请求成功', res)
          this.$message({
            message: '登陆成功',
            type: 'success',
          })
          this.formLogin = {}
          Cookies.set('madpecker', res.token, { expires: 3 })
          this.$store.commit('SET_USER_INFO', { ...res.result })
          this.$router.push({ name: 'User' })
        })
        .catch((err) => {
          console.error('请求失败',err)
        })
    },
    regHandler() {
      const option = {
        ...api.USERS_REG,
        params: {
          ...this.formReg,
        },
      }
      this.$http(option)
        .then((res) => {
          console.log('请求成功', res)
          this.$message({
            message: '注册成功',
            type: 'success',
          })
          this.activeName = 'login'
          this.formReg = {}
        })
        .catch((err) => {
          console.error('请求失败',err)
        })
    },
  },
}
</script>

<style scoped>
.loginBg {
  background-image: url('https://www.madpecker.com/system/static/main/loginBg.png');
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.loginCard,
.regCard {
  width: 420px;
  height: 100%;
}
/deep/ .el-tabs--border-card {
  width: 25%;
  position: absolute;
  top: 50%;
  margin-top: -250px;
  right: 300px;
}
/deep/ #tab-login {
  font-size: 18px;
  color: green;
}
/deep/ #tab-reg {
  font-size: 18px;
  color: green;
}
</style>
