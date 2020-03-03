<template>
   <!-- elementUI布局组件 el-row 和 el-col -->
    <el-row type='flex' align="middle" class='layout-header'>
    <!-- 等分为两列  为什么是:span="12"-->
    <el-col class="left" :span="12">
         <!-- 图标 -->
       <i class='el-icon-s-fold'></i>
       <span>
           江苏传智播客教育科技股份有限公司
       </span>
        </el-col>
        <!-- 右侧列 -->
        <el-col class="right" :span="12">
            <!--  align属性设置垂直对齐方式  justify设置 水平对齐属性    -->
         <el-row type='flex' justify="end" align="middle">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583259050447&di=b13623a9981dacccb34fa104a568a7c0&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F78%2F52%2F01200000123847134434529793168.jpg" alt="">
        <el-dropdown trigger="click">
            <!-- 显示内容 -->
            <span class="hand">点击我</span>
            <!-- 下拉内容需要做具名插槽dropdown  el-dropdown-menu是专门做下拉的组件 -->
            <el-dropdown-menu slot="dropdown" >
                <!-- 下拉选项 -->
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>git地址</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        </el-row>
        </el-col>
    </el-row>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.layout-header{
    height: 60px;
    .left{
        i{font-size: 20px;}
    }
    .right{
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 4px;

        }
    }
    .hand{
        cursor: pointer;
    }
}
</style>
