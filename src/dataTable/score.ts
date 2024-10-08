import { TableSchema } from "../types/table";

// Định nghĩa schema cho bảng exam results
export const scoreSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "id",
    type: "number",
  },
  {
    label: "MSSV",
    prop: "studentId",
    type: "text",
  },
  {
    label: "Tên sinh viên",
    prop: "studentName",
    type: "text",
  },
  {
    label: "Tên đề thi",
    prop: "examName",
    type: "text",
  },
  {
    label: "Số điểm",
    prop: "score",
    type: "text",
  },
  {
    label: "Thời gian vào làm bài",
    prop: "startTime",
    type: "datetime",
  },
  {
    label: "Trạng thái",
    prop: "status",
    type: "badge",
    getBadge: (value) => {
      switch (value) {
        case "cheat":
          return { value: "Cảnh báo gian lận", severity: "warning" };
        case "normal":
          return { value: "Bình thường", severity: "info" };
        default:
          return { value: "Lỗi", severity: "danger" };
      }
    },
  },
];

// Dữ liệu mẫu cho bảng exam results
export const scores = [
  {
    id: 1,
    studentId: "SV001",
    studentName: "Nguyễn Văn A",
    examName: "Đề thi giữa kỳ Toán học",
    score: 2.5,
    startTime: "2024-10-01T09:00:00Z",
    status: "cheat",
  },
  {
    id: 2,
    studentId: "SV002",
    studentName: "Trần Thị B",
    examName: "Đề thi cuối kỳ Vật lý",
    score: 7.5,
    startTime: "2024-10-02T10:00:00Z",
    status: "normal",
  },
];
