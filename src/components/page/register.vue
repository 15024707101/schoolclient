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

      <el-form ref="ruleForm" :model="ruleForm" status-icon>
        <div class="fill_content" style="border: 1px dashed #BBBBBB;height: auto;padding: 20px">
          <el-form-item>
            <el-upload
              name="file"
              :action="upUrl"
              list-type="picture-card"
              :on-success="onSuccess"
              :on-error="onerror"
              :on-remove="onremove"
              :headers="upHeaders"
              :before-upload="beforeUpload"
              :data="upData"
              :limit="upLimit" :on-exceed="handleLimit"
              :file-list="uploadedFilesSrc"
              :before-remove="beforeRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>

</template>

<script>
  import cons from '../cons'
  import {mapState} from 'vuex'

  export default {
    data: function () {

      return {
        loading: false,


        dialogImageUrl: '',
        dialogVisible: false,
        upUrl: cons.u + 'unlogin/uploadImg',
        picUuid: '',
        file: {},
        credent: true,
        uploadedFiles: [],
        uploadedFilesSrc: [],
        upLimit: 15,
        ruleForm: {
          photoList: [],
        },
      }

    },
    computed: {
      ...mapState({
        curUser: state => state.user,
        curLeague: state => state.league,
      }),
      joinUsers() {
        if (this.selectedUsers.length > 0) {
          let users = this.selectedUsers.join(",");
          //this.ruleForm.joinUsers = users
          return users
        }
        return '';
      },

      upData() {
        return {
          'name': "忍者神龟",
        }
      },
      upHeaders() {
        let token = this.$store.state.csrftoken
        return {
          'X-CSRF-Token': token,
          'zhtj-Uid': this.curUser.userId,
          'zhtj-Lid': this.curLeague.leagueId,
        }
      },
    },
    methods: {


      onSuccess(res, file, fileList) {
        debugger
        if (res.retCode != 1000) {
          this.$message({
            type: 'error',
            message: '上传失败，' + res.retMsg,
          })
          fileList.splice(-1, 1)
          return false
        }
        file.fileId = res.results.fileId
        file.url = res.results.thumbnailFileUrl
        file.name = res.results.fileName
        file.thumbnailFileId = res.results.thumbnailFileId
        file.thumbnailFileUrl = res.results.thumbnailFileUrl
        this.uploadedFilesSrc = fileList
      },
      onerror(err, file, fileList) {
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
      onremove(file, fileList) {

        let fl = []
        fileList.forEach((v, i, a) => {
          if (v != file.url) {
            fl.push(v)
          }
        })
        this.uploadedFilesSrc = fl
        console.log(this.uploadedFilesSrc)
      },

      handleLimit(files, fileList) {
        this.$message({
          type: 'error',
          message: '超出了最大上传数量',
        })
      },

    },
  }

</script>
