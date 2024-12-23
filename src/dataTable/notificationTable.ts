import { TableSchema } from "../types/table";

export const notificationSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "id",
    type: "number",
  },
  {
    label: "Tên thông báo",
    prop: "name",
    type: "text",
  },
  {
    label: "Lớp học",
    prop: "classes",
    type: "text",
    render(data) {
      return `${data?.classes
        ?.map((item: any) => `${item?.major?.name} - ${item?.name}`)
        .join(", ")}`;
    },
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
    major: "Lập trình web",
    createdAt: "2024-09-30T08:00:00Z",
    updatedAt: "2024-09-30T10:00:00Z",
  },
  {
    id: 2,
    title: "Thông báo nghỉ học",
    content: "Lớp môn Lý thuyết đồ thị nghỉ ngày 18/10 do giảng viên bận.",
    notificationDate: "2024-10-05T11:00:00Z",
    classGroup: "Nhóm B",
    major: "Java",
    createdAt: "2024-10-03T10:00:00Z",
    updatedAt: "2024-10-04T12:00:00Z",
  },
];
