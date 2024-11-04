import { TableSchema } from "../types/table";

// Định nghĩa schema cho bảng exam results
export const scoreManagerSchemas: TableSchema[] = [
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
];

// Dữ liệu mẫu cho bảng exam results
export const scoresManager = [
  {
    id: 1,
    studentId: "SV001",
    studentName: "Nguyễn Văn A",
  },
  {
    id: 2,
    studentId: "SV002",
    studentName: "Trần Thị B",
  },
];
