<template>
  <div class="hello">
    <div class="state_boxs" style="">
      <span class="fa fa-info-circle fa-3x float_left" style=""></span>
      <span class="state_position" style="">当前位置:个人登录历史列表</span>
      ------------------------------------------------------------------------------------
      <a class="return universal_button red htmlreturn" style="color:red" @click="go(-1)">返回上一页</a>
    </div>
    <el-table
      :data="loginHistoryList"
      style="width: 100%">

      <el-table-column
        label="序号"
        type=index>
      </el-table-column>
<!--Id
userId
name
loginTime
loginEquipment
loginAddress
userAgent
pwdLevel      -->

      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>

      <el-table-column
        prop="loginTime"
        label="登录时间"
        width="180">
      </el-table-column>

      <el-table-column
        prop="loginEquipment"
        label="登录设备">
      </el-table-column>

      <el-table-column
        prop="pwdLevel"
        label="登录状态"
      >
        <template slot-scope="scope">
                                                        <span class="col-cont"
                                                              v-html="formatterPwdLevel(scope.row)"></span>
        </template>
      </el-table-column>

      <el-table-column
        prop="loginAddress"
        label="登录地址">
      </el-table-column>
      <el-table-column
        prop="userAgent"
        label="AGENT"
        show-overflow-tooltip
        >
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import cons from '../cons'
  export default {

    name: 'loginHistory',
    created() {
      this.getloginHistoryList()
    },
    data() {

      return {
        loading: false,
        loginHistoryList: [],

      }
    },
    computed: {
      ...mapState({
        commonparams: state => state.commonparams, // 从详情页返回
        curUser: state => state.user
      }),
    },
    methods: {

      formatterPwdLevel(row, column) {
        if (row.pwdLevel == 1) {
          return "<span style='color:#42ff2d'>" + "安全" + "</span>"
        } else if (row.pwdLevel == 1) {
          return "<span style='color:#4dff95'>" + "相对安全" + "</span>"
        }else if (row.pwdLevel == 2) {
          return "<span style='color:#feff63'>" + "一般" + "</span>"
        }else if (row.pwdLevel == 3) {
          return "<span style='color:#ffa036'>" + "风险高" + "</span>"
        }else if (row.pwdLevel == 4) {
          return "<span style='color:#ff0f0a'>" + "极度危险" + "</span>"
        }else {
          return '-'
        }
        /*密码级别：0a安全，1 相对安全，2一般，3 风险高，4极度危险*/
      },
      getloginHistoryList() {
        let param = new FormData()
        param.append('userId', this.curUser.userId)

        this.PF('center/loginHistoryList', param, {}).then((response) => {
          this.loading = false
          if (response.status == 200) {
            if (response.data.retCode == 1000) {
              this.loginHistoryList = response.data.results

            } else {
              this.alretMessage(cons.errStr,response.data.retMsg)
              return
            }
          }
        }).catch((error) => {
          this.loading = false
          console.log(error.config)
        })
      }

    }
  }

</script>
