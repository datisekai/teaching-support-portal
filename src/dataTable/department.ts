import { TableSchema } from "../types/table";

export const departmentSchemas: TableSchema[] = [
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
];

export const departments = [
  {
    name: "Công nghệ thông tin",
    decription: "a",
  },
  {
    name: "Kỹ thuật phần mềm",
    decription: "avb",
  },
];
