<template lang="">
    <div>
      <h1>创建分类</h1>  
      <el-form label-width="120px" @submit.native.prevent='save'>
          <el-form-item label="名称">
              <el-input v-model='model.name'></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" native-type="submit">提交</el-button>
          </el-form-item>
      </el-form>
    </div>
</template>

<script>
const promisify = require('util').promisify;// eslint-disable-line no-unused-vars
export default {
    
    data(){
        return {
            model: {}
        }
    },
    methods: {
        async save() {
            console.log(11);
            
            const res = await this.$http.post('categories', this.model);// eslint-disable-line no-unused-vars
           

            // 这个是重定向新路由
            this.$router.push('/categories/list');
            console.log(33);
            // 提示保存成功
            this.$message({
                type: 'success',
                message: '保存成功'
            })
        }
    },
}
</script>