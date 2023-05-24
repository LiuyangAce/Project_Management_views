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
        @row-contextmenu="delDialog"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <!-- 双击点开抽屉 -->
        <el-table-column
          v-for="(item, index) in colConfigs"
          :formatter="item.formatter || null"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :render-header="item.renderHeader || null"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="page" slot="main">
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
    <el-dialog
      title="是否删除接口"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>该操作不可逆！请谨慎操作！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delHandle()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api'
export default {
  props: {
    interface: {
      type: Boolean,
      default : false
    },
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
    isBackendDev: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      delRow: {},
    }
  },
  computed: {},
  watch: {},
  created() {
    console.log(this.$parent);
  },
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
    delDialog(row, column, event) {
      if (!this.interface || !this.isBackendDev) {
        return false
      }else {
        event.preventDefault()
        console.log('in delDialog', row)
        this.dialogVisible = true
        this.delRow = row
      }
      // this.$emit('delHandle', row)
    },
    delHandle() {
      const option = {
        ...api.INTERFACE_DEL,
        params: {
          ...this.delRow,
        },
      }
      this.$http(option)
        .then((res) => {
          console.log('删除成功', res)
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 500,
          })
          this.dialogVisible = false
          this.$parent.getAllInterface()
        })
        .catch((err) => {
          console.log('删除失败', err)
          this.dialogVisible = false
        })
    },
    handleClose() {
      this.dialogVisible = false
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
