<template>
  <!-- el-card组件做主页面 -->
  <el-card>
<!-- 放置一个面包屑组件,面包屑作为具名插槽给card的header的部分 -->
   <bread-crumb slot="header">
   <!-- 评论管理给面包屑的插槽 -->
    <template slot="title">评论管理</template>
   </bread-crumb>
    <!-- table表格组件 -->
  <el-table :data="list">
         <el-table-column  prop="title" label="标题" width="600"></el-table-column>
         <el-table-column  prop="comment_status" label="评论状态"></el-table-column>
         <el-table-column  prop="total_comment_count" label="总评论数"></el-table-column>
         <el-table-column  prop="fans_comment_count" label="粉丝评论数"></el-table-column>
         <el-table-column  prop="" label="操作"></el-table-column>
  </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  }
}
</script>

<style>

</style>
