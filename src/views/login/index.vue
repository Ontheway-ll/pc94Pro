<template>
  <div class="login">
    <!-- 表单 -->
    <el-card class="login-card">
      <!-- 表单内容 -->
      <!-- 头部logo部分 -->
      <div class="title">
<img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 表单 绑定model属性，绑定rules属性（表单验证规则） ref给el-form一个属性 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="margin-top:20px">
        <!-- 表单容器,prop要绑定的字段名 -->
        <el-form-item prop="mobile">
          <!-- 表单域  v-model 双向绑定-->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码  prop要绑定的字段名-->
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:60%" placeholder="请输入验证码"></el-input>
          <!-- 放置一个按钮 -->
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <!-- 表单域 -->
        <el-form-item prop="checked">
          <!-- 隐私协议 -->
          <el-checkbox  v-model="loginForm.checked">我已阅读同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <!-- 按钮 -->
          <el-button @click="login" style="width:100%" type="primary">登录</el-button>
        </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
// 数据绑定和校验
// 1表单校验准备
//   在data中定义表单数据对象，绑定到e-form上的model上
//   需要在data中定义loginRules变量,绑定到el-form的rules属性上
//   需要将表单中组件 双向绑定 v-model 我们的表单数据
// 2 表单自动校验
// 3 表单手动校验
export default {
  data () {
    return {
      // 登录表单的数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 校验码
        checked: false// 是否同意协议
      },
      // 定义表单验证规则
      loginRules: {
        mobile: [
          { required: true, message: '您的手机号不能为空' }, {
            pattern: /^1[3-9]\d{9}$/, // 正则表达式
            message: '您的手机号不正确'
          }
        ], // 手机号验证规则
        code: [{ required: true, message: '您的验证码不能为空' }, {
          pattern: /^\d{6}$/,
          message: '验证码是6位数'
        }
        ], // 验证码验证规则
        checked: [{
          validator: function (rule, value, callback) {
          // rule是当前的校验规则
          // value是当前的要校验的字段的值
          // calllback是一个回调函数 不论成功或者失败都要执行
          // 成功执行callback 失败执行 callback(new Error('错误信息'))
          // 我们认为 如果 value 为true 就表示 校验成功 如果value 为false就表示校验失败
          // new Error(错误信息) 就是我们提示的错误信息
            value ? callback() : callback(new Error('您必须同意我们条款'))
          }
        }]// 是否勾选规则
      }
    }
  },
  methods: {
    login () {
    // this.$refs.loginForm获取的是el-form对象实例
    //   this.$refs.loginForm.validate(function (isOK) {
    //     if (isOK) {
    //       console.log('校验通过')
    //     } else {
    //       console.log('校验未通过')
    //     }
    //   })
    // 第二种方法，promise
      this.$refs.loginForm.validate().then(() => {
        // 如果成功通过 校验就会到达 then
        // 通过校验之后 应该做什么事 -> 应该调用登录接口 看看手机号是否正常
        //   this.$axios.get/post/delete/put
        // 第二种方法axios方法传入一个对象
        this.$axios({
          url: '/authorizations', // 请求地址
          // params: {}, // 指的是url参数 参数会拼接到 url地址上面  常常说的 get参数，如果是空的不需要写
          data: this.loginForm, // body请求体参数 常用于 post /put /patch
          //  第二种写法，data：{...this.logForm,checked:null}
          // ...把loginform的参数拷贝到这个对象里，后面的去替换前面参数
          // api里body参数里不需要第三个参数checked
          method: 'post'// 请求类型 post/get/delete/put/patch 默认值是get类型 可全大写 可全小写
        }).then(result => {
          // 成功 之后打印结果
          // 把钥匙放在兜里 也就是把token存于 本地缓存
          // console.log(result.data)
          // user-token,相当于key
          window.localStorage.setItem('user-token', result.data.data.token)
          // 跳到主页
          this.$router.push('/home')// push 和 router-link类似 to属性 可以直接是字符串 也可以是对象
        }).catch(() => {
          // 提示消息
          // 第一种用法
          this.$message({ message: '用户名或者密码错误', type: 'error' })
          // this.$message.error('用户名或者密码错误')
        })
      })
    }

  }
}
</script>

<style lang='less' scoped>
// 加了scoped属性 就只会对当前自己的组件起作用
// 如果需要写less 需要在style标签中 lang='less'
.login{
  background-image: url('../../assets/img/1583074526(1).jpg');
  height: 100vh;//当前屏幕可视区域分成100份
  background-size: cover;
  display: flex;
  justify-content: center;//水平居中
  align-items: center;//垂直居中
  .login-card{
    width: 440px;
    height: 340px;
    .title{
      text-align: center;
      img{
        height: 40px;
      }
    }
  }
}
</style>
