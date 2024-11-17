import { TableSchema } from "../types/table";

export const facultySchemas: TableSchema[] = [
  {
    label: "#",
    prop: "index",
    type: "number",
  },
  {
    label: "Mã ngành",
    prop: "code",
    type: "text",
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
    prop: "createdAt",
    type: "datetime",
  },
  {
    label: "Ngày sửa",
    prop: "updatedAt",
    type: "datetime",
  },
];

export const facultys = [
  {
    id: 1,
    name: "Công nghệ thông tin",
    description: "a",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Kỹ thuật phần mềm",
    description: "avb",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
