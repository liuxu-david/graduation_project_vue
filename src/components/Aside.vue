<template>
  <div class="aside">
    <div class="header">
      <img src="../assets/favicon.png" alt="" />
      <span>{{ permissionValue }}</span>
    </div>
    <!-- 左侧菜单 -->
    <div>
      <el-menu
        v-for="(item, index) in menu"
        :key="index"
        router
        text-color="#23272e"
        active-text-color="#23272e"
      >
        <el-menu-item
          :index="item.key"
          @click="handleItemClick(index)"
          :class="{ active: activeIndex == index }"
        >
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import loginDataUtils from "@/utils/loginData";

  let activeIndex = ref(0);
  activeIndex.value = loginDataUtils.getLoginData("activeIndex")
    ? loginDataUtils.getLoginData("activeIndex")
    : 0;
  const permissionValue = ref("Manager");
  const menu = JSON.parse(loginDataUtils.getLoginData("menu"));
  const flag = JSON.parse(loginDataUtils.getLoginData("flag"));
  switch (flag) {
    case 0:
      permissionValue.value = "Manager";
      break;
    case 1:
      permissionValue.value = "Teacher";
      break;
    default:
      permissionValue.value = "Student";
  }

  const handleItemClick = (index) => {
    activeIndex.value = index;
    loginDataUtils.setLoginData("activeIndex", index);
  };
</script>

<style lang="less" scoped>
  .aside {
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 13px 0;
      width: 100%;
      overflow: hidden;
      border-bottom: 1px solid #ccc;
      img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
      }
      span {
        color: #001529;
        font-size: 20px;
      }
    }
    .el-menu {
      width: 100%;
      height: 100%;
      .active {
        color: #fff;
        // background-color: #545c64;
        background-color: #5b778d;
      }
    }
  }
</style>
