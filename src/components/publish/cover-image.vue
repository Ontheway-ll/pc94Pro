<template>
  <div class="cover-image">
<!-- v-for循环，循环生成谁就在谁的标签上写 -->
<div @click="openDialog(index)" v-for="(item,index)  in list " :key="index" class="cover-image-item">
    <!-- 图片的地址应该是item -->
    <!-- 一开始item是空字符串，因为此时还没有选择图片
    此时应该根据item是否有值来显示是默认图片还是item的值
    如果item没有值显示默认图片，item不是固定地址的话应该先把他转化成变量 -->
    <img :src="item ? item : defaultImg" alt="">
</div>
<!-- 采用UI的弹窗组件       事件后面可以跟一个简单逻辑       -->
<el-dialog :visible="dialogVisible" @close="dialogVisible=false" >
  <!-- 在此封装一个图片组件 -->
  <!-- 监听谁就在谁的组件上写v-on @ -->
  <select-img @selectOneimg="receiveimg"></select-img>
</el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  // props接收传过来的属性值
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false, // 控制弹窗的显示和隐藏，默认隐藏
      selectIndex: -1// y用来记录当前点击了哪个索引
    }
  },
  methods: {

    // 点击图片的时候弹窗一个层
    openDialog (index) {
      this.dialogVisible = true
      this.selectIndex = index// 记录点击了哪个图片
    },
    // 接收传递的地址
    receiveimg (url) {
      // alert(url)
      // 拿到了图片地址之后，继续往上传，props不能直接修改，只能读取
      this.$emit('selectTwoimg', url, this.selectIndex)// 再次传递给父组件
      this.dialogVisible = false// 关闭弹层
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
