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

    if(response.config.url.indexOf("signout")!=-1){
      that.$store.commit('CLEAR')
      that.$store.commit('CLEAR_PARAMS')
      window && window.localStorage.clear()
      jump('/signin',that)
      return
    }
    if (response && 1009 === response.data.retCode ) {
      that.$message.close()

      that.$message({
        type:'error',
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

function transTime(time) {
  var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
  return time.replace(pattern, '$1年$2月$3日$4时$5分$6秒');
}
function transDay(time) {
  var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
  return time.replace(pattern, '$1年$2月$3日');
}
function transDay8(time) {
  var pattern = /(\d{4})(\d{2})(\d{2})/;
  return time.replace(pattern, '$1年$2月$3日');
}

function transLineTime(time) {

  var pattern = /(\d{4})(\d{2})(\d{2})/;
  return time.replace(pattern, '$1-$2-$3');
}


function TransSysTime(time) {
  var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
  return time.replace(pattern, '$1/$2/$3 $4:$5:$6');
}


/*
* 在编辑信息时 团员编号是否需要填写（由于新疆特殊），故根据地区 区别提示
* 团员调用此方法会报错（团员查看个人信息[因此团员没调用此方法]，提示无权限）
*/
function getprovinceInfo(self){
  let p = new Promise(function (resolve,reject) {
    let ins = self.$root.PF('/checkXJ', null, {baseURL: cons.m});
    ins.then(function (response) {
      if (response.status == 200) {
        if (response.data.retCode === 1000) {
          let secondorg = response.data.results
          resolve(secondorg.isXJ)
        } else {
          console.log("retCode:" + response.data.retCode)
          self.$message({
            type: 'error',
            message: response.data.retMsg
          })
        }
      } else {
        console.log("Got Return code:" + response.status)
        self.$message({
          type: 'error',
          message: '获取数据发生异常.' + response.status
        })
      }
    }).catch(function (error) {
      console.log(error)
    });
  })
  return p;
}

function checkUsercodeByJoinLeagueTime(userCode, joinLeagueTime, v) {

  if (userCode == "" && joinLeagueTime.substr(0, 4) >= 2017) {
    v.$message({
      type: 'warning',
      message: '2017年以后发展的团员,发展团员编号必填',
    });
    return false;
  }
  if (userCode == "" && joinLeagueTime.substr(0, 4) < 2017) {
    return true;
  }
  if (userCode.length > 4) {
    if (joinLeagueTime.substr(0, 4) >= 2019 || joinLeagueTime.substr(0, 4) <= 2016) {
      if (joinLeagueTime.substr(0, 4) != userCode.substr(0, 4)) {
        v.$message({
          type: 'warning',
          message: '发展团员编号前四位必须与入团年份相同',
        });
        return false;
      }
      if (userCode.length < 12 && joinLeagueTime.substr(0, 4) >= 2019) {
        v.$message({
          type: 'warning',
          message: '您的发展团员编号填写有误，请核实后修改并重新提交。',
        });
        return false;
      }
    } else if (joinLeagueTime.substr(0, 4) >= 2017) {

      if (userCode.substr(0, 4) < 2017 || userCode.substr(0, 4) > 2018) {
        v.$message({
          type: 'warning',
          message: '您的发展团员编号填写有误，请核实后修改并重新提交。',
        });
        return false;
      }
    }
  } else {
    v.$message({
      type: 'warning',
      message: '您的发展团员编号填写有误，请核实后修改并重新提交。',
    });
    return false;
  }
  return true;

}

// 检查发展团员编号规则
// 如果是17年后入团 编号必填
// 如果填了就检查规则 太短/还有山东特殊编号
function checkUserCodeErr(userCode, joinLeagueTime, isXinJiang) {

  let date2016 = new Date(2016,0,1);
  let date2017 = new Date(2017,0,1);
  // let date2018 = new Date(2018,0,1);
  let date2019 = new Date(2019,0,1);
  let joinDate = new Date(joinLeagueTime);

  // 山东有一批特殊的16位编号 年份不需要相同
  let joinYear = joinLeagueTime.substr(0, 4);
  if (userCode.length === 16) {
    if (userCode.substr(0, 6) === "201516" && (joinYear === "2015" || joinYear === "2016")) {
      return "";
    } else if (userCode.substr(0, 6) === "201617" && (joinYear === "2016" || joinYear === "2017")) {
      return "";
    } else {
      return "您的发展团员编号填写有误，请核实后修改并重新提交。";
    }
  }

  if(joinDate < date2016) {
    // 16年之前不是必填 填了就宽松检验
    if(!userCode) {
      return "";
    }
    return looseCheckUserCode(userCode, joinLeagueTime);
  } else if(joinDate >= date2016 && joinDate < date2017) {
    if(isXinJiang) {
      // 16年新疆要严格校验
      if (!userCode) {
        return "2016年以后发展的团员,发展团员编号必填";
      } else {
        return strictCheckUserCode(userCode, joinLeagueTime);
      }
    } else  if(!userCode) {
      // 17年前 除了新疆其他不是必填
      return "";
    } else {
      return looseCheckUserCode(userCode, joinLeagueTime);
    }
  } else if(joinDate >= date2017 && joinDate < date2019) {
    // 2017 和 2018 可以通用, 都要严格校验
    if (!userCode) {
      if(isXinJiang) {
        return "2016年以后发展的团员,发展团员编号必填";
      }
      return "2017年以后发展的团员,发展团员编号必填";
    }
    if (userCode.length !== 12) {
      return "发展团员编号格式错误";
    }
    let codeYear = userCode.substr(0, 4);
    if (codeYear !== "2017" && codeYear !== "2018") {
      return  "发展团员编号前四位必须与入团年份相同";
    }
    return "";
  } else if (joinDate >= date2019) {
    // 2019 要严格校验
    if (!userCode) {
      if(isXinJiang) {
        return "2016年以后发展的团员,发展团员编号必填";
      }
      return "2017年以后发展的团员,发展团员编号必填";
    }
    return strictCheckUserCode(userCode, joinLeagueTime);
  }
  if(!userCode){
    return ""
  }else {
    return "您的发展团员编号填写有误，请核实后修改并重新提交。";
  }
}

function looseCheckUserCode(userCode, JoinTime) {
  if (userCode.length <= 4) {
    return "发展团员编号格式错误";
  }
  let joinYear = JoinTime.substr(0, 4);
  if (joinYear !== userCode.substr(0, 4)) {
    return  "发展团员编号前四位必须与入团年份相同";
  }
  return "";
}

function strictCheckUserCode(userCode, JoinTime) {
  if (userCode.length !== 12) {
    return "发展团员编号格式错误";
  }
  let joinYear = JoinTime.substr(0, 4);
  if (joinYear !== userCode.substr(0, 4)) {
    return  "发展团员编号前四位必须与入团年份相同";
  }
  return "";
}

function LeagueIcon(photoUrl) {
  if (!photoUrl||photoUrl.length == 0) {
    return cons.img + '/img/leagueBadge.png'
  } else
    return photoUrl
}

function UserIcon(photoUrl, gender, v) {
  if (!photoUrl || photoUrl.length == 0) {
    if (gender == 1) {
      return cons.img + '/img/boy.png'
    } else if (gender == 0) {
      return cons.img + '/img/girl.png'
    }
  } else
    return photoUrl
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


function industryTypeIsSchool(industryTypeId) {
  return industryTypeId === "03PTGDYX" ||
    industryTypeId === "04ZYJYXX" ||
    industryTypeId === "05PTGZ" ||
    industryTypeId === "051ZDZYYX" ||
    industryTypeId === "052WQZX" ||
    industryTypeId === "06CZ" ||
    industryTypeId === "071JNYGZXX" ||
    industryTypeId === "072SENYGZXX";
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
    mixint: function (url) {
      console.log("url:" + url)
    },
    NowFormatDate() {
      return getNowFormatDate()
    },
    transTime(time) {
      if (time == undefined)
        return ''
      return transTime(time)
    },
    transDay(time) {
      if (time == undefined)
        return ''
      return transDay(time)
    },
    transDay8(time) {
      if (time == undefined)
        return ''
      return transDay8(time)
    },
    transLineTime(time) {
      if (time == undefined)
        return ''
      var newTime = transLineTime(time)
      return newTime
    },
    checkUsercodeByJoinLeagueTime(userCode, joinLeagueTime) {
      return checkUsercodeByJoinLeagueTime(userCode, joinLeagueTime, v)
    },
    TransSysTime(time) {
      return TransSysTime(time)
    },

    leagueIcon(photoUrl) {
      return LeagueIcon(photoUrl)
    },
    userIcon(photoUrl, gender) {
      return UserIcon(photoUrl, gender, this)
    },
    checkPhone(phone) {
      return checkPhone(phone)
    },
    checkTel(tel) {
      return checkTel(tel)
    },

    getprovinceInfo(self){
      return getprovinceInfo(self)
    },
    checkUserCodeErr(userCode, joinLeagueTime, isXinJiang) {
      return checkUserCodeErr(userCode, joinLeagueTime, isXinJiang)
    },
    getHashCode(str,caseSensitive){
      return getHashCode(str, caseSensitive)
    },
    industryTypeIsSchool(t) {
      return industryTypeIsSchool(t);
    }

  }
}
