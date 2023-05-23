<template>
  <div>
    <TablePage
      ref="myAgent"
      :tableData="tableData"
      :colConfigs="colConfigs"
      :page="pagination.page"
      :pageSize="pagination.pageSize"
      :count="count"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
      @showUpdateDialogForm="showUpdateDialogForm"
    >
    </TablePage>
    <div v-if="showDrawer">
      <DefectDrawer :form="form" ref="drawer"></DefectDrawer>
    </div>
  </div>
</template>

<script>
import TablePage from '@/components/table-page'
import DefectDrawer from '@/components/drawer/defectDrawer'
import api from '@/api'
export default {
  components: {
    TablePage,
    DefectDrawer
  },
  data() {
    return {
      tableData: [],
      colConfigs: [
        {
          prop: 'defectName',
          label: '缺陷名称',
        },
        {
          prop: 'creator',
          label: '创建人',
        },
        {
          prop: 'owner',
          label: '执行人',
        },
        {
          prop: 'createTime',
          label: '创建时间',
        },
        {
          prop: 'endTime',
          label: '完成时间',
        },
        {
          prop: 'state',
          label: '状态',
        },
        {
          prop: 'defectType',
          label: '缺陷类型',
          customSlot: 'defectType',
        },
      ],
      pagination: {
        page: 1,
        pageSize: 10,
      },
      count: null,
      condition: {
        owner: JSON.parse(window.localStorage.getItem('userInfo')).userInfo
          .username,
      },
      form: {},
      showDrawer: false,
    }
  },
  created() {
    this.getAllDefect()
  },
  methods: {
    getAllDefect() {
      const option = {
        ...api.DEFECT_FINDALL_BYCONDITION,
        params: {
          pagination: { ...this.pagination },
          condition: { ...this.condition },
        },
      }
      console.log('option:', option)
      this.$http(option)
        .then((res) => {
          console.log('请求成功', res)
          this.tableData = res.result
          this.count = res.count
          this.pagination.page = res.page
          this.pagination.pageSize = res.pageSize
          this.$message({
            message: '查询成功',
            type: 'success',
            duration: 500,
          })
        })
        .catch((err) => {
          console.error('请求失败', err)
        })
    },
    handleCurrentChange(val) {
      this.pagination.page = val
      this.getAllDefect()
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.getAllDefect()
    },
    showUpdateDialogForm(row) {
      this.showDrawer = true
      this.$nextTick(() => {
        // 打开弹窗
        this.$refs.drawer.dialog = true
        // 传数据
        this.form = this.$lodash.cloneDeep(row)
      })
    }
  },
}
</script>

<style scoped></style>
