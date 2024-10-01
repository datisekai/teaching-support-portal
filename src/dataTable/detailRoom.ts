import { TableSchema } from "../types/table";

export const detailRoomSchemas: TableSchema[] = [
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
    prop: "phone_number",
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
    label: "Ngày tạo",
    prop: "created_at",
    type: "datetime",
  },
];

export const detailRooms = [
  {
    id: 1,
    code: "312041014",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone_number: "0123456789",
    status: "success",
    created_at: "2024-08-01T10:00:00Z",
  },
  {
    id: 2,
    code: "312041013",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone_number: "0987654321",
    status: "failed",
    created_at: "2024-08-02T11:00:00Z",
  },
];
