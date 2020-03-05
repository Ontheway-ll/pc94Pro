/**
 *专门处理路由权限问题
 */
// 引入router，注册全局前置守卫
import router from '@/router'
// 回调函数会在路由发生之前改变执行
router.beforeEach(function (to, from, next) {
//   进行判断，以/home来判断是否主页，
// 首先应该判断 你需要拦截哪些页面 如果页面的地址以 /home为开头, 就需要进行token的判断
  // 判断你要去的页面是不是以 /home为开头
// startWith是否以什么什么为开始的函数，
  if (to.path.startsWith('/home')) {
    // 如果是去主页，看手里是否有token
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')// 回登录页
    }
  } else {
    next()// 直接放过
  }
})
