<template>
  <div id="glresult">
    <div class="glteacher-body">
      <el-card class="queryData">
        <el-row>
          <el-col :span="1"><label>姓名:</label></el-col>
          <el-col :span="10">
            <el-input
              v-model="queryData.name"
              placeholder="请输入姓名"
            ></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="warning" @click="handleGetStudentByName"
              >查询</el-button
            >
          </el-col>
        </el-row>
      </el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="account" label="学号" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="grade" label="年级" width="180" />
        <el-table-column prop="classin" label="班级" width="180" />
        <el-table-column prop="firstexam" label="上学期期末成绩" sortable />
        <el-table-column prop="addexam" label="加分项" />
        <el-table-column prop="state" label="报名状态" sortable />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleEdit(scope.$index, scope.row)"
              >审核</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 修改报名状态 -->
    <el-dialog
      v-model="centerDialogVisible"
      title="修改学生信息"
      width="30%"
      align-center
    >
      <!-- <span>修改成绩</span> -->
      <el-form
        ref="updataForm"
        :model="updateData"
        style="max-width: 400px"
        status-icon
        label-width="130px"
      >
        <el-form-item label="学号:">
          <el-input v-model="updateData.account" placeholder="请输入" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input v-model="updateData.name" placeholder="请输入" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="年级:">
          <el-input v-model="updateData.grade" placeholder="请输入" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="班级:">
          <el-input v-model="updateData.classin" placeholder="请输入" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="期末成绩:">
          <el-input
            v-model="updateData.firstexam"
            placeholder="请输入"
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="加分项:">
          <el-input v-model="updateData.addexam" placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item label="报名状态:">
          <el-input v-model="updateData.state" placeholder="请输入"> </el-input>
          <el-tag class="ml-2" type="danger"
            >报名状态为：未报名/审核中/已通过/机试/面试/双选中</el-tag
          >
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="handleUpdateStudentInfo">
            完成
          </el-button>
        </span>
      </template>
    </el-dialog>
    <div class="mask" v-if="isClose">
      <div class="content">
        <el-image :src="url" :fit="fit" />
        <el-icon class="icon" @click="handleIconClick"
          ><CircleCloseFilled
        /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { utils, read } from "xlsx";
  import { UploadFilled, Download, Briefcase } from "@element-plus/icons-vue";
  import { ref, reactive } from "vue";
  import {
    insertManyStudent,
    getStudenInfoByName,
    deleteStudentById,
    updateStudenInfoById,
    getAllApplyStudent,
    getStudentById,
  } from "@/service/studentInfo";

  const url = new URL("@/assets/example1.png", import.meta.url).href;
  let tableData = ref([]);
  let updateData = ref([]);
  let queryData = ref({ name: "" });
  let isClose = ref(false);
  let id = ref("");
  let centerDialogVisible = ref(false);
  let updataForm = ref("");

  function getAllInfo() {
    getAllApplyStudent().then((res) => {
      if (res.data.code == 200) {
        tableData.value = res.data.result;
      }
    });
  }
  getAllInfo();
  const handleEdit = async (index, row) => {
    centerDialogVisible.value = true;
    id.value = row._id;
    await getStudentById(id.value).then((res) => {
      updateData.value = res.data.result;
    });
  };
  const handleIconClick = () => {
    isClose.value = !isClose.value;
  };
  const handleGetStudentByName = async () => {
    if (queryData.value.name !== "") {
      await getStudenInfoByName(queryData.value.name).then((res) => {
        if (res.data.code == 200) {
          ElMessage({
            message: res.data.info,
            type: "success",
          });
          console.log(res.data.result);
          tableData.value = res.data.result;
          queryData.value.name = "";
        }
      });
    } else {
      getAllInfo();
    }
  };
  const handleUpdateStudentInfo = async () => {
    centerDialogVisible.value = false;
    await updateStudenInfoById(id.value, updateData.value).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          message: res.data.info,
          type: "success",
        });
        tableData.value = res.data.result;
        queryData.value.name = "";
        getAllInfo();
      }
    });
  };
</script>

<style lang="less" scoped>
  .mask {
    position: absolute;
    top: 190px;
    left: 376px;
    z-index: 99;
    border: 3px solid #ccc;
    .content {
      position: relative;
      .icon {
        cursor: pointer;
        position: absolute;
        right: -1px;
        top: -1px;
        font-size: 20px;
      }
    }
  }
  .el-tag {
    height: 19px;
    padding: 0;
  }
</style>
