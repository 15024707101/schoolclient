import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../components/page/SignIn.vue'], resolve),
    },
    {
      path: '/userlist',
      component: resolve => require(['../components/page/userList.vue'], resolve),
    }
  ]
})
