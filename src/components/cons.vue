<script>

var rootUrl = process.env.VUE_APP_ROOTURL
var imgPath = process.env.VUE_APP_IMGPATH
var jsPath = process.env.VUE_APP_JSPATH


if (!rootUrl) { // 为了不同版本的vue-cli本地测试
    rootUrl = 'http://172.29.33.90:3334'
}
if (!imgPath) { // 为了不同版本的vue-cli本地测试
  imgPath = '/static'
}

export default {
    version: 10000122, // 客户端版本 在小于后台设置的版本时会提示刷新
    rootUrl: rootUrl,
    img: imgPath,
    js: jsPath,

    u: rootUrl + '/', // 管理中心

    unlogin: rootUrl + '/unlogin',

    headerCSRfTokan: 'X-CSRF-Token', // 注意要和服务器端（golang）保持一致


    maxMemberRecordFileSize: 20, // MB
}
</script>
