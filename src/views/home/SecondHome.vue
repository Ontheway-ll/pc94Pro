<template>
<!-- 二级路由默认组件 -->
  <div class="SecondHome">
      <!-- 幻灯片 -->
<el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in list" :key="item">
     <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583411704362&di=f3bdb7a745683ae65bee9ac843eec9f9&imgtype=0&src=http%3A%2F%2Fwww.pptbz.com%2Fppt%2Fuploadsoftpic%2F201407%2F2014072910030296.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583411755214&di=483f0aaec693083b1cd46f169a92f303&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F4ec2d5628535e5dddaa4db7076c6a7efcf1b6290.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583411777740&di=a0e3f701df2da5aab49dd5e943555e6c&imgtype=0&src=http%3A%2F%2Ffile04.16sucai.com%2Fd%2Ffile%2F2015%2F0418%2F211906b589a210685e685e12b4330ce5.jpg',
        'http://img.duoziwang.com/2018/04/2411122326443.jpg'
      ]
    }
  }
}
</script>

<style lang="less">
.SecondHome{
  /* calc 计算的 意思 在css中计算数值 用法  calc ( 四则运算  ) 变量之间 和运算符之间一定要有空格 */
    height: calc(100vh - 60px);
    background-size: cover;
    background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583410611302&di=4ca93497d76418ba2fd1cb418c25b5e2&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201508%2F07%2F20150807192009_nzCQN.jpeg");
    img{
      width: 100%;
      height: 100%;
    }
}
</style>
