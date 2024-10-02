import { TableSchema } from "../types/table";

export const statisticSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "id",
    type: "number",
  },
  {
    label: "Mã",
    prop: "code",
    type: "number",
  },
  {
    label: "Tên",
    prop: "name",
    type: "text",
  },
  {
    label: "Email",
    prop: "email",
    type: "text",
  },
  {
    label: "Số điện thoại",
    prop: "phoneNumber",
    type: "text",
  },
  {
    label: "Trạng thái",
    prop: "status",
    type: "badge",
    getBadge: (value) => {
      switch (value) {
        case "success":
          return { value: "Thành công", severity: "success" };
        case "failed":
          return { value: "Thất bại", severity: "danger" };
        default:
          return { value: "Lỗi", severity: "warning" };
      }
    },
  },
  {
    label: "Ngày điểm danh",
    prop: "createdAt",
    type: "datetime",
  },
];

export const statistics = [
  {
    id: 1,
    code: "312041014",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phoneNumber: "0123456789",
    status: "success",
    createdAt: "2024-08-01T10:00:00Z",
  },
  {
    id: 2,
    code: "312041013",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phoneNumber: "0987654321",
    status: "failed",
    createdAt: "2024-08-02T11:00:00Z",
  },
];
