// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import tool from 'toolmanage'
import App from './App'
import router from './router'
import store from './store/index'
import axios from './api/axios'
import api from './api/api'

Vue.config.productionTip = false

// 移除移动端点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

// 添加至vue prototype下的内容
Vue.prototype.axios = axios
Vue.prototype.api = api
Vue.prototype.tool = tool

// 引入rem.js及一些css
import '@/assets/js/rem'
import '@/assets/css/app.css'
import '@/assets/css/iconfont/iconfont.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
