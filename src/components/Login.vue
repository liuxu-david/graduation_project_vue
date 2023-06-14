<template>
  <div class="login-form">
    <el-form
      ref="loginForm"
      :model="loginFormData"
      style="max-width: 400px"
      :rules="rules"
      status-icon
    >
      <el-form-item prop="account">
        <el-input v-model="loginFormData.account" placeholder="请输入登录账号">
          <template #prefix>
            <el-icon class="el-input__icon"><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginFormData.password"
          placeholder="请输入密码"
          type="password"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="check-line">
        <div class="check-item">
          <el-checkbox v-model="loginFormData.checkValue[0]" label="管理员" />
        </div>
        <div class="check-item">
          <el-checkbox v-model="loginFormData.checkValue[1]" label="教师" />
        </div>
        <div class="check-item">
          <el-checkbox v-model="loginFormData.checkValue[2]" label="学生" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="handleSubmitClick">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
  import { ref, reactive } from "vue";
  import { useRouter } from "vue-router";
  import { loginRules } from "@/utils/loginRules";
  import loginDataUtils from "@/utils/loginData";
  import { getLogin } from "../service/login";
  import { generateMenu } from "../utils/generateMenu";
  const loginForm = ref(null);
  const loginFormData = reactive({
    account: "17760214036",
    password: "123456",
    checkValue: [false, false, false],
  });
  const rules = ref(loginRules);
  const router = useRouter();
  let flag = 0;

  // 表单提交事件
  const handleSubmitClick = () => {
    loginForm.value.validate((valid) => {
      if (!valid) return;
      // 表单校验成功，调用登录接口
      // 调用登录接口，跳转到各自身份的主页
      let checkValue = loginFormData.checkValue;
      if (checkValue["0"]) {
        flag = 0;
        loginDataUtils.setLoginData("flag", 0);
        getLogin(loginFormData.account, loginFormData.password, flag)
          .then((res) => {
            if (res.data.code == 200) {
              const { token, result } = res.data;
              loginDataUtils.setLoginData("id", result._id);
              loginDataUtils.setLoginData("token", token);
              router.push("/manager");
              const Menu = generateMenu(router.getRoutes(), "/manager");
              loginDataUtils.setLoginData("menu", JSON.stringify(Menu));
            } else {
              alert("用户登录失败!");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (checkValue["1"]) {
        flag = 1;
        loginDataUtils.setLoginData("flag", 1);
        getLogin(loginFormData.account, loginFormData.password, flag)
          .then((res) => {
            if (res.data.code == 200) {
              const { token, result } = res.data;
              loginDataUtils.setLoginData("id", result._id);
              loginDataUtils.setLoginData("token", token);
              router.push("/teacher");
              const Menu = generateMenu(router.getRoutes(), "/teacher");
              loginDataUtils.setLoginData("menu", JSON.stringify(Menu));
            } else {
              alert("用户登录失败!");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (checkValue["2"]) {
        flag = 2;
        loginDataUtils.setLoginData("flag", 2);
        getLogin(loginFormData.account, loginFormData.password, flag)
          .then((res) => {
            if (res.data.code == 200) {
              const { token, result } = res.data;
              console.log(result);
              loginDataUtils.setLoginData("id", result._id);
              loginDataUtils.setLoginData("token", token);
              router.push("/student");
              const Menu = generateMenu(router.getRoutes(), "/student");
              console.log(Menu);
              loginDataUtils.setLoginData("menu", JSON.stringify(Menu));
            } else {
              alert("用户登录失败!");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
</script>

<style lang="less" scoped>
  .login-form {
    .el-input {
      height: 35px;
    }
    .el-button {
      width: 100%;
      height: 35px;
    }
    .el-checkbox {
      color: #fff;
    }
    .check-line {
      display: flex;
      height: 30px;
      width: 100%;
      align-content: center;
      justify-content: space-between;
      .check-item {
        flex: 1;
        margin-left: -30px;
      }
    }
    .el-input__icon {
      font-size: 18px;
      color: #000;
    }
  }
</style>
