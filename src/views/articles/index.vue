<template>
  <!-- 1 新建一个页面，新建一个路由级组件
       2 挂载到二级路由，按需加载-->
  <!-- 1 数据的双向绑定，form表单里的数据需要一个对象来存储
         对象里的每一项要和数据绑定，定义一个方法methods需要在data中
         有属性来接收数据
       2  需要在钩子函数中去调用函数 -->
  <!-- 1 筛选功能，数据变化，组合条件，统一发送请求，第一种做法
         监听每个组件的change事件  -->

  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>

    <!-- 搜索工具栏，筛选，放置一个表单容器 -->
    <el-form style="padding-left:50px">
      <el-form-item label="文章状态">
        <!-- 放置单选框组 -->
        <!-- 第二种监听值的改变 -->
        <!-- <el-radio-group v-model="searchForm.status" @change="changeCondition"> -->
        <el-radio-group v-model="searchForm.status" >
          <!-- ：label 后面的值不加引号，需要的是nub类型 -->
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表">
        <!-- 下拉选框 -->
        <!-- <el-select @change="changeCondition" v-model="searchForm.channel_id"  placeholder="请选择频道" > -->
          <!-- 第二种监听值的变化 -->
        <el-select v-model="searchForm.channel_id"  placeholder="请选择频道" >
          <!-- el-option是下拉选项的值，通过接口获取数据-->
             <!-- el-option是下拉的选项 label是显示值  value是绑定的值 -->
          <el-option v-for="item in channels " :key="item.id" :label="item. name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择">
  <!-- 日期范围选择组件  要设置type属性为 daterange-->
  <!-- 显示值和存储值的结构不一致 使用value-format指定绑定值的格式。 -->
      <!-- <el-date-picker @change="changeCondition" v-model="searchForm.dateRange" type="daterange" value-format="yyyy-MM-dd"></el-date-picker> -->
     <!-- 第二种监听值的改变 -->
      <el-date-picker v-model="searchForm.dateRange" type="daterange" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 文章主题结构，flex布局 middle垂直居中 -->
    <el-row class="total" type="flex" align="middle">
      <span>共找到1000条符合条件的内容</span>
    </el-row>
    <!-- 内容列表 -->
    <div class="artical-item" v-for="item in list" :key="item.id.toString()">
      <div class="left">
        <!-- 返回数组的图片有的有值有的没有值 ,没有搞个默认值，变量形式赋值-->
        <!-- <img :src="item.cover.images.length?item.cover.images[0]: '../../assets/img/404.png'" alt=""> -->
        <img :src="item.cover.images.length?item.cover.images[0]: defaultImg" alt="">
        <div class="info">
          <span >{{item.title}}</span>
               <!-- 只是改变显示的格式 可以用过滤器   两个过滤器 分别处理   显示文本 和 标签类型-->
         <el-tag class="tag" :type="item.status | filterType">{{ item.status | filterStatus}}</el-tag>
         <span class="date">{{item.pubdate}}</span>
        </div>
      </div>
      <div class="right">
        <span><i class="el-icon-edit"></i> 修改</span>
          <span><i class="el-icon-delete"></i> 删除</span>
      </div>
    </div>
    <!-- 放置分页组件 -->
    <el-row type="flex" justify="center" align="middle" style="height:80px">
      <el-pagination
       :total="page.total"
       :page-size="page.pageSize"
       :current-page="page.currentPage"
       @current-change="changePage"
        background layout="prev,pager,next">

      </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        total: 0,
        pageSize: 10, // 接口要求每页10-50条之间
        currentPage: 1
      },
      // 定义一个表单数据对象
      searchForm: {
        // 数据
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 / 先将 5 定义成 全部
        // 传值的是时候如果是5 就不传
        status: 5, // 默认全部的状态
        channel_id: null, // 表示没有任何的频道
        dateRange: []// 日期范围
      },
      channels: [], // 专门接收频道的数据
      list: [], // 接收文章列表
      // 给地址定义一个变量，以变量的形式才不会被编译成别的地址，
      // 地址对应的文件变成了变量 在编译的时候会被拷贝到对应位置
      defaultImg: require('../../assets/img/404.png')
    }
  },
  // 第二种监听值的改变，监听data中的数据变化
  watch: {
    searchForm: {
      deep: true, // 固定写法，深度监听
      //  会深度检测searchForm中的数据变化
      // handler也是一个固定写法 一旦数据发生任何变化 就会触发 更新
      handler () {
        // 统一用改变条件的方法
        this.page.currentPage = 1 // 只要条件变化 就变成第一页
        this.changeCondition()
        // this指向当前组件实例
      }
    }
  },
  // 专门处理显示格式的
  filters: {
    // 过滤器的第一个参数是value，别人传过来的值，必须return
    // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    // 过滤器除了用在 插值表达中还可以用 v-bind 的表达式中
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
      }
    }
  },
  methods: {
    // 改变页码事件
    changePage (newPage) {
      this.page.currentPage = newPage// 最新页码
      this.changeCondition()
    },
    // 改变了条件
    changeCondition () {
      // alert(this.searchForm.status)
      const params = { // 5为不传
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }// 通过接口调入
      this.getArticles(params)// 直接调用获取方法
    },
    getChannels () {
      // 获取频道的数据
      this.$axios({
        url: '/channels'
      }).then(result => {
        // 获取成功
        this.channels = result.data.channels
      })
    },
    // 获取文章列表
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params// es6写法
        // data: {}
      }).then(result => {
        this.list = result.data.results// 文章列表
        // 总数赋值给total
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    // 获取频道数据
    this.getChannels()
    this.getArticles()// 手动调用获取文章数据
  }
}
</script>

<style lang="less" scoped>
.articles{
  .total{
    height: 60px;
    border-bottom: 1px dashed #ccc;
  }
}
.artical-item{
  display: flex;
  justify-content: space-between;//图片和右边的文字两头对齐
  padding:20px 0;
  border-bottom: 1px solid #ccc;
  .left{
    display: flex;
    img{
      width: 180px;
      height: 100px;
      border-radius: 4px;
    }
    .info{
      display: flex;
      flex-direction: column;
    height: 100px;
     justify-content: space-around;
     margin-left: 10px;
     .date{
       font-size: 12px;
       color: #ccc;
     }
     .tag{
       width: 60px;
       text-align: center;
     }
    }
  }
  .right{
    span{
      font-size: 12px;
      margin-right: 8px;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
