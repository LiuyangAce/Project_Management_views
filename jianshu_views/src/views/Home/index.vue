<template>
  <el-container style="height: 100%">
    <base-header></base-header>
    <el-header style="background-color: #b3c0d1">Header</el-header>
    <el-container>
      <el-aside width="200px" style="background-color: #d3dce6">Aside</el-aside>
      <el-main style="background-color: #e9eef3">Main</el-main>
      <!--  -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4">
          <a href="https://www.ele.me" target="_blank">
            订单管理
          </a>
        </el-menu-item>
      </el-menu>
      <!--  -->
    </el-container>
  </el-container>
</template>

<script>
import BaseHeader from '@/components/base-header'
export default {
  components: {
    BaseHeader
  }
}
</script>

<style></style>
