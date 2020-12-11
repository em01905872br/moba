import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false;

import http from './http';
// 挂载到 vue 上面，在任何页面都可以 this.http 调用这个接口
Vue.prototype.$http = http;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
