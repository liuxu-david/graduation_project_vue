<template>
  <el-container>
    <el-aside width="200px"><Aside></Aside></el-aside>
    <el-container>
      <el-header><Header></Header></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
  import Header from "@/components/Header.vue";
  import Aside from "@/components/Aside.vue";
</script>

<style lang="less" scoped>
  .el-container {
    height: 100vh;
    // background-color: #f0f0f0;
    .el-aside {
      background-color: #fff;
      border: 1px solid #ccc;
      // background-color: #001529;
      overflow: hidden;
    }
    .el-header {
      // background: linear-gradient(#56b6c2, #22b3b8 50%);
      background-color: #fff;
      border: 1px solid #ccc;
    }
    .el-main {
      --el-main-padding: 0px;
      // padding-top: 40px;
    }
  }
</style>
