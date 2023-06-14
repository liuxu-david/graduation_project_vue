<template>
  <div class="markdown-container">
    <!-- title区域 -->
    <el-input
      class="title"
      v-model="titleValue"
      clearable
      placeholder="请输入发布通知公告的的标题"
    />
    <!-- 渲染区 -->
    <div id="markdown-box"></div>
    <!-- 按钮 -->
    <el-button type="danger" @click="handleSubmit" :icon="Pointer"
      >发布公告</el-button
    >
  </div>
</template>

<script setup>
  import Editor from "@toast-ui/editor";
  import "@toast-ui/editor/dist/toastui-editor.css";
  import { Pointer } from "@element-plus/icons-vue";
  import { onMounted, ref } from "vue";
  import { createMessage } from "@/service/message";

  let el;
  let mkEditor;
  let titleValue = ref("");
  // 需要等到元素挂载完毕后执行;
  onMounted(() => {
    el = document.querySelector("#markdown-box");
    initMarkdown();
  });
  const initMarkdown = () => {
    mkEditor = new Editor({
      // 渲染的区域
      el,
      // 渲染的高度
      height: "500px",
      // 渲染的样式
      initialEditType: "markdown",
    });
    mkEditor.getMarkdown();
  };

  // 提交按钮，把公告提交到数据库
  const handleSubmit = () => {
    console.log(mkEditor.getMarkdown());
    createMessage(titleValue.value, mkEditor.getMarkdown()).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          message: res.data.info,
          type: "success",
        });
      } else {
        ElMessage({
          message: "发布失败，请重新发布！",
          type: "error",
        });
      }
    });
    mkEditor.reset();
    titleValue.value = "";
  };
</script>

<style lang="less" scoped>
  .el-button {
    width: 200px;
    margin-top: 10px;
  }
  .title {
    margin: 3px 0;
  }
</style>
