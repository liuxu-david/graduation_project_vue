<template>
  <div class="aside">
    <div class="header">
      <img src="../../../assets/favicon.png" alt="" />
      <span>Student</span>
    </div>
    <!-- <div class="menu" v-for="(item, index) in menuData" :key="index">
      <div
        :class="['menu-item', { active: activeIndex == index }]"
        @click="handleItemClick(index)"
      >
        {{ item.name }}
      </div>
    </div> -->
  </div>
</template>

<script setup>
  import { ref, reactive } from "vue";
  // import { useRouter, useRoute } from "vue-router";

  // const router = useRouter();
  // const route = useRoute();
  // const activeIndex = ref(0);
  // let menuData = reactive();
  // const currentUrl = window.location.pathname;
  // if (currentUrl == "/managermain/account") {
  //   menuData = router.getRoutes().slice(2, 5);
  // } else {
  //   menuData = router.getRoutes().slice(0, 2);
  // }

  // const handleItemClick = (index) => {
  //   router.push(menuData[index].path);
  //   activeIndex.value = index;
  // };
</script>

<style lang="less" scoped>
  .aside {
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 13px 0;
      width: 100%;
      overflow: hidden;
      border-bottom: 1px solid #ccc;
      img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
      }
      span {
        color: #001529;
        font-size: 20px;
      }
    }
    .menu {
      color: #ffffff;
      display: flex;
      flex-direction: column;
      padding-top: 10px;
      .menu-item {
        width: 100%;
        height: 55px;
        line-height: 55px;
        cursor: pointer;
      }
      .active {
        color: #ffcd43;
      }
    }
  }
</style>
