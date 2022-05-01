<template>
  <div class="">
    <!-- 标签页 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有订单" name="first">
        <el-table :data="tableData.list" style="width: 100%">
          <el-table-column prop="id" label="订单编号" align="center" />
          <el-table-column prop="orderTime" label="下订单时间" align="center" />
          <el-table-column prop="total" label="订单数量" align="center" />
          <el-table-column prop="status" label="订单状态" align="center" />
          <el-table-column prop="customerId" label="用户Id" align="center" />
          <el-table-column prop="waiterId" label="员工Id" align="center" />
          <el-table-column prop="addressId" label="地址Id" align="center" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待支付" name="second">
        <el-table :data="tableData.list" style="width: 100%">
          <el-table-column prop="id" label="订单编号" align="center" />
          <el-table-column prop="orderTime" label="下订单时间" align="center" />
          <el-table-column prop="total" label="订单数量" align="center" />
          <el-table-column prop="status" label="订单状态" align="center" />
          <el-table-column prop="customerId" label="用户Id" align="center" />
          <el-table-column prop="waiterId" label="员工Id" align="center" />
          <el-table-column prop="addressId" label="地址Id" align="center" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待派单" name="third">
        <el-table :data="tableData.list" style="width: 100%">
          <el-table-column prop="id" label="订单编号" align="center" />
          <el-table-column prop="orderTime" label="下订单时间" align="center" />
          <el-table-column prop="total" label="订单数量" align="center" />
          <el-table-column prop="status" label="订单状态" align="center" />
          <el-table-column prop="customerId" label="用户Id" align="center" />
          <el-table-column prop="waiterId" label="员工Id" align="center" />
          <el-table-column prop="addressId" label="地址Id" align="center" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待接单" name="fourth">
        <el-table :data="tableData.list" style="width: 100%">
          <el-table-column prop="id" label="订单编号" align="center" />
          <el-table-column prop="orderTime" label="下订单时间" align="center" />
          <el-table-column prop="total" label="订单数量" align="center" />
          <el-table-column prop="status" label="订单状态" align="center" />
          <el-table-column prop="customerId" label="用户Id" align="center" />
          <el-table-column prop="waiterId" label="员工Id" align="center" />
          <el-table-column prop="addressId" label="地址Id" align="center" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="fifth">
        <el-table :data="tableData.list" style="width: 100%">
          <el-table-column prop="id" label="订单编号" align="center" />
          <el-table-column prop="orderTime" label="下订单时间" align="center" />
          <el-table-column prop="total" label="订单数量" align="center" />
          <el-table-column prop="status" label="订单状态" align="center" />
          <el-table-column prop="customerId" label="用户Id" align="center" />
          <el-table-column prop="waiterId" label="员工Id" align="center" />
          <el-table-column prop="addressId" label="地址Id" align="center" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        :current-page="tableData.page + 1"
        :page-sizes="[5, 8, 10, 12]"
        :page-size="tableData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
// import request from '@/utils/request.js'
// import qs from 'qs'
// import _ from 'lodash'
export default {
  // 组件名称
  name: 'Demo',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data() {
    return {
      form: {},
      tableData: [],
      params: {
        page: 0,
        pageSize: 10
      },
      currentPage4: 0,
      activeName: 'first'
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 以下是生命周期钩子
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
    this.load()
  },
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {},
  // 组件方法
  methods: {
    load() {
      request.post('/order/queryPage', qs.stringify(this.params)).then(res => {
        res.data.list.forEach(item => {
          item.orderTime = this.$moment(item.orderTime).format('lll')
        })
        this.tableData = res.data
      })
    },
    // 分页方法
    handleSizeChange(val) {
      this.params.pageSize = val
      // console.log(`每页 ${val} 条`);
      this.load()
    },
    handleCurrentChange(val) {
      this.params.page = val - 1
      // console.log(`当前页: ${val-1}`);
      this.load()
    },
    // 标签页
    handleClick(tab, event) {
      console.log(tab.index)
      switch (tab.index) {
        case '0':
          this.load()
          break
        case '1':
          this.params.status = '待支付'
          request
            .post('/order/queryPage', qs.stringify(this.params))
            .then(res => {
              res.data.list.forEach(item => {
                item.orderTime = this.$moment(item.orderTime).format('lll')
              })
              this.tableData = res.data
            })
          break
        case '2':
          this.params.status = '待派单'
          request
            .post('/order/queryPage', qs.stringify(this.params))
            .then(res => {
              res.data.list.forEach(item => {
                item.orderTime = this.$moment(item.orderTime).format('lll')
              })
              this.tableData = res.data
            })
          break
        case '3':
          this.params.status = '待接单'
          request
            .post('/order/queryPage', qs.stringify(this.params))
            .then(res => {
              res.data.list.forEach(item => {
                item.orderTime = this.$moment(item.orderTime).format('lll')
              })
              this.tableData = res.data
            })
          break
        case '4':
          this.params.status = '已完成'
          request
            .post('/order/queryPage', qs.stringify(this.params))
            .then(res => {
              res.data.list.forEach(item => {
                item.orderTime = this.$moment(item.orderTime).format('lll')
              })
              this.tableData = res.data
            })
          break
      }
    }
  }
}
</script>

<style scoped></style>
