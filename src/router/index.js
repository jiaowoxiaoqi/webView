import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 登陆
    {
      path: '/',
      name: 'login',
      component: (res) => {
        require(['@/views/login'], res)
      }
    },
    // 首页
    {
      path: '/chooseMudel',
      name: 'choosePage',
      component: (res) => {
        require(['@/views/chooseMudel'], res)
      }
    },
    // 我的推荐--外卖/茶歇
    {
      path: '/recommended',
      name: 'recommended',
      component: (res) => {
        require(['@/views/recommended.vue'], res)
      }
    },
    // 选择地址
    {
      path: '/selectAddres',
      name: 'selectAddres',
      component: (res) => {
        require(['@/views/selectAddres.vue'], res)
      }
    },
    // meiCan系列路由
    {
      path: '/meiCan/selectShop',
      name: 'selectShop',
      component: (res) => {
        require(['@/views/meiCan/step1SelectShop.vue'], res)
      }
    },
    {
      path: '/entryShop',
      name: 'entryShop',
      component: (res) => {
        require(['@/views/meiCan/step2EntryShop.vue'], res)
      }
    },
    // takeAway系列路由
    {
      path: '/takeAway/entryTakeAway',
      name: 'entryTakeAway',
      component: (res) => {
        require(['@/views/takeAway/step1EntryTakeAway.vue'], res)
      }
    },
    // 地图
    {
      path: '/map',
      name: 'Map',
      component: (res) => {
        require(['@/views/map.vue'], res)
      }
    }
  ]
})
