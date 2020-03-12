<template>
<!--             频道的数据加载步骤
      1 定义数据
      2 调用接口频道数据，加载到定义的数据
      3 绑定到页面，绑定到select组件    -->

      <!--       发表文章逻辑实现
      1 表单检验准备
          @model 绑定 表单数据对象 :model="publishForm"
          @rules 绑定 表单校验规则 :rules="publishRules"
          @prop要设置el-form-item要校验的字段名
          @需要对组件使用v-model双向绑定
      2 表单规则编写
          @对表单规则进行编写，required,必填项，pattern正则表达式，validator自定义校验函数，message提示消息
           向input类型，不想一写内容就校验，二是离开在校验
          @ 其他属性，trigger,触发类型，什么时候触发检验规则，默认值change（一发生改变就校验）
            离开焦点校验blur
      3 手动校验表单
          @获取组件el-form组件实例，调用validate方法，通过ref来获取
      4 通过发表和草稿调用发布接口
      5 文章列表和发表文章串联起来，发表文章承载两个功能，新增，和修改文章
        点击修改文章跳到文章列表，在文章列表页面跳转的同时需要把ID也传过去，
        路由传值，第一：动态路由传值给路由规则加参数path:/use/参数名，传递参数<router-link to="/user/123",取参数this.$route.params参数名
                  第二 query传值，地址中的？属性=值，，this.$route.query.属性
       -->
  <el-card>
      <bread-crumb slot="header">
            <template slot="title">发布文章</template>
      </bread-crumb>
      <!--表单组件 -->
      <el-form  ref="myForm" label-width="100px" :model="publishForm" :rules="publishRules">
          <el-form-item label="标题" prop="title">
              <el-input v-model="publishForm.title" style="width:50%" placeholder="输入标题"></el-input>
          </el-form-item>
          <el-form-item  label="内容" prop="content">
              <el-input v-model="publishForm.content" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="封面" prop="cover">
              <!-- 单选框组 -->
              <!-- 封面单选组绑定的是cover下的type -->
              <el-radio-group v-model="publishForm.cover.type">
                  <!-- 给el-radio加上:label属性 -->
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>
                  <el-radio :label="0">无图</el-radio>
                  <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="频道" prop="channel_id">
              <el-select v-model="publishForm.channel_id"  placeholder="请选择频道">
                  <!-- 循环生成谁就在谁的标签上循环 -->
                  <!-- label显示值，value保存值 -->
                  <el-option :label="item.name" :value="item.id" v-for="item in channels" :key="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
               <el-button @click="publish(false)" type="primary">发表</el-button>
                <el-button @click="publish(true)">存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>

</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接收频道数据
      publishForm: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // -1自动，0无图，1，1张，3，3张
          images: []
        },
        channel_id: null// 频道ID为空
      }, // 发布表单数据，里面有一些字段
      //   发布表单的校验规则
      publishRules: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }, {
          min: 5, max: 30, message: '标题在5-30个字符之间', trigger: 'blur'
        }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        channel_id: [{ required: true, message: '频道不能为空', trigger: 'blur' }]
      }
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
    },
    // 发布
    publish (fig) {
      // 通过this.$refs获取el-form实例，调用validate方法
      // validate有两种方法，1 回调形式 2 promise
      // 回调形式
      //   this.$refs.myForm.validate(function (isOK) {
      //     if (isOK) {
      //       //   调用发布接口
      //     }
      //   })
      this.$refs.myForm.validate().then(() => {
        this.$axios({
          url: '/articles',
          method: 'post',
          params: { draft: fig }, // query参数
          data: this.publishForm
        }).then(() => {
          this.$message.success('发布成功')
          //   发布成功后，编程式导航回到文章列表
          this.$router.push('/home/articles')
        }).catch(() => {
          this.$message.error('发表失败')
        })
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
