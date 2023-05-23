<template>
  <div ref="main" style="width: 1600px; height: 550px"></div>
</template>

<script>
import api from '@/api'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      option: {
  title: {
    text: '接口模块类别分布图'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  xAxis: {
    type: 'category',
    data: []
  },
  series: [
    {
      name: '已完成',
      type: 'bar',
      data: []
    },
    {
      name: '未完成',
      type: 'bar',
      data: []
    }
  ]
},
    }
  },
  created() {
  },
  mounted() {
    this.getInfo().then((res) => {
      echarts.init(this.$refs.main).setOption(this.option)
    })
  },
  methods: {
    getInfo() {
      return new Promise((resolve, reject) => {
        const option = {
          ...api.INTERFACE_SORT,
        }
        this.$http(option)
          .then((res) => {
            console.log(res)
            this.option.xAxis.data = res.data.moduleSort
            this.option.series[0].data = res.data.doneList
            this.option.series[1].data = res.data.todoList

            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
}
</script>

<style></style>

// { value: 40, name: 'rose 1' }, // { value: 38, name: 'rose 2' }, // {
value:32, name: 'rose 3' },
