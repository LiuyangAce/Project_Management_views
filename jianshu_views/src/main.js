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

// 使用 x-table
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VXETable)

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
