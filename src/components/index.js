// 需要使用Vue.use的方式去注册
// Vue.use会调用对象中的install方法 install方法第一个参数 是Vue对象
import LayoutAside from './home/layout-aside'// 引入
import LayoutHeader from './home/layout-header'
import BreadCrumb from './common/breadcrumb.vue'// 引入面包屑组件
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install: function (Vue) {
    //   注册全局组件 Vue 一旦注册 在任意位置都可以使用
    Vue.component('layout-aside', LayoutAside)
    Vue.component('layout-header', LayoutHeader)// 全局注册
    Vue.component('bread-crumb', BreadCrumb)// 全局注册面包屑组件
    Vue.use(VueQuillEditor) // 注册富文本编辑器可以在任意位置使用
  }
}
