import { TableSchema } from "../types/table";

export const classSchemas: TableSchema[] = [
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
    label: "Môn học",
    prop: "major",
    type: "text",
  },
  {
    label: "Năm học",
    prop: "duration",
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

export const classes = [
  {
    id: 1,
    name: "nhóm 02",
    teacher: "Nguyen Van A",
    major: "Lập trình web",
    dueDate: "2022-12-31",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "nhóm 03",
    teacher: "Nguyen Van B",
    major: "Java",
    dueDate: "2022-12-31",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
