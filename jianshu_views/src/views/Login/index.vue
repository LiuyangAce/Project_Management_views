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
          <el-form ref="form123" :model="form">
            <el-form-item label="用户名:">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码:">
              <el-input v-model="form.pwd"></el-input>
            </el-form-item>
            <el-button @click="loginHandler">登录</el-button>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="注册" name="reg">
        <el-card class="regCard">
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item label="用户名:" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="pwd">
              <el-input v-model="form.pwd"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="checkPwd">
              <el-input v-model="form.checkPwd"></el-input>
            </el-form-item>
            <el-button @click="regHandler">注册</el-button>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from '@/http/index.js'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPwd !== '') {
          this.$refs.form.validateField('checkPwd')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: null,
        pwd: null,
        checkPwd: null
      },
      activeName: 'login',
      rules: {
        pwd: [{ validator: validatePass, trigger: 'blur' }],
        checkPwd: [{ validator: validatePass2, trigger: 'blur' }],
      },
    }
  },
  created() {
    // console.log(this.$route)
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    loginHandler() {
      console.log(this.form)
      let option = {
        method: 'post',
        path: 'http://localhost:3000/users/login',
        params: {
          ...this.form,
        },
      }
      this.$http(option)
        .then((res) => {
          console.log('请求成功',res);
          this.$router.push({ name: 'Home' })
        })
        .catch((err) => {
          console.log('请求失败');
          console.log(err)
        })
    },
    regHandler() {
      console.log('regHandler....')
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
.loginCard ,.regCard {
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
