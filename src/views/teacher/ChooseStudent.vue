<template>
  <div class="choose-teacher" v-if="tableData.length">
    <el-card v-if="studentValue.length">
      <h1>
        你已经与<span class="active">{{ studentValue.length }}</span>
        位同学完成了双选，你可指导的学生数量为<span class="active">{{
          guideNumber
        }}</span
        >, 您指导的学生名单是：<span
          v-for="(item, index) in studentValue"
          :key="index"
        >
          <label class="active">{{ item }}</label>
        </span>
        <span>
          <label></label>
        </span>
      </h1>
    </el-card>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="学生姓名" width="180" />
      <el-table-column prop="account" label="学生学号" width="180" />
      <el-table-column prop="grade" label="学生年级" />
      <el-table-column prop="classin" label="学生班级" />
      <el-table-column prop="firstexam" label="初试" sortable />
      <el-table-column prop="secondexam" label="机试" sortable />
      <el-table-column prop="thirdexam" label="面试" sortable />
      <el-table-column prop="allexam" label="总成绩" sortable />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleAgree(scope.$index, scope.row)"
            >同意</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleReject(scope.$index, scope.row)"
            >拒绝</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div v-else>
    <el-card>
      <h1>还没有学生的申请</h1>
    </el-card>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import loginDataUtils from "@/utils/loginData";
  import {
    getManagerStudentChoose,
    updateStudentSelectState,
    getTeacherById,
  } from "@/service/teacherInfo";

  let teacherId = loginDataUtils.getLoginData("id");
  let tableData = ref([]);
  let studentValue = ref([]);
  let guideNumber = ref(8);
  async function getAllApplyStudent() {
    await getManagerStudentChoose(teacherId).then((res) => {
      tableData.value = res.data.result;
      // 这里获得的就是实现双选学生的名字
      studentValue.value = res.data.studentname;
    });
  }
  getAllApplyStudent();
  async function getAdminInfo() {
    await getTeacherById(teacherId).then((res) => {
      guideNumber.value = res.data.result.guide;
    });
  }
  getAdminInfo();
  const handleAgree = async (index, row) => {
    await updateStudentSelectState(teacherId, row._id, 2).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          message: res.data.info,
          type: "success",
        });
        getAllApplyStudent();
      } else {
        ElMessage({
          message: "处理失败!",
          type: "error",
        });
      }
    });
  };
  const handleReject = async (index, row) => {
    await updateStudentSelectState(teacherId, row._id, 0).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          message: res.data.info,
          type: "success",
        });
        getAllApplyStudent();
      } else {
        ElMessage({
          message: "处理失败!",
          type: "error",
        });
      }
    });
  };
</script>

<style lang="less" scoped>
  .active {
    color: red;
  }
</style>
