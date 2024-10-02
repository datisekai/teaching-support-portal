import { TableSchema } from "../types/table";

export const notificationSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "id",
    type: "number",
  },
  {
    label: "Tên thông báo",
    prop: "title",
    type: "text",
  },
  {
    label: "Nội dung thông báo",
    prop: "content",
    type: "text",
  },
  {
    label: "Ngày thông báo",
    prop: "notificationDate",
    type: "datetime",
  },
  {
    label: "Nhóm lớp",
    prop: "classGroup",
    type: "text",
  },
  {
    label: "Môn học",
    prop: "subject",
    type: "text",
  },
  {
    label: "Ngày tạo",
    prop: "createdAt",
    type: "datetime",
  },
  {
    label: "Ngày sửa",
    prop: "updatedAt",
    type: "datetime",
  },
];

export const notifications = [
  {
    id: 1,
    title: "Thông báo kiểm tra giữa kỳ",
    content: "Các bạn sinh viên chú ý lịch kiểm tra giữa kỳ vào ngày 15/10.",
    notificationDate: "2024-10-01T09:00:00Z",
    classGroup: "Nhóm A",
    subject: "Lập trình web",
    createdAt: "2024-09-30T08:00:00Z",
    updatedAt: "2024-09-30T10:00:00Z",
  },
  {
    id: 2,
    title: "Thông báo nghỉ học",
    content: "Lớp môn Lý thuyết đồ thị nghỉ ngày 18/10 do giảng viên bận.",
    notificationDate: "2024-10-05T11:00:00Z",
    classGroup: "Nhóm B",
    subject: "Java",
    createdAt: "2024-10-03T10:00:00Z",
    updatedAt: "2024-10-04T12:00:00Z",
  },
];
