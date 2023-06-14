import request from "./index";

export function getAllMessage() {
  return request({
    url: "/messages",
    method: "POST",
  });
}

export function createMessage(title, content) {
  return request({
    url: "/createmessage",
    method: "POST",
    data: {
      title,
      content,
    },
  });
}

export function deleteMessage(id) {
  return request({
    url: "/detelemessage",
    method: "POST",
    data: {
      id,
    },
  });
}
