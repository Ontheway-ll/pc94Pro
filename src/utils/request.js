/**
 *封装请求工具 request.js
 * 对于 axios的二次封装
 * 配置拦截器 以及其他
 */
import axios from 'axios'
import router from '@/router'
import JsonBigint from 'json-bigint'// 引入第三方处理大数据的包
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址
// 对axios进行自定义设置用json-bigint 替代原来的json
axios.defaults.transformResponse = [function (data) {
  // 这里主要处理 id 超过 大数字的时候  转化 不正确的问题  JSONBig.parse是第三方的包 内部怎么实现的,我们不需要关心
  // 只需要知道它可以帮助我们 转化正确
  // const result = JSON.parse(data)
  // return result
  // 用json-bigint的转化来做
  // 这里需要判断一下 data 是不是为空 如果为空就不能转化了
  return data ? JsonBigint.parse(data) : {}
}]
// 请求拦截器的开发
axios.interceptors.request.use(function (config) {
  // 成功的时候执行，第一个参数会有一个config，config就是所有的axios的请求信息
// 在第一个函数中需要将配置返回，返回的配置会作为请求参数进行请求
// 在返回之前就是我们统一注册token的最佳时间
  const token = localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // 失败的时候执行第二个
//   失败时会有一个错误，直接reject即可
// axios是一个支持promise，如果失败等于进入axios的catch中
  return Promise.reject(error)
})
// 响应拦截器的开发
axios.interceptors.response.use(function (response) {
  // 回调参数第一个参数是一个响应体
  // 在拦截器中需要将数据返回，将数据进行结构
  return response.data ? response.data : {}// 有的接口没有任何响应数据
//   成功的时候执行，
}, function (error) {
  // 失败的时候执行
  // error是错误对象 里面包含了错误的状态码 和响应信息
  // 401 状态码  表示用户认证失败 用户身份不对
  // 401出现的时候 表示 拿错钥匙/钥匙过期/钥匙没拿/钥匙名不对/钥匙格式不对 ...
  // 之前的导航守卫  校验了token有没有 检查了钥匙有没有
  // 应该换一个新钥匙 项目1 讲一种比较粗暴的换钥匙 项目2 讲一种比较温柔的钥匙
  // 粗暴的换钥匙 回登录页 => 重新登录换一把新的 重来
  // 回登录页之前 应该把旧钥匙给清除掉
  if (error.response.status === 401) {
    localStorage.removeItem('user-token')// 删除钥匙
    router.push('/login')// 直接导入路由实例对象，使用跳转的方式和组件中this.$router是一样的
    // 调回登录页
    // this.$router错误的，this不是组件实例
  }
  return Promise.reject(error)
})
export default axios
