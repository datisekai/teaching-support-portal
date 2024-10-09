import { TableSchema } from "../types/table";

export const scoreColumnManagementSchemas: TableSchema[] = [
  {
    label: "Cột",
    prop: "index",
    type: "number",
  },
  {
    label: "Tên",
    prop: "name",
    type: "text",
    editable: true,
  },
  {
    label: "Hệ số (%)",
    prop: "percent",
    type: "number",
    editable: true,
  },
];

export const scoreColumnManagements = [
  {
    index: 1,
    name: "Điểm A",
    percent: 20,
  },
  {
    index: 2,
    name: "Điểm B",
    percent: 20,
  },
];
