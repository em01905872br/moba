<template lang="">
    <div>
      <h1>{{id?'编辑':'新建'}}物品</h1>  
      <el-form label-width="120px" @submit.native.prevent='save'>
          <el-form-item label="名称：">
              <el-input v-model='model.name'></el-input>
          </el-form-item>
          <el-form-item label="图标：">
		  		<!-- action 是上传的请求地址
				  	 on-success 是上传成功的地址
				  -->
				<el-upload  v-model='model.icon'
					class="avatar-uploader"
					:action="upUrl"
					:headers="getAuthHeaders()"
					:show-file-list="false"
					:on-success="afterUpload">
					<!-- 如果有图片地址就显示图片，没有就显示上传图标 -->
					<img v-if="model.icon" :src="model.icon" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
          </el-form-item>
          <el-form-item class="sideCenter">
              <el-button type="primary" native-type="submit">保存</el-button>
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
			// 接收到一个参数，表示向服务端传递的值
			afterUpload(res) {
				// 显性赋值 第一个值是要赋值的对象，第二个是赋值的属性，第三个是把要赋值的值
				// 如果要赋的值在data中没有，就要只用这种方法
				this.$set(this.model, 'icon', res.url);
			},
			async save() {
				// 判断是新建还是编辑
				let res // eslint-disable-line no-unused-vars
				if (this.id) {
					// 有id 使用 put 进行添加
					res = await this.$http.put(`rest/items/`+this.id, this.model)
				} else {
					res = await this.$http.post('rest/items', this.model)
				}
				// let res = await this.$http.post('items', this.model);// eslint-disable-line no-unused-vars
				// 重定向新路由
				this.$router.push('/items/list')
				// 提示保存成功
				this.$message({
					type: 'success',
					message: '保存成功',
				})
			},
			async fetch() {
				// 访问后端接口
				const res = await this.$http.get(`rest/items/`+this.id) // eslint-disable-line no-unused-vars
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