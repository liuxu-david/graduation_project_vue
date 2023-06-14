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
            <el-dropdown-item @click="handleChangePossword"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item @click="handleExitClick"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="修改个人密码"
      width="30%"
      :before-close="handleClose"
    >
      <el-row :gutter="10">
        <el-input
          v-model="inputValue"
          placeholder="请输入需要修改的密码"
        ></el-input>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleConcelClick">取消</el-button>
          <el-button type="danger" @click="handleSuccessClick">
            修改
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import loginDataUtils from "@/utils/loginData";
  import { changeToPassword } from "@/service/login";

  const url = new URL("@/assets/login.webp", import.meta.url).href;
  const router = useRouter();
  let flag = loginDataUtils.getLoginData("flag");
  let id = loginDataUtils.getLoginData("id");
  let dialogVisible = ref(false);
  let inputValue = ref("");

  // 点击修改密码
  const handleChangePossword = () => {
    dialogVisible.value = true;
  };
  const handleClose = () => {
    dialogVisible.value = false;
    inputValue.value = "";
  };
  const handleConcelClick = () => {
    dialogVisible.value = false;
    inputValue.value = "";
  };
  const handleSuccessClick = () => {
    dialogVisible.value = false;
    changeToPassword(id, inputValue.value, flag).then((res) => {
      ElMessage({
        message: res.data.info,
        type: "success",
      });
    });
    inputValue.value = "";
    handleExitClick();
  };

  // 点击退出操作
  const handleExitClick = () => {
    loginDataUtils.removeAllData();
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
