<template>
  <div class="hello">
    <div class="state_boxs" style="">
      <span class="fa fa-info-circle fa-3x float_left" style=""></span>
      <span class="state_position" style="">当前位置:相册列表</span>
      ------------------------------------------------------------------------------------
      <a class="return universal_button red htmlreturn" style="color:red" @click="go(-1)">
        <el-button type="danger">返回上一页</el-button>
      </a>
    </div>
    <div v-if="photoType==1">
      <div v-if="queryUserId = curUser.userId">
        <el-button style="float: contour" plain type="primary" @click="isCreateAlbum=true">创建相册</el-button>
      </div>
      <div class="imgerdiv" v-for="(item) in dirList">
        <a @click="getPhotoList(item.albumName)">
          <img :src="item.cover" class="imger" alt="">
        </a>
        <br>
        <div style='width: 175px;height: 35px;margin-top: -35px; margin-right:0px;'>
          <span style="font-size:30px;color: #edfbf8;font-weight: 500">{{item.photoCount}}</span>
        </div>
        <div style="width: 175px;height: 40px">
          <span style='font-size:18px'>{{ item.albumName }}</span>
        </div>

      </div>
    </div>

    <div v-else>
      <div style="width: auto;height: 20px;">
        <el-button style="float: contour" plain type="primary" @click="isUploadPhoto=true"
                   v-if="queryUserId = curUser.userId">上传照片
        </el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a class="aPhoto" @click="photoType=1">返回相册主页</a>
      </div>

      <div class="imgerdiv" v-for="(item) in photoList">
        <a @click="openPhoto(item.fileUrl)">
          <img :src="item.fileUrl" class="imger" alt="">
        </a>
        <br>
        <div style="width: 175px;height: 40px">
          <span style='font-size:18px'>{{ item.createTime }}</span>
        </div>

      </div>

    </div>
    <el-dialog :visible.sync="dialogVisible" size="tiny" class="el-dialog1">
      <div class="cardBanner">
        <ul>
          <li v-for="(item,index) in photoList" :key="index">
            <a href="#">
              <img :src="item.fileUrl" alt="">
              <p>创建时间{{item.createTime}}</p>
            </a>
          </li>
          <div class="arrow-left" @click="toggleFun(-1)">&lt;</div>
          <div class="arrow-right" @click="toggleFun(1)">&gt;</div>
        </ul>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="isCreateAlbum" size="tiny">
      <el-form ref="form1" :model="form1" status-icon>

        <el-form-item label="相册名称" prop="userId" label-width="80px">
          <el-input v-model="form1.albumName"></el-input>
        </el-form-item>
        上传头像
        <el-form-item>
          <el-upload
            name="file"
            ref="upload1"
            :action="upUrl"
            :on-preview="onPreview"
            list-type="picture-card"
            :on-success="onSuccess1"
            :on-error="onError"
            :on-remove="onRemove"
            :before-upload="beforeUpload"
            :data="converUpData"
            :limit="1" :on-exceed="handleLimit"
            :file-list="uploadedFilesSrc"
            :before-remove="beforeRemove">
            <i class="el-icon-plus"></i>
          </el-upload>

        </el-form-item>
        <el-button @click="submitForm1" type="primary">确定</el-button>
        <el-button @click="isCreateAlbum=false" type="danger">取消</el-button>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="isUploadPhoto" size="tiny">
      <el-upload
        name="file"
        ref="upload2"
        :action="upUrl"
        :on-preview="onPreview"
        list-type="picture-card"
        :on-success="onSuccess2"
        :on-error="onError"
        :on-remove="onRemove"
        :before-upload="beforeUpload"
        :data="photoUpData"
        :limit="9" :on-exceed="handleLimit"
        :file-list="uploadedFilesSrc2"
        :before-remove="beforeRemove">
        <i class="el-icon-plus"></i>
      </el-upload>

      <el-button @click="submitForm2" type="primary">完成上传</el-button>
      <el-button @click="isUploadPhoto=false" type="danger">取消</el-button>
    </el-dialog>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import cons from '../cons'

  export default {

    name: 'userList',
    created() {
      if ('queryUserId' in this.commonparams) {
        this.queryUserId = this.commonparams['queryUserId'];
      } else {
        this.queryUserId = this.curUser.userId
      }

      this.getPhotoDirList()
    },
    data() {

      return {
        queryUserId: "",
        loading: false,
        photoType: 1,
        dirList: [],
        photoList: [],
        dialogImageUrl: "",
        dialogVisible: false,
        isCreateAlbum: false,
        isUploadPhoto: false,
        form1: {
          albumName: "",
          cover: "",
          userId: ""
        },
        form2: {},

        albumName: "",

        upUrl: cons.u + 'unlogin/appendPhoto',
        file: {},
        uploadedFiles: [],
        uploadedFilesSrc: [],
        uploadedFilesSrc2: [],


      }
    },
    computed: {
      ...mapState({
        commonparams: state => state.commonparams, // 从详情页返回
        curUser: state => state.user
      }),

      converUpData() {
        return {
          'name': this.curUser.name,
          'photoDir': "/" + this.curUser.userId + "/conver",
          'userId': this.curUser.userId
        }
      },
      photoUpData() {
        return {
          'name': this.curUser.name,
          'photoDir': "/" + this.curUser.userId + "/" + this.albumName,
          'albumName': this.albumName,
          'userId': this.curUser.userId
        }
      },
      photoDir() {
        return "/" + this.curUser.userId + "/新建相册"
      }
    },
    methods: {

      //通过函数改变数据从而达到视图的改变
      toggleFun(p){
        this.photoList = this.photoList.map((item,index,array) => {
          if(index===array.length-1&&p===1){
            item = array[0]
          }
          else if(index===0&&p===-1){
            item = array[array.length-1];
          }else{
            item = array[index+p];
          }
          return item;
        })
      },

      getPhotoDirList() {

        let param = new FormData()
        param.append('userId', this.queryUserId)
        param.append('photoType', 1)

        this.PF('center/photoDirList', param, {}).then((response) => {
          this.loading = false
          if (response.status == 200) {
            if (response.data.retCode == 1000) {
              this.dirList = response.data.results

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
      getPhotoList(albumName) {
        if (!albumName) {
          albumName = this.albumName
        }
        let param = new FormData()
        param.append('userId', this.curUser.userId)
        param.append('albumName', albumName)
        this.photoType = 2
        this.albumName = albumName

        this.PF('center/photoList', param, {}).then((response) => {
          this.loading = false
          if (response.status == 200) {
            if (response.data.retCode == 1000) {
              this.photoList = response.data.results

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
      openPhoto(url) {
        this.dialogImageUrl = url
        this.dialogVisible = true
      },

      submitForm1() {
        if (!this.form1.albumName || this.form1.albumName.length <= 0) {
          this.alretMessage(cons.errStr, "相册名称不能为空")
          return
        }
        if (!this.form1.cover || this.form1.cover.length <= 0) {
          this.alretMessage(cons.errStr, "封面必须上传")
          return
        }
        this.form1.userId = this.curUser.userId
        let param = new FormData()
        param.append('userId', this.form1.userId)
        param.append('albumName', this.form1.albumName)
        param.append('cover', this.form1.cover)
        this.PF('center/createAlbum', param, {}).then((response) => {
          this.loading = false
          if (response.status == 200) {
            if (response.data.retCode == 1000) {

              this.alretMessage(cons.succStr, "相册创建成功")
              this.isCreateAlbum = false
              this.form1.cover = ""
              this.form1.albumName = ""
              this.$refs['upload1'].clearFiles();

              this.getPhotoDirList()

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

      submitForm2() {
        this.alretMessage(cons.succStr, "照片上传成功")
        this.isUploadPhoto = false
        this.$refs['upload2'].clearFiles();

        this.getPhotoList()

      },

      //  上传照片相关
      onSuccess1(res, file, fileList) {
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
        this.form1.cover = file.url
      },
      onSuccess2(res, file, fileList) {
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
        this.uploadedFilesSrc2 = fileList
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
<style>

  .imger {
    width: 200px;
    height: 172px;

  }

  .imgerdiv {
    background-color: #fbf0f9;
    width: 200px;
    height: 220px;
    margin-top: 20px;
    margin-left: 20px;
    float: left;
    font-family: Arial;
    font-size: 18px;
    font-weight: 700;
    color: darkorange;
    border: 2px solid;
    border-color: #ffd6fe;
    text-align: right
  }


</style>
<style scoped>
  .el-carousel__item.el-carousel__item--card.is-in-stage {
    text-align: center;
  }

  /*修改高度*/
  .el-carousel__container {
    height: 100px;
  }

  .van-collapse-item__content {
    padding: 14px 0;
  }

  /*左右箭头的样式*/
  button.el-carousel__arrow.el-carousel__arrow--left, button.el-carousel__arrow.el-carousel__arrow--right {
    font-size: 12px;
    height: 20px;
    width: 20px;
    background: #A099F0;
  }

  .aPhoto:hover {
    color: blue;
  }

  .aPhoto {
    text-decoration: underline;
    font-weight: 700;
    color: #e52125;
    font-size: 18px;
  }

  .el-dialog body {
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
    width: 1000px;
    height: 900px;
  }




  /*  切换图片组件样式*/
  .cardBanner{
    padding: 10px 30px;
    background-color: #fff;
    border: 1px solid #ccc;
    position: relative;
  }
  .cardBanner ul{
    display: flex;
    overflow: scroll;    /*设置滚动条*/
  }
  .cardBanner ul::-webkit-scrollbar{    /*隐藏滚动条*/
    display: none;
  }
  .cardBanner ul>li{ //高能部分，flex不太好解释
  width: 50.33333%;
    flex-shrink: 0;
    padding-left: 3%;
    text-align: center;
  }
  .cardBanner ul>li:first-child{
    padding-left: 0;
  }
  .cardBanner ul>li a{
    display: block;
    width: 100%;
    height: 100%;
  }
  .cardBanner ul>li img{
    width: 100%;
    height: 600px;
    border-radius: 5px;
  }
  .cardBanner ul>li p{
    margin: 0;
  }
  [class^='arrow']{
    font-size: 30px;
    transform: scaleX(.7);
    color: #ddd;
  }
  .arrow-left{
    position: absolute;
    left: 5px;
    top: 50%;
    margin-top: -17px;
  }
  .arrow-right{
    position: absolute;
    right: 5px;
    top: 50%;
    margin-top: -17px;
  }

</style>

