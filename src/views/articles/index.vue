<template>
  <!-- 1 新建一个页面，新建一个路由级组件
       2 挂载到二级路由，按需加载-->
  <!-- 1 数据的双向绑定，form表单里的数据需要一个对象来存储
         对象里的每一项要和数据绑定，定义一个方法methods需要在data中
         有属性来接收数据
       2  需要在钩子函数中去调用函数 -->

  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>

    <!-- 搜索工具栏，筛选，放置一个表单容器 -->
    <el-form style="padding-left:50px">
      <el-form-item label="文章状态">
        <!-- 放置单选框组 -->
        <el-radio-group v-model="searchForm.status">
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
      <el-date-picker v-model="searchForm.dateRange" type="daterange" value-format="yyyy--MM-dd"></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 文章主题结构，flex布局 middle垂直居中 -->
    <el-row class="total" type="flex" align="middle">
      <span>共找到1000条符合条件的内容</span>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 定义一个表单数据对象
      searchForm: {
        // 数据
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 / 先将 5 定义成 全部
        // 传值的是时候如果是5 就不传
        status: 5, // 默认全部的状态
        channel_id: null, // 表示没有任何的频道
        dateRange: []// 日期范围
      },
      channels: [] // 专门接收频道的数据
    }
  },
  methods: {
    getChannels () {
      // 获取频道的数据
      this.$axios({
        url: '/channels'
      }).then(result => {
        // 获取成功
        this.channels = result.data.channels
      })
    }
  },
  created () {
    // 获取频道数据
    this.getChannels()
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
</style>
