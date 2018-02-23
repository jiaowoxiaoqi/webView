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
        require(['@/views/login'], res);
      }
    },
    // 首页
    {
      path: '/chooseMudel',
      name: 'choosePage',
      component: (res) => {
        require(['@/views/chooseMudel'], res);
      }
    },
    // meiCan系列路由
    {
      path: '/recommendedMeiCan',
      name: 'recommendedMeiCan',
      component: (res) => {
        require(['@/views/meiCan/recommendedMeiCan.vue'], res)
      }
    },
      {
        path: '/selectAddres',
        name: 'selectAddres',
        component: (res) => {
          require(['@/views/meiCan/step0SelectAddres.vue'], res)
        }
      },
      {
        path: '/selectShop',
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
      path: '/recommendedTakeAway',
      name: 'recommendedTakeAway',
      component: (res) => {
        require(['@/views/takeAway/recommendedTakeAway.vue'], res)
      }
    }
  ]
})
