/** store==>index.js
 * 相关store文档参见：
 * https://vuex.vuejs.org/
 * 本项目采用store ==> modules进行状态管理
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import vuxStatus from './model/vuxStatus'
import userConfig from './model/userConfig'
import shopInfo from './model/shopInfo'

const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  modules: {
    vuxStatus: vuxStatus,
    userConfig: userConfig,
    shopInfo: shopInfo
  }
})

export default store
