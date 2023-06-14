<template>
  <div id="glresult">
    <div class="glresult-header">
      <el-button color="#626aef" :icon="Promotion" @click="handleExportExlce"
        >导出成绩</el-button
      >
    </div>
    <div class="glteacher-body">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="account" label="学号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="grade" label="年级" />
        <el-table-column prop="classin" label="班级" />
        <el-table-column prop="firstexam" label="上学期期末成绩" sortable />
        <el-table-column prop="secondexam" label="机试" sortable />
        <el-table-column prop="thirdexam" label="面试" sortable />
        <el-table-column label="管理" width="300">
          <template #default="scope">
            <el-button
              size="small"
              type="warning"
              @click="handleExam(scope.$index, scope.row, 0)"
              >机试成绩</el-button
            >
            <el-button
              size="small"
              type="warning"
              @click="handleExam(scope.$index, scope.row, 1)"
              >面试成绩</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 录入成绩 -->
    <el-dialog
      v-model="centerDialogVisible"
      title="管理学生机试成绩"
      width="30%"
      align-center
    >
      <el-form
        :model="examData"
        style="max-width: 400px"
        status-icon
        label-width="130px"
      >
        <el-form-item label="学号:">
          <el-input v-model="examData.account" placeholder="请输入" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input v-model="examData.name" placeholder="请输入" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="机试:">
          <el-input v-model="examData.secondexam" placeholder="请输入">
          </el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="handleUpdateStudentExam">
            完成
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="centerDialogVisible2"
      title="管理学生面试成绩"
      width="30%"
      align-center
    >
      <el-form
        :model="examData"
        style="max-width: 400px"
        status-icon
        label-width="130px"
      >
        <el-form-item label="学号:">
          <el-input v-model="examData.account" placeholder="请输入" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input v-model="examData.name" placeholder="请输入" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="面试:">
          <el-input v-model="examData.thirdexam" placeholder="请输入">
          </el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible2 = false">取消</el-button>
          <el-button type="danger" @click="handleUpdateStudentExam">
            完成
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { utils } from "xlsx";
  import { exportExcelExam } from "@/utils/exportExcel";
  import { Promotion } from "@element-plus/icons-vue";
  import { getManagerStudent } from "@/service/teacherInfo";
  import { getStudentById, updateStudenExam } from "@/service/studentInfo";
  import loginDataUtils from "@/utils/loginData";
  import { ref } from "vue";

  let tableData = ref([]);
  let examData = ref([]);
  let centerDialogVisible = ref(false);
  let centerDialogVisible2 = ref(false);
  let studentId = ref("");

  let id = loginDataUtils.getLoginData("id");
  function getAllMangerStudent() {
    getManagerStudent(id).then((res) => {
      console.log(res);
      tableData.value = res.data.result;
    });
  }
  getAllMangerStudent();

  const handleExam = async (index, row, value) => {
    console.log(index, row, value);
    value === 0
      ? (centerDialogVisible.value = true)
      : (centerDialogVisible2.value = true);
    studentId.value = row._id;
    await getStudentById(studentId.value).then((res) => {
      examData.value = res.data.result;
    });
  };
  const handleUpdateStudentExam = async () => {
    await updateStudenExam(studentId.value, examData.value).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          message: res.data.info,
          type: "success",
        });
      }
    });
    centerDialogVisible.value = false;
    centerDialogVisible2.value = false;
    await getAllMangerStudent();
  };
  const handleExportExlce = () => {
    // 处理导出逻辑
    exportExcelExam(tableData.value);
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
</style>
