// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/index'


const FastClick = require('fastclick')
FastClick.attach(document.body)
import './assets/js/rem'
import './assets/css/iconfont/iconfont.js'
import './assets/css/iconfont/iconfont.css'
import './assets/css/app.css'

Vue.config.productionTip = false

Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
