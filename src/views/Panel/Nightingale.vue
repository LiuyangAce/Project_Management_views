<template>
  <div ref="main" style="width: 600px; height: 350px"></div>
</template>

<script>
import api from '@/api'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      option: {
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 150],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8,
            },
            data: [],
          },
        ],
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
          ...api.COMPONENT_USERS,
        }
        this.$http(option)
          .then((res) => {
            console.log(res)
            this.option.series[0].data = []
            this.option.series[0].data.push(
              { value: res.data.backendDeveloper, name: '后端开发人员' },
              { value: res.data.frontendDeveloper, name: '前端开发人员' },
              { value: res.data.tester, name: '测试人员' }
            )

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
