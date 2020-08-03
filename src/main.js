// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css' //element-ui的css
import mixins from './mixins'
import axios from 'axios'

Vue.use(ElementUI) //使用elementUI
Vue.mixin(mixins)

axios.defaults.withCredentials = true
Vue.prototype.$axios = axios

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { //匹配前往的路由不存在
    from.name ? next({
      name: from.name
    }) : next('/signin'); //判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
    return
  }
  if (to.matched.some(record => record.meta.requireLogin)) {
    if ('userId' in store.state.loginedInfo && store.state.loginedInfo['userId']) {
      // next()
    } else {
      next({
        path: '/signin'
      })
      return
    }
  }
  /*if (to.matched.some(record => record.meta.requireAdmin)) {

    if (store.state.league.isLeagueAdmin == 1) {
      // next()
    } else {
      next({
        path: '/mine'
      })
      return
    }
  }*/

  next(); //如果匹配到正确跳转
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})

