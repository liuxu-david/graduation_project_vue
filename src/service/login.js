import request from "./index";

export function getLogin(account, password) {
  return request({
    url: "/api/login",
    method: "POST",
    data: { account, password },
  });
}
