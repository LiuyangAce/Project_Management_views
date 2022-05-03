<template>
  <el-drawer
    title="详细信息"
    :before-close="handleClose"
    :visible.sync="dialog"
    direction="rtl"
    custom-class="demo-drawer"
  >
    <div class="demo-drawer__content">
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
          <el-tooltip
            :content="
              !stateAbled ? '只有执行人和创建人才能修改状态' : form.state
            "
            placement="top"
          >
            <el-switch
              v-model="form.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="active"
              inactive-value="finish"
              :disabled="!stateAbled"
            >
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="缺陷类型:">
          <el-tooltip
            :content="
              !typeAbled ? '只有创建人才能修改缺陷等级' : form.defectType
            "
            placement="top"
          >
            <el-select
              v-model="form.defectType"
              placeholder="请选择缺陷类型"
              :disabled="!typeAbled"
            >
              <el-option label="low" value="low"></el-option>
              <el-option label="mid" value="min"></el-option>
              <el-option label="high" value="hign"></el-option>
            </el-select>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </div>
    <div class="demo-drawer__footer">
      <el-button class="" @click="dialog = false">取 消</el-button>
      <el-button type="primary" @click="updateDefectHandle" :loading="loading">
        确定
      </el-button>
    </div>
  </el-drawer>
</template>
<script>
import api from '@/api'
export default {
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      ownerList: [],
      loading: false,
      dialog: false,
    }
  },
  created() {},
  computed: {
    // 执行人和创建人才能修改状态
    stateAbled: function () {
      return (
        this.form.owner ===
          JSON.parse(window.localStorage.getItem('userInfo')).userInfo
            .username ||
        this.form.creator ===
          JSON.parse(window.localStorage.getItem('userInfo')).userInfo.username
      )
    },
    typeAbled: function () {
      return (
        this.form.creator ===
        JSON.parse(window.localStorage.getItem('userInfo')).userInfo.username
      )
    },
  },
  methods: {
    // 关闭drawer时调用的函数
    handleClose() {
      Object.keys(this.form).forEach((element) => {
        this.form[element] = ''
      })
      this.dialog = false
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
    // 更新缺陷
    updateDefectHandle() {
      this.loading = true
      const option = {
        ...api.UPDATE_DEFECT,
        params: {
          ...this.form,
        },
      }
      console.log('option:', option)
      this.$http(option)
        .then((res) => {
          console.log('请求成功', res)
          this.loading = false
          this.$parent.getAllDefect()
          this.dialog = false
        })
        .catch((err) => {
          console.error('请求失败', err)
          this.loading = false
          this.$parent.getAllDefect()
          this.dialog = false
        })
    },
  },
}
</script>
<style scoped>
/deep/ .el-drawer__body {
  padding: 20px;
}

.demo-drawer__footer {
  display: flex;
  justify-content: flex-end;
}
</style>
