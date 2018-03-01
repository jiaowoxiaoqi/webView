import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import {MessageBox} from 'mint-ui'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // 登陆
    {
      path: '/',
      name: 'login',
      component: (res) => {
        require(['@/views/login'], res)
      },
      meta: {
        allowAnonymous: true
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

function userConfig () {
  let ishopParam = JSON.parse(sessionStorage.getItem('iShopParam'))
  let ishopRuleMsg = JSON.parse(sessionStorage.getItem('ishopRuleMsg'))
  let ishopSubmitMsg = JSON.parse(sessionStorage.getItem('ishopSubmitMsg'))
  let recommendConfig = JSON.parse(sessionStorage.getItem('recommendConfig'))
  if (ishopParam) {
    store.commit('setIshopParam', ishopParam)
  }
  if (ishopRuleMsg) {
    store.commit('setIshopRuleMsg', ishopRuleMsg)
  }
  if (ishopSubmitMsg) {
    store.commit('setIshopSubmitMsg', ishopSubmitMsg)
  }
  if (recommendConfig) {
    store.commit('setRecommendConfig', recommendConfig)
  }
}

// mutations store state from sessionstorage
router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    if (from.path !== '/') {
      next(false)
      MessageBox.confirm('是否确认退出').then(action => {
        if (action === "confirm") {
          sessionStorage.clear()
          next()
          //关闭webview
          if (window.webView) {
            window.webView.close();
          }
        }
      }).catch(err => {
        console.log(err)
      })
    } else {
      sessionStorage.clear()
      next()
    }
  } else {
    if (!to.meta.allowAnonymous) {
      const token = sessionStorage.getItem('token')
      if (!token && to.path !== '/') {
        next({
          path: '/'
        })
        return
      }
    }
    next()
  }
})
router.afterEach((to, from, next) => {
  userConfig()
})

export default router
