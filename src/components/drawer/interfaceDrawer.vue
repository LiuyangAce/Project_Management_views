<template>
  <el-drawer
    :before-close="handleClose"
    :visible.sync="dialog"
    direction="rtl"
    custom-class="interface-drawer"
    size="90%"
    :with-header="false"
  >
    <div class="interface-drawer__content">
      <el-descriptions
        class="margin-top"
        :title="form.interfaceName"
        :column="4"
        border
      >
      {{isBackendDev}}
        <template slot="extra">
          <el-button
            :disabled="!isBackendDev"
            v-if="!isEdit"
            type="primary"
            size="small"
            @click="isEdit = true"
            >编辑</el-button
          >
          <el-button
            v-if="isEdit"
            type="primary"
            size="small"
            @click="isEdit = false"
            >取消</el-button
          >
          <el-button
            v-if="isEdit"
            type="primary"
            size="small"
            @click="updateInterfaceHandle"
            >保存</el-button
          >
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            接口名称
          </template>
          <span v-if="!isEdit">{{ form.interfaceName }}</span>
          <el-input v-else v-model="form.interfaceName"></el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            请求类型
          </template>
          <span
            v-if="!isEdit"
            :class="{
              post: form.requestMethod === 'POST',
              get: form.requestMethod === 'GET',
            }"
            >{{ form.requestMethod }}</span
          >
          <el-input v-else v-model="form.requestMethod"></el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            接口路径
          </template>
          <span v-if="!isEdit">{{ form.interfacePath }}</span>
          <el-input v-else v-model="form.interfacePath"></el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            接口分类
          </template>
          <span v-if="!isEdit">{{ form.interfaceType }}</span>
          <el-input v-else v-model="form.interfaceType"></el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            状态
          </template>
          <span
            v-if="!isEdit"
            :class="{
              done: form.interfaceState === '已完成',
              todo: form.interfaceState === '未完成',
            }"
            >{{ form.interfaceState }}</span
          >
          <el-input v-else v-model="form.interfaceState"></el-input>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            创建人
          </template>
          <span>{{ form.creator }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            创建时间
          </template>
          <span>{{ form.createTime }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            完成时间
          </template>
          <span>{{ form.endTime }}</span>
        </el-descriptions-item>
      </el-descriptions>
      <br />
      <br />
      <div class="postRequestParams" v-if="form.requestMethod === 'POST'">
        <i class="el-icon-office-building"></i>
        POST请求参数示例
        <el-input
          v-model.trim="form.postRequestParams"
          type="textarea"
          autosize
          :disabled="!isEdit"
        >
        </el-input>
      </div>
      <div class="getRequestParams" v-if="form.requestMethod === 'GET'">
        <i class="el-icon-office-building"></i>
        GET请求参数示例
        <el-input
          v-model.trim="form.getRequestParams"
          type="textarea"
          autosize
          :disabled="!isEdit"
        >
        </el-input>
      </div>
      <br />
      <br />
      <div class="ResponseParams"></div>
      <i class="el-icon-office-building"></i>
      响应参数示例
      <el-input
        v-model.trim="form.ResponseParams"
        type="textarea"
        autosize
        :disabled="!isEdit"
      >
      </el-input>
    </div>
    <div class="interface-drawer__footer"></div>
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
    isBackendDev: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      isEdit: false,
    }
  },
  created() {},
  computed: {
  },
  methods: {
    // 关闭drawer时调用的函数
    handleClose() {
      Object.keys(this.form).forEach((element) => {
        this.form[element] = ''
      })
      this.dialog = false
    },
    // 更新缺陷
    updateInterfaceHandle() {
      this.loading = true
      const option = {
        ...api.INTERFACE_UPDATE,
        params: {
          ...this.form,
        },
      }
      console.log('option:', option)
      this.$http(option)
        .then((res) => {
          console.log('请求成功', res)
          this.$parent.getAllInterface()
          this.isEdit = false
        })
        .catch((err) => {
          console.error('请求失败', err)
          this.$parent.getAllInterface()
          this.isEdit = false
        })
    },
    extraHandle() {
      this.isEdit = true
    },
  },
}
</script>
<style scoped>
/deep/ .el-drawer__body {
  padding: 20px;
}

.interface-drawer__footer {
  display: flex;
  justify-content: flex-end;
}
.done {
  background: #7ed321;
}
.todo {
  background: #f56c6c;
}
.post {
  background: lightblue;
}
.get {
  background: lightpink;
}
.el-drawer__body .el-textarea.is-disabled .el-textarea__inne {
  color: #606266;
  background-color: #fff;
}
</style>
