<template>
  <div class="base-header">
    <div class="base-header_prefix">
      <img class="logoImg" src="@/assets/MadPecker.png" alt="MadPecker图片" />
    </div>
    <div class="base-header_container">
      <slot name="content">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          router
        >
          <el-menu-item index="/user"> 个人资料 </el-menu-item>
          <el-menu-item index="/defect"> 系统设置 </el-menu-item>
        </el-menu>
      </slot>
    </div>
    <div class="base-header_suffix"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: this.$route.path,
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
    },
  },
}
</script>
<style scoped>
.base-header {
  height: 64px;
  display: flex;
  box-shadow: 0 2px 8px 0 #dcdfe6;
}
.base-header_prefix {
  width: 20%;
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
  align-items: center;
}
.base-header_container {
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.base-header_suffix {
  width: 20%;
}
.logoImg {
  width: 140px;
  height: 36px;
}
.el-menu-item {
  font-weight: 700;
}
.el-menu--horizontal>.el-menu-item.is-active {
  color: #27b766;
  border-bottom: 2px solid #27b766;
}
</style>
