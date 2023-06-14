<template>
  <div id="gl_teacher">
    <div class="glteacher-header">
      <el-button type="warning" :icon="UserFilled" @click="handleAddOneTeacher">
        添加教师
      </el-button>
      <el-button type="danger" :icon="Briefcase" @click="handleExcelShow">
        模板形式
      </el-button>
      <el-upload
        :limit="1"
        :show-file-list="false"
        :http-request="httpRequest"
        :file-list="fileList"
      >
        <el-button type="success" :icon="UploadFilled" @click="handleImport"
          >批量导入</el-button
        >
      </el-upload>
    </div>
    <div class="glteacher-body">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="account" label="账号" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="position" label="职位" width="180" />
        <el-table-column prop="guide" label="可指导学生数" width="120" />
        <el-table-column prop="introduction" label="简介" width="280" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mask" v-if="isClose">
      <div class="content">
        <el-image :src="url" :fit="fit" />
        <el-icon class="icon" @click="handleIconClick"
          ><CircleCloseFilled
        /></el-icon>
      </div>
    </div>
    <el-dialog
      v-model="centerDialogVisible"
      title="修改教师信息"
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
        <el-form-item label="账号:">
          <el-input v-model="updateData.account" placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input v-model="updateData.name" placeholder="请输入"> </el-input>
        </el-form-item>
        <el-form-item label="职位:">
          <el-input v-model="updateData.position" placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item label="指导学生数:">
          <el-input v-model="updateData.guide" placeholder="请输入"> </el-input>
        </el-form-item>
        <el-form-item label="简介:">
          <el-input
            v-model="updateData.introduction"
            placeholder="请输入"
            type="textarea"
          >
          </el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="handleUpdateTeacherInfo">
            修改
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { utils, read } from "xlsx";
  import { ref } from "vue";
  import {
    UploadFilled,
    Download,
    Briefcase,
    UserFilled,
  } from "@element-plus/icons-vue";
  import {
    getAllTeacherInfo,
    insertManyTeacher,
    getTeacherById,
    deleteTeacherById,
    updateTeacherInfoById,
  } from "@/service/teacherInfo.js";

  const url = new URL("@/assets/example2.png", import.meta.url).href;

  let tableData = ref([]);
  let isClose = ref(false);
  let updateData = ref([]);
  let centerDialogVisible = ref(false);
  let teacherId = ref("");
  let fileList = ref([]);

  function getAllTeacher() {
    getAllTeacherInfo().then((res) => {
      tableData.value = res.data.result.reverse();
    });
  }
  getAllTeacher();

  const handleExcelShow = () => {
    isClose.value = !isClose.value;
  };
  const httpRequest = (e) => {
    let file = e.file;
    if (!file) {
      return false;
    } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
      this.$message.error("上传格式不正确，请上传xls或者xlsx格式");
      return false;
    }
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = read(data, {
          type: "binary",
        });
        const exlName = workbook.SheetNames[0];
        const exlData = utils.sheet_to_json(workbook.Sheets[exlName]);
        insertManyTeacher(exlData).then((res) => {
          if (res.data.code == 200) {
            fileList.value = [];
            ElMessage({
              message: res.data.info,
              type: "success",
            });
            getAllTeacher();
          }
        });
      } catch (e) {
        fileList.value = [];
        ElMessage({
          message: "导入失败!",
          type: "error",
        });
        return false;
      }
    };
    fileReader.readAsBinaryString(file);
  };
  const handleIconClick = () => {
    isClose.value = !isClose.value;
  };
  const handleEdit = async (index, row) => {
    centerDialogVisible.value = true;
    teacherId.value = row._id;
    await getTeacherById(teacherId.value).then((res) => {
      updateData.value = res.data.result;
      console.log(res);
    });
  };
  const handleDelete = async (index, row) => {
    await deleteTeacherById(row._id).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          message: res.data.info,
          type: "success",
        });
        getAllTeacher();
      }
    });
  };
  const handleUpdateTeacherInfo = async () => {
    centerDialogVisible.value = false;
    await updateTeacherInfoById(teacherId.value, updateData.value).then(
      (res) => {
        if (res.data.code == 200) {
          ElMessage({
            message: res.data.info,
            type: "success",
          });
          getAllTeacher();
        }
      }
    );
  };
  const handleAddOneTeacher = () => {
    ElMessage({
      message: "这个功能还没有实现哦，请使用批量导入的功能！",
      type: "error",
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
      .el-image {
        width: 800px;
        height: 260px;
      }
    }
  }
</style>
