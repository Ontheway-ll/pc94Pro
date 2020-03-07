<template>
  <!-- el-card组件做主页面 -->
  <el-card v-loading="loading"
>
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
  <!--给el-table-column一个formatter属性，用来格式化内容，因为table不显示布尔值  -->
         <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
         <el-table-column  prop="total_comment_count" label="总评论数"></el-table-column>
         <el-table-column  prop="fans_comment_count" label="粉丝评论数"></el-table-column>
         <el-table-column   label="操作">
             <!-- el-table-column组件 在插槽中传出了 row $index store column -->
             <!-- 插槽 -> 作用域插槽 ->子组件中的数据 通过插槽传出 slot-scope接收  row(行数据) $index(索引)  -->
             <!-- 可以放组件 -->
             <template slot-scope="obj">
                 <el-button type="text" size="small">修改</el-button>
                 <el-button @click=" openOrclose(obj.row)" type="text" size="small">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
             </template>

         </el-table-column>
  </el-table>
  <!-- 放置分页组件 -->
  <el-row style="height:80px" type="flex" align="middle" justify="center">
  <el-pagination  background layout="prev, pager, next"
  :total="page.total"
  :current-page="page.currentpage"
  :page-size="page.pageSize"
  @current-change="changePage"></el-pagination>
  </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 分页参数单独放置一个对象 让数据更清晰
      page: {
        total: 0, // 默认总数是0
        currentpage: 1, // 默认的页码 是第一个页  决定了当前页码是第几页
        pageSize: 10// page-size的默认值是10
      },
      list: [],
      loading: false// 控制遮罩层的显示或隐藏
    }
  },
  methods: {
    changePage (newPage) {
      // newPage是最新的切换页码
      // 将最新的页码 设置给 page下的当前页码
      this.page.currentpage = newPage// 赋值最新页码
      // 重新拉去数据
      this.getComment()
    },
    getComment () { // 获取评论数据
      this.loading = 'true'// 请求前打开
      this.$axios({
        url: '/articles', // 请求地址
        params: {
          page: this.page.currentpage, // 查1页
          per_page: this.page.pageSize, // 查10条
          response_type: 'comment'// 此参数用来控制获取数据类型
        }
        // query参数应该在哪个位置传，axios
        // params传get参数也就是query参数
        // data传body参数，也就是请求体参数
      }).then(result => {
        //   将返回结果中的数组给list
        this.list = result.data.results
        this.page.total = result.data.total_count// 将总数赋值
        this.loading = false// 请求后关闭
      })
    },
    formatterBool (row, column, cellValue, index) {
      //  row 代表当前的一行数据
      // column 代表当前的列信息
      // cellValue 代表当前单元格的值
      // index 代表当前的索引
      // 该函数需要返回一个值 用来显示
      return cellValue ? '正常' : '关闭'
    },
    openOrclose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      // $confirm 也支持 promise 点击确定会进入到then 点击取消会进入到catch
      this.$confirm(`是否${mess}评论`, '提示').then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: {
            // 为什么评论会失败 就是因为 原来 给你传了 9152 你回传了 9200
            // 所以我们用大数字包 保证 9152不被转化 就可以使用原来的功能
            // article_id: row.id.toString() // 要求参数的文章id 将 BigNumber类型转化成字符串
            // 前端传字符串到后端 只要和原数字一致  后端会自动将字符串转成大数字
            // 只需要保证 id 和传过来的id一致就行
            article_id: row.id.toString()// 要求参数的文字ID
          },
          data: { // body参数
            allow_comment: !row.comment_status
          }

        }).then(() => {
          // 如果评论成功
          this.$message.success(`${mess}评论成功`)
          //   重新拉取数据
          this.getComment()
        }).catch(() => {
          // 如果评论失败
          this.$message.error(`${mess}评论失败`)
        })
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
