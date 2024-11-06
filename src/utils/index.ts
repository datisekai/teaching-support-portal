export * from "./upload-file";
export * from "./local-store";
export * from "./translate";
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export function randomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
export function getImageUrl(url: string, name: string) {
  if (!url) {
    return `https://ui-avatars.com/api/?name=${name}`;
  }
  return `${url}`;
}

export function getImageServer(url: string) {
  if (url.includes("uploads/")) return `${BASE_URL}/${url}`;
  return url;
}
export function getStatus(value: string) {
  switch (value) {
    case "pending":
      return "Đang xuất bản";
    case "approved":
      return "Đã duyệt";
    case "rejected":
      return "Đã từ chối";
    default:
      return "Lỗi";
  }
}
export function getTypeLetter(value: string) {
  switch (value) {
    case "leave_application":
      return "Đơn xin nghỉ học";
    case "":
      return "null";
    default:
      return "Lỗi";
  }
}
