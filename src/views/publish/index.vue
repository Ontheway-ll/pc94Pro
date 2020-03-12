<template>
<!--             频道的数据加载步骤
      1 定义数据
      2 调用接口频道数据，加载到定义的数据
      3 绑定到页面，绑定到select组件    -->
  <el-card>
      <bread-crumb slot="header">
            <template slot="title">发布文章</template>
      </bread-crumb>
      <!--表单组件 -->
      <el-form label-width="100px">
          <el-form-item label="标题">
              <el-input style="width:50%" placeholder="输入标题"></el-input>
          </el-form-item>
          <el-form-item label="内容">
              <el-input type="textarea" :rows="4" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="封面">
              <!-- 单选框组 -->
              <el-radio-group>
                  <el-radio>单图</el-radio>
                  <el-radio>三图</el-radio>
                  <el-radio>无图</el-radio>
                  <el-radio>自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
              <el-select placeholder="请选择频道">
                  <!-- 循环生成谁就在谁的标签上循环 -->
                  <!-- label显示值，value保存值 -->
                  <el-option :label="item.name" :value="item.id" v-for="item in channels" :key="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
               <el-button type="primary">发表</el-button>
                <el-button>存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>

</template>

<script>
export default {
  data () {
    return {
      channels: [] // 接收频道数据
    }
  },
  methods: {
    //   获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels// 频道数据赋值给data的数组
      })
    }
  },
  created () {
    this.getChannels()// 获取接收到的频道数据
  }
}
</script>

<style>

</style>
