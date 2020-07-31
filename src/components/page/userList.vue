<template>
  <div class="hello">
    <el-table
      :data="userList"
      style="width: 80%">

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

    </el-table>

  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {

    name: 'userList',
    created () {
      this.getUserList()
    },
    data () {

      return {
        userList: [],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]

      }
    },
    computed: {
      ...mapState({
        commonparams: state => state.commonparams, // 从详情页返回
        curUser: state => state.user
      }),
    },
    methods: {

      formatterSex (row, column) {
        if (row.sex == 1) {
          return '男'
        } else {
          return '女'
        }
      },
      getUserList () {
        debugger
        let param = new FormData()
        param.append('userId', this.curUser.userId)

        this.PF('center/userList', param, {}).then((response) => {
          self.loading = false
          if (response.status == 200) {
            if (response.data.retCode == 1000) {
              this.userList = response.data.results
              this.$message({
                message: '返回列表成功！',
                type: 'success'
              })

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
      }

    }
  }

</script>
