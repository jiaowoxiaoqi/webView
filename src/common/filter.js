import Vue from 'vue'
import { dateFormat } from 'vux'
//过滤为年月日小时分(后台返回格式如2017-12-29T00:00:00)
Vue.filter('dateFormat ',(date,dateLayout)=>{
   return dateFormat(new Date(date), dateLayout);
})