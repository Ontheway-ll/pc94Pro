<template>
      <!-- 封装一个组件，选择图片和上传图片
      通过页签的形式来显示 -->
<el-tabs v-model="activeName">
      <el-tab-pane label="素材库" name="meterial">
          <!-- 获取全部素材 -->
          <!-- v-for循环遍历list -->
          <div class="select-image-list">
              <el-card v-for="item in list " :key="item.id" class="card-img">
                  <!-- 显示素材图片 -->
                  <img @click="clickImg(item.url)" :src="item.url" alt="">
              </el-card>
          </div>
          <!-- 分页布局 -->
          <el-row type="flex" justify="center" style="height:80px" align="middle">
              <!-- 分页组件 -->
              <el-pagination background layout="prev,pager,next"
                :current-page="page.currentPage"
                :total="page.total"
                :page-size="page.pageSize"
                @current-change="changePage"
              ></el-pagination>
          </el-row>
      </el-tab-pane>
     <el-tab-pane label="上传素材" name="upload">上传素材</el-tab-pane>
</el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'meterial', // 当前激活的变量
      list: [], // 素材列表数据
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 8
      }
    }
  },
  methods: {
    //   点击图片时候触发
    clickImg (url) {
    //   传值，传出去
      this.$emit('selectOneimg', url)
    },
    getAllimage () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // 查询全部素材
          page: this.page.currentPage, // 当前页码
          per_page: this.page.pageSize// 每页多少条
        }
      }).then(result => {
        this.list = result.data.results// 获取全部素材
        this.page.total = result.data.total_count// 将总数赋值给页码变量
      })
    },
    // 改变页码
    changePage (newPage) {
      this.page.currentPage = newPage // 赋值新页码
      this.getAllimage()// 重新获取数据
    }
  },
  created () {
    this.getAllimage()
  }
}
</script>

<style lang="less" scoped>
.select-image-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .card-img{
        width: 150px;
        height: 150px;
        margin: 20px 0;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
