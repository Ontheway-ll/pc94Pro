<template>
  <div class="cover-image">
<!-- v-for循环，循环生成谁就在谁的标签上写 -->
<div v-for="(item,index)  in list " :key="index" class="cover-image-item">
    <!-- 图片的地址应该是item -->
    <!-- 一开始item是空字符串，因为此时还没有选择图片
    此时应该根据item是否有值来显示是默认图片还是item的值
    如果item没有值显示默认图片，item不是固定地址的话应该先把他转化成变量 -->
    <img :src="item ? item : defaultImg" alt="">
</div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  // props接收传过来的属性值
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png')
    }
  }
}
</script>

<style lang="less" scoped>
.cover-image{
    display: flex;
    margin: 20px 100px;
    .cover-image-item{
        border: 1px solid #ccc;
        width: 250px;
        height: 250px;
        padding: 20px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
