<template>
<!-- 封装一个面包屑 -->
  <el-breadcrumb separator=">">
      <!-- el-breadcrumb-item 相当于 router-link标签 -->
 <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
 <!-- 第二个选项是动态的，需要传值的方式传进来1是props二是slot插槽， -->
 <el-breadcrumb-item>
     <!-- 定义一个具名插槽 ,第一步挖坑，-->
     <!-- 需要注册 -->
     <slot name="title"></slot>
 </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
