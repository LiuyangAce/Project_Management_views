<template>
  <div ref="main" style="width: 600px;height: 350px"></div>
</template>

<script>
import api from '@/api'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      option: {
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: 140,
            center: ['50%', '50%'],
            data: [
              {value:0,name:'low'},
              {value:0,name:'mid'},
              {value:0,name:'high'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
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
          ...api.TYPES_DEFECT,
        }
        this.$http(option)
          .then((res) => {
            console.log(res)
            this.option.series[0].data[0].value = res.data.low
            this.option.series[0].data[1].value = res.data.mid
            this.option.series[0].data[2].value = res.data.high

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
