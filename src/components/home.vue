<template>
  <div>
    <component :is="currentTop"></component>
    <component :is="currentLeft"></component>

  </div>
</template>
<script>
  import leftMenu from './leftMenu'
  import topMenu from './topMenu'

  export default {
    mounted() {
      // 注：window.onresize只能在项目内触发1次
      window.onresize = () => {
        var myWidth = window.innerWidth;
        this.btnleft = myWidth / 2 + 620 + 'px'
      }
      //Scrollbar.init(document.querySelector('#testit'))
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      this.dialogTableVisible = false
      next()
    },
    components: {
      leftMenu,
      topMenu,
      //jump,PF
    },
    data() {
      return {
        currentLeft: 'leftMenu',
        currentTop: 'topMenu',
      }
    }
  }

</script>

