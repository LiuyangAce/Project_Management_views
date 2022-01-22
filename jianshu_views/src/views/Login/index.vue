<template>
  <div class="login">
    <el-card shadow="always" class="loginCard">
      <el-form ref="form" :model="form">
        <el-form-item label="用户名:">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="form.pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="loginHandler">登录</el-button>
          <el-button>注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from '@/http/index.js';
export default {
  data() {
    return {
      form: {
        username: null,
        pwd: null
      }
    }
  },
  methods: {
    loginHandler() {
      console.log(this.form);
      let option = {
        method: 'post',
        path: 'http://localhost:3000/users/login',
        params: {
          ...this.form
        }
      }
      axios(option).then(res => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.loginCard {

}
</style>