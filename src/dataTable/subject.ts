import { TableSchema } from "../types/table";

export const subjectSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "id",
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
    label: "Mô tả",
    prop: "description",
    type: "text",
  },
  {
    label: "Ngành",
    prop: "department",
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

export const subjects = [
  {
    id: 1,
    code: 840001,
    name: "Công nghệ thông tin",
    description: "a",
    department: "Kỹ thuật phần mềm",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    code: 840002,
    name: "Kỹ thuật phần mềm",
    description: "avb",
    department: "Khoa học thông tin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
