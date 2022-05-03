import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      title: '主界面',
      layout: 'view-layout'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      title: '登录',
      layout: 'empty-layout'
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/User/password.vue'),
    meta: {
      title: '个人资料',
      layout: 'default-layout'
    }
  },
  {
    path: '/defect',
    name: 'Defect',
    component: () => import('@/views/Defect'),
    meta: {
      title: '缺陷管理',
      layout: 'view-layout'
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/Test/index.vue'),
    meta: {
      title: '测试管理',
      layout: 'view-layout'
    }
  },
  {
    path: '/interface',
    name: 'Interface',
    component: () => import('@/views/Interface/index.vue'),
    meta: {
      title: '接口管理',
      layout: 'view-layout'
    }
  },
  {
    path: '/file',
    name: 'File',
    component: () => import('@/views/File/index.vue'),
    meta: {
      title: '文档管理',
      layout: 'view-layout'
    }
  },
  {
    path: '/panel',
    name: 'Panel',
    component: () => import('@/views/Panel/index.vue'),
    meta: {
      title: '敏捷面板',
      layout: 'view-layout'
    }
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
