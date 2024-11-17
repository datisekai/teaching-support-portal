import { TableSchema } from "../types/table";

export const majorSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "index",
    type: "number",
  },
  {
    label: "Mã môn học",
    prop: "code",
    type: "number",
  },
  {
    label: "Tên",
    prop: "name",
    type: "text",
  },
  {
    label: "Ngành",
    prop: "faculty",
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

export const majors = [
  {
    id: 1,
    code: 840001,
    name: "Công nghệ thông tin",
    description: "a",
    faculty: "Kỹ thuật phần mềm",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    code: 840002,
    name: "Kỹ thuật phần mềm",
    description: "avb",
    faculty: "Khoa học thông tin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
