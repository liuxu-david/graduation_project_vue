<template>
  <div class="messageData">
    <el-collapse
      v-model="activeNames"
      @change="handleChange"
      v-for="(item, index) in messageList"
      :key="item"
    >
      <el-collapse-item :name="index">
        <template #title>
          <div class="title">
            <el-icon><BellFilled /></el-icon
            ><span class="key">{{ item.title }}</span>
          </div>
        </template>
        <div class="content">{{ item.content }}</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { getAllMessage, deleteMessage } from "@/service/message";

  let messageList = ref([]);
  const activeNames = ref(0);

  function getAllMessages() {
    getAllMessage().then((res) => {
      messageList.value = res.data.result.reverse();
    });
  }
  getAllMessages();
</script>

<style lang="less" scoped>
  .title {
    color: #5b778d;
    font-size: 15px;
    padding-left: 15px;
    .key {
      padding: 0 0 0 8px;
      vertical-align: middle;
    }
  }
  .content {
    padding: 20px;
    letter-spacing: 3px;
    font-size: 13px;
    text-indent: 24px;
  }
</style>
