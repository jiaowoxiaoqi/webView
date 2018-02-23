/**  axios
 * 更多详情见axios文档
 * zn: https://www.kancloud.cn/yunye/axios/234845
 * io: https://www.npmjs.com/package/axios
 */

import axios from 'axios'
import qs from 'qs'

import apiConfig from './apiConfig'
import { storage } from 'toolmanage'
import store from '@/store/index';
import { mapMutations } from 'vuex';

/** axios默认全局配置 */

axios.defaults.baseURL = apiConfig.ishopBase
axios.defaults.timeout = 30000
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'

/** axios拦截器 */

// 添加请求拦截器
axios.interceptors.request.use(
  // 请求发送前进行处理
  (request) => {
    console.log(request,'req')
    if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      request.data = qs.stringify(request.data)
    }
    storage.driver('session')
    let token = storage.get('token')
    if (token && token != null) {
      request.headers['Authorization'] = 'Bearer ' + token
    }
    store.commit('setIsLoading', true)
    return request
  // 请求错误时处理
  }, (eror) => {
    console.log(error,'reqerror')
    store.commit('setIsLoading', false)
    return eror
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  // 获取响应数据进行处理
  (response) => {
    console.log(response,'res')
    store.commit('setIsLoading', false)
    return response.data
  // 响应失败时处理
  }, (error) => {
    console.log(error,'reserror')
    store.commit('setIsLoading', false)
    return error
  },
  
)

export default axios
