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
    prop: "notification_date",
    type: "datetime",
  },
  {
    label: "Nhóm lớp",
    prop: "class_group",
    type: "text",
  },
  {
    label: "Môn học",
    prop: "subject",
    type: "text",
  },
  {
    label: "Ngày tạo",
    prop: "created_at",
    type: "datetime",
  },
  {
    label: "Ngày sửa",
    prop: "updated_at",
    type: "datetime",
  },
];

export const notifications = [
  {
    id: 1,
    title: "Thông báo kiểm tra giữa kỳ",
    content: "Các bạn sinh viên chú ý lịch kiểm tra giữa kỳ vào ngày 15/10.",
    notification_date: "2024-10-01T09:00:00Z",
    class_group: "Nhóm A",
    subject: "Lập trình web",
    created_at: "2024-09-30T08:00:00Z",
    updated_at: "2024-09-30T10:00:00Z",
  },
  {
    id: 2,
    title: "Thông báo nghỉ học",
    content: "Lớp môn Lý thuyết đồ thị nghỉ ngày 18/10 do giảng viên bận.",
    notification_date: "2024-10-05T11:00:00Z",
    class_group: "Nhóm B",
    subject: "Java",
    created_at: "2024-10-03T10:00:00Z",
    updated_at: "2024-10-04T12:00:00Z",
  },
];
