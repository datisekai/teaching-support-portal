import { TableSchema } from "../types/table";

export const permissionSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "id",
    type: "number",
  },
  {
    label: "Tên",
    prop: "name",
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

export const permissions = [
  {
    id: 1,
    name: "TEACHER",
    created_at: "2024-08-01T10:00:00Z",
    updated_at: "2024-08-10T12:00:00Z",
  },
  {
    id: 2,
    name: "ADMIN",
    created_at: "2024-08-02T11:00:00Z",
    updated_at: "2024-08-11T13:00:00Z",
  },
];
