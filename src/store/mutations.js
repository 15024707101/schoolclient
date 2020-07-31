// 更改当前用户在当前页面所在的组织
export function SET_LEAGUE(state, {league}) {
  state.league = league
}

// 用户推出登录或登录超时，状态reset
export function CLEAR(state) {
    state.user = {};
    state.league = '';
    state.loginedInfo = {};
    state.unreadMsgCount = 0;
}

export function SET_USER(state, {user}) {
  state.user = user
}
export function SET_TZYLEAGUEID(state,param) {
    state.TzyLeagueId=param
}
export function CLEAR_PARAM(state, param) {

    for (let i in state.commonparams){
        if(i==param){
            delete state.commonparams[i]
        }
    }

    // delete state.commonparams.param
}
export function SET_PARAMS(state,param) {

  state.commonparams = {...state.commonparams,...param}
}
export function SET_TIPS(state,param) {
  state.tips = {...state.tips,...param}
}
export function CLEAR_PARAMS(state) {
  state.commonparams = {}
}

export function SET_LOGINED(state,userInfo) {

  state.loginedInfo = userInfo
}

export function SET_CSRF(state,token) {
    state.csrftoken = token
}

export function updateMsgCount(state, count) {
  state.unreadMsgCount = count
}

export function msgCountDec(state) {
    if (state.unreadMsgCount > 0) {
        state.unreadMsgCount--;
    }
}
