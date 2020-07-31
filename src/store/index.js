import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
//import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)
const store = new Vuex.Store({
  //actions,
  mutations,

  state: {
    loginedInfo:{}, // 记录登陆后的信息，包括登录用户的加入的团组织

    league: '', // 当前登录用户所在的组织，（用户有可能登陆后切换到其他组织，因为一个用户有可能同时在多个组织）
    user: {},
    tips:{},
    commonparams: {}, // 用于兄弟组件间传递数据参数，父子组件使用props和$emit传递

    csrftoken:'', // CSRF的token值

    unreadMsgCount:0,
    TzyLeagueId:"",
  },

  getters: {

  },
 plugins:[createPersistedState()]
})

// window && window.localStorage.clear()
export default store
