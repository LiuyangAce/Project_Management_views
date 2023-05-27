<template>
  <!-- 个人中心-->
  <div class="personlCenter">
    <div v-if="true">个人中心</div>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      action: '/upload/img/',
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxpdXlhbmc0IiwiX2lkIjoiNjFlYjc3ODU1N2I5ZWE3YmYxNmMxMmYyIiwiaWF0IjoxNjQyOTkxMTcxLCJleHAiOjE2NDM1OTU5NzF9.R4cOd9hpoR8K_F5NsOz-enHaRbVo_Jfx4-AzW3igjYQ',
      },
      fileList: [],
      imgSrc: null,
    }
  },
  methods: {
    successHandler(response, file, fileList) {
      console.log(response)
      this.imgSrc = response.data
    },
  },
}
</script>

<style></style>
