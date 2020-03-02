<template>
<!-- 在最外层放一个大容器 -->
<el-container>
     <el-aside>
         <h1>左侧导航区域</h1>
     </el-aside>
     <!-- 右侧嵌套一个容器 -->
     <el-container>
         <!-- 上下布局 -->
         <el-header>
             <h1>顶部操作区域</h1>
         </el-header>
         <!-- 主要区域 -->
         <el-main>
             <h1>主要区域</h1>
             <!-- 这里放置二级路由容器 -->
         <router-view></router-view>
         </el-main>
     </el-container>
</el-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
