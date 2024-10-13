import { TableSchema } from "../types/table";

export const teacherSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "id",
    type: "number",
  },
  {
    label: "Mã",
    prop: "code",
    type: "number",
  },
  {
    label: "Tên",
    prop: "name",
    type: "text",
  },
  {
    label: "Email",
    prop: "email",
    type: "text",
  },
];

export const teachers = [
  {
    id: 1,
    code: "312041014",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
  },
  {
    id: 2,
    code: "312041013",
    name: "Trần Thị B",
    email: "tranthib@example.com",
  },
];
