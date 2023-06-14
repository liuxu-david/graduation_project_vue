import request from "./index";

export function getLogin(account, password, flag) {
  return request({
    url: "/login",
    method: "POST",
    data: { account, password, flag },
  });
}
export function changeToPassword(id, password, flag) {
  return request({
    url: "/changepassword",
    method: "POST",
    data: { id, password, flag },
  });
}
