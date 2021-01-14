<template lang="">
    <div>
      <h1>{{id?'编辑':'新建'}}文章</h1>  
      <el-form label-width="120px" @submit.native.prevent='save'>
          <el-form-item class="words" label="所属分类：">
              <el-select v-model='model.categories' multiple >
					<el-option v-for="item in categories" :key='item._id' :label="item.name" :value="item._id"></el-option><!-- label 是展示的内容，value 是传递的值 -->
				</el-select>
          </el-form-item>
          <el-form-item label="文章标题：">
              <el-input v-model='model.title'></el-input>
          </el-form-item>
          <el-form-item label="文章详情：">
              <vue-editor v-model='model.body'
			  	useCustomImageHandler 
				@image-added="handleImageAdded"></vue-editor>
          </el-form-item>
          <el-form-item class="sideCenter">
              <el-button type="primary" native-type="submit">提交</el-button>
          </el-form-item>
      </el-form> 
    </div>
</template>

<script>
	import { VueEditor } from "vue2-editor";
	export default {
		props: {
			// 能够与 路由 解耦
			id: {},
		},
		components: { 
			VueEditor 

		},
		data() {
			return {
				model: {},
				categories: []
			}
		},
		methods: {
			async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
				const formData = new FormData();
				// file 是文件对象
				formData.append("file", file);
				const res = await this.$http.post('upload', formData);
				Editor.insertEmbed(cursorLocation, "image", res.data.url);
				resetUploader();
			},
			async save() {
				// 判断是新建还是编辑
				let res // eslint-disable-line no-unused-vars
				if (this.id) {
					// 有id 使用 put 进行添加
					res = await this.$http.put(`rest/articles/`+this.id, this.model)
				} else {
					res = await this.$http.post('rest/articles', this.model)
				}
				// let res = await this.$http.post('articles', this.model);// eslint-disable-line no-unused-vars
				// 重定向新路由
				this.$router.push('/articles/list')
				// 提示保存成功
				this.$message({
					type: 'success',
					message: '保存成功',
				})
			},
			async fetch() {
				// 访问后端接口
				const res = await this.$http.get(`rest/articles/`+this.id) // eslint-disable-line no-unused-vars
				this.model = res.data;
			},
			// 获取到data 中的 parents 数组
			async fetchCategories() {
				// 访问后端接口，获取到的是列表页的数据，直接请求列表页的接口
				const res = await this.$http.get(`rest/categories`) // eslint-disable-line no-unused-vars
				this.categories = res.data;
			},
		},
		// 页面渲染出来，如果是编辑的话需要把要编辑的内容填充到页面上面
		created() {
			this.fetchCategories();
			// 如果有 id 这个属性，那么就执行 fetch 函数
			this.id && this.fetch()
		},
	}
</script>

<style>
</style>