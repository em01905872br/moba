<template lang="">
    <div>
      <h1>{{id?'编辑':'新建'}}广告位</h1>  
      <el-form label-width="120px" @submit.native.prevent='save'>
          <el-form-item label="广告位名称：">
              <el-input v-model='model.name'></el-input>
          </el-form-item>

		  <el-form-item label="广告：">
			<el-button size="small" @click="model.items.push({})"><i class="el-icon-plus"></i> 添加广告</el-button>
			<!-- 用 flex 布局 -->
			<el-row type="flex" class="wrap">
				<!-- 中等屏幕及其以上显示两列 -->
				<el-col :md="24" v-for="(item, index) in model.items" :key="index">
					<el-form-item label="跳转链接">
						<el-input v-model="item.url"></el-input>
					</el-form-item>
					<el-form-item label="图片" class="marginTop">
						<el-upload
							class="avatar-uploader"
							:action="$http.defaults.baseURL + '/upload' "
							:show-file-list="false"
							:on-success="res=> $set(item, 'image', res.url)">
							<!-- 如果有图片地址就显示图片，没有就显示上传图标 -->
							<img v-if="item.image" :src="item.image" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					
					<el-form-item class="sideRight">		
						<el-button size="small" type="danger"
							@click="model.items.splice(index,1)"
						>删除广告
						</el-button>
					</el-form-item>
					<el-divider class="lineWidth">广告{{index+1}}</el-divider>
				</el-col>
			</el-row>
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
				model: {
					items: []
				},
			}
		},
		methods: {
			async save() {
				// 判断是新建还是编辑
				let res // eslint-disable-line no-unused-vars
				if (this.id) {
					// 有id 使用 put 进行添加
					res = await this.$http.put(`rest/ads/`+this.id, this.model)
				} else {
					res = await this.$http.post('rest/ads', this.model)
				}
				// let res = await this.$http.post('ads', this.model);// eslint-disable-line no-unused-vars
				// 重定向新路由
				this.$router.push('/ads/list')
				// 提示保存成功
				this.$message({
					type: 'success',
					message: '保存成功',
				})
			},
			async fetch() {
				// 访问后端接口
				const res = await this.$http.get(`rest/ads/`+this.id) // eslint-disable-line no-unused-vars
				this.model = Object.assign({}, this.model, res.data);
				
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
	.sideRight {
		text-align: center; 
		position: relative;
		left: 1.5rem;
	}
	.lineWidth {
		width: 85%;
		position: relative;
		left: 5.6rem;
	}
</style>