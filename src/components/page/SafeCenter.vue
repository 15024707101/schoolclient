<template>
    <div class="redbg">
        <div class="state_boxs">
            <span class="fa fa-info-circle fa-3x float_left"></span>
            <span class="state_position">当前位置:安全中心</span>
            <a class="return universal_button red htmlreturn" @click="go(-1)">返回上一页</a>
        </div>
        <div class="top_box">

            <div class="center_box">
                <div class="center_content" style="">
                    <img class="borderimg" :src="staticPath + '/img/border.png'">
                    <div class="safepoint">
                        <span class="safeword">安全等级提示：</span>
                        <div class="Risklevel">
                            <!-- 低风险 -->
                            <img v-if="riskLoginInfo.isDanger==1" :src="staticPath + '/img/hign.png'" class="showlevel">
                            <img v-else-if="riskLoginInfo.isDanger==2" :src="staticPath + '/img/medium.png'"
                                 class="showlevel">
                            <!-- 中风险 -->
                            <img v-else :src="staticPath + '/img/low.png'" class="showlevel">
                            <!-- 高风险 -->
                        </div>
                    </div>
                    <div class="tips">
                        <p>尊敬的{{riskLoginInfo.name}}：</p>
                        <p class="tips-line">您最后一次修改密码的时间是：<span>{{riskLoginInfo.pwdLastMdfyTime}}</span></p>
                        <p class="tips-line">请关注是否有登录异常，及时修改密码并保护好自己的账户和密码，避免信息泄露以及账户被恶意利用。您最近的登录情况见下表：</p>
                    </div>
                    <div class="safepoint">
                        <span class="safeword">登录历史记录</span>
                    </div>
                    <div class="safelist">

                        <el-table :data="riskLoginInfo.loginHistoryList"
                                  border
                                  style="width: 100%"
                                  header-cell-class-name="headclass">
                            <el-table-column align="center" property="loginDatetime" label="登录时间" width="330px">
                            </el-table-column>
                            <el-table-column align="center" property="fromRegion" label="网络来源" width="330px">
                            </el-table-column>
                            <el-table-column align="center" property="status" label="状态">
                            </el-table-column>
                            <!--  {"loginDatetime":"2020-07-22 09:51:09","fromRegion":"中国大陆上海电信网络输出","status":"哈哈哈哈哈"},-->
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import cons from '../cons.vue'


    export default {
        data() {
            return {
                staticPath: cons.img,
                riskLoginInfo: {},
            }
        },

        computed: {
            ...mapState({
                commonparams: state => state.commonparams,
            }),
        },
        created() {
            this.getRiskLoginInfo()
        },
        beforeDestroy() {
            if ('safecenterInfo' in this.commonparams) {
                this.$store.commit("CLEAR_PARAM", 'safecenterInfo')
            }
        },
        methods: {
            getRiskLoginInfo() {

                this.PF('/getRiskLoginInfo', {}, {baseURL: cons.m}).then((response) => {
                    this.loading = false
                    if (response.status == 200) {
                        if (response.data.retCode == 1000) {
                            this.riskLoginInfo = response.data.results
                        } else {
                            this.$message({
                                type: 'error',
                                message: response.data.retMsg,
                            })
                        }
                    }
                }).catch((error) => {
                    this.loading = false
                    console.log(error.config)
                })
            }
        },


    }

</script>
<style scoped>
    .redbg {
        background: #f0f0f0;
        overflow: auto;
        width: 100%;
        height: 100%
    }

    .clear {
        clear: both
    }

    .top_box .top_box_center {
        width: 1000px;
        height: 75px;
        margin: 0 auto;
        text-align: center
    }

    .top_box_center .reg_logo {
        width: 58px;
        margin-top: 8px;
        float: left;
    }

    .top_box_center .reg_title {
        height: 32px;
        margin-top: 24px;
        margin-left: 20px;
        float: left;
    }

    .top_box_center .htmltitle {
        width: auto;
        height: 20px;
        float: left;
        margin-left: 30px;
        overflow: hidden;
        margin-top: 30px;
    }

    .htmltitle .add_user {
        float: left;
        height: 20px;
    }

    .htmltitle .tuanyuan {
        float: left;
        height: 20px;
    }



    .center_box .center_content {
        width: 980px;
        min-height: 730px;
        padding-top: 40px;
        padding-bottom: 40px;
        background: white;
        margin: 20px auto;
        border: 1px solid #cdcdcd
    }

    .login_box {
        width: 1000px;
        height: auto;
        margin: 0 auto;
        position: relative;
    }


    .bgchange {
        background: url(../../../static/img/reg_tab_bg1.png) no-repeat 0 0 scroll;
    }

    .center_contents .center_infobox {
        width: 460px;
        height: auto;
        margin: 60px auto 0;
    }

    .center_box .center_content .center_infobox {
        width: 460px;
        height: auto;
        margin: 0 auto;
    }

    /* .center_box .center_content .center_infobox p{width:460px;height:auto;font-size:14px;color:#999;margin-top:25px;text-align:left;margin-top:0} */

    .center_infobox .each_inputbox {
        margin-top: 0;
    }

    .each_inputbox .left_name {
        width: 120px;
        height: auto;
        float: left;
    }

    .each_inputbox .left_name_width {
        width: 140px;
    }

    .left_name .each_name {
        width: 100%;
        height: 25px;
        border-bottom: 1px solid #eeeeee;
        text-align: center;
        font-size: 14px;
        line-height: 25px;
        color: #464646;
        border-radius: 5px;
        margin-bottom: 20px;
        background: #f3f3f3;
        margin-top: 10px
    }

    .left_name .noborder {
        border-bottom: none
    }

    .each_inputbox .right_name {
        width: 120px;
        height: auto;
        float: left;
        border: 1px solid #eeeeee;
    }

    .each_inputbox .width_change {
        width: 320px;
        background: none;
        border: none;
    }

    .each_inputbox .width_change .each_name {
        text-align: left;
        position: relative;
        margin-bottom: 13px;
        margin-top: 5px;
        height: 32px;
        width: 320px;
        margin-left: 10px;
    }

    .each_inputbox .width_change .each_name .width {
        width: 220px;
    }

    .each_name .bordernone {
        width: 100%;
        float: left;
        border: none
    }

    .each_name .noborder {
        width: 100%;
        float: left;
        border: none
    }

    .but_box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        height: 42px;
        text-align: center;
        margin: 0 auto;
        margin-bottom: 30px;
    }

    .martop {
        margin-top: 40px !important;
    }

    .universal_button {
        background: #9f9f9f;
        width: auto;
        height: 40px;
        line-height: 40px;
        padding-left: 30px;
        padding-right: 30px;
        font-size: 18px;
        border-radius: 8px;
        text-align: center;
        border: none;
        color: white;
        float: left;
        cursor: pointer;
        margin-left: 0;
        margin-right: 0;
    }

    .universal_button:hover {
        text-decoration: none
    }

    .red {
        background: #e32322;
        transition: background 1s;
        -webkit-transition: background 1s;
    }

    .orange {
        background: #ffa800;
        transition: background 1s;
        -webkit-transition: background 1s;
        cursor: pointer;
        color: white
    }

    .blue {
        background: #35abe4;
        transition: background 1s;
        -webkit-transition: background 1s;
        color: white;
    }

    .but_box .marleft6 {
        margin-left: 55px;
    }

    .each_inputbox .width_change .each_name .choose_zuzhi {
        width: 100%;
        float: left;
        height: 32px;
        border-radius: 3px;
        line-height: 32px;
        position: relative;
    }

    .admin_code_info {
        font-size: 14px;
        font-weight: 400
    }

    /* step 2 */

    /* p {
        margin:0 0 10px;
    } */

    .center_box .two_width {
        width: 800px;
        display: none
    }

    .admin_code_box {
        width: 600px;
        height: 60px;
        margin: 30px auto;
    }

    @font-face {
        font-family: FontAwesome;
        src: url(../../../static/fonts/fontawesome-webfont.eot);
        src: url(../../../static/fonts/fontawesome-webfont.eot) format('embedded-opentype'), url(../../../static/fonts/fontawesome-webfont.woff2) format('woff2'), url(../../../static/fonts/fontawesome-webfont.woff) format('woff'), url(../../../static/fonts/fontawesome-webfont.ttf) format('truetype'), url(../../../static/fonts/fontawesome-webfont.svg) format('svg');
        font-weight: 400;
        font-style: normal
    }

    .fa {
        /* margin-left:10px; */
        display: inline-block;
        font: normal normal normal 14px/1 FontAwesome;
        font-size: inherit;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale
    }

    .fa-calendar:before {
        content: "\f073"
    }

    .fa-check:before {
        content: "\f00c"
    }

    .fa-user-md:before {
        content: "\f0f0"
    }

    .fa-exclamation-circle:before {
        content: "\f06a"
    }

    .fa-edit:before,
    .fa-pencil-square-o:before {
        content: "\f044"
    }

    .admin_code_info .fa-exclamation-circle {
        font-size: 16px;
        color: #cd0000;
    }

    .text-navy {
        color: #e21515;
    }

    /* step 3 */

    .left_name .each_name .must {
        color: #e21515;
    }

    .martop {
        margin-top: 60px;
    }

    /* step 4 */

    .state_box {
        width: 100%;
        height: auto;
        margin: 0 auto;
    }

    .state_box .state_info_box {
        width: 100%;
        height: auto;
        margin: 200px auto 0;
        overflow: hidden
    }

    .state_box .state_info_box .states {
        width: 36px;
        height: 36px;
        text-align: right;
        float: left;
        border: 6px solid #d2e9c4;
        margin-left: 84px;
        background: #93ca43;
        border-radius: 50%;
        line-height: 38px;
        text-align: center
    }

    .state_box .state_info_box .states .whitecolor {
        color: white;
        font-size: 24px
    }

    .state_box .state_info_box .prompt {
        width: 66%;
        height: 40px;
        line-height: 50px;
        text-align: left;
        float: left;
        text-indent: 20px;
        font-size: 24px;
        color: #68a90c
    }

    .state_box .click_return {
        margin: 24px auto 0;
        line-height: 30px;
    }

    .state_box .click_return a {
        color: #34abe3;
        text-decoration: underline
    }

    .choose_logo {
        width: 32px;
        height: 26px;
        line-height: 34px;
        text-align: center;
        position: absolute;
        right: 1px;
        top: 3px;
        color: #555;
    }

    .choose_logo .size {
        font-size: 20px;
        color: #555;
        cursor: pointer;
    }

    .choose_logo .hoverstyle:hover {
        color: #35abe4
    }

    .choose_zuzhi .hoverstyle:hover {
        color: #35abe4
    }

    .select-width {
        width: 100%
    }

    b,
    strong {
        font-weight: 700
    }

    #times {
        color: #e32222;
    }

    body.redbg {
        overflow: auto;
    }

    .center_content {
        border: 1px solid #e2e2e2;
        position: relative;
    }

    .center_content .borderimg {
        position: absolute;
        right: -5px;
        top: -4px;
    }

    .safepoint {
        width: 900px;
        height: 48px;
        margin: 10px auto;
    }

    .safeword {
        float: left;
        font-size: 22px;
        font-weight: 600;
        color: #333;
        margin-top: 8px;
    }

    .Risklevel {
        width: auto;
        height: 22px;
        float: left;
        margin-left: 10px;
        margin-top: 12px;
    }

    .showlevel {
        float: left;
    }

    .tips {
        width: 900px;
        height: auto;
        margin: 16px auto 40px;
    }

    .tips p {
        font-size: 16px
    }

    .tips-line {

        text-indent: 30px;

    }

    .tips-line span {

        color: #df1b1c;
        font-weight: 600
    }

    .safelist {
        width: 900px;
        height: auto;
        padding-top: 20px;
        border-top: 1px solid #e2e2e2;
        margin: 0 auto;
    }


    .infolist {
        width: 100%;
        height: auto;
    }

    .infolist .eachline {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #e2e2e2
    }

    .infolist .eachline .eachinfo {
        width: 30%;
        height: 50px;
        padding-left: 20px;
        color: #515151;
        line-height: 50px;
        font-size: 16px;
        float: left;
    }

    .universal_button {
        background: #9f9f9f;
        width: auto;
        height: 40px;
        line-height: 40px;
        padding: 10px 30px;
        font-size: 18px;
        border-radius: 8px;
        text-align: center;
        border: none;
        color: white;
        vertical-align: middle;
        cursor: pointer;
        margin-left: 30px;
        margin-right: 30px;
    }

    .universal_button:hover {
        text-decoration: none;
    }

    .return {
        float: right;
        margin-right: 28px;
        height: 30px;
        line-height: 30px;
        padding: 0;

        padding-left: 20px;
        padding-right: 20px;
        font-size: 14px;
        margin-top: 4px;
    }

    .red {
        background: #e32322;
        transition: background 1s;
        -webkit-transition: background 1s;
    }
    .mes_name {
        color: white;
    }

</style>

