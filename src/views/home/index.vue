<template>
<!-- 在最外层放一个大容器 -->
<el-container>
     <el-aside style="width:230px;background:#2e2f32">
    <layout-aside>左侧导航组件</layout-aside>
     </el-aside>
     <!-- 右侧嵌套一个容器 -->
     <el-container>
         <!-- 上下布局 -->
         <el-header>
            <layout-header></layout-header>
         </el-header>
         <!-- 主要区域 -->
         <!-- el-main 默认给容器加了20pxd 内边距 -->
         <el-main style="padding:0">

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
