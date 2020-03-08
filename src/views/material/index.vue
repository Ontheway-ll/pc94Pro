<template>
  <!-- el-card组件，挂载到路由上 -->
  <el-card>
      <!-- 面包屑组件面包屑给到卡片的具名header -->
      <bread-crumb slot='header'>
      <template slot="title">
          素材管理
      </template>
      </bread-crumb>
      <!-- 放置标签页e-tabs -->
      <!-- v-model所绑定的值，就是当前激活的页签 -->
      <el-tabs v-model="activeName">
        <!-- lable显示标签内容 name表示显示内容的值 -->
        <el-tab-pane label="全部素材" name="all">
          <!-- 内容 -->
          全部
        </el-tab-pane>
        <el-tab-pane label="收藏素材" name="collect">
          <!-- 内容 -->
          收藏
        </el-tab-pane>
      </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all'// 默认选择
    }
  }
}
</script>

<style>

</style>
