<template>
  <div class="progress">
    <el-progress
      :text-inside="true"
      :stroke-width="13"
      :percentage="activeProgress"
      status="exception"
    >
      <span></span>
    </el-progress>
    <div class="one">
      <div class="circle"><div class="point"></div></div>
      参赛
    </div>
    <div class="two">
      <div class="circle">
        <div class="point"></div>
      </div>
      报名
    </div>
    <div class="three">
      <div class="circle"><div class="point"></div></div>
      机试
    </div>
    <div class="four">
      <div class="circle"><div class="point"></div></div>
      面试
    </div>
    <div class="five">
      <div class="circle"><div class="point"></div></div>
      双选
    </div>
  </div>
  <div class="join-body">
    <el-card>
      <h1>请输入学号查询是否符合报名条件：</h1>
      <el-row :gutter="20">
        <el-col :span="19">
          <el-input v-model="accountValue" placeholder="请输入学号"
        /></el-col>
        <el-button type="danger" @click="handleQueryApply">查询</el-button>
      </el-row>
      <h1>符合条件的报名：</h1>
      <el-row :gutter="20">
        <el-col :span="19">
          <div class="checkValue">
            <el-radio-group v-model="redio" class="ml-4">
              <el-radio label="1" size="large">有新生ACM竞赛证书</el-radio>
              <el-radio label="2" size="large">没有新生ACM竞赛获奖</el-radio>
            </el-radio-group>
          </div>
        </el-col>
        <el-button type="primary" @click="handleApply">报名</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
  import loginDataUtils from "@/utils/loginData";
  import {
    getStudentById,
    getStudentByAccount,
    updateStudenStateById,
  } from "@/service/studentInfo";
  import { ref } from "vue";

  let id = loginDataUtils.getLoginData("id");
  const states = {
    未报名: 0,
    审核中: 13,
    已通过: 25,
    机试: 50,
    面试: 75,
    双选中: 100,
  };
  let firstexam = ref(0);
  let activeProgress = ref(0);
  let accountValue = ref("");
  let redio = ref("1");

  async function getActiveProcess() {
    await getStudentById(id).then((res) => {
      activeProgress.value = states[res.data.result.state];
    });
  }
  getActiveProcess();

  const handleQueryApply = async () => {
    await getStudentByAccount(accountValue.value).then((res) => {
      if (res.data.result.firstexam >= 60) {
        ElMessage({
          message:
            "你上学期期末成绩是" + res.data.result.firstexam + "符合报名条件",
          type: "success",
        });
      } else {
        ElMessage({
          message:
            "你上学期期末成绩是" +
            res.data.result.firstexam +
            "不符合报名条件！",
          type: "error",
        });
      }
      accountValue.value = "";
    });
  };
  const handleApply = async () => {
    await getStudentById(id).then((res) => {
      firstexam.value = res.data.result.firstexam;
    });
    if (firstexam.value <= 60) {
      ElMessage({
        message: "不符合报名条件",
        type: "error",
      });
    } else {
      await updateStudenStateById(id, redio.value).then((res) => {
        ElMessage({
          message: "报名成功！",
          type: "success",
        });
        getActiveProcess();
      });
    }
  };
</script>

<style lang="less" scoped>
  .progress {
    margin-top: 20px;
    padding: 20px 50px;
    position: relative;
    box-sizing: border-box;
    font-size: 15px;
    font-weight: 700;
    .one {
      position: absolute;
      left: 3vw;
      top: 16px;
    }
    .two {
      position: absolute;
      left: 22vw;
      top: 16px;
    }
    .three {
      position: absolute;
      left: 42vw;
      top: 16px;
    }
    .four {
      position: absolute;
      left: 63vw;
      top: 16px;
    }
    .five {
      position: absolute;
      left: 83vw;
      top: 16px;
    }
    .circle {
      width: 20px;
      height: 20px;
      border: 2px solid #b32c23;
      margin-bottom: 10px;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .point {
        width: 15px;
        height: 15px;
        border-radius: 100%;
        background-color: #b32c23;
      }
    }
  }
  .join-body {
    margin-top: 80px;
  }
  .el-card {
    h1 {
      margin: 15px 0;
      color: black;
    }
  }
</style>
