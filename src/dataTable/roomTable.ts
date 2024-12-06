import { TableSchema } from "../types/table";

export const roomSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "id",
    type: "number",
  },
  {
    label: "Lớp học",
    prop: "major",
    type: "text",
    minWidth: "100px",
    render(data) {
      return `${data.class.major.name} - ${data.class.name}`;
    },
  },
  {
    label: "Tiêu đề",
    prop: "title",
    type: "text",
  },
  {
    label: "Trạng thái",
    prop: "isOpen",
    type: "badge",
    getBadge: (value) => {
      switch (value) {
        case false:
        case "":
          return { severity: "warning", value: "Không hoạt động" };
        case true:
          return { severity: "info", value: "Đang điểm danh" };
      }
      return { severity: "danger", value: "Không xác định" };
    },
  },
  {
    label: "Giảng viên",
    prop: "teacherNames",
    type: "text",
  },
  {
    label: "Ngày cập nhật",
    prop: "updatedAt",
    type: "datetime",
  },
];

export const AttendeeSchemas: TableSchema[] = [
  {
    label: "Mã sinh viên",
    prop: "code",
    type: "text",
  },
  {
    label: "Tên sinh viên",
    prop: "name",
    type: "text",
  },
  {
    label: "Thời gian",
    prop: "time",
    type: "datetime",
  },
];
