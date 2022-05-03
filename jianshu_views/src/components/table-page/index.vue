<template>
  <div class="tablePage">
    <!-- 表格 -->
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{
          background: '#e9f7ec',
          backdropFilter: 'blur(10px)',
          color: '#27b766',
        }"
        @row-dblclick="showUpdateDialogForm"
        @row-contextmenu="delHandle"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <!-- 双击点开抽屉 -->
        <el-table-column
          v-for="(item, index) in colConfigs"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          align="center"
        >
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        :background="true"
        layout="->, total, sizes, prev, pager, next, jumper"
        :current-page="page"
        :page-sizes="[5, 10, 15]"
        :page-size="pageSize"
        :total="count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 表格数据
    tableData: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 表头配置
    colConfigs: {
      type: Array,
      default: () => {
        return []
      },
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    page: {
      type: Number,
      default: 1,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      slotList: [],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    },
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    },
    showUpdateDialogForm(row) {
      console.log('in showUpdateDialogForm', row)
      this.$emit('showUpdateDialogForm', row)
    },
    delHandle(row) {
      console.log('in delHandle', row)
      this.$emit('delHandle', row)
    },
  },
}
</script>

<style scoped></style>
<style>
.el-pagination {
  padding: 15px 5px;
}
</style>
