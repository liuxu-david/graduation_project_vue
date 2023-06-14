import { createRouter, createWebHistory } from "vue-router";
import loginDataUtils from "@/utils/loginData.js";

// 路由表
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/manager",
    redirect: "/manager/glmessage",
    component: () => import("../views/mannager/index.vue"),
    children: [
      {
        path: "glmessage",
        name: "glmessage",
        component: () => import("../views/mannager/GLmessage.vue"),
        meta: {
          title: "通知公告",
          icon: "Message",
          key: "glmessage",
        },
      },
      {
        path: "glstudent",
        name: "glstudent",
        component: () => import("../views/mannager/GLstudent.vue"),
        meta: {
          title: "学生信息",
          icon: "School",
          key: "glstudent",
        },
      },
      {
        path: "glteacher",
        name: "glteacher",
        component: () => import("../views/mannager/GLteacher.vue"),
        meta: {
          title: "教师信息",
          icon: "OfficeBuilding",
          key: "glteacher",
        },
      },
      {
        path: "glnotice",
        name: "glnotice",
        component: () => import("../views/mannager/GLnotice.vue"),
        meta: {
          title: "管理通知",
          icon: "Setting",
          key: "glnotice",
        },
      },
      {
        path: "glapply",
        name: "glapply",
        component: () => import("../views/mannager/GLapply.vue"),
        meta: {
          title: "管理报名",
          icon: "Odometer",
          key: "glapply",
        },
      },
      {
        path: "glresult",
        name: "glresult",
        component: () => import("../views/mannager/GLresult.vue"),
        meta: {
          title: "管理成绩",
          icon: "Medal",
          key: "glresult",
        },
      },
      {
        path: "glcomplaint",
        name: "glcomplaint",
        component: () => import("../views/mannager/GLcomplaint.vue"),
        meta: {
          title: "管理申诉",
          icon: "Key",
          key: "glcomplaint",
        },
      },
    ],
  },
  {
    path: "/teacher",
    component: () => import("../views/teacher/index.vue"),
    redirect: "/teacher/message",
    children: [
      {
        path: "message",
        name: "message",
        component: () => import("../views/teacher/Message.vue"),
        meta: {
          title: "通知公告",
          icon: "Message",
          key: "message",
        },
      },
      {
        path: "tjresult",
        name: "tjresult",
        component: () => import("../views/teacher/TJresult.vue"),
        meta: {
          title: "管理成绩",
          icon: "Medal",
          key: "tjresult",
        },
      },
      {
        path: "choose",
        name: "choose",
        component: () => import("../views/teacher/ChooseStudent.vue"),
        meta: {
          title: "查看申请",
          icon: "School",
          key: "choose",
        },
      },
    ],
  },
  {
    path: "/student",
    component: () => import("../views/student/index.vue"),
    redirect: "/student/messages",
    children: [
      {
        path: "messages",
        name: "messages",
        component: () => import("../views/student/Message.vue"),
        meta: {
          title: "通知公告",
          icon: "Message",
          key: "messages",
        },
      },
      {
        path: "join",
        name: "join",
        component: () => import("../views/student/Join.vue"),
        meta: {
          title: "报名参加",
          icon: "Pointer",
          key: "join",
        },
      },
      {
        path: "result",
        name: "result",
        component: () => import("../views/student/Result.vue"),
        meta: {
          title: "成绩查询",
          icon: "Medal",
          key: "result",
        },
      },
      {
        path: "xzteacher",
        name: "xzteacher",
        component: () => import("../views/student/ChooseTeacher.vue"),
        meta: {
          title: "选择导师",
          icon: "School",
          key: "xzteacher",
        },
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const token = loginDataUtils.getLoginData("token");
  if (to.path === "/login") {
    token ? next("/manager") : next();
  } else {
    token ? next() : next("/login");
  }
});

export default router;
