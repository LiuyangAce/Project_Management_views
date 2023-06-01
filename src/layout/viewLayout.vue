<template>
  <div class="home">
    <base-header></base-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
         default-active="/defect"
         router
        >
          <el-menu-item index="/defect">
            <template #title>
              <i class="el-icon-s-release"></i>
              <span>缺陷管理</span>
            </template>
          </el-menu-item>
         <!--  <el-submenu index="/defect">
          <template slot="title"><i class="el-icon-s-release"></i>缺陷管理</template>
          <el-menu-item index="/allDefect">所有缺陷</el-menu-item>
          <el-menu-item index="/activeDefect">活动缺陷</el-menu-item>
          <el-menu-item index="/myDefect">我创建的</el-menu-item>
          <el-menu-item index="/myAgent">我的待办</el-menu-item>
        </el-submenu> -->
          <!-- <el-menu-item index="/test">
            <template #title>
              <span>测试管理</span>
            </template>
          </el-menu-item> -->
          <el-menu-item index="/interface">
            <template #title>
              <i class="el-icon-info"></i>
              <span>接口管理</span>
            </template>
          </el-menu-item>
          <!-- <el-menu-item index="/file">
            <template #title>
              <span>文档管理</span>
            </template>
          </el-menu-item> -->
          <el-menu-item index="/panel">
            <template #title>
              <i class="el-icon-s-marketing"></i>
              <span>敏捷面板</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 内容 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import BaseHeader from '@/components/base-header'
export default {
  components: {
    BaseHeader,
  },
}
</script>

<style>
.home {
  height: 100%;
}
.el-aside {
}
.el-main {
}
.el-container {
  height: calc(100% - 64px);
}
/* .el-menu-item:focus,
.el-menu-item:hover {
  color: #27b766;
  background-color: #e9f7ec;
  backdrop-filter: blur(10px);
}
.el-menu-item.is-active {
    color: #27b766;
} */
</style>
