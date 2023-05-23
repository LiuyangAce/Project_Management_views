<template>
  <div class="panel" v-title data-title= '敏捷面板'>
    <div class="top">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight:bold">缺陷指标</span>
        </div>
        <div class="content">
          <div class="activeDefect">
            <div>未完成</div>
            <div
              style="
                color: rgb(255, 94, 94);
                font-weight: bolder;
                text-align: center;
              "
            >
              {{ info.activeDefect }}
            </div>
          </div>
          <div class="finishDefect">
            <div>已完成</div>
            <div
              style="color: #72e6a0; font-weight: bolder; text-align: center"
            >
              {{ info.finishDefect }}
            </div>
          </div>
          <div class="total">
            <div>总缺陷</div>
            <div
              style="color: #5470c6; font-weight: bolder; text-align: center"
            >
              {{ info.total }}
            </div>
          </div>
          <div class="hasOwnerDefect">
            <div>已分配</div>
            <div
              style="color: #fac858; font-weight: bolder; text-align: center"
            >
              {{ info.hasOwnerDefect }}
            </div>
          </div>
          <div class="noOwnerDefect">
            <div>未分配</div>
            <div
              style="color: #feb34a; font-weight: bolder; text-align: center"
            >
              {{ info.noOwnerDefect }}
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <br />
    <br />
    <div class="center">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight:bold">缺陷状态统计</span>
        </div>
        <div class="center-charts">
          <Nightingale></Nightingale>
          <Gauge></Gauge>
          <Pie></Pie>
        </div>
      </el-card>
    </div>
    <br />
    <br />
    <div class="footer">
      <el-card>
        <Bar></Bar>
      </el-card>
    </div>
  </div>
</template>
<script>
import api from '@/api'
import Nightingale from './Nightingale.vue'
import Gauge from './Gauge.vue'
import Pie from './Pie.vue'
import Bar from './Bar.vue'
export default {
  components: {
    Nightingale,
    Gauge,
    Pie,
    Bar
  },
  data() {
    return {
      info: {},
    }
  },
  created() {
    this.getDefectInfo()
  },
  methods: {
    getDefectInfo() {
      const option = {
        ...api.FIND_INFO,
      }
      this.$http(option)
        .then((res) => {
          this.info = res.data
        })
        .catch((err) => {})
    },
  },
}
</script>
<style scoped>
.content {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.center-charts {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}
</style>
