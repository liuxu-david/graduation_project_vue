<template>
  <el-card v-if="isChoose === 'false'">
    <h1>你暂时还没有通过所有考核，请通过所有考核后再来选择指导教师</h1>
  </el-card>
  <div id="gl_teacher" v-else>
    <div class="glteacher-body" v-if="chooseValue === 0 || chooseValue === 1">
      <div class="glteacher-header">
        <el-button type="success" :icon="Briefcase" @click="handleConcel">
          撤销申请
        </el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="account" label="账号" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="position" label="职位" width="180" />
        <el-table-column prop="introduction" label="简介" width="580" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleEdit(scope.$index, scope.row)"
              >申请</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-card v-else-if="chooseValue == 2">
      <h1>
        你已经和<span class="warning">{{ teacherInfo.name }}</span>
        老师完成了双选,联系方式位<span class="warning">{{
          teacherInfo.account
        }}</span>
        ，详细情况请咨询老师
      </h1>
    </el-card>
    <!-- 弹出来的模板 -->
    <div class="mask" v-if="isClose">
      <div class="content">
        <el-image :src="url" :fit="fit" />
        <el-icon class="icon" @click="handleIconClick"
          ><CircleCloseFilled
        /></el-icon>
      </div>
    </div>
    <!-- 弹出来的确定选择导师弹出框 -->
    <el-dialog v-model="dialogVisible" width="30%">
      <template #header>
        <h1 class="warning">提示</h1>
      </template>
      <span>
        申请前请联系老师咨询，确认申请后不可修改，如果双选失败还可以重新选择，确定申请该老师为你的指导教师吗？
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="warning" @click="handleChooseTeacher">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { utils } from "xlsx";
  import { ref } from "vue";
  import { UploadFilled, Download, Briefcase } from "@element-plus/icons-vue";
  import { getAllTeacherInfo } from "@/service/teacherInfo.js";
  import {
    getStudentById,
    updateChooseState,
    concelStudentApply,
    getTeacherInfo,
  } from "@/service/studentInfo";
  import loginDataUtils from "@/utils/loginData";

  const url = new URL("@/assets/example1.png", import.meta.url).href;
  let id = loginDataUtils.getLoginData("id");

  let tableData = ref([]);
  // 0表示未申请 1表示已经存在申请了不可以在申请 2表示已完成双选
  let chooseValue = ref(0);
  let dialogVisible = ref(false);
  let teacherId = ref("");
  let teacherInfo = ref("");
  let isChoose = ref(false);
  isChoose.value = loginDataUtils.getLoginData("isChoose");
  console.log(isChoose.value);

  function getAllTeacher() {
    getAllTeacherInfo().then((res) => {
      tableData.value = res.data.result;
    });
  }
  getAllTeacher();

  getTeacherInfo(id).then((res) => {
    teacherInfo.value = res.data.result;
  });
  async function getStudentValue() {
    await getStudentById(id).then((res) => {
      chooseValue.value = res.data.result.choosestate;
    });
  }
  getStudentValue();

  const handleChooseTeacher = async () => {
    await updateChooseState(id, teacherId.value, 1).then((res) => {
      if (res.data.code == 200) {
        dialogVisible.value = false;
        ElMessage({
          message: res.data.info,
          type: "success",
        });
      } else {
        ElMessage({
          message: "更新失败!",
          type: "error",
        });
      }
    });
  };
  const handleEdit = async (index, row) => {
    await getStudentValue();
    if (chooseValue.value === 0) {
      dialogVisible.value = true;
      teacherId.value = row._id;
    } else {
      ElMessage({
        message: "你已经存在选择，请等待老师审核!",
        type: "error",
      });
    }
  };
  const handleConcel = async () => {
    await concelStudentApply(id).then((res) => {
      if (res.data.code == 200) {
        dialogVisible.value = false;
        ElMessage({
          message: res.data.info,
          type: "success",
        });
        getStudentValue();
      } else {
        ElMessage({
          message: "撤销失败!",
          type: "error",
        });
      }
    });
  };
</script>

<style lang="less" scoped>
  .glteacher-header {
    display: flex;
    justify-content: flex-end;
    .el-button {
      margin: 3px 7px;
    }
  }
  .warning {
    color: red;
  }
</style>
