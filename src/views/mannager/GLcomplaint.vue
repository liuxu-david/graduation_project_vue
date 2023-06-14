<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">管理学生申诉</div>
    </template>
    <div class="card-body">
      <el-table :data="complaintData" border style="width: 100%">
        <el-table-column prop="account" label="学号" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="content" label="申诉内容" />
        <el-table-column prop="complaintstate" label="申诉状态" sortable />
        <el-table-column label="管理">
          <template #default="scope">
            <el-button
              size="small"
              color="#1cd66c"
              @click="handleSuccess(scope.$index, scope.row)"
              >处理</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleRefuse(scope.$index, scope.row)"
              >拒绝</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script setup>
  import {
    getAllComplaint,
    updateComplaintState1,
    updateComplaintState2,
  } from "@/service/complaint";
  import { ref } from "vue";

  const complaintData = ref([]);

  function getComplaintInfo() {
    getAllComplaint().then((res) => {
      complaintData.value = res.data.result;
    });
  }
  getComplaintInfo();
  const handleSuccess = async (index, row) => {
    let id = row._id;
    await updateComplaintState1(id).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          message: res.data.info,
          type: "success",
        });
      }
    });
    await getComplaintInfo();
  };
  const handleRefuse = async (index, row) => {
    let id = row._id;
    await updateComplaintState2(id).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          message: res.data.info,
          type: "success",
        });
      }
    });
    await getComplaintInfo();
  };
</script>

<style lang="less" scoped>
  .card-header {
    display: flex;
    justify-content: flex-start;
    font-size: 20px;
  }
</style>
