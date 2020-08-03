<template>
  <div id="app">
<!--    <img  height="200px" src="./assets/logo3.jpg">-->
    <!--<img  height="100px" src="./assets/t1.jpg">
    <img  height="100px" src="./assets/t2.jpg">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
