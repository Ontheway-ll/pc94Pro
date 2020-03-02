<template>
  <div class="login">
    <!-- 表单 -->
    <el-card class="login-card">
      <!-- 表单内容 -->
      <!-- 头部logo部分 -->
      <div class="title">
<img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 表单 绑定model属性，绑定rules属性（表单验证规则） -->
      <el-form :model="loginForm" :rules="loginRules" style="margin-top:20px">
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
          <el-button style="width:100%" type="primary">登录</el-button>
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

      }
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
