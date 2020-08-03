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
          <el-select v-model="ruleForm.type" placeholder="请选择活动区域">
            <el-option label="1:用户id_组织id的解密" value="1"></el-option>
            <el-option label="2:根据用户id来解密" value="2"></el-option>
            <el-option label="3:注册的时候组织id(无需key)解密" value="3"></el-option>
            <el-option label="4:类似BusinessId (时间戳)解密" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="解密的key(类型2必填)" prop="name">
          <el-input v-model="ruleForm.key"></el-input>
        </el-form-item>

        <el-button type="danger" @click="submit()">提交</el-button>&nbsp;

        <div> 得到的结果(userId_leagueId)：
          <el-input v-model="ruleForm.result"></el-input>
        </div>
      </el-form>




    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          str: '',
          type: 2,
          key: '',
          result:''
        },
        result: ''
      }
    },
    methods: {
      submit() {
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

        if (this.ruleForm.type != 2 && !this.ruleForm.key) {
          this.ruleForm.key = '111'
        }

        this.doSubmit()

      },
      doSubmit() {
        let param = new FormData()

        param.append('str', this.ruleForm.str)
        param.append('type', this.ruleForm.type)
        param.append('key', this.ruleForm.key)
        this.PF('/unlogin/decode', param, {}).then((response) => {
          self.loading = false
          if (response.status == 200) {
            if (response.data.retCode == 1000) {
              debugger
              this.ruleForm.result = response.data.results
              return;

            } else {
              this.$message({
                message: response.data.retMsg,
                type: 'error'
              })
              return
            }
          }
        }).catch(function (error) {
          self.loading = false
          console.log(error.config)
        })
      },
    }
  }

</script>
