<template>
  <div class="defectView" v-title data-title="缺陷管理">
    <!-- button -->
    <el-button
      class="addDefectButton"
      @click="visibleHandle"
      :disabled="!addButtonAbled"
    >
      添加缺陷
    </el-button>
    <!-- dialog -->
    <el-dialog
      title="添加缺陷"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      width="500px"
      @close="dialogFormHandler()"
    >
      <el-form :model="form" label-position="left" label-width="80px">
        <el-form-item label="缺陷名称:">
          <el-input v-model="form.defectName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建人:">
          <el-input
            v-model="form.creator"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="执行人:">
          <el-select
            v-model="form.owner"
            placeholder="请选择缺陷类型"
            @click.native="getOwnerList()"
          >
            <el-option
              v-for="item in ownerList"
              :label="item.username"
              :value="item.username"
              :key="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:">
          <el-input v-model="form.state" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="缺陷描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="缺陷类型:">
          <el-select v-model="form.defectType" placeholder="请选择缺陷类型">
            <el-option label="low" value="low"></el-option>
            <el-option label="mid" value="mid"></el-option>
            <el-option label="high" value="high"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDefectHandle()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- tabs -->
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane ref="firstPane" label="所有缺陷" name="first">
        <all-defect ref="firstPane1" v-if="activeName === 'first'"></all-defect>
      </el-tab-pane>
      <el-tab-pane ref="secondPane" label="活动缺陷" name="second">
        <active-defect ref="secondPane1" v-if="activeName === 'second'"></active-defect>
      </el-tab-pane>
      <el-tab-pane ref="thirdPane" label="我创建的" name="third">
        <my-defect ref="thirdPane1" v-if="activeName === 'third'"></my-defect>
      </el-tab-pane>
      <el-tab-pane ref="fourthPane" label="我的代办" name="fourth">
        <my-agent ref="fourthPane1" v-if="activeName === 'fourth'"></my-agent>
      </el-tab-pane>
      <!-- <el-tab-pane label="缺陷" name="fifth">缺陷</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import api from '@/api'
import AllDefect from './allDefect.vue'
import ActiveDefect from './activeDefect.vue'
import MyDefect from './myDefect.vue'
import MyAgent from './myAgent.vue'

export default {
  components: {
    AllDefect,
    ActiveDefect,
    MyDefect,
    MyAgent,
  },
  data() {
    return {
      activeName: 'first',
      form: {
        defectName: '',
        creator: '',
        owner: '',
        state: '',
        defectType: '',
        desc: '',
      },
      ownerList: [],
      dialogFormVisible: false,
    }
  },
  computed: {
    addButtonAbled: function () {
      return (
        JSON.parse(window.localStorage.getItem('userInfo')).userInfo.type ===
        '测试人员'
      )
    },
  },
  created() {
    var date = new Date()
    console.log('当前时间:',this.$globalUtils.formateDate(date));
  },
  methods: {
    // 按钮 打开dialog
    visibleHandle() {
      this.form.creator = JSON.parse(
        window.localStorage.getItem('userInfo')
      ).userInfo.username
      this.form.state = 'active'
      this.dialogFormVisible = true
    },
    // 关闭dialog以后 清空form表单内容
    dialogFormHandler() {
      Object.keys(this.form).forEach((element) => {
        this.form[element] = ''
      })
    },
    // 添加缺陷
    addDefectHandle() {
      const option = {
        ...api.ADD_DEFECT,
        params: {
          ...this.form,
        },
      }
      console.log(option)
      this.$http(option)
        .then((res) => {
          console.log('添加个人信息成功', res)
          this.$message({
            message: '添加成功',
            type: 'success',
            duration: 500,
          })
        })
        .catch((err) => {
          console.error('修改个人信息失败', err)
        })
      this.dialogFormVisible = false

      console.log(this.$refs[this.activeName + 'Pane1']);
      this.$refs[this.activeName + 'Pane1'].getAllDefect()
    },
    // 获取owner列表
    getOwnerList() {
      const option = {
        ...api.FIND_USERS,
      }
      console.log(option)
      this.$http(option)
        .then((res) => {
          console.log('查询成功', res)
          this.ownerList = res.data
        })
        .catch((err) => {
          console.error('查询失败', err)
        })
    },
  },
}
</script>

<style scoped>
/deep/.el-tabs__item.is-active {
  color: #27b766;
}
/deep/.el-tabs__item:hover {
  color: #27b766;
  cursor: pointer;
}
.defectView {
  position: relative;
}
.addDefectButton {
  display: inline;
  position: absolute;
  right: 50px;
  z-index: 99;
  color: #27b766;
}
</style>

// 修改全局
<style>
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #27b766;
  color: #fff;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #27b766;
}
</style>
