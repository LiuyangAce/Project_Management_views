<template>
  <div class="interfaceClass">
    <TablePage
      ref="allInterface"
      :tableData="tableData"
      :colConfigs="colConfigs"
      :page="pagination.page"
      :pageSize="pagination.pageSize"
      :count="count"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
      @showUpdateDialogForm="showUpdateDialogForm"
      :interface = "true"
    >
    </TablePage>
    <div v-if="showDrawer">
      <InterfaceDrawer :form="form" ref="drawer"></InterfaceDrawer>
    </div>
    <el-button @click="addInterfaceHandle">快速新增接口</el-button>
  </div>
</template>

<script>
import TablePage from '@/components/table-page'
import InterfaceDrawer from '@/components/drawer/interfaceDrawer'
import api from '@/api'
export default {
  components: {
    TablePage,
    InterfaceDrawer,
  },
  data() {
    return {
      showAddDrawer: false,
      tableData: [],
      colConfigs: [
        {
          prop: 'interfaceName',
          label: '接口名称',
        },
        {
          prop: 'requestMethod',
          label: '请求类型',
        },
        {
          prop: 'interfacePath',
          label: '接口路径',
        },
        {
          prop: 'interfaceType',
          label: '接口分类',
        },
        {
          prop: 'interfaceState',
          label: '状态',
        },
        {
          prop: 'creator',
          label: '创建人',
        },
        {
          prop: 'createTime',
          label: '创建时间',
        },
        {
          prop: 'endTime',
          label: '完成时间',
        },
      ],
      pagination: {
        page: 1,
        pageSize: 10,
      },
      count: null,
      showDrawer: false,
      form: {},
    }
  },
  created() {
    this.getAllInterface()
  },
  computed: {
    isBackendDev: function () {
      return (
        JSON.parse(window.localStorage.getItem('userInfo')).userInfo.type ===
        '后端开发人员'
      )
    },
  },
  methods: {
    // 快速新增接口
    async addInterfaceHandle() {
      let { username, _id } = {
        ...JSON.parse(window.localStorage.getItem('userInfo')).userInfo,
      }
      const option = {
        ...api.INTERFACE_ADD,
        params: {
          interfaceName: 'xx',
          creatorID: _id,
          creator: username,
          interfacePath: '/xx',
          interfaceType: 'xx模块',
          requestMethod: 'POST',
          interfaceState: '未完成',
        },
      }
      await this.$http(option)
        .then((res) => {
          console.log('快速添加接口成功', res)
          this.$message({
            message: '添加成功',
            type: 'success',
            duration: 500,
          })
        })
        .catch((err) => {
          console.error('快速添加接口失败', err)
        })

      await this.getAllInterface()
    },
    getAllInterface() {
      const option = {
        ...api.INTERFACE_FINDALL,
        params: {
          pagination: { ...this.pagination },
        },
      }
      console.log(option)
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
      this.getAllInterface()
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.getAllInterface()
    },
    showUpdateDialogForm(row) {
      if (!this.isBackendDev) {
        return false
      } else {
        this.showDrawer = true
        this.$nextTick(() => {
          // 打开弹窗
          this.$refs.drawer.dialog = true
          // 传数据
          this.form = this.$lodash.cloneDeep(row)
        })
      }
    },
  },
}
</script>

<style></style>
