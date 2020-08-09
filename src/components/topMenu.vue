<template>
  <div  v-bind:style="{backgroundImage:'url(' + backgroundImage + ')', backgroundRepeat:'repeat', backgroundPosition:'left top'}">
    <a href="#" @click="operationCenter">解密工具</a>
    <el-button type="primary" @click="signout" style="float: right">退出登录</el-button>
    <el-divider></el-divider>
  </div>
</template>

<script>
  import cons from './cons'
  export default {
    data() {
      return {
        loading: false,
        backgroundImage: require('../../static/img/t7.jpg'),
      }
    },
    methods: {
      operationCenter() {
        this.jump('/decode')
      },

      signout() {
        let param = new FormData()
        param.append('uid', "11")
        this.PF('/signout', param, {}).then((response) => {
          this.loading = false
          if (response.status == 200) {
            if (response.data.retCode == 1000) {
              this.$store.commit('CLEAR')
              this.$store.commit('CLEAR_PARAMS')
              window && window.localStorage.clear()
              this.jump('/signin')

              this.$message({
                showClose: true,
                message: "退出成功",
                type: 'success'
              })

            } else {
              this.alretMessage(cons.errStr,response.data.retMsg)
              return
            }
          }
        }).catch((error) => {
          this.loading = false
          console.log(error.config)
        })
      },
    }
  }
</script>
