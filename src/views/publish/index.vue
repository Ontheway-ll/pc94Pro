<template>
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
              <el-select placeholder="请选择频道"></el-select>
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

}
</script>

<style>

</style>
