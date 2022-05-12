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
          formatter: '{a} <br/>{b} : {c}%',
        },
        series: [
          {
            name: 'Pressure',
            type: 'gauge',
            radius: 170,
            center: ['50%', '55%'],
            progress: {
              show: true,
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}%',
            },
            data: [
              {
                value: null,
                name: '缺陷进度',
              },
            ],
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
          ...api.FIND_INFO,
        }
        this.$http(option)
          .then((res) => {
            console.log(111111111,res)
            this.option.series[0].data[0].value = ((res.data.finishDefect / res.data.total).toFixed(2)) *100
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
