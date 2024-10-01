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
    prop: "due_date",
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

export const classes = [
  {
    id: 1,
    name: "nhóm 02",
    teacher: "Nguyen Van A",
    subject: "Lập trình web",
    due_date: "2022-12-31",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    name: "nhóm 03",
    teacher: "Nguyen Van B",
    subject: "Java",
    due_date: "2022-12-31",
    created_at: new Date(),
    updated_at: new Date(),
  },
];
