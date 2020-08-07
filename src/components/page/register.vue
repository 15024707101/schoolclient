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
      <!--<form action="http://172.29.33.90:3334/unlogin/uploadImg" method="post" enctype="multipart/form-data">
        Name: <input type="text" name="name"><br>
        Email: <input type="email" name="email"><br>
        Files: <input type="file" name="file"><br><br>
        <input type="submit" value="Submit">
      </form>-->

      <!--<el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon>
        <el-form-item>
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
                <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>

        </el-form-item>
      </el-form>-->
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon>
        <div class="fill_content" style="border: 1px dashed #BBBBBB;height: auto;padding: 20px">
          <el-form-item>
            <el-upload
              name="file"
              accept="image/jpeg,image/gif,image/png,image/jpg,image/bmp"
              :action="upUrl"
              list-type="picture-card"
              :on-success="handleAvatarSuccess"
              :on-error="handlerUploadError"
              :on-remove="handleRemove"
              :on-change="handleUploadChange"
              :headers="upHeaders"
              :before-upload="beforeAvatarUpload"
              :data="upData"
              :with-credentials="credent"
              :limit="upLimit" :on-exceed="handleLimit"
              :file-list="uploadedFilesSrc"
              :before-remove="handleRemoveBefore">
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

      var checkMeetingCate = (rule, value, cb) => {
        if (!value) {
          this.meetingCateMsg = "请选择会议的类型"
          this.showMeetingCateMsg = true
          return cb(new Error(" "))
        }

        cb()
      };
      var checkJoinUsers = (rule, value, cb) => {
        if (this.joinUsers.length <= 0) {
          this.joinUsersMsg = "参加人数不能为空，请选择"
          this.showJoinUsersMsg = true
          return cb(new Error(" "))
        } else {
          this.showJoinUsersMsg = false
          cb()
        }
        let vArr = this.joinUsers.split(",")
        if (vArr.length > 1000) {
          this.joinUsersMsg = "最多参加人数不能超过1000人"
          this.showJoinUsersMsg = true
          return cb(new Error(" "))
        }

        cb()
      };

      var checkMeetingTime = (rule, value, cb) => {
        if (!value) {
          this.meetingTimeMsg = "会议时间不能为空"
          this.showMeetingTimeMsg = true
          return cb(new Error(" "))
        }

        cb()
      };
      var checkMeetingPlace = (rule, value, cb) => {
        if (!value) {
          this.meetingPlaceMsg = "会议地点不能为空"
          this.showMeetingPlaceMsg = true
          return cb(new Error(" "))
        }
        if (value.length < 4 || value.length > 24) {
          this.meetingPlaceMsg = "请在会议地点内输入4-24有效字数"
          this.showMeetingPlaceMsg = true
          return cb(new Error(" "))
        }

        cb()
      };
      var checkMeetingTitle = (rule, value, cb) => {

        if (value.length < 12 || value.length > 24) {
          this.meetingTitleMsg = "请在会议主题内输入12-24有效字数"
          this.showMeetingTitleMsg = true
          return cb(new Error(" "))
        }

        cb()
      };
      var checkMeetingContent = (rule, value, cb) => {

        if (value.length < 24 || value.length > 8000) {
          this.meetingContentMsg = "请在会议内容内输入24-8000有效字数"
          this.showMeetingContentMsg = true
          return cb(new Error(" "))
        }

        cb()
      };

      return {
        loading: false,
        staticPath: cons.img,
        queryleagueId: '',
        pageData: '',
        userList: [],
        meetingType: '支部团员大会',
        imeetingType: 1,
        paramHashCode: '',

        options: [],
        value: '',
        showDialog: false,
        joinValue: '',
        minRows: 1,

        maxRows: 10,
        value1: '',
        textarea3: '',
        selectedLeague: {},
        defaultExpandKeys: [],
        treeProps: {
          label: 'leagueName',
          titlelabel: 'leagueFullName',
          children: 'leagueList',
          isLeaf: 'isLeaf',
        },
        multipleSelection: [],
        selectedNum: 0,
        selectedUsers: [],
        selectedUsersId: [],
        selectedUsersObj: {},

        dialogImageUrl: '',
        dialogVisible: false,
        upUrl: cons.u + 'unlogin/uploadImg',
        picUuid: '',
        file: {},
        //upHeaders: {}, //{'Content-Type':'multipart/form-data','Access-Control-Allow-Origin':'http://127.0.0.1:8080'},
        credent: true,
        uploadedFiles: [],
        uploadedFilesSrc: [],
        upLimit: 3,
        ////
        manual_: true,
        ruleForm: {
          meetingCate: '',
          joinUsers: '',
          meetingTime: '',
          meetingPlace: '',
          meetingTitle: '',
          meetingContent: '',

          photoList: [],
        },
        meetingCateMsg: '',
        showMeetingCateMsg: false,
        joinUsersMsg: '',
        showJoinUsersMsg: false,
        meetingTimeMsg: '',
        showMeetingTimeMsg: false,
        meetingPlaceMsg: '',
        showMeetingPlaceMsg: false,
        meetingTitleMsg: '',
        showMeetingTitleMsg: false,
        meetingContentMsg: '',
        showMeetingContentMsg: false,
        rules: {
          meetingCate: [
            {validator: checkMeetingCate, trigger: 'blur'}
          ],
          joinUsers: [
            {validator: checkJoinUsers, trigger: 'change'}
          ],
          meetingTime: [
            {validator: checkMeetingTime, trigger: 'blur'}
          ],
          meetingPlace: [
            {validator: checkMeetingPlace, trigger: 'blur'}
          ],

          meetingTitle: [
            {validator: checkMeetingTitle, trigger: 'blur'}
          ],
          meetingContent: [
            {validator: checkMeetingContent, trigger: 'blur'}
          ],
        },
      }

    },
    computed: {
      popTitle() {
        return "选择参加人员(1000/" + this.selectedNum + ")";
      },
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
      joinUsersId() {
        if (this.selectedUsersId.length > 0) {
          console.log("去重前：selectedUsersId==[(长度：" + this.selectedUsersId.length + ")}")
          //新增参会人员去重功能
          let arr = []
          for (let i = 0; i < this.selectedUsersId.length; i++) {
            if (arr.indexOf(this.selectedUsersId[i]) == -1) {
              arr.push(this.selectedUsersId[i]);
            }
          }
          console.log("去重后:arr=={(长度：" + arr.length + ")}")
          let userIds = arr.join(",");
          return userIds
        }
        return '';
      },
      upData() {
        return {
          'currLeagueId': this.curLeague.leagueId,
          'currUserId': this.curUser.userId,
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
      meetTypeString() {
        let s = '';
        for (let i = 0; i < this.options.length; i++) {
          if (i == this.options.length - 1) {
            s+=this.options[i].value

          } else {
            s+=this.options[i].value+','
          }
        }
        return s
      },
    },
    methods: {



      handleAvatarSuccess(res, file, fileList) {
        if (res.retCode != 1000 ){
          this.$message({
            type: 'error',
            message: '上传失败，' + res.retMsg,
          })
          fileList.splice(-1,1)
          return false
        }
        file.fileId = res.results.fileId
        file.url = res.results.thumbnailFileUrl
        file.name = res.results.fileName
        file.thumbnailFileId = res.results.thumbnailFileId
        file.thumbnailFileUrl = res.results.thumbnailFileUrl
        this.uploadedFilesSrc = fileList
        // console.log(this.uploadedFilesSrc)
      },
      handlerUploadError(err, file, fileList) {
        this.$message({
          type: 'error',
          message: '上传失败，' + err.retCode + ',' + err.retMsg,
        })
      },
      beforeAvatarUpload(file) {

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
      handleRemoveBefore(file, fileList) {
        if (!file.fileId) {
          return true
        }
      },
      handleRemove(file, fileList) {

        let fl = []
        fileList.forEach((v, i, a) => {
          if (v != file.url) {
            fl.push(v)
          }
        })
        this.uploadedFilesSrc = fl
        console.log(this.uploadedFilesSrc)
      },
      handleUploadChange(file, fileList) {
        this.file = file.raw // 为了自实现上传功能
      },
      handleLimit(files, fileList) {
        this.$message({
          type: 'error',
          message: '超出了最大上传数量',
        })
      },


      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable2.toggleRowSelection(row, true);
          });
        } else {
          this.$refs.multipleTable2.clearSelection();
        }
      },

      submit(formName) {

        let self = this
        this.ruleForm.joinUsers = this.joinUsersId
        this.$refs[formName].validate(function (valid) {
          if (valid) {

            if (self.uploadedFilesSrc.length === 0 ) {
              self.$message({
                type: 'error',
                message: '请上传会议图片'
              });
              return false
            }
            if (parseInt(self.uploadedFilesSrc.length) > 3) {
              self.$message({
                type: 'error',
                message: '会议图片不能超过三张'
              });
              return false
            }

            if (self.uploadedFilesSrc.length > 0) {
              let allPhotos = []
              for (let i in self.uploadedFilesSrc) {

                if (self.uploadedFilesSrc[i].url) {

                  let onePhoto = {
                    photoFileId: self.uploadedFilesSrc[i].fileId,
                    thumbnailFileId: self.uploadedFilesSrc[i].thumbnailFileId,
                    fileName: self.uploadedFilesSrc[i].fileName,

                  }
                  allPhotos.push(onePhoto)
                }
              }
              self.ruleForm.oldPhotoList = allPhotos
            }
            self.loading = true;
            self.doSubmit()
            self.loading = false
          } else {
            return false;
          }
        });
      },
      doSubmit() {
        let self = this
        let j = this.jump

        let param = {
          nonce: this.nonce,
          ...this.ruleForm,
          meetingCate: this.ruleForm.meetingCate + '',
        }

        /*//将本次提交的内容转换成 hash值，通过每次比较hash值，避免用户重复提交
        let paramJsonString = JSON.stringify(param)
        //console.log(paramJsonString)
        let pCode = self.$root.getHashCode(paramJsonString, false)
        //console.log(pCode)
        if (pCode == self.paramHashCode) {
            self.$message({
                type: 'warning',
                message: '请修改会议内容后再提交'
            })
            return
        } else {
            self.paramHashCode = pCode
        }*/

        let ins = self.$root.PF('/meeting/append', param, {baseURL: cons.u});
        ins.then(function (response) {

          if (response.status == 200) {
            if (response.data.retCode === 1000) {
              console.log(response.data.results)
              self.$message({
                type: 'success',
                message: '成功保存到服务器',
                showClose: true,
                duration: 2000,
                onClose: function () {
                  j('/center/manage/meetinglist/' + self.ruleForm.meetingCate)
                }
              })
            } else {
              self.$message({
                type: 'error',
                message: response.data.retMsg
              })
            }
          } else {

            console.log("Got Return code:" + response.status)
            self.$message({
              type: 'error',
              message: '保存数据发生异常'
            })
          }
        })
          .catch(function (error) {

            self.$message({
              type: 'error',
              message: "请稍后提交"
            })
          });
      }
    },
  }

</script>
