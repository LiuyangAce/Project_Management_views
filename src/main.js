import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './http'
import { Message } from 'element-ui'
import 'default-passive-events'
import lodash from 'lodash'
import dayjs from "dayjs";
import globalUtils from './utils'

// 全局注册过滤器
import * as filters from '@/filter/index.js';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});


import ViewLayout from './layout/viewLayout.vue'
import DefaultLayout from './layout/defaultLayout.vue'
import EmptyLayout from './layout/emptyLayout.vue'

Vue.component('view-layout',ViewLayout)
Vue.component('default-layout',DefaultLayout)
Vue.component('empty-layout',EmptyLayout)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = http
Vue.prototype.$message = Message
Vue.prototype.$lodash = lodash
Vue.prototype.$dayjs = dayjs
Vue.prototype.$globalUtils = globalUtils


Vue.directive('title',{
  inserted: function (el,binding) {
    document.title = el.dataset.title
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
