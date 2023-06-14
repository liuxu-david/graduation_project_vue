<template>
  <div id="glresult">
    <div class="glresult-header">
      <el-button color="#626aef" :icon="Promotion" @click="handleExportExlce"
        >导出成绩</el-button
      >
    </div>
    <div class="glteacher-body">
      <el-card class="queryData">
        <el-row>
          <el-col :span="1"><label>学号:</label></el-col>
          <el-col :span="10">
            <el-input
              v-model="queryData.account"
              placeholder="请输入学号"
            ></el-input>
          </el-col>
          <el-col :span="1"><label>姓名:</label></el-col>
          <el-col :span="10">
            <el-input
              v-model="queryData.name"
              placeholder="请输入姓名"
            ></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="success" @click="handleGetStudentByName"
              >查询</el-button
            >
          </el-col>
        </el-row>
      </el-card>
      <el-table :data="applyStudent" border style="width: 100%">
        <el-table-column prop="account" label="学号" width="150" />
        <el-table-column prop="name" label="姓名" width="80" />
        <el-table-column
          prop="firstexam"
          label="上学期期末成绩40%"
          sortable
          width="200"
        />
        <el-table-column prop="secondexam" label="机试40%" sortable />
        <el-table-column prop="thirdexam" label="面试40%" sortable />
        <el-table-column prop="addexam" label="加分项" />
        <el-table-column prop="allexam" label="总成绩" sortable />
        <el-table-column label="管理">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 管理成绩 -->
    <el-dialog
      v-model="centerDialogVisible"
      title="管理学生成绩"
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
        <el-form-item label="期末成绩:">
          <el-input v-model="examData.firstexam" placeholder="请输入" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="加分项:">
          <el-input v-model="examData.addexam" placeholder="请输入" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="机试:">
          <el-input v-model="examData.secondexam" placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item label="面试:">
          <el-input v-model="examData.thirdexam" placeholder="请输入">
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
  </div>
</template>

<script setup>
  import { utils, writeFileXLSX } from "xlsx";
  import { exportExcelExam } from "@/utils/exportExcel";
  import { UploadFilled, Promotion, Briefcase } from "@element-plus/icons-vue";
  import {
    getAllApplyStudent,
    getStudentById,
    updateStudenExam,
    getStudenInfoByName,
  } from "@/service/studentInfo";
  import { ref } from "vue";

  let centerDialogVisible = ref(false);
  let applyStudent = ref([]);
  let examData = ref([]);
  let queryData = ref({ name: "", account: "" });
  let id = ref("");

  async function getStudentExam() {
    await getAllApplyStudent().then((res) => {
      applyStudent.value = res.data.result;
    });
  }
  getStudentExam();
  const handleEdit = async (index, row) => {
    centerDialogVisible.value = true;
    id.value = row._id;
    await getStudentById(id.value).then((res) => {
      examData.value = res.data.result;
    });
  };
  const handleUpdateStudentExam = async () => {
    // 根据id更新成绩
    await updateStudenExam(id.value, examData.value).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          message: res.data.info,
          type: "success",
        });
      }
    });
    centerDialogVisible.value = false;
    await getStudentExam();
    await getStudentExam();
  };
  const handleGetStudentByName = () => {
    if (queryData.value.name !== "" || queryData.value.account !== "") {
      getStudenInfoByName(queryData.value.name, queryData.value.account).then(
        (res) => {
          if (res.data.code == 200) {
            ElMessage({
              message: res.data.info,
              type: "success",
            });
            applyStudent.value = res.data.result;
            queryData.value.name = "";
            queryData.value.account = "";
          }
        }
      );
    } else {
      getStudentExam();
    }
  };
  const handleExportExlce = () => {
    // 处理导出逻辑
    exportExcelExam(applyStudent.value);
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
  label {
    line-height: 30px;
    font-size: 16px;
    font-weight: 700;
  }
</style>
