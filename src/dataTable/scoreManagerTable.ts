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
  {
    label: "Chcan10%",
    prop: "cc",
    type: "number",
    editable: true,
    prefix: "",
  },
  {
    label: "kt10%",
    prop: "kt",
    type: "number",
    editable: true,
    prefix: "",
  },
];

// Dữ liệu mẫu cho bảng exam results
export const scoresManager = [
  {
    id: 1,
    studentId: "SV001",
    studentName: "Nguyễn Văn A",
    cc: 10,
    kt: 10,
  },
  {
    id: 2,
    studentId: "SV002",
    studentName: "Trần Thị B",
    cc: 10,
    kt: 10,
  },
];
