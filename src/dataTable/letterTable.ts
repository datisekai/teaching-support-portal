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
    type: "badge",
    getBadge(value) {
      switch (value) {
        case "leave_application":
          return {
            value: "Đơn xin nghị học",
            severity: "info",
          };
        case "":
          return {
            value: "null",
            severity: "warning",
          };
        default:
          return {
            value: "Lỗi",
            severity: "danger",
          };
      }
    },
  },
  {
    label: "Trạng thái",
    prop: "status",
    type: "badge",
    getBadge(value) {
      switch (value) {
        case "pending":
          return {
            value: "Chưa xử lý",
            severity: "warning",
          };
        case "accepted":
          return {
            value: "Chấp nhận",
            severity: "success",
          };
        case "rejected":
          return {
            value: "Từ chối",
            severity: "danger",
          };
        default:
          return {
            value: "Lỗi",
            severity: "danger",
          };
      }
    },
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
    prop: "createdAt",
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
    status: "pending",
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
