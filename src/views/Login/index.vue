<template>
  <div class="loginBg" v-title data-title="用户登录">
    <!-- <input id="fileInput" type="file" @click="handleCompress" />
    <img id="img" src="" alt="" width="100" height="100"> -->
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <span class="defaultLoginInfor" @click="openLoginInfoNotify">默认登录信息</span>
      <!-- src="https://www.madpecker.com/system/static/main/logo.png" -->
      <img src="@/assets/MadPecker.png" alt="" width="200px" height="50px" />
      <el-tab-pane label="登录" name="login" class="login">
        <el-card class="loginCard">
          <el-form ref="formLogin" :model="formLogin">
            <el-form-item label="用户名:">
              <el-input v-model="formLogin.username"></el-input>
            </el-form-item>
            <el-form-item label="密码:">
              <el-input show-password v-model="formLogin.pwd"></el-input>
            </el-form-item>
            <el-button @click="loginHandler">登录</el-button>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="注册" name="reg">
        <el-card class="regCard">
          <el-form ref="formReg" label-position="top" :model="formReg" :rules="rules">
            <el-form-item label="用户名:" prop="username">
              <el-input v-model="formReg.username"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="pwd">
              <el-input show-password v-model="formReg.pwd"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="checkPwd">
              <el-input show-password v-model="formReg.checkPwd"></el-input>
            </el-form-item>
            <el-form-item label="角色:" prop="type">
              <el-select v-model="formReg.type" placeholder="请选择">
                <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
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
        type: '前端开发人员'
      },
      roleOptions: [
        {
          label: '前端开发人员',
          value: '前端开发人员'
        },
        {
          label: '后端开发人员',
          value: '后端开发人员'
        },
        {
          label: '测试人员',
          value: '测试人员'
        },
      ],
      activeName: 'login',
      rules: {
        pwd: [{ validator: validatePass, trigger: 'blur' }],
        checkPwd: [{ validator: validatePass2, trigger: 'blur' }],
      },
    }
  },
  created() {
    console.log('axios baseURL：', process.env.VUE_APP_SERVER_URL);
  },
  methods: {
    handleCompress() {
      let fileId = document.getElementById('fileInput')
      let img = document.getElementById('img')
      fileId.onchange = (e) => {
        let file = e.target.files[0]
        this.compressImg(file, 0.2).then(res => {
          console.log(res)
          img.src = window.URL.createObjectURL(res.file);
        })
      }
    },
    /**
     * 压缩方法 
     * @param {string} file 文件
     * @param {Number} quality  0~1之间
    */
    compressImg(file, quality) {
      if (file[0]) {
        return Promise.all(Array.from(file).map(e => compressImg(e,
          quality))) // 如果是 file 数组返回 Promise 数组
      } else {
        return new Promise((resolve) => {
          const reader = new FileReader() // 创建 FileReader
          reader.onload = ({
            target: {
              result: src
            }
          }) => {
            const image = new Image() // 创建 img 元素
            console.log('img:',image);
            image.onload = async () => {
              const canvas = document.createElement('canvas') // 创建 canvas 元素
              canvas.width = image.width
              canvas.height = image.height
              // canvas.width = 100
              // canvas.height = 100
              console.log(image.width,image.height);
              canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height) // 绘制 canvas
              // HTMLCanvasElement.toDataURL() 方法返回一个包含图片展示的 data URI 。
              // 可以使用 type 参数其类型，默认为 PNG 格式。图片的分辨率为96dpi。
              const canvasURL = canvas.toDataURL('image/jpeg', quality)
              const buffer = atob(canvasURL.split(',')[1])
              let length = buffer.length
              const bufferArray = new Uint8Array(new ArrayBuffer(length))
              while (length--) {
                bufferArray[length] = buffer.charCodeAt(length)
              }
              const miniFile = new File([bufferArray], file.name, {
                type: 'image/jpeg'
              })
              resolve({
                file: miniFile,
                origin: file,
                beforeSrc: src,
                afterSrc: canvasURL,
                beforeKB: Number((file.size / 1024).toFixed(2)),
                afterKB: Number((miniFile.size / 1024).toFixed(2))
              })
            }
            image.src = src
          }
          reader.readAsDataURL(file)
        })
      }
    },
    openLoginInfoNotify() {
      this.$notify({
        title: 'Login',
        dangerouslyUseHTMLString: true,
        message: (
          <div>
            <strong>用户名：</strong>
            <div>测试人员 前端开发人员 后端开发人员</div>
            <strong>密码：</strong>
            <div>123456</div>
          </div>
        ),
        type: 'success',
        showClose: true,
        offset: 50,
      })
    },
    handleClick(tab, event) { },
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
            duration: 500,
          })
          this.formLogin = {}
          Cookies.set('madpecker', res.token, { expires: 3 })
          this.$store.commit('SET_USER_INFO', { ...res.result })
          this.$router.push({ name: 'User' })
        })
        .catch((err) => {
          console.error('请求失败', err)
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
            duration: 500,
          })
          this.activeName = 'login'
          this.formReg = {}
        })
        .catch((err) => {
          console.error('请求失败', err)
        })
    },
  },
}
</script>

<style scoped>
.defaultLoginInfor {
  color: var(--color);
  position: absolute;
  right: 40px;
  top: 30px;
  cursor: pointer;
}

.loginBg {
  background-image: url('../../assets/loginBg.png');
  /* background-image: url('https://www.madpecker.com/system/static/main/loginBg.png'); */
  /* background-repeat: no-repeat; */
  background-size: cover;
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
  /* width: 420px; */
  width: 100%;
  /* height: 100%; */
  height: 300px;
  overflow-y: auto;
}

/deep/ .el-tabs--border-card {
  width: 25%;
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translate(10%, -50%);
}

/deep/ #tab-login {
  font-size: 18px;
  color: var(--color);
}

/deep/ #tab-reg {
  font-size: 18px;
  color: var(--color);
}
</style>
