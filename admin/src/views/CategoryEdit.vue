<template lang="">
    <div>
      <h1>{{id?'编辑':'新建'}}分类</h1>  
      <el-form label-width="120px" @submit.native.prevent='save'>
          <el-form-item class="words" label="上级分类：">
              <el-select v-model='model.parent'>
					<el-option v-for="item in parents" :key='item._id' :label="item.name" :value="item._id"></el-option><!-- label 是展示的内容，value 是传递的值 -->
				</el-select>
          </el-form-item>
          <el-form-item label="分类名称：">
              <el-input v-model='model.name'></el-input>
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
				parents: []
			}
		},
		methods: {
			async save() {
				// 判断是新建还是编辑
				let res // eslint-disable-line no-unused-vars
				if (this.id) {
					// 有id 使用 put 进行添加
					res = await this.$http.put(`rest/categories/`+this.id, this.model)
				} else {
					res = await this.$http.post('rest/categories', this.model)
				}
				// let res = await this.$http.post('categories', this.model);// eslint-disable-line no-unused-vars
				// 重定向新路由
				this.$router.push('/categories/list')
				// 提示保存成功
				this.$message({
					type: 'success',
					message: '保存成功',
				})
			},
			async fetch() {
				// 访问后端接口
				const res = await this.$http.get(`rest/categories/`+this.id) // eslint-disable-line no-unused-vars
				this.model = res.data;
			},
			// 获取到data 中的 parents 数组
			async fetchParents() {
				// 访问后端接口，获取到的是列表页的数据，直接请求列表页的接口
				const res = await this.$http.get(`rest/categories`) // eslint-disable-line no-unused-vars
				this.parents = res.data;
			},
		},
		// 页面渲染出来，如果是编辑的话需要把要编辑的内容填充到页面上面
		created() {
			this.fetchParents();
			// 如果有 id 这个属性，那么就执行 fetch 函数
			this.id && this.fetch()
		},
	}
</script>

<style>
</style>