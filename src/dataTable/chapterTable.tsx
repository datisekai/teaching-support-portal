import { TableSchema } from "../types/table";

export const chapterSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "id",
    type: "number",
  },
  {
    label: "Tên chương",
    prop: "name",
    type: "text",
  },
  {
    label: "Môn học",
    prop: "major",
    type: "text",
    render(data) {
      return `${data.major.code} - ${data.major.name}`;
    },
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
