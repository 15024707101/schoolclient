// 请在本地配置host指向127.0.0.1或远程ip
import cons from '../components/cons'

//const _baseURL_ = "http://app.maotai.youth.cn:4345/v1/maotai"

const _baseURL_ = cons.rootUrl + "/"
function jump(to, v) {

  if (v.$router) {
    v.$router.push(to, function () {

    }, function () {

    })
  } else {
    console.log("Not Found router!")
  }
}

function go(n, v) {
  if (v.$router) {
    v.$router.go(n)
  } else {
    console.log("Not Found router!")
  }
}

function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
}


// options axios的options
function PF(v, url, data, options = {}) { // PF == pig fly(猪飞了)
  if (url == false) {
    return false
  }
  if (v.$axios == false) {
    return false
  }

  let o = objToStrMap(options)
  //o.set('withCredentials',true)


  let _url = url
  let _method = 'post'
  let _baseURL = _baseURL_
  let _data = data

  if (!o.has('url')) {
    o.set('url', _url)
  }
  if (!o.has('method')) {
    o.set('method', _method)
  }
  if (!o.has('baseURL')) {
    o.set('baseURL', _baseURL)
  }
  if (!o.has('data')) {
    o.set('data', _data)
  }
  if (o.get('method') == 'post') {
    if (!o.has('headers')) {
      o.set('headers', new Map())
      o.get('headers').set('Content-Type', 'application/json;charset=UTF-8')
    } else {
      if (!o.get('headers').has('Content-Type')) {
        o.get('headers').set('Content-Type', 'application/json;charset=UTF-8')
      }

    }

  }
  o.set('Keep-Alive','timeout=5, max=100')

  options = strMapToObj(o)


  // Add a request interceptor
  v.$axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = v.$store.state.csrftoken
    config.headers = {...config.headers, ...{'X-CSRF-Token': token}}

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
  let that = v
  v.$axios.interceptors.response.use(function (response) {

    /*if(response.config.url.indexOf("signout")!=-1){
      that.$store.commit('CLEAR')
      that.$store.commit('CLEAR_PARAMS')
      window && window.localStorage.clear()
      jump('/signin',that)
      return
    }*/
    if (response && (1009 === response.data.retCode||20000=== response.data.retCode) ) {
      that.$message.close()

      that.$message({
        type:'error',
        showClose: true,
        message:'您的登录已失效，请重新登录',
        onClose:function() {
          that.$store.commit('CLEAR')
          that.$store.commit('CLEAR_PARAMS')
          window && window.localStorage.clear()
          jump('/signin',that)
        }
      })
      // Promise.resolve();
    }else if(response && 9091 === response.data.retCode ) {
      //无权限访问 暂找不到原因但不返回错误
      that.$message.close()
      console.log(response.data.retMsg)
      return
      // Promise.resolve();
    }else {
      if ('X-CSRF-Token' in response.headers) {
        v.$store.commit('SET_CSRF', response.headers['X-CSRF-Token'])
      } else if ('X-Csrf-Token' in response.headers) {
        v.$store.commit('SET_CSRF', response.headers['X-Csrf-Token'])
      } else if ('x-csrf-token' in response.headers) {
        v.$store.commit('SET_CSRF', response.headers['x-csrf-token'])
      } else {
        //v.$store.commit('SET_CSRF','unkown')
      }

      return response;
    }


  }, function (error) {
    // Do something with response error

    if (error.response && 401 === error.response.status) {
      console.log(' in 401 ...')
      v.$message.close()
      v.$message({
        type: 'error',
        message: '您登录超时或还未登录',
        onClose: function () {
          console.log('in interceptor close ...')
          v.$store.commit('CLEAR')
          v.$store.commit('CLEAR_PARAMS')
          window && window.localStorage.clear()
          jump('/signin', v)
        }
      })
      // jump('/signin',v);
    }
    Promise.resolve(error);
  });
  return v.$axios(options)

}


function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
  return currentdate;
}

function checkTel(tel) {
  if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel)) {
    return false;
  }
  return true
}

function checkPhone(phone) {
  if (!(/^1[34578]\d{9}$/.test(phone))) {
    return false;
  }
  return true
}

/**
 * 获取字符串的哈希值
 * @param {String} str
 * @param {Boolean} caseSensitive
 * @return {Number} hashCode
 */
function getHashCode(str,caseSensitive){
  if(!caseSensitive){
    str = str.toLowerCase();
  }
  var hash  =   1315423911,i,ch;
  for (i = str.length - 1; i >= 0; i--) {
    ch = str.charCodeAt(i);
    hash ^= ((hash << 5) + ch + (hash >> 2));
  }
  return  (hash & 0x7FFFFFFF);
}

function alretMessage(that, msgType, msg){
  that.$message({
    showClose: true,
    message: msg,
    type: msgType
  })
}

import {mapState} from "vuex";

export default {

  computed:{
    ...mapState({
      TzyLeagueId:state=>state.TzyLeagueId
    }),
  },



  methods: {
    // isTZB:function(n){
    //   return isTZB(n)
    // },
    go: function (n) {
      return go(n, this)
    },
    jump: function (to) {
      return jump(to, this)
    },
    PF: function (url, data, options) {
      return PF(this, url, data, options)
    },
    baseURL: function () {
      return _baseURL_
    },
    NowFormatDate() {
      return getNowFormatDate()
    },
    checkPhone(phone) {
      return checkPhone(phone)
    },
    checkTel(tel) {
      return checkTel(tel)
    },
    getHashCode(str,caseSensitive){
      return getHashCode(str, caseSensitive)
    },
    alretMessage: function (msgType, msg) {
      return alretMessage(this, msgType, msg)
    },


  }
}
