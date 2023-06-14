import request from "./index";

export function getAllComplaint() {
  return request({
    url: "/complaints",
    method: "POST",
  });
}

export function addComplaint(account, name, id, content) {
  return request({
    url: "/addcomplaint",
    method: "POST",
    data: {
      account,
      name,
      id,
      content,
    },
  });
}

// 根据id更新申诉状态
export function updateComplaintState1(id) {
  return request({
    url: "/updatecomplaint1",
    method: "POST",
    data: {
      id,
    },
  });
}
export function updateComplaintState2(id) {
  return request({
    url: "/updatecomplaint2",
    method: "POST",
    data: {
      id,
    },
  });
}
