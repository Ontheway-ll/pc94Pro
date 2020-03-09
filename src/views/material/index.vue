<template>
<!-- 1在data中定义list接收全部素材的数据
     2 定义一个获取素材的方法，从接口中获取数据，并复制给data中list
     3 实例化之后，调用，获取素材数据
     4 需要实现将数据转化成页面结构 -->
<!--             上传图片
     1 放置好上传组件el-uoload,必须有action属性
     2 自定义上传的方法 http-request，选择文件后通过方法上传-->
<!--              收藏和删除
     1 通过点击和收藏和删除的图标，触发相应的动作
     2 给图标注册事件，绑定删除和收藏的方法
     3 传参，接收数据用row接收，
     4 实现逻辑 -->

  <!-- el-card组件，挂载到路由上 -->
  <el-card>
      <!-- 面包屑组件面包屑给到卡片的具名header -->
      <bread-crumb slot='header'>
      <template slot="title">
          素材管理
      </template>
      </bread-crumb>
      <!-- 上传图片素材 ,放置一个图片上传组件-->
      <el-row type="flex" justify="end">
        <el-upload :show-file-list="false" action="" :http-request="uploadImg">
          <!-- 上传组件必须要有action属性，不传就报错 -->
        <el-button type="primary" size="small">上传图片</el-button>
        </el-upload>
      </el-row>
      <!-- 放置标签页e-tabs -->
      <!-- v-model所绑定的值，就是当前激活的页签 ,切换页签需要监听页签的变化-->
      <el-tabs v-model="activeName" @tab-click="changeTab">
        <!-- lable显示标签内容 name表示显示内容的值 -->
        <el-tab-pane label="全部素材" name="all">
          <!-- 内容,循环生成页面结构 循环list，v-for，循环生成谁就写在谁的标签上-->
          <div class="img-list">
            <el-card class="img-card" v-for="item in list" :key="item.id">
              <!-- 放置图片并赋值图片地址 -->
              <img :src="item.url" alt="">
              <!-- space-around环绕 middle居中对齐-->
              <el-row class="operate" type="flex" align= "middle" justify="space-around">
                <!-- 根据数据判断图标的颜色 -->
                <i @click="collectOrCancel(item)" class='el-icon-star-on' :style="{color:item.is_collected?'red':'black'}" ></i>
                <i @click="delMaterial(item)" class='el-icon-delete-solid'></i>
              </el-row>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收藏素材" name="collect">
          <!-- 内容 -->
          <div class="img-list">
            <el-card class="img-card" v-for="item in list" :key="item.id">
              <!-- 放置图片并赋值图片地址 -->
              <img :src="item.url" alt="">
            </el-card>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 放置一个公共的分页组件 -->
      <el-row type="flex" justify="center" align="middle" style='height:80px'>
<!-- 放置一个分页组件
      total 总条数
      current-page 当前页码
      page-size每页多少条-->
      <el-pagination background
      :total="page.total"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      layout="prev,pager,next"
      @current-change="changePage">
</el-pagination>
      </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选择
      list: [], // list接收全部素材的数据
      page: { // 专门的对象存放分页信息
        currentPage: 1, // 默认第一页
        total: 0, // 总页数
        pageSize: 8 // 每页多少条
      }
    }
  },
  methods: {
    // 收藏或者取消收藏的方法
    collectOrCancel (row) {
      this.$axios({
        url: `/user/images/${row.id}`,
        method: 'put',
        // params: {},
        data: {
          collect: !row.is_collected
        }
      }).then(() => {
        // 如果执行成功
        this.getMaterial()
      }).catch(() => {
        // 如果失败
        this.$message.error('操作失败')
      })
    },
    // 删除图片的方法
    delMaterial (row) {
      // 删除前友好的提示
      // confirm也就是promise
      this.$confirm('您确定要删除该图片吗?', '提示').then(() => {
        this.$axios({
          url: `/user/images/${row.id}`,
          method: 'delete'
        }).then(() => {
          // 删除成功重新加载数据
          //  如果删除成功了 可以重新拉取数据 也可以 在前端删除  会在 移动端进行场景演示
          // C 端场景  如果删除 或者修改数据 不会重新拉取数据 只会在前端修改对应的一条数据
          // B 端场景 可以拉取数据
          this.getMaterial()
        }).catch(() => {
          // 删除失败
          this.$message.error('操作失败')
        })
      })
    },
    // 定义一个上传组件的方法
    uploadImg (params) {
      // debugger
      // params.file是需要上传图片的文件
      // 接口参数的类型要求是formdate
      const data = new FormData()// 实例化一个formdate对象
      data.append('image', params.file)// 加入文件参数
      this.$axios({
        url: '/user/images', // 请求地址
        method: 'post', // 请求方式,上传或者新增
        data// es6简写
      }).then(() => {
        // 如果成功重新获取数据
        this.getMaterial()
      }).catch(() => {
        this.$message.error('上传素材失败')
      })
    },
    // 改方法会在页面切换改变时执行
    changePage (newPage) {
      // 传入一个新页
      this.page.currentPage = newPage// 将新叶赋值给页码数据
      this.getMaterial()// 获取数据
    },
    // 获取素材数据
    getMaterial () {
      this.$axios({
        url: '/user/images', // 请求地址
        method: 'get',
        params: {
          // fasle不能写死，如果为true获取收藏素材，false为全部素材
          collect: this.activeName === 'collect', // false // 请求的全部素材query参数也就是get参数
          page: this.page.currentPage, // 取页码变量中的值，页码变量一变，获取的数量跟着变
          per_page: this.page.pageSize// 获取每页的数量
        },
        data: {}// body参数data参数
      }).then(result => {
        // 将返回的数据赋值到data中的数据
        // debugger
        this.list = result.data.results
        // 将总数赋值给total变量
        this.page.total = result.data.total_count
        // 总数，全部素材和收藏素材的总数
      })
    },
    // 切换页签事件
    changeTab () {
      this.page.currentPage = 1// 将页码重置为第一页，分类换了，数据变了
      // alert(this.activeName)
      // 根据activeName来判断获取的是全部还是收藏
      // activeName === 'all' 获取所有的素材  activeName = 'collect' 获取收藏素材
      this.getMaterial()// 获取素材
    }
  },

  created () {
    // 实例化之后，调用，获取素材数据
    this.getMaterial()// 获取素材数据
  }

}
</script>

<style lang="less" scoped>
.img-list{
  display: flex;
  flex-wrap: wrap;//换行
  justify-content: center;//主轴的对齐方式
  .img-card{
    position: relative;
    height: 220px;
    width: 240px;
    margin: 20px 10px;
    img{
      width: 100%;
      height: 100%;
    }
    .operate{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: #f4f5f6;
      height: 30px;
      i{
        font-size: 20px;
      }
    }
  }
}
</style>
