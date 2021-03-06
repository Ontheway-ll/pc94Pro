import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission'
import ElementUI from 'element-ui' // 全局注册UI，所有位置都可以使用
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'// 引入样式
import axios from '@/utils/request'// 引入封装的axios
import Component from './components'
Vue.use(ElementUI) // 使用模块
Vue.use(Component)
// 全局注册element-ui框架 一旦全局注册 所有的位置都可以使用组件
// Vue.use实际上 会调用 ElementUI对象里的一个方法 install方法,并且传入当前的Vue对象
// 配置axios的baseURL
// 将axios赋值给vue对象的原型对象
Vue.prototype.$axios = axios
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
