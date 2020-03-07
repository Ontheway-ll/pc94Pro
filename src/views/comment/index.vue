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
       <!-- 使用el-table-column作为列 -->
       <!-- prop 表示显示的字段 label表示表头 -->
         <el-table-column  prop="title" label="标题" width="600"></el-table-column>
         <el-table-column  prop="comment_status" label="评论状态"></el-table-column>
         <el-table-column  prop="total_comment_count" label="总评论数"></el-table-column>
         <el-table-column  prop="fans_comment_count" label="粉丝评论数"></el-table-column>
         <el-table-column   label="操作"></el-table-column>
  </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: { // 获取评论数据
    getComment () {
      this.$axios({
        url: '/articles', // 请求地址
        params: {
          response_type: 'comment'// 此参数用来控制获取数据类型
        }
        // query参数应该在哪个位置传，axios
        // params传get参数也就是query参数
        // data传body参数，也就是请求体参数
      }).then(result => {
        //   将返回结果中的数组给list
        this.list = result.data.results
      })
    }
  },
  created () {
    //   在钩子函数中获取数据
    this.getComment()
  }
}
</script>

<style>

</style>
