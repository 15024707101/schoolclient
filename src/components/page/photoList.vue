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
      <div class="imgerdiv" v-for="(item) in dirList">
        <a @click="getPhotoList()">
          <img :src="item.cover" class="imger" alt="">
        </a>
        <br>
        <div style='width: 175px;height: 35px;margin-top: -35px; margin-right:0px;'>
          <span style="font-size:30px;color: #edfbf8;font-weight: 500">{{item.photoNum}}</span>
        </div>
        <div style="width: 175px;height: 40px">
          <span style='font-size:18px'>{{ item.dir }}</span>
        </div>

      </div>


    </div>
    <div v-else>
      <div style="width: auto;height: 20px"><a @click="photoType=1">返回相册主页</a></div>
      <div class="imgerdiv" v-for="(item) in photoList">
        <a @click="openPhoto(item.url)">
          <img :src="item.url" class="imger" alt="">
        </a>
        <br>
        <div style="width: 175px;height: 40px">
          <span style='font-size:18px'>{{ item.createTime }}</span>
        </div>

      </div>

    </div>
    <el-dialog :visible.sync="dialogVisible" size="tiny" class="el-dialog1">
      <el-carousel type="card" arrow="always" :loop="false" :initial-index="1"
                   indicator-position="none" :autoplay="false">
        <el-carousel-item v-for="(items, index) in photoList" :key="index">
          <div style="width: 1000px;height: 800px">
            <div style="width: 900px;height: 700px">
              <img :src="items.url" style="width: 500px" class="headImgStyle">
            </div>
            <div class="nickname">
              {{items.createTime}}
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>

  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {

    name: 'userList',
    created() {
      /*if (!this.commonparams["queryUserId"] && this.commonparams["queryUserId"].length != 0) {
        this.getPhotoDirList(this.commonparams["queryUserId"])
        return
      }*/
      this.getPhotoDirList()
    },
    data() {

      return {
        loading: false,
        photoType: 1,
        photoList: [
          {
            "url": "http://127.0.0.1:3334/img/czf/新建相册/30256489-3418-460f-9cab-cb7f40a430e0.jpg",
            "fileId": "1231",
            "createTime": "2020-08-09 17:58:54"
          },
          {
            "url": "http://127.0.0.1:3334/img/czf/新建相册/30256489-3418-460f-9cab-cb7f40a430e0.jpg",
            "fileId": "1231",
            "createTime": "2020-08-09 17:58:54"
          },
          {
            "url": "http://127.0.0.1:3334/img/czf/新建相册/30256489-3418-460f-9cab-cb7f40a430e0.jpg",
            "fileId": "1231",
            "createTime": "2020-08-09 17:58:54"
          },
          {
            "url": "http://127.0.0.1:3334/img/czf/新建相册/30256489-3418-460f-9cab-cb7f40a430e0.jpg",
            "fileId": "1231",
            "createTime": "2020-08-09 17:58:54"
          },
          {
            "url": "http://127.0.0.1:3334/img/czf/新建相册/30256489-3418-460f-9cab-cb7f40a430e0.jpg",
            "fileId": "1231",
            "createTime": "2020-08-09 17:58:54"
          },
          {
            "url": "http://127.0.0.1:3334/img/czf/新建相册/30256489-3418-460f-9cab-cb7f40a430e0.jpg",
            "fileId": "1231",
            "createTime": "2020-08-09 17:58:54"
          },
          {
            "url": "http://127.0.0.1:3334/img/czf/新建相册/30256489-3418-460f-9cab-cb7f40a430e0.jpg",
            "fileId": "1231",
            "createTime": "2020-08-09 17:58:54"
          },
          {
            "url": "http://127.0.0.1:3334/img/czf/新建相册/30256489-3418-460f-9cab-cb7f40a430e0.jpg",
            "fileId": "1231",
            "createTime": "2020-08-09 17:58:54"
          },
          {
            "url": "http://127.0.0.1:3334/img/czf/新建相册/30256489-3418-460f-9cab-cb7f40a430e0.jpg",
            "fileId": "1231",
            "createTime": "2020-08-09 17:58:54"
          },
          {
            "url": "http://127.0.0.1:3334/img/czf/新建相册/30256489-3418-460f-9cab-cb7f40a430e0.jpg",
            "fileId": "1231",
            "createTime": "2020-08-09 17:58:54"
          },
          {
            "url": "http://127.0.0.1:3334/img/czf/新建相册/30256489-3418-460f-9cab-cb7f40a430e0.jpg",
            "fileId": "1231",
            "createTime": "2020-08-09 17:58:54"
          },
          {
            "url": "http://127.0.0.1:3334/img/czf/新建相册/30256489-3418-460f-9cab-cb7f40a430e0.jpg",
            "fileId": "1231",
            "createTime": "2020-08-09 17:58:54"
          },
          {
            "url": "http://127.0.0.1:3334/img/czf/新建相册/30256489-3418-460f-9cab-cb7f40a430e0.jpg",
            "fileId": "1231",
            "createTime": "2020-08-09 17:58:54"
          },

          {
            "url": "http://127.0.0.1:3334/img/headPhoto/ad4fb167-ed68-455b-9ee5-882765f2fb97.jpg",
            "fileId": "1589",
            "createTime": "2020-08-09 17:58:54"
          }
        ],
        dirList: [
          {
            "dir": "我爱我家",
            "photoNum": 280,
            "cover": "http://127.0.0.1:3334/img/czf/新建相册/30256489-3418-460f-9cab-cb7f40a430e0.jpg"
          },
          {
            "dir": "黎明前的黑暗",
            "photoNum": 162,
            "cover": "http://127.0.0.1:3334/img/czf/新建相册/2e2922c9-bee8-4147-abc2-2361b0943277.jpg"
          },
          {
            "dir": "大学时光",
            "photoNum": 25,
            "cover": "http://127.0.0.1:3334/img/headPhoto/ad4fb167-ed68-455b-9ee5-882765f2fb97.jpg"
          }
        ],
        dialogImageUrl: "",
        dialogVisible: false,

      }
    },
    computed: {
      ...mapState({
        commonparams: state => state.commonparams, // 从详情页返回
        curUser: state => state.user
      }),
    },
    methods: {
      getPhotoDirList() {
        let param = new FormData()
        param.append('userId', this.curUser.userId)
        this.photoType = 1

        /*this.PF('center/photoDirList', param, {}).then((response) => {
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
        })*/
      },
      getPhotoList() {
        let param = new FormData()
        param.append('userId', this.curUser.userId)
        this.photoType = 2

        /*this.PF('center/photoList', param, {}).then((response) => {
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
        })*/
      },
      openPhoto(url) {
        this.dialogImageUrl = url
        this.dialogVisible = true
      }

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

</style>

