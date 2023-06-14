<template>
  <div id="glresult">
    <div class="glresult-header">
      <el-button type="warning" :icon="UserFilled" @click="handleAddOneStudent">
        添加学生
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
        <el-button type="success" :icon="UploadFilled">批量导入</el-button>
      </el-upload>
    </div>
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
            <el-button @click="handleGetStudentByName">查询</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="account" label="学号" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="grade" label="年级" width="180" />
        <el-table-column prop="classin" label="班级" width="180" />
        <el-table-column prop="state" label="报名状态" width="180" />
        <el-table-column prop="firstexam" label="上学期期末成绩" sortable />
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
    <!-- 修改学生信息 -->
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
          <el-input v-model="updateData.account" placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input v-model="updateData.name" placeholder="请输入"> </el-input>
        </el-form-item>
        <el-form-item label="年级:">
          <el-input v-model="updateData.grade" placeholder="请输入"> </el-input>
        </el-form-item>
        <el-form-item label="班级:">
          <el-input v-model="updateData.classin" placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item label="期末成绩:">
          <el-input v-model="updateData.firstexam" placeholder="请输入">
          </el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="handleUpdateStudentInfo">
            修改
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { utils, read } from "xlsx";
  import {
    UploadFilled,
    Download,
    Briefcase,
    UserFilled,
  } from "@element-plus/icons-vue";
  import { ref, reactive } from "vue";
  import {
    insertManyStudent,
    getAllStudenInfo,
    getStudenInfoByName,
    deleteStudentById,
    updateStudenInfoById,
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
  let fileList = ref([]);

  async function getAllInfo() {
    await getAllStudenInfo().then((res) => {
      if (res.data.code == 200) {
        tableData.value = res.data.result.reverse();
        console.log(tableData.value[0]);
      }
    });
  }

  getAllInfo();
  const handleExcelShow = () => {
    isClose.value = !isClose.value;
  };
  const handleDelete = (index, row) => {
    deleteStudentById(row._id).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          message: res.data.info,
          type: "success",
        });
        getAllInfo();
      }
    });
  };
  const handleEdit = (index, row) => {
    centerDialogVisible.value = true;
    id.value = row._id;
    getStudentById(id.value).then((res) => {
      updateData.value = res.data.result;
    });
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
    fileReader.onload = async (e) => {
      try {
        const data = e.target.result;
        const workbook = read(data, {
          type: "binary",
        });
        const exlName = workbook.SheetNames[0];
        const exlData = utils.sheet_to_json(workbook.Sheets[exlName]);
        console.log(exlData);
        await insertManyStudent(exlData).then((res) => {
          if (res.data.code == 200) {
            fileList.value = [];
            ElMessage({
              message: res.data.info,
              type: "success",
            });
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
      await getAllInfo();
    };
    fileReader.readAsBinaryString(file);
  };
  const handleIconClick = () => {
    isClose.value = !isClose.value;
  };
  const handleGetStudentByName = () => {
    if (queryData.value.name !== "") {
      getStudenInfoByName(queryData.value.name).then((res) => {
        if (res.data.code == 200) {
          ElMessage({
            message: res.data.info,
            type: "success",
          });
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
        getAllInfo();
      }
    });
  };
  const handleAddOneStudent = () => {
    ElMessage({
      message: "这个功能还没有实现哦，请使用批量导入的功能！",
      type: "error",
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
</style>
