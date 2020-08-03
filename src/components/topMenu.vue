<template>
  <div>
    <a href="#" @click="operationCenter">解密工具</a>
    <el-button type="success" @click="operationCenter">解密工具</el-button>

  </div>
</template>

<script>
  export default {
    methods: {
      operationCenter() {
        this.jump('/decode')
      },
    }
  }
</script>
