import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'// 用加些方式代替原有方式
import Login from '@/views/login'
import SecondHome from '@/views/home/SecondHome'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'// 强制跳转
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      { // 一级路由表children下面配置二级路由表
        path: '', // 二级路由的path 什么都不写 代表二级路由的默认组件 如果 a => /home/a 如果什么都不写  /home
        component: SecondHome // 默认的二级路由组件
      },
      {
        // path:'/home/comment'//完整写法
        path: 'comment',
        component: () => import('@/views/comment')// 按需加载
      },
      {
        path: 'material',
        component: () => import('@/views/material')
      },
      {
        path: 'articles',
        component: () => import('@/views/articles')
      }, {
        path: 'publish/:articleId?',
        component: () => import('@/views/publish')
      }
    ]
  }, {
    path: '/login',
    component: Login,
    name: 'login'
  }
  // {
  //   // 按需加载
  //   path: '/about',
  //   name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
