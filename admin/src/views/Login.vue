<template>
	<div class="login-container">
		<el-card header="请先登录" class="login-card">
		  <!-- native 表示监听表单原生事件-->
			<el-form @submit.native.prevent="login">
				<el-form-item label="用户名：">
					<el-input class="login-input" v-model="model.username"></el-input>
				</el-form-item>
				<el-form-item label="密 码 ：">
					<el-input class="login-input" type="password" v-model="model.password"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" native-type="submit">登录</el-button>
				</el-form-item>

			</el-form>
		</el-card>
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data() {
    return {
      model: {}
    }
  },
  methods: {
	  // 请求登录接口
    async login() {
      // this.model 里面包含了用户名和密码等页面上用户填写的信息
      const res = await this.$http.post('login', this.model);
      localStorage.token = res.data.token;
      this.$router.push('/');
      this.$message({
        type: 'success',
        message: '登录成功'
      })
    }
  },
}
</script>

<style>
  .login-card {
    width: 30rem;
    margin: 6rem auto;
    text-align: center;
    font-weight: 600;
    font-size: 1.35rem;
    letter-spacing: .3125rem;
    
  }
  /* .login-form {
    text-align: justify;
  }
  .login-form:after {
    content: "";
    display: inline-block;
    width: 100%;
  } */
  .login-input {
    width: 80%;
  }
</style>
