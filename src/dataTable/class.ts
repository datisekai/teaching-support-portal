import { TableSchema } from "../types/table";

export const classSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "index",
    type: "number",
  },
  {
    label: "Tên",
    prop: "name",
    type: "text",
  },
  {
    label: "Giảng viên",
    prop: "teacher",
    type: "text",
  },
  {
    label: "Môn học",
    prop: "subject",
    type: "text",
  },
  {
    label: "Năm học",
    prop: "dueDate",
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
    index: 1,
    name: "nhóm 02",
    teacher: "Nguyen Van A",
    subject: "Lập trình web",
    dueDate: "2022-12-31",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    index: 2,
    name: "nhóm 03",
    teacher: "Nguyen Van B",
    subject: "Java",
    dueDate: "2022-12-31",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
