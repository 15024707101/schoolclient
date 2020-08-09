<template>
  <div class="hello">

    <div class="state_boxs" style="">
      <span class="fa fa-info-circle fa-3x float_left" style=""></span>
      <span class="state_position" style="">当前位置:添加相册</span>
      ------------------------------------------------------------------------------------
      <a class="return universal_button red htmlreturn" style="color:red" @click="go(-1)">
        <el-button type="danger">返回上一页</el-button>
      </a>
    </div>
    <div>
      <el-upload
        name="file"
        :action="upUrl"
        :on-preview="onPreview"
        list-type="picture-card"
        :on-success="onSuccess"
        :on-error="onError"
        :on-remove="onRemove"
        :before-upload="beforeUpload"
        :data="upData"
        :limit="upLimit" :on-exceed="handleLimit"
        :file-list="uploadedFilesSrc"
        :before-remove="beforeRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import cons from '../cons'

  export default {

    name: 'appentPhoto',
    created() {
    },
    data() {

      return {
        loading: false,
        userList: [],


        dialogImageUrl: '',
        dialogVisible: false,
        upUrl: cons.u + 'unlogin/appendPhoto',
        file: {},
        uploadedFiles: [],
        uploadedFilesSrc: [],
        upLimit: 2,

      }
    },
    computed: {
      ...mapState({
        commonparams: state => state.commonparams, // 从详情页返回
        curUser: state => state.user
      }),
      upData() {
        return {
          'name': this.curUser.name,
          'photoDir': this.photoDir,
          'userId':this.curUser.userId
        }
      },
      photoDir(){
        return "/"+this.curUser.userId+"/新建相册"
      }
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

    }
  }

</script>
