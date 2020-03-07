<template>
   <!-- elementUI布局组件 el-row 和 el-col -->
    <el-row type='flex' align="middle" class='layout-header'>
    <!-- 等分为两列  为什么是:span="12"-->
    <el-col class="left" :span="12">
         <!-- 图标 -->
       <i class='el-icon-s-fold'></i>
       <span>
           江苏传智播客教育科技股份有限公司
       </span>
        </el-col>
        <!-- 右侧列 -->
        <el-col class="right" :span="12">
            <!--  align属性设置垂直对齐方式  justify设置 水平对齐属性    -->
         <el-row type='flex' justify="end" align="middle">
        <!-- <img :src="userInfo.photo" alt=""> -->
        <img src="http://img4.imgtn.bdimg.com/it/u=1008200690,2377767314&fm=26&gp=0.jpg" alt="">
        <el-dropdown trigger="click" @command='clickMenu'>
            <!-- 显示内容 -->
            <!-- <span class="hand">{{userInfo.name}}</span> -->
            <span class="hand">请点击我</span>
            <!-- 下拉内容需要做具名插槽dropdown  el-dropdown-menu是专门做下拉的组件 -->
            <el-dropdown-menu slot="dropdown" >
                <!-- 下拉选项 -->
                <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                <el-dropdown-item command='git'>git地址</el-dropdown-item>
                <el-dropdown-item command='lgout'>退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        </el-row>
        </el-col>
    </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {

      }// 用户个人信息
    }
  },
  methods: {
    clickMenu (command) {
      // 分三种情况
      if (command === 'info') {
        // 点击了个人信息
      } else if (command === 'git') {
        window.location.href = 'https://github.com/Ontheway-ll/pc94Pro'
      } else {
        //   退出系统，删除token，跳转登录页面
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')// 编程式导航
      }
    }
  },
  created () { // 获取用户个人信息
    // 从缓存中调用token，从兜里拿钥匙
    // const token = localStorage.getItem('user-token')统一注册了
    this.$axios({
      url: '/user/profile'
      // 没有body和query参数
      // method: 'get' // 不写默认get请求
      // headers: {
      //   Authorization: `Bearer ${token}`// 格式要求Bearerhe token 拼接，Bearer后面有空格
      // }// 请求头参数Header中放置请求头参数,已经统一注册token
    }).then(result => {
      // 如果加载成功，将数据赋值给userInfo
    //   debugger
      this.userInfo = result.data
    })
  }
}
</script>

<style lang="less" scoped>
.layout-header{
    height: 60px;
    .left{
        i{font-size: 20px;}
    }
    .right{
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 4px;

        }
    }
    .hand{
        cursor: pointer;
    }
}
</style>
