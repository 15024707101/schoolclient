<template>
  <div class="hello">
    <component :is="currentTop"></component>
    <component :is="currentLeft"></component>
    >
    <div class="state_boxs" style="">
      <span class="fa fa-info-circle fa-3x float_left" style=""></span>
      <span class="state_position" style="">当前位置:用户列表</span>
      ------------------------------------------------------------------------------------
      <a class="return universal_button red htmlreturn" style="color:red" @click="go(-1)">
        <el-button type="danger">返回上一页</el-button>
      </a>
    </div>
    <el-table
      :data="userList"
      style="width: 100%">

      <el-table-column
        label="序号"
        type=index>
      </el-table-column>


      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>

      <el-table-column
        prop="identityCardNo"
        label="身份证号"
        width="180">
      </el-table-column>

      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="personType"
        label="身份类型"
        :formatter="formatterPersonType"
      >
      </el-table-column>

      <el-table-column
        prop="sex"
        label="性别"
        :formatter="formatterSex"
      >
      </el-table-column>

      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="300"
      >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small" plain>查看相册</el-button>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import cons from '../cons'

  export default {

    name: 'userList',
    created() {
      this.getUserList()
    },
    data() {

      return {
        loading: false,
        userList: [],
        backgroundImage: require('../../../static/img/t7.jpg'),

      }
    },
    computed: {
      ...mapState({
        commonparams: state => state.commonparams, // 从详情页返回
        curUser: state => state.user
      }),
    },
    methods: {

      formatterSex(row, column) {
        if (row.sex == 1) {
          return '男'
        } else {
          return '女'
        }
      },
      formatterPersonType(row, column) {
        if (row.personType == 1) {
          return '管理员'
        } else if (row.personType == 2) {
          return '学生'
        } else if (row.personType == 3) {
          return '老师'
        } else {
          return '其他'
        }
      },

      getUserList() {
        let param = new FormData()
        param.append('userId', this.curUser.userId)

        this.PF('center/userList', param, {}).then((response) => {
          this.loading = false
          if (response.status == 200) {
            if (response.data.retCode == 1000) {
              this.userList = response.data.results

            } else {
              this.alretMessage(cons.errStr, response.data.retMsg)
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
