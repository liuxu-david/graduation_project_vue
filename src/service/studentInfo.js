import request from "./index";

export function insertManyStudent(sudentInfo) {
  return request({
    url: "/insertstudent",
    method: "POST",
    data: {
      sudentInfo,
    },
  });
}
export function getAllStudenInfo() {
  return request({
    url: "/getallstudent",
    method: "POST",
  });
}

export function getStudenInfoByName(name, account) {
  return request({
    url: "/getonestudent",
    method: "POST",
    data: {
      name,
      account,
    },
  });
}

export function deleteStudentById(id) {
  return request({
    url: "/deletestudent",
    method: "POST",
    data: {
      id,
    },
  });
}
export function getStudentById(id) {
  return request({
    url: "/getstudentid",
    method: "POST",
    data: {
      id,
    },
  });
}
export function getStudentByAccount(account) {
  return request({
    url: "/getstudentaccount",
    method: "POST",
    data: {
      account,
    },
  });
}
// 根据id更新数据
export function updateStudenInfoById(id, updateData) {
  return request({
    url: "/updatestudent",
    method: "POST",
    data: {
      id,
      updateData,
    },
  });
}
export function getAllApplyStudent() {
  return request({
    url: "/getallapply",
    method: "POST",
  });
}
// 根据id更新状态
export function updateStudenStateById(id, radio) {
  return request({
    url: "/updatestate",
    method: "POST",
    data: {
      id,
      radio,
    },
  });
}
// 根据id更新学生成绩
export function updateStudenExam(id, updateExam) {
  return request({
    url: "/updateexam",
    method: "POST",
    data: {
      id,
      updateExam,
    },
  });
}
// 根据id更新师生双选信息
export function updateChooseState(studentId, teacherId, value) {
  return request({
    url: "/updatechoosestate",
    method: "POST",
    data: {
      studentId,
      teacherId,
      value,
    },
  });
}

// 根据id撤销选题
export function concelStudentApply(studentId) {
  return request({
    url: "/concelapply",
    method: "POST",
    data: {
      studentId,
    },
  });
}
// 根据id获取双选成功老师的信息
export function getTeacherInfo(studentId) {
  return request({
    url: "/getteachername",
    method: "POST",
    data: {
      studentId,
    },
  });
}
export function getAdminComplaintState(id) {
  return request({
    url: "/getadminstate",
    method: "POST",
    data: {
      id,
    },
  });
}
