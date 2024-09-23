import { TableSchema } from "../types/table";

export const studentSchemas: TableSchema[] = [
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
    type: "number",
  },
  {
    label: "Thiết bị",
    prop: "deviceId",
    type: "text",
  },
  {
    label: "Ngày tạo",
    prop: "createdAt",
    type: "datetime",
  },
  {
    label: "Ngày sửa",
    prop: "updatedAt",
    type: "datetime",
  },
];

export const students = [
  {
    id: 1,
    code: "312041014",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phoneNumber: "0123456789",
    deviceId: "123456789",
    createdAt: "2024-08-01T10:00:00Z",
    updatedAt: "2024-08-10T12:00:00Z",
  },
  {
    id: 2,
    code: "312041013",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    deviceId: "123456789",
    phoneNumber: "0987654321",
    createdAt: "2024-08-02T11:00:00Z",
    updatedAt: "2024-08-11T13:00:00Z",
  },
];
