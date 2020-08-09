<template>
  <div class="hello">
    <div class="state_boxs" style="">
      <span class="fa fa-info-circle fa-3x float_left" style=""></span>
      <span class="state_position" style="">当前位置:注册页面</span>
      ------------------------------------------------------------------------------------
      <a class="return universal_button red htmlreturn" style="color:red" @click="go(-1)">返回上一页</a>
    </div>
    <div style="width: 500px;text-align: center;margin:0 auto">
      <hr>

      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon>

        <el-form-item label="注册账号" prop="userId" label-width="80px">
          <el-input v-model="ruleForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="本人姓名" prop="name" label-width="80px">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="身份证号" prop="identityCardNo" label-width="80px">
          <el-input v-model="ruleForm.identityCardNo" maxlength="18"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="region">
          <el-select v-model="ruleForm.sex" placeholder="性别">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册身份" prop="region">
          <el-select v-model="ruleForm.personType" placeholder="身份">
            <el-option
              v-for="item in personOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="region">
          <el-select v-model="ruleForm.classId" placeholder="班级">
            <el-option
              v-for="item in classOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile" label-width="80px">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd" label-width="80px">
          <el-input v-model="ruleForm.pwd" :show-password="showPassword" type="password"></el-input>
          <span style="color: red">（不设置默认为：123）</span>
        </el-form-item>
        上传头像
        <div class="fill_content" style="border: 1px dashed #BBBBBB;height: auto;padding: 20px">
          <el-form-item>
            <el-upload
              name="file"
              :action="upUrl"
              :on-preview="onPreview"
              list-type="picture-card"
              :on-success="onSuccess"
              :on-error="onError"
              :on-remove="onRemove"
              :headers="upHeaders"
              :before-upload="beforeUpload"
              :data="upData"
              :limit="upLimit" :on-exceed="handleLimit"
              :file-list="uploadedFilesSrc"
              :before-remove="beforeRemove">
              <i class="el-icon-plus"></i>
            </el-upload>

          </el-form-item>
        </div>
        <input type="reset" value="重置" style="background: #35ff24;height: 40px;width: 70px;border-color: #f0f0f0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="danger" @click="submit()">注册</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </el-form>

    </div>
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>

</template>

<script>
  import cons from '../cons'
  import {mapState} from 'vuex'

  export default {
    data: function () {
      var valiIdcord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入身份证号'));
        } else {
          if (value.length != 18) {
            // this.$refs.ruleForm.validateField('checkPass');
            callback(new Error('身份证号码必须为18位'));
          }
          callback();
        }
      };
      var valiUserId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入注册账号'));
        }
        callback();

      };


      return {
        loading: false,
        dialogImageUrl: '',
        dialogVisible: false,
        upUrl: cons.u + 'unlogin/uploadImg',
        file: {},
        uploadedFiles: [],
        uploadedFilesSrc: [],
        upLimit: 3,


        showPassword: true,
        ruleForm: {
          id: 0,
          userId: "",
          name: "",
          identityCardNo: "",
          mobile: "",
          pwd: "",
          age: 0,
          personType: "",
          headPortrait: "",
          classId: "",
          sex: 0,

        },

        sexOptions: [{
          value: 1,
          label: '男'
        }, {
          value: 2,
          label: '女'
        }, {
          value: 0,
          label: '其他'
        }
        ],
        personOptions: [{
          value: 1,
          label: '管理员'
        }, {
          value: 2,
          label: '学生'
        }, {
          value: 3,
          label: '讲师'
        }, {
          value: 0,
          label: '其他'
        }
        ],
        classOptions: [{
          value: "1",
          label: '甲等班'
        }, {
          value: "2",
          label: '乙等班'
        }, {
          value: "3",
          label: '丙等班'
        }, {
          value: 0,
          label: '其他'
        }
        ],

        rules: {
          identityCardNo: [
            {validator: valiIdcord, trigger: 'blur'}
          ],
          userId: [
            {validator: valiUserId, trigger: 'blur'}
          ]
        }

      }

    },
    computed: {
      ...mapState({
        curUser: state => state.user,
      }),

      upData() {
        return {
          'name': "忍者神龟",
          'photoDir': "/headPhoto",
        }
      },
      upHeaders() {
        return {
          'zhtj-Uname': '1234'
        }
      },
    },
    methods: {


      onSuccess(res, file, fileList) {
        if (res.retCode != 1000) {
          this.$message({
            type: 'error',
            message: '上传失败，' + res.retMsg,
          })
          fileList.splice(-1, 1)
          return false
        }
        file.fileId = res.results.fileId
        file.url = res.results.fileUrl
        file.fileName = res.results.fileName
        file.filePath = res.results.filePath
        this.uploadedFilesSrc = fileList
        this.ruleForm.headPortrait = file.url
      },
      onError(err, file, fileList) {
        this.$message({
          type: 'error',
          message: '上传失败，' + err.retCode + ',' + err.retMsg,
        })
      },
      beforeUpload(file) {

        const isLt2M = file.size / 1024 / 1024 < 10;

        if (!(file.type === 'image/png' || file.type === 'image/bmp' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
          this.$message.error('请上传正确图片类型（*.bmp;*.jpeg;*.jpg;*.gif;*.png）');
          return false
        }
        if (!isLt2M) {
          this.$message.error('图片不能大于10M！');
          return false
        }
        //return isJPG && isLt2M;
        return isLt2M;
      },
      beforeRemove(file, fileList) {
        if (!file.fileId) {
          return true
        }
      },
      onRemove(file, fileList) {

        let fl = []
        fileList.forEach((v, i, a) => {
          if (v != file.url) {
            fl.push(v)
          }
        })
        this.uploadedFilesSrc = fl
        this.deleteApiImg(file)
        console.log(this.uploadedFilesSrc)
      },

      handleLimit(files, fileList) {
        this.$message({
          type: 'error',
          message: '超出了最大上传数量',
        })
      },
      onPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },


      deleteApiImg(file) {
        let param = {
          fileId: file.fileId,
          filePath: file.filePath,
          fileUrl: file.url,
          filename: file.fileName,
        }
        this.PF('unlogin/deleteFile', param, {}).then((response) => {
          this.loading = false
          if (response.status == 200) {
            if (response.data.retCode == 1000) {

              this.alretMessage(cons.succStr, "零时图片删除成功")

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
      submit() {
        if (this.ruleForm.userId.length == 0 || this.ruleForm.identityCardNo.length == 0 || this.ruleForm.name.length == 0) {
          this.$message({
            message: '必填项不能为空',
            type: 'error'
          })
          return
        }
        this.doSubmit()

      },
      doSubmit() {
        let param = {
          ...this.ruleForm
        }


        this.PF('unlogin/register', param, {}).then((response) => {
          this.loading = false
          if (response.status == 200) {
            if (response.data.retCode == 1000) {

              this.jump('/signin')

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

    },
  }

</script>
