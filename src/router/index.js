import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      component: resolve => require(['../components/page/SignIn.vue'], resolve),
    },
    {
      path: 'signin',
      component: resolve => require(['../components/page/SignIn.vue'], resolve),
    },
    {
      path: '/center',
      component: home,
      meta: {
        requireLogin: true,
        requireAdmin:true
      },
      children: [
        {
          path: 'userlist',
          component: resolve => require(['../components/page/userList.vue'], resolve),
        }
      ]
    },

  ]
})