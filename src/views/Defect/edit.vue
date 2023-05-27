<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="文章标题">
        <el-input v-model="form.title" palceholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <div id="editor"></div>
      </el-form-item>
      <el-form-item label="文章来源">
        <el-radio v-model="form.stemform" label="原创">原创</el-radio>
        <el-radio v-model="form.stemform" label="转载">转载</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button>发布文章</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from 'wangeditor'
export default {
  data() {
    return {
      form: {
        title: '',
        stemform: '',
      },
      editor:null
    }
  },
  mounted() {
    // 创建wnagEditor实例
    this.editor = new Editor('#editor')

    //配置上传图片的接口地址
    this.editor.config.uploadImgServer = '/upload/editor/img'
    this.editor.config.uploadFileName = 'editorFile'
    this.editor.config.uploadImgHeaders = {
      authorization: "Bearer " + localStorage.token
    }
    console.log(this.editor.config.uploadImgHeaders,1111111111);
    //设置富文本编辑器的高度
    this.editor.config.height = 500
    // 设置提示文字
    this.editor.config.placeholder = '编辑文字内容'

    this.editor.create()
  }
}
</script>

<style>

</style>