import { TableSchema } from "../types/table";

export const userSchemas: TableSchema[] = [
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
    label: "Thiết bị",
    prop: "device_id",
    type: "text",
  },
  {
    label: "Ngày tạo",
    prop: "created_at",
    type: "datetime",
  },
  {
    label: "Ngày sửa",
    prop: "updated_at",
    type: "datetime",
  },
];

export const users = [
  {
    id: 1,
    code: "312041014",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone_number: "0123456789",
    device_id: "123456789",
    created_at: "2024-08-01T10:00:00Z",
    updated_at: "2024-08-10T12:00:00Z",
  },
  {
    id: 2,
    code: "312041013",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    device_id: "123456789",
    phone_number: "0987654321",
    created_at: "2024-08-02T11:00:00Z",
    updated_at: "2024-08-11T13:00:00Z",
  },
];
