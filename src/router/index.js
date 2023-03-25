import { createRouter, createWebHistory } from "vue-router";
import loginDataUtils from "@/utils/loginData.js";

// 本计划使用私有路由表，后不使用
// const privateRoutes = [
//   {
//     path: "/student",
//     component: () => import("@/views/layout/index.vue"),
//     redirect: "/student/message",
//     children: [
//       {
//         path: "message",
//         name: "通知公告",
//         component: () => import("@/views/common/message.vue"),
//       },
//     ],
//   },
//   {
//     path: "/teacher",
//     component: () => import("@/views/layout/index.vue"),
//     redirect: "/teacher/message",
//     children: [
//       {
//         path: "message",
//         name: "教师信息",
//         component: () => import("@/views/common/message.vue"),
//       },
//     ],
//   },
//   {
//     path: "/manager",
//     component: () => import("@/views/layout/index.vue"),
//     redirect: "/manager/message",
//   },
// ];
// 路由表
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/",
    component: () => import("../views/main/index.vue"),
    redirect: "/message",
    children: [
      {
        path: "message",
        name: "通知公告",
        component: () => import("../views/main/common/index.vue"),
      },
      {
        path: "manager/glnotice",
        name: "管理公告",
        component: () => import("../views/main/mannager/GLnotice.vue"),
      },
      {
        path: "manager/glresult",
        name: "管理成绩",
        component: () => import("../views/main/mannager/GLresult.vue"),
      },
      {
        path: "manager/glcomplaint",
        name: "管理申诉",
        component: () => import("../views/main/mannager/GLcomplaint.vue"),
      },
      {
        path: "manager/info",
        name: "管理信息",
        redirect: "/manager/info/teacher",
        children: [
          {
            path: "teacher",
            name: "教师信息",
            component: () => import("../views/main/mannager/GLteacher.vue"),
          },
          {
            path: "student",
            name: "学生信息",
            component: () => import("../views/main/mannager/GLstudent.vue"),
          },
        ],
      },
      {
        path: "teacher/glresult",
        name: "管理成绩",
        component: () => import("../views/main/teacher/GLresult.vue"),
      },
      {
        path: "teacher/choose",
        name: "学生申请",
        component: () => import("../views/main/teacher/ChooseStudent.vue"),
      },
      {
        path: "student/join",
        name: "报名参加",
        component: () => import("../views/main/student/Join.vue"),
      },
      {
        path: "student/result",
        name: "成绩查询",
        component: () => import("../views/main/student/Result.vue"),
      },
    ],
  },
  {
    path: "/404",
    name: "错误页",
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
    token ? next("/message") : next();
  } else {
    token ? next() : next("/login");
  }
});

export default router;
