import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store/index'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component:  (resolve) => {
        require(['@/components/HelloWorld'], resolve);
      },
    },{
      path: '/addEvent',
      name: 'addEvent',
      component:  (resolve) => {
        require(['@/views/addEvent'], resolve);
      },
    }
  ]
})

router.beforeEach(function (to, from, next) {
  store.commit('CHANGE_LOADSTATUs', true)
  next()
})

router.afterEach(function (to) {
  store.commit('CHANGE_LOADSTATUs', false)
})

export default router;
