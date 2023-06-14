import request from "./index";

export function getAllTeacherInfo() {
  return request({
    url: "/getallteacher",
    method: "POST",
  });
}

export function insertManyTeacher(teacherInfo) {
  return request({
    url: "/insertteacher",
    method: "POST",
    data: {
      teacherInfo,
    },
  });
}

export function getManagerStudent(id) {
  return request({
    url: "/getmanagerpass",
    method: "POST",
    data: {
      id,
    },
  });
}
export function getManagerStudentChoose(teacherId) {
  return request({
    url: "/managerstudent",
    method: "POST",
    data: {
      teacherId,
    },
  });
}

// 实现师生互选
export function updateStudentSelectState(teacherId, studentId, value) {
  return request({
    url: "/updateselectstate",
    method: "POST",
    data: {
      studentId,
      teacherId,
      value,
    },
  });
}

export function getTeacherById(id) {
  return request({
    url: "/getteacherid",
    method: "POST",
    data: {
      id,
    },
  });
}
export function deleteTeacherById(id) {
  return request({
    url: "/deleteteacher",
    method: "POST",
    data: {
      id,
    },
  });
}

// 根据id更新数据
export function updateTeacherInfoById(id, updateData) {
  return request({
    url: "/updateteacher",
    method: "POST",
    data: {
      id,
      updateData,
    },
  });
}
