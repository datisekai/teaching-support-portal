import { TableSchema } from "../types/table";

export const departmentSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "index",
    type: "text",
  },
  {
    label: "Tên ngành",
    prop: "name",
    type: "text",
  },
  {
    label: "Mô tả",
    prop: "decription",
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

export const departments = [
  {
    index: 1,
    name: "Công nghệ thông tin",
    decription: "a",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    index: 2,
    name: "Kỹ thuật phần mềm",
    decription: "avb",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
