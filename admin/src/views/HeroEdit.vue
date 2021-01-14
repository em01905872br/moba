<template lang="">
    <div>
      <h1>{{id?'编辑':'新建'}}英雄</h1>  
      <el-form label-width="120px" @submit.native.prevent='save'>
	  		<!-- value 表示默认选中 el-tab-pane 的模块 -->
	  		<el-tabs value="basic" type="border-card">
				<el-tab-pane label = "基础信息" name="basic">
					<el-form-item label="名称：">
						<el-input v-model='model.name'></el-input>
					</el-form-item>
					<el-form-item label="称号：">
						<el-input v-model='model.title'></el-input>
					</el-form-item>
					<el-form-item label="头像：">
							<!-- action 是上传的请求地址
								on-success 是上传成功的地址
							-->
							<el-upload
								class="avatar-uploader"
								:action="upUrl"
								:headers="getAuthHeaders()"
								:show-file-list="false"
								:on-success="res => $set(model, 'avatar', res.url)">
								<!-- 如果有图片地址就显示图片，没有就显示上传图标 -->
								<img v-if="model.avatar" :src="model.avatar" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
					</el-form-item>
					
					<el-form-item label="背景图：">
							<el-upload
								class="avatar-uploader"
								:action="upUrl"
								:headers="getAuthHeaders()"
								:show-file-list="false"
								:on-success="res => $set(model, 'banner', res.url)">
								<!-- 如果有图片地址就显示图片，没有就显示上传图标 -->
								<img v-if="model.banner" :src="model.banner" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
					</el-form-item>

					<el-form-item class="sideLeft" label="类型：">
						<el-select v-model='model.categories' multiple >
							<el-option v-for="item of categories" :key="item._id"
							:label="item.name" :value="item._id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="sideLeft" label="难度：">
						<el-rate class="marginTop" :max="9" show-score v-model='model.scores.difficult'></el-rate>
					</el-form-item>
					<el-form-item class="sideLeft" label="技能：">
						<el-rate class="marginTop" :max="9" show-score v-model='model.scores.skills'></el-rate>
					</el-form-item>
					<el-form-item class="sideLeft" label="攻击：">
						<el-rate class="marginTop" :max="9" show-score v-model='model.scores.attack'></el-rate>
					</el-form-item>
					<el-form-item class="sideLeft" label="生存：">
						<el-rate class="marginTop" :max="9" show-score v-model='model.scores.survive'></el-rate>
					</el-form-item>
					<el-form-item class="sideLeft" label="顺风出装：">
						<el-select v-model='model.items1' multiple >
							<el-option v-for="item of items" :key="item._id"
							:label="item.name" :value="item._id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="sideLeft" label="逆风出装：">
						<el-select v-model='model.items2' multiple >
							<el-option v-for="item of items" :key="item._id"
							:label="item.name" :value="item._id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="使用技巧">
						<el-input type="textarea" v-model="model.usageTips"></el-input>
					</el-form-item>
					<el-form-item label="对抗技巧">
						<el-input type="textarea" v-model="model.battleTips"></el-input>
					</el-form-item>
					<el-form-item label="团战思路">
						<el-input type="textarea" v-model="model.teamTips"></el-input>
					</el-form-item>
				</el-tab-pane>

				<el-tab-pane label="技能" name="skills">
					<!--<el-button size="small" @click="id ? model.skills.push({}) : model.skills.unshift({})"><i class="el-icon-plus"></i> 添加技能</el-button>-->
					<el-button size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i> 添加技能</el-button>
					<!-- 用 flex 布局 -->
					<el-row type="flex" class="wrap">
						<!-- 中等屏幕及其以上显示两列 -->
						<el-col :md="12" v-for="(item, index) in model.skills" :key="index">
							<el-form-item label="名称">
								<el-input v-model="item.name"></el-input>
							</el-form-item>
							<el-form-item label="图标">
								<el-upload
									class="avatar-uploader"
									:action="upUrl"
									:headers="getAuthHeaders()"
									:show-file-list="false"
									:on-success="res=> $set(item, 'icon', res.url)">
									<!-- 如果有图片地址就显示图片，没有就显示上传图标 -->
									<img v-if="item.icon" :src="item.icon" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>

							<el-form-item label="冷却值">
								<el-input v-model="item.delay" type="textarea"></el-input>
							</el-form-item>
							<el-form-item label="消耗">
								<el-input v-model="item.cost" type="textarea"></el-input>
							</el-form-item>
							<el-form-item label="描述">
								<el-input v-model="item.description" type="textarea"></el-input>
							</el-form-item>
							<el-form-item>		
								<el-button size="small" type="danger"
									@click="model.skills.splice(index,1)"
								>删除技能
								</el-button>
							</el-form-item>
							<el-divider class="lineWidth">技能{{index+1}}</el-divider>
						</el-col>
					</el-row>
				</el-tab-pane>

				<el-tab-pane label="最佳搭档" name="partners">
					<el-button size="small" @click="model.partners.push({})"><i class="el-icon-plus"></i> 添加英雄</el-button>
					<el-row type="flex" class="wrap">
						<el-col :md="12" v-for="(item, index) in model.partners" :key="index">
							<el-form-item label="英雄">
								<el-select filterable v-model="item.hero">
									<el-option
										v-for="hero in heroes"
										:key="hero._id"
										:value="hero._id"
										:label="hero.name"
										></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="描述">
								<el-input v-model="item.description" type="textarea"></el-input>
							</el-form-item>
							<el-form-item>		
								<el-button size="small" type="danger"
									@click="model.partners.splice(index,1)">删除
								</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
			<el-tabs>
				
			</el-tabs>
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
				categories: [],
				items: [],
				heroes: [],
				model: {
					name: '',
					avatar: '',
					skills: [],
					partners: [],
					scores: {
						difficult: 0,
					},
				},
				
			}
		},
		methods: {
			async save() {
				// 判断是新建还是编辑
				let res // eslint-disable-line no-unused-vars
				if (this.id) {
					// 有id 使用 put 进行添加
					res = await this.$http.put(`rest/heroes/`+this.id, this.model)
				} else {
					res = await this.$http.post('rest/heroes', this.model)
				}
				// let res = await this.$http.post('heroes', this.model);// eslint-disable-line no-unused-vars
				// 重定向新路由
				this.$router.push('/heroes/list')
				// 提示保存成功
				this.$message({
					type: 'success',
					message: '保存成功',
				})
			},
			async fetch() {
				// 访问后端接口
				const res = await this.$http.get(`rest/heroes/`+this.id) // eslint-disable-line no-unused-vars
				// res.data 赋值会把 model 覆盖掉，就不能显示 scores数据
				// this.model = res.data;
				// 这样就相当于对象合并， res.data 中的数据与 model 中的数据合并，二者数据互补，不是 res.data 覆盖 model；如果二者有同名数据，res 会覆盖掉原有的，保留 model 仅有的数据且不做改变
				this.model = Object.assign({}, this.model,res.data)
			},
			async fetchCategories() {
				// 访问后端接口
				const res = await this.$http.get(`rest/categories`) // eslint-disable-line no-unused-vars
				this.categories = res.data;
			},
			async fetchItems() {
				// 访问后端接口
				const res = await this.$http.get(`rest/items`) // eslint-disable-line no-unused-vars
				this.items = res.data;
			},
			async fetchHeroes() {
				// 访问后端接口
				const res = await this.$http.get(`rest/heroes`) // eslint-disable-line no-unused-vars
				this.heroes = res.data;
			},
			
		},
		// 页面渲染出来，如果是编辑的话需要把要编辑的内容填充到页面上面
		created() {
			this.fetchItems();
			this.fetchHeroes();
			this.fetchCategories();
			// 如果有 id 这个属性，那么就执行 fetch 函数
			this.id && this.fetch()
		},
	}
</script>

<style>

</style>