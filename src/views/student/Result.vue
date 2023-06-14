<template>
  <div id="glresult">
    <div class="glresult-header">
      <el-button color="#626aef" :icon="Promotion" @click="getComplaintState"
        >申诉状态</el-button
      >
    </div>
    <div class="glteacher-body">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="account" label="学号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="grade" label="年级" />
        <el-table-column prop="classin" label="班级" />
        <el-table-column prop="state" label="报名状态" />
        <el-table-column prop="firstexam" label="上学期期末成绩" />
        <el-table-column prop="secondexam" label="机试" width="80px" />
        <el-table-column prop="thirdexam" label="面试" width="80px" />
        <el-table-column prop="addexam" label="加分项" width="80px" />
        <el-table-column prop="allexam" label="总分" width="80px" />
        <el-table-column label="管理">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleComplaint(scope.$index, scope.row)"
              >申诉</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 管理申诉 -->
      <el-dialog
        v-model="centerDialogVisible"
        title="提交申诉"
        width="30%"
        align-center
      >
        <el-form
          :model="tableData"
          style="max-width: 400px"
          status-icon
          label-width="130px"
        >
          <el-form-item label="学号:">
            <el-input
              v-model="complaintData.account"
              placeholder="请输入"
              disabled
            >
            </el-input>
          </el-form-item>
          <el-form-item label="姓名:">
            <el-input
              v-model="complaintData.name"
              placeholder="请输入"
              disabled
            >
            </el-input>
          </el-form-item>
          <el-form-item label="申诉内容:">
            <el-input
              v-model="textarea"
              :rows="5"
              type="textarea"
              placeholder="请输入申诉内容："
            />
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="danger" @click="handleApplyComplaint">
              完成
            </el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 查看申诉状态 -->
      <el-dialog
        v-model="dialogState"
        title="查看申诉状态"
        width="30%"
        align-center
      >
        <div v-for="item in complaintInfo" :key="item._id">
          <div class="item">
            {{ item.content }}
            <el-button
              :type="item.complaintstate === '已拒绝' ? 'danger' : 'success'"
              size="small"
              >{{ item.complaintstate }}</el-button
            >
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
  import loginDataUtils from "@/utils/loginData";
  import {
    getStudentById,
    getAdminComplaintState,
  } from "@/service/studentInfo";
  import { addComplaint } from "@/service/complaint";
  import { ref } from "vue";

  let id = loginDataUtils.getLoginData("id");
  let tableData = ref([]);
  let complaintData = ref([]);
  let textarea = ref("");
  let centerDialogVisible = ref(false);
  let dialogState = ref(false);
  let complaintInfo = ref([]);
  let flag = ref(false);

  async function getComplaintData() {
    await getStudentById(id).then((res) => {
      tableData.value = [].concat(res.data.result);
    });
    flag.value = tableData.value[0].allexam >= 72 ? true : false;
    loginDataUtils.setLoginData("isChoose", flag.value);
  }
  getComplaintData();
  const handleComplaint = async (index, row) => {
    centerDialogVisible.value = true;
    await getStudentById(id).then((res) => {
      complaintData.value = res.data.result;
    });
  };
  const handleApplyComplaint = async () => {
    textarea.value = textarea.value ? textarea.value : "没有申诉内容！";
    await addComplaint(
      complaintData.value.account,
      complaintData.value.name,
      id,
      textarea.value
    ).then((res) => {
      ElMessage({
        message: res.data.info,
        type: "success",
      });
    });
    textarea.value = "";
    centerDialogVisible.value = false;
    await getComplaintData();
  };
  const getComplaintState = async () => {
    dialogState.value = true;
    await getAdminComplaintState(id).then((res) => {
      console.log(res);
      complaintInfo.value = res.data.result || [];
    });
  };
</script>

<style lang="less" scoped>
  .glresult-header {
    display: flex;
    justify-content: flex-end;
    .el-button {
      margin: 3px 7px;
    }
  }
  .item {
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    padding: 10px;
    span {
      color: red;
    }
  }
</style>
