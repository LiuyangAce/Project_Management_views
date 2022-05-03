<template>
  <!--  -->
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
</template>
