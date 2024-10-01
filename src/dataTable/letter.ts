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
    prop: "student_code",
    type: "number",
  },
  {
    label: "Tên sinh viên",
    prop: "student_name",
    type: "text",
  },
  {
    label: "Ngày xin nghỉ",
    prop: "absence_date",
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
    student_code: "312041014",
    student_name: "Nguyễn Văn A",
    absence_date: "2024-08-15T09:00:00Z",
    created_at: "2024-08-10T08:00:00Z",
    status: "pending",
  },
  {
    id: 2,
    type: "Đơn xin nghỉ thi",
    reason: "Gia đình có việc gấp",
    evidence:
      "<p>Giấy tờ minh chứng</p><img src='path/to/evidence.jpg' alt='Minh chứng' />",
    student_code: "312041013",
    student_name: "Trần Thị B",
    absence_date: "2024-08-18T10:00:00Z",
    created_at: "2024-08-11T09:00:00Z",
  },
];
