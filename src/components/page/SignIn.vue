<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div style="margin: 20px"></div>
    <div>
      <div style="width: 500px;text-align: center;margin:0 auto">
        <el-form label-position="right" label-width="80px" :model="formValue" style="align:center ">
          <el-form-item label="用户名">
            <el-input v-model="formValue.uname" maxlength="18" size="100px"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formValue.pwd" type="password" maxlength="30"></el-input>
          </el-form-item>
          <el-button type="primary" @click="register">注&nbsp;&nbsp;册</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="danger" @click="submit()">登&nbsp;&nbsp;录</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
          <a style="cursor:pointer"
             href="http://www.365yg.com/i6626998678076801539/#mid=1614444196347912" target="_blank">
            <el-button type="success">宣传片</el-button>
          </a><i
          class="fa fa-youtube-play "></i>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import JSEncrypt from 'jsencrypt/bin/jsencrypt'
  import {mapState} from 'vuex'
  import cons from '../cons'

  export default {
    name: 'SignIn',
    created() {
      /*console.log(this.$store)
      console.log(this.$components)
      console.log(this.$router)
      console.log(this.$axios)*/
      this.$store.commit('CLEAR_PARAMS')
      document.onkeydown = (evt) => {
        var key = window.event ? evt.keyCode : evt.which
        if (key == 13) {
          this.submit()
        }
      }
    },
    data() {

      return {
        loading: false,
        msg: '测试小系统',
        formValue: {
          uname: 'rzsg',
          pwd: '12'
        }
      }
    },
    computed: {
      ...mapState({
        commonparams: state => state.commonparams, // 从详情页返回
        curUser: state => state.user
      }),
    },
    methods: {
      setMd5(value) {
        let encryptor = new JSEncrypt() // 新建JSEncrypt对象

        let publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCRmoOhpORPADC4ArCYPGdZRB8
u44eQvcEsodcGcFSMDRWka1zBkNJwvjCGRG9fwywFBZ7rp7Nt6NFhOd54wxQ4yQV
WDETvrSeGifNT4OuBOS/K0wjJOlSLu4pBwNfzK9AQ51X8h8VVShMeIgFOGT7kse9
gZFeM1nDrLiLvCgygwIDAQAB
-----END PUBLIC KEY-----`
        encryptor.setPublicKey(publicKey) // 设置公钥

        return encryptor.encrypt(value) // 对需要加密的数据进行加密

      },
      submit() {
        if (!this.formValue.uname || this.formValue.uname.length == 0) {
          this.$message({
            message: '用户名不能为空',
            type: 'error'
          })
          return
        }
        if (!this.formValue.pwd || this.formValue.pwd.length == 0) {
          this.$message({
            message: '密码不能为空',
            type: 'error'
          })
          return
        }
        this.doSubmit()

      },
      doSubmit() {
        let param = new FormData()
        param.append('uname', this.setMd5(this.formValue.uname))
        param.append('pwd', this.setMd5(this.formValue.pwd))
        this.PF('unlogin/signin', param, {}).then((response) => {
          this.loading = false
          if (response.status == 200) {
            if (response.data.retCode == 1000) {

              this.$store.commit('SET_USER', response.data.results)
              this.$store.commit('SET_LOGINED', response.data.results)

              this.jump('/center/userlist')

            } else {
              this.alretMessage(cons.errStr, response.data.retMsg)
              return
            }
          }
        }).catch((error) => {
          this.loading = false
          console.log(error.config)
        })
      },
      register() {
        this.jump('/register')
        this.$message({
          message: '注册功能正在开发中，请耐心等待',
          type: 'warning'
        })
        return
      },

    }
  }
</script>


