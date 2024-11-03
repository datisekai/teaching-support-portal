import { TableSchema } from "../types/table";

export const scoreColumnManagementSchemas: TableSchema[] = [
  {
    label: "#",
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
    prop: "weight",
    type: "number",
    editable: true,
  },
];

export const scoreColumnManagements = [
  {
    index: 1,
    name: "Điểm A",
    weight: 20,
  },
  {
    index: 2,
    name: "Điểm B",
    weight: 20,
  },
];
