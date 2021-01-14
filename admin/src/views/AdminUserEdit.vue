<template lang="">
    <div>
      <h1>{{id?'编辑':'新建'}}管理员</h1>  
      <el-form label-width="120px" @submit.native.prevent='save'>
          <el-form-item label="用户名：">
              <el-input v-model='model.username'></el-input>
          </el-form-item>
          <el-form-item label="密码：">
              <el-input type="password" v-model='model.password'></el-input>
          </el-form-item>
          <el-form-item class="sideCenter">
              <el-button type="primary" native-type="submit">提交</el-button>
          </el-form-item>
      </el-form> 
    </div>
</template>

<script>
	export default {
		props: {
			// 能够与 路由 解耦
			id: {},
		},
		data() {
			return {
				model: {},
			}
		},
		methods: {
			async save() {
				// 判断是新建还是编辑
				let res // eslint-disable-line no-unused-vars
				if (this.id) {
					// 有id 使用 put 进行添加
					res = await this.$http.put(`rest/admin_users/`+this.id, this.model)
				} else {
					res = await this.$http.post('rest/admin_users', this.model)
				}
				// 重定向新路由
				this.$router.push('/admin_users/list')
				// 提示保存成功
				this.$message({
					type: 'success',
					message: '保存成功',
				})
			},
			async fetch() {
				// 访问后端接口
				const res = await this.$http.get(`rest/admin_users/`+this.id) // eslint-disable-line no-unused-vars
				this.model = res.data;
			},
		},
		// 页面渲染出来，如果是编辑的话需要把要编辑的内容填充到页面上面
		created() {
			// 如果有 id 这个属性，那么就执行 fetch 函数
			this.id && this.fetch()
		},
	}
</script>

<style>
</style>