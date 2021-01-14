import axios from 'axios';
import Vue from 'vue';
import router from './router/index.js'

/* const http = axios.create({
	baseURL: process.env.VUE_APP_API_UPL || '/admin/api',
    // baseURL: 'http://localhost:3000/admin/api'
}) */
const http = axios.create({
	baseURL: process.env.VUE_APP_API_URL || '/admin/api',
	// baseURL: 'http://localhost:3000/admin/api'
})


// 在接口添加 header 数据
http.interceptors.request.use( config => {
	if(localStorage.token) {
		config.headers.Authorization = 'Bearer ' + (localStorage.token || '');
	}
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 全局拦截报错和请求信息
http.interceptors.response.use(res => {
	return res
}, err => {
	if(err.response.data.message) {
		// 使用 element-ui 里面的 $message 方法提示错误信息
		Vue.prototype.$message({
			type: 'error',
			message: err.response.data.message
		})
		console.log(err.response);
		if(err.response.status === 401) {
			console.log(11);
			router.push('/login');
			console.log(22);
		}
	}
	return Promise.reject(err);
})

export default http;