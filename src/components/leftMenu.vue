<template>
  <div class="mainview" flex-box="1" flex="main:center">
    <div class="left_main">
      <div class="left_view" flex="dir:top main:left">
        <div class="left_head" flex-box="0" flex="dir:top">
          <a href="javascript:void(0)">
            <img alt="image" class="img-circle" style="width: 80px" :src="iconSrc"/>
          </a>
          <p class="block" v-html="curUser.name"></p>
        </div>
        <el-menu
          mode="horizontal"
          id="side-menu"
          default-active="$route.path"
          text-color="#ffffff"
          active-text-color="#182148"
          background-color="#fd6331"
          unique-opened
          @select="selectEventHandler"
          router>

          <el-menu-item index="/center/userlist" class="menu-item sidebar-collapse">

            <i class="el-icon-menu"></i>
            <span class="nav-label" style="font-size:14px">用户列表</span>

          </el-menu-item>

          <el-submenu index="1" class="menu-item sidebar-collapse">

            <template slot="title" class="sub-submenu">
              <span class="nav-label" style="font-size:14px">用户管理</span>
            </template>
            <el-menu-item index="/center/userlist">
              用户列表
            </el-menu-item>
            <el-menu-item index="/center/loginHistory">
              个人登录历史
            </el-menu-item>
            <el-menu-item index="/center/userlist">
              添加人员
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2" class="menu-item sidebar-collapse">

            <template slot="title" class="sub-submenu">
              <i class="fa fa-sitemap  icored"></i>
              <span class="nav-label" style="font-size:14px">班级管理</span>
            </template>
            <el-menu-item index="/center/classlist">
              班级列表
            </el-menu-item>
            <el-menu-item index="/center/manage/orgmanagetw">
              添加班级
            </el-menu-item>
          </el-submenu>

        </el-menu>
        <div style="height: 400px"></div>
      </div>
    </div>
    <div class="gray-bg wrap-content">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>

</template>

<script>
  import cons from './cons.vue'
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState({
        commonparams: state => state.commonparams, // 从详情页返回
        curUser: state => state.user
      }),
      iconSrc() {

        return cons.img + this.curUser.headPortrait

      }
    },

    methods: {
      selectEventHandler: function (index, path) {
        this.$store.commit("CLEAR_PARAMS")
      },
    }
  }
</script>
<style>
  /* 右侧内容区 */
  .float_left {
    float: left;
    margin-top: 8px;
    margin-right: 10px;
    font-size: 24px;
    color: #e21515;
    text-indent: 26px;
  }

  .state_boxs {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #cdcdcd;
    line-height: 40px;
    margin-bottom: 20px
  }

  .fa-info-circle:before {
    content: "\f041"
  }

  .wrapper-content {
    padding: 20px;
    padding-top: 0
  }

  .panel_center {
    width: 980px;
    height: auto;
    margin: 0 auto;
    overflow: hidden;
    padding-bottom: 4px;

  }

  .panel_center .user_notice {
    width: 100%;
    height: auto;
    margin: 0 auto;
  }

  .user_notice .left_user {
    height: 220px;
    width: 646px;
    border: 1px solid #dfdfdf;
    float: left;
    background: #fefefe
  }

  .user_notice .right_notice {
    width: 313px;
    height: 220px;
    border: 1px solid #dfdfdf;
    margin-right: 1px;
    float: right;
    background: white
  }

  .usertitle {
    width: 100%;
    height: 40px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid #dcdcdc
  }

  .usertitle .fa {
    float: left;
    font-size: 18px;
    color: #e52125;
    margin-top: 12px;
    margin-left: 15px;
  }

  .titlestyle {
    float: left;
    height: 40px;
    float: left;
    margin-left: 6px;
    line-height: 40px;
    font-size: 16px;
    color: #e32222;
  }

  .usertitle .fa-plus {
    float: right;
    font-size: 14px;
    color: #888888;
    margin-top: 16px;
    margin-right: 18px;
  }

  .usertitle .look {
    float: right;
    font-size: 14px;
    color: #888888;
    margin-top: 10px;
    margin-right: 18px;
  }

  .statistics_box {
    width: 100%;
    height: 160px;
    margin: 20px auto 0;
    text-align: center
  }

  .statistics_box .statistics {
    width: 105px;
    height: 168px;
    display: inline-block;
    margin-right: 6px;
    margin-left: 6px;
  }

  .statistics .statistics_yuan {
    width: 105px;
    height: 105px;
    display: inline-block;
    background: #e32322;
    border: 10px solid #f6d3d1;
    line-height: 82px;
    color: white;
    font-size: 14px;
    text-align: center;
    border-radius: 50%;
  }

  .statistics .statistics_yuan .number {
    font-size: 32px;
    color: white
  }

  .statistics .graybg {
    background: #00a7ae;
    border: 10px solid #ccebed;
  }

  .right_notice p {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #333;
  }

  .left_user .userinfosbox {
    width: 600px;
    height: auto;
    margin: 0 auto;
    padding-top: 20px;
  }

  .userinfosbox .userinfo {
    width: 100%;
    height: 28px;
    margin: 0 auto 14px;
  }

  .userinfo .userBoxs {
    width: 300px;
    height: 28px;
    float: left;
  }

  .userBoxs .userlabel {
    width: 92px;
    height: 28px;
    border-radius: 6px;
    background: #e4e4e4;
    color: #000;
    line-height: 28px;
    text-align: center;
    float: left;
    font-size: 14px;
  }

  .userBoxs .usercontent {
    float: left;
    margin-left: 20px;
    color: #000;
    font-size: 14px;
    height: auto;
    line-height: 28px;
    width: 160px;
  }

  .panels {
    overflow: hidden;
    width: 100%;
    margin-right: 0;
    height: auto;
    padding-top: 20px;
  }

  .panels .eachBox {
    width: 313px;
    height: 195px;
    float: left;
    border: 1px solid #dfdfdf;
    background: white;
    margin-right: 20px;
  }

  .eachBox .listInfo {
    width: 266px;
    height: 150px;
    margin: 0 auto;
    padding-top: 16px;
    overflow: hidden;
  }

  .usertitle img {
    float: left;
    margin-top: 8px;
    margin-left: 14px;
  }

  .listInfo a:hover p {
    text-decoration: underline;
    color: #e4161a
  }

  .listInfo p {
    font-size: 14px;
    width: 266px;
    margin: 0 auto 18px;
    height: 16px;
    overflow: hidden;
    color: #444444;
    line-height: 16px
  }

  .panels .minegame {
    width: 100%;
    min-height: 180px;
    margin: 0 auto;
    background: white;
    border: 1px solid #dfdfdf;
  }

  .minegame .gameBox {
    width: 100%;
    height: auto;
    padding-top: 30px;
    overflow: hidden;
  }

  a {
    cursor: pointer
  }

  .gameBox .eachInfos {
    width: 50%;
    height: 120px;
    float: left;
    margin-bottom: 20px;
  }

  .eachInfos img {
    width: 148px;
    height: 98px;
    float: left;
    border: 1px solid #e7e7e7;
    margin-left: 20px;
  }

  .eachInfos .rightInfos {
    width: 210px;
    height: 120px;
    float: left;
    margin-left: 16px;
  }

  .eachInfos .rightInfos .title {
    font-size: 16px;
    color: #444444;
    margin-bottom: 5px;
  }

  .eachInfos .rightInfos .article {
    font-size: 14px;
    color: #888888;
    line-height: 22px
  }

  .eachInfos .rightInfos .article a {
    color: #e32222
  }

  .eachInfos .rightInfos .article a:hover {
    text-decoration: underline;
  }

  .eachInfos .rightInfos .time {
    color: #a5a5a5;
    margin-top: 0;
  }

  .p_hide {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  p {
    margin: 0 0 10px;
  }

  .wrap-content {
    overflow-x: hidden !important;
    float: left;

  }

  .mainview {
    background-color: rgb(214, 214, 214);
    min-height: 800px;
    width: 100%;
  }

  .mainview .left_main {
    width: 200px;
    height: 100%;
    overflow: hidden;
    float: left;
    /*min-height: 0;*/
  }

  .mainview .left_main .left_view {
    width: 237px;
    height: 100%;
    background-color: #fbd8f0;
    overflow-y: auto;
    overflow-x: hidden;
    /*min-height: 0;*/
  }

  .mainview .left_main .left_view .left_head {
    background-color: #cbfbc7;
    align-items: center;
    width: 220px
  }

  .gray-bg {
    float: left;
    background-color: #f0f0f0;
    height: 100%;
    width: 85%;
    overflow: auto;
    margin-left: 10px;
  }

  .sub-submenu {
    /* border-bottom: 1px solid #fc615f; */
    /* color: white; */
    font-weight: 400;
    padding-left: 25px;
    overflow: hidden;
    width: 100%;
    margin-left: 100px;
  }
  .menu-item {

    width: 220px;
    background: #e32322;
    height: auto;

    position: relative;
    display: block;
    border-bottom: 1px solid #fc615f;
  }

  .menu-item span {
    color: white;
  }
  .nav-label {
    float: left;
    margin-left: 0;
    margin-top: 4px;
  }

</style>
