<template>
  <div class="base-header">
    <div class="base-header_prefix">
      <img class="logoImg" src="@/assets/MadPecker.png" alt="MadPecker图片">
    </div>
    <div class="base-header_container">
      <slot name="content">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">
            敏捷面板
          </el-menu-item>
          <el-menu-item index="2">
            系统设置
          </el-menu-item>
        </el-menu>
      </slot>
    </div>
    <div class="base-header_suffix">
      
    </div>
  </div>
</template>

    // <div>
    //   <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    // </div>
    // <div>
    //   <el-avatar> user </el-avatar>
    // </div>
<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
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
    justify-content: center;
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
    color: #027aff;
  }
</style>