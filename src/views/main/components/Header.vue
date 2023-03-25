<template>
  <div class="header">
    <div class="header-left"></div>
    <div class="header-title">软件学院卓越人才选拔系统</div>
    <div class="header-right" @click="handleDrapdownChange">
      <el-dropdown trigger="click">
        <div class="message">
          <el-avatar class="img" :size="35" :src="url" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import loginDataUtils from "@/utils/loginData";

  const url = new URL("@/assets/login.webp", import.meta.url).href;
  // const userName = loginDataUtils.getLoginData("username");
  const router = useRouter();

  // 点击退出操作
  const handleExitClick = () => {
    loginDataUtils.removeLoginData("token");
    router.push("/login");
  };
</script>

<style lang="less" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    .header-title {
      font-size: 25px;
      margin-bottom: 5px;
      color: black;
    }
    .header-right {
      display: flex;
      align-items: center;
      .img {
        background-color: rgba(255, 255, 255, 0.5);
        margin-right: 5px;
      }
      cursor: pointer;
      margin-right: 10px;
      .message {
        display: flex;
        justify-content: center;
        align-items: center;
        .text {
          color: black;
          font-weight: 700;
          font-size: 20px;
        }
      }
    }
  }
</style>
