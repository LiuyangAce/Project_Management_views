<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="headerCard" style="color: #27b766">
            <span style="">个人资料</span>
            <span class="loginOutButton" @click="loginOutHandler"
              >退出登录</span
            >
          </div>
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @row-dblclick="showDialogForm"
          >
            <el-table-column prop="username" label="姓名"> </el-table-column>
            <el-table-column prop="sex" label="性别"> </el-table-column>
            <el-table-column prop="phone" label="电话"> </el-table-column>
            <el-table-column prop="email" label="邮箱"> </el-table-column>
            <el-table-column prop="type" label="角色"> </el-table-column>
          </el-table>
          <el-dialog
            title="修改个人信息"
            :visible.sync="dialogFormVisible"
            width="500px"
            :append-to-body="true"
            @close="dialogFormHandler((type = 'init'))"
          >
            <el-form :model="form">
              <el-form-item label="用户名">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-input v-model="form.sex" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.email" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="upUserInfo()">确 定</el-button>
            </div>
          </el-dialog>
          <el-divider></el-divider>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-card
                style="
                  width: 80%;
                  position: relative;
                  left: 50%;
                  transform: translateX(-50%);
                "
              >
                <div slot="header" class="clearfix" style="text-align: center">
                  <span>修改头像</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card
                style="
                  width: 80%;
                  position: relative;
                  left: 50%;
                  transform: translateX(-50%);
                "
              >
                <div slot="header" class="clearfix" style="text-align: center">
                  <span>修改密码</span>
                </div>
                <div style="text-align: center">
                  <form>
                    <el-input
                      prefix-icon="el-icon-lock"
                      placeholder="请输入新密码"
                      v-model="new_pwd1"
                      show-password
                      style="margin-top: 10px"
                    ></el-input>
                    <el-input
                      prefix-icon="el-icon-lock"
                      placeholder="请再输入密码"
                      v-model="new_pwd2"
                      show-password
                      style="margin-top: 10px"
                    ></el-input>
                  </form>
                  <el-button
                    type="primary"
                    style="margin-top: 10px"
                    @click="upPwd"
                    >提交修改</el-button
                  >
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/api'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      new_pwd1: '',
      new_pwd2: '',
      tableData: [],
      dialogFormVisible: false,
      form: {
        username: '',
        sex: '',
        phone: '',
        email: '',
      },
    }
  },
  created() {
    this.getTableData()
  },
  mounted() {},
  methods: {
    //退出登录
    loginOutHandler() {
      Cookies.remove('madpecker')
      window.localStorage.removeItem('userInfo')
      this.$router.push({ name: 'Login' })
    },
    getTableData() {
      this.$store.dispatch('getUserInfo').finally(() => {
        this.tableData = []
        this.tableData.push(this.$store.state.userInfo)
      })
    },
    upPwd() {
      if (this.new_pwd1 === this.new_pwd2) {
        let username = this.$store.state.userInfo.username
        const option = {
          ...api.UPDATE_PWD,
          params: {
            username,
            pwd: this.new_pwd1,
          },
        }
        this.$http(option)
          .then((res) => {
            console.log('请求成功', res)
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 500,
            })
          })
          .catch((err) => {
            console.error('请求失败', err)
          })
      } else {
        this.$message.error({
          message: '两次输入密码不一致',
          duration: 500,
        })
      }
    },
    showDialogForm(row) {
      this.form = this.$lodash.cloneDeep(row)
      this.dialogFormVisible = true
    },
    // 初始化'修改个人信息'弹出框form表单内容
    dialogFormHandler() {
      Object.keys(this.form).forEach((element) => {
        this.form[element] = ''
      })
    },
    // 修改个人信息
    upUserInfo() {
      const option = {
        ...api.UPDATE_PERSONAL,
        params: {
          ...this.form,
        },
      }
      console.log(option)
      this.$http(option)
        .then((res) => {
          console.log('修改个人信息成功', res)
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 500,
          })
        })
        .catch((err) => {
          console.error('修改个人信息失败', err)
        })
      this.getTableData()
      this.dialogFormVisible = false
    },
  },
}
</script>

<style scoped>
.loginOutButton {
  margin-left: 30px;
}
.loginOutButton:hover {
  cursor: pointer;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: auto;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.el-button--primary {
  background-color: #e9f7ec;
  border-color: #27b766;
  color: #27b766;
}
.el-button--primary:focus,
.el-button--primary:hover {
  background-color: #e9f7ec;
  border-color: #27b766;
  color: #27b766;
}
</style>

<!-- <div v-if="tableData[0].avatar">
                  <img :src="imgSrc" alt="" style="width: 80px; height: 80px" />
                </div>
                <div v-else>
                  <img :src="imgSrc" alt="" style="width: 80px; height: 80px" />
                  <el-upload
                    :action="action"
                    :headers="headers"
                    :file-list="fileList"
                    name="myfile"
                    :on-success="successHandler"
                    :show-file-list="false"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div> -->
