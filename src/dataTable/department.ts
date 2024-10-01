import { TableSchema } from "../types/table";

export const departmentSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "id",
    type: "number",
  },
  {
    label: "Tên ngành",
    prop: "name",
    type: "text",
  },
  {
    label: "Mô tả",
    prop: "description",
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

export const departments = [
  {
    id: 1,
    name: "Công nghệ thông tin",
    description: "a",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    name: "Kỹ thuật phần mềm",
    description: "avb",
    created_at: new Date(),
    updated_at: new Date(),
  },
];
