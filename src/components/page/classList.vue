<template>
  <div class="hello">
    <div class="state_boxs" style="">
      <span class="fa fa-info-circle fa-3x float_left" style=""></span>
      <span class="state_position" style="">当前位置:班级列表</span>
      ------------------------------------------------------------------------------------
      <a class="return universal_button red htmlreturn" style="color:red" @click="go(-1)">返回上一页</a>
    </div>
    <el-table
      :data="classList"
      style="width: 100%">

      <el-table-column
        label="序号"
        type=index>
      </el-table-column>

      <el-table-column
        prop="className"
        label="班级名称"
        width="180">
      </el-table-column>

      <el-table-column
        prop="classRoom"
        label="教室地址"
        width="180">
      </el-table-column>

      <el-table-column
        prop="classNum"
        label="班级人数">
      </el-table-column>
      <el-table-column
        prop="classTeacher"
        label="代课老师">
      </el-table-column>
      <el-table-column
        prop="classregulator"
        label="班主任"
        width="180">
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import cons from '../cons'
  export default {

    name: 'classList',
    created() {
      this.getClassList()
    },
    data() {

      return {
        classList: [],
        loading: false,

      }
    },
    computed: {
      ...mapState({
        commonparams: state => state.commonparams, // 从详情页返回
        curUser: state => state.user
      }),
    },
    methods: {


      getClassList() {
        let param = new FormData()
        param.append('userId', this.curUser.userId)

        this.PF('center/classList', param, {}).then((response) => {
          this.loading = false
          if (response.status == 200) {
            if (response.data.retCode == 1000) {
              this.classList = response.data.results

            } else {
              this.alretMessage(cons.errStr,response.data.retMsg)
              return
            }
          }
        }).catch((error) =>  {
          this.loading = false
          console.log(error.config)
        })
      }

    }
  }

</script>
