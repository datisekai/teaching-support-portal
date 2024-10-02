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
    prop: "createdAt",
    type: "datetime",
  },
  {
    label: "Ngày sửa",
    prop: "updatedAt",
    type: "datetime",
  },
];

export const permissions = [
  {
    id: 1,
    name: "TEACHER",
    createdAt: "2024-08-01T10:00:00Z",
    updatedAt: "2024-08-10T12:00:00Z",
  },
  {
    id: 2,
    name: "ADMIN",
    createdAt: "2024-08-02T11:00:00Z",
    updatedAt: "2024-08-11T13:00:00Z",
  },
];
