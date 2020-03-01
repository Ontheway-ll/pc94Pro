import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 全局注册UI，所有位置都可以使用
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'// 引入样式
Vue.use(ElementUI) // 引入模块
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
