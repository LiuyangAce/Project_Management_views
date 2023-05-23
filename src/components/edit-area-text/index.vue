<template>
  <div>
    <codemirror
      ref="codemirror"
      v-model="code"
      :options="cmOption"
      @blur="blurCode"
      @changes="changeCode"
    />
    <slot></slot>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
// base style
import 'codemirror/lib/codemirror.css'
// import 'codemirror/addon/lint/lint.css'
// import 'codemirror/theme/rubyblue.css'

import 'codemirror/mode/javascript/javascript'

// import 'codemirror/addon/lint/json-lint'
import lodash from 'lodash'
export default {
  components: {
    codemirror
  },
  props: {
    // TODO
    config: {
      type: Object,
      default: () => {
        return {}
      }
    },
    maxLength: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: 300
    },
    codeStr: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      code: '',
      cmOption: {
        tabSize: 4,
        lineNumbers: true,
        mode: 'application/json',
        autofocus: true,
        smartIndent: false
      },
      handerTimeout: null
    }
  },
  watch: {
    config: {
      handler(newValue, oldValue) {
        this.cmOption = {
          ...this.cmOption,
          ...newValue
        }
        this.$nextTick(() => {
          this.reHeight()
        })
      },
      immediate: true
    },
    codeStr(val) {
      this.setCode(this.$lodash.cloneDeep(this.codeStr))
    }
  },
  created() {
    this.cmOption = Object.assign(this.cmOption, this.config)
  },
  mounted() {
    this.code = this.$lodash.cloneDeep(this.codeStr)
  },

  methods: {
    getCode() {
      return this.code
    },
    refresh() {
      setTimeout(() => {
        if (this.$refs.codemirror) { this.$refs.codemirror.refresh() }
      }, 1)
    },
    setCode(data) {
      if (this.maxLength && data.length > this.maxLength) {
        setTimeout(() => {
          this.code = data.substr(0, this.maxLength)
        })
        this.warning('示例长度不能超过' + this.maxLength)
      } else {
        this.code = data
        this.$nextTick(() => {
          this.reHeight()
        })
      }
    },
    changeCode() {
      this.setCode(this.code)
      this.$emit('change', lodash.cloneDeep(this.code))
    },
    blurCode() {
      this.setCode(this.code)
      this.$emit('blur', lodash.cloneDeep(this.code))
    },
    getDoc() {
      return this.$refs.codemirror.codemirror.doc
    },
    reHeight() {
      if (this.cmOption.readOnly || this.cmOption.readOnly === 'nocursor') {
        let size = this.getDoc().size
        if (size * 13 + 8 < 48) {
          this.$refs['codemirror'].$el.lastElementChild.style.height = '48px'
        } else if (size <= 25) {
          this.$refs['codemirror'].$el.lastElementChild.style.height = `${size * 13 + 8}px`
        } else {
          this.$refs['codemirror'].$el.lastElementChild.style.height = `329px`
        }
      } else {
        this.$refs['codemirror'].$el.lastElementChild.style.height = `${this.height}px`
      }
      this.refresh()
    },
    warning(msg) {
      if (!this.handerTimeout) {
        this.handerTimeout = setTimeout(() => {
          this.$message({
            message: msg,
            type: 'warning'
          })
          clearTimeout(this.handerTimeout)
          this.handerTimeout = null
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
::v-deep .CodeMirror-scroll {
  /* min-height: 300px; */
  cursor: text;
}
::v-deep .CodeMirror-vscrollbar {
  overflow: auto;
}
/* // 左边背景 */
::v-deep .edit-container .CodeMirror-gutters {
}
/* // 左边数字颜色 */
::v-deep .CodeMirror-linenumber {
  color: $--app-notice-color;
  font-size: $--app-font-size;
}
/* // 字体大小 */
::v-deep .CodeMirror pre.CodeMirror-line,
.CodeMirror pre.CodeMirror-line-like {
  font-size: $--app-font-size;
}
/* // 代码颜色 */
::v-deep .cm-string {
  color: black;
  /* color: $--app-primary-color; */
}
::v-deep .cm-variable {
  /* color: $--app-font-color; */
  color: red
}
</style>
