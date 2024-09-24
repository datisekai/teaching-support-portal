import { TableSchema } from "../types/table";

// Định nghĩa schema cho bảng Letter
export const letterSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "id",
    type: "number",
  },
  {
    label: "Loại đơn từ",
    prop: "type",
    type: "text",
  },
  {
    label: "Lý do",
    prop: "reason",
    type: "text",
  },
  {
    label: "MSSV",
    prop: "studentCode",
    type: "number",
  },
  {
    label: "Tên sinh viên",
    prop: "studentName",
    type: "text",
  },
  {
    label: "Ngày xin nghỉ",
    prop: "absenceDate",
    type: "datetime",
  },
];

// Dữ liệu mẫu cho bảng Letter
export const letters = [
  {
    id: 1,
    type: "Đơn xin nghỉ học",
    reason: "Bị bệnh",
    evidence:
      "<p>Giấy khám bệnh</p><img src='path/to/image.jpg' alt='Giấy khám bệnh' />",
    studentCode: "312041014",
    studentName: "Nguyễn Văn A",
    absenceDate: "2024-08-15T09:00:00Z",
    createdAt: "2024-08-10T08:00:00Z",
  },
  {
    id: 2,
    type: "Đơn xin nghỉ thi",
    reason: "Gia đình có việc gấp",
    evidence:
      "<p>Giấy tờ minh chứng</p><img src='path/to/evidence.jpg' alt='Minh chứng' />",
    studentCode: "312041013",
    studentName: "Trần Thị B",
    absenceDate: "2024-08-18T10:00:00Z",
    createdAt: "2024-08-11T09:00:00Z",
  },
];
