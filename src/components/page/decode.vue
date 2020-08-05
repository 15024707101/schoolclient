<template>
  <div class="hello">
    <div class="state_boxs" style="">
      <span class="fa fa-info-circle fa-3x float_left" style=""></span>
      <span class="state_position" style="">当前位置:解密工具</span>
      ------------------------------------------------------------------------------------
      <a class="return universal_button red htmlreturn" style="color:red" @click="go(-1)">返回上一页</a>
    </div>
    <div style="width: 500px;text-align: center;margin:0 auto">
      <hr>
      <el-form label-width="280px" :model="ruleForm">
        <el-form-item label="待解密的串" prop="name">
          <el-input v-model="ruleForm.str"></el-input>
        </el-form-item>
        <el-form-item label="解密类型" prop="region">
          <el-select v-model="ruleForm.type" placeholder="请选择解密类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="解密的key(类型2必填)" prop="name">
          <el-input v-model="ruleForm.key"></el-input>
        </el-form-item>

        <el-button type="danger" @click="submit()">解密</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" @click="setKey()">填入userId</el-button>&nbsp;

      </el-form>
      <br><br><br><br><br>

      <span v-if="ruleForm.type==1">得到的结果(userId_leagueId)：</span>
      <span v-else>得到的结果:</span>
      <h3 style="color: red" v-text='result'></h3>

      <textarea rows="3" cols="50">

      </textarea>


    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        ruleForm: {
          str: 'T79UTuKAoP1fe77WAe955Hs50CP+hZV8IDQ6idpGhU2N4kslnNLWpT7EUIFRScq0',
          type: '1',
          key: '',
        },
        result: '',
        options: [{
          value: '1',
          label: '1:用户id_组织id的解密'
        }, {
          value: '2',
          label: '2:根据用户id来解密'
        }, {
          value: '3',
          label: '3:注册的时候组织id(无需key)解密'
        }, {
          value: '4',
          label: '4:类似BusinessId (时间戳)解密'
        }],
      }
    },
    methods: {
      setKey() {
        if (!this.result || this.result.length == 0) {
          this.$message({
            message: '需先 通过类型一 解密得到 userId_leagueId',
            type: 'error'
          })
          return
        }
        this.ruleForm.key = this.result.substring(0, 8)
        this.ruleForm.type = '2'
        this.ruleForm.str = ''
      },
      submit() {
        this.result = ''
        if (!this.ruleForm.str || this.ruleForm.str.length == 0) {
          this.$message({
            message: '待解密的串不能为空',
            type: 'error'
          })
          return
        }
        if ((!this.ruleForm.key || this.ruleForm.key.length == 0) && this.ruleForm.type == 2) {
          this.$message({
            message: '类型二解密时，解密key必须输入 userid',
            type: 'error'
          })
          return
        }

        this.doSubmit()

      },
      doSubmit() {
        let param = new FormData()

        param.append('str', this.ruleForm.str)
        param.append('type', this.ruleForm.type)
        param.append('key', this.ruleForm.key)
        this.PF('/unlogin/decode', param, {}).then((response) => {
          this.loading = false
          if (response.status == 200) {
            if (response.data.retCode == 1000) {
              this.result = response.data.results
              this.result = response.data.results
              return;

            } else {
              this.alretMessage(cons.errStr,response.data.retMsg)
              return
            }
          }
        }).catch((error) =>  {
          this.loading = false
          console.log(error.config)
        })
      },
    }
  }

</script>
