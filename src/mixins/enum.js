
export default {
  props: {},
  data () {
   return {}
  },
  computed: {
    // 可以节约性能

    /**
     * 缺陷状态
     */
    enumForState() {
      return {
        'active':'danger',
        'finish':'success'
      }
    },
    /**
     * 缺陷接口类型
     */
    enumForDefectType() {
      return {
        'high':'color: red;',
        'low':'color: green;'
      }
    },
    /**
     * 接口状态
     */
    enumForInterfaceState() {
      return {
        '未完成':'danger',
        '已完成':'success'
      }
    },
  },
  watch: {},
  methods: {},
  created () {
  },
  mounted () {
  },
}
