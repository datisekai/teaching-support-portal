import { TableSchema } from "../../types/table";

export const productSchemas: TableSchema[] = [
  {
    label: "Tên sản phẩm",
    key: "name",
    type: "text",
  },
  {
    label: "Giá",
    key: "price",
    type: "number",
  },
];

export const products = [
  {
    name: "Sản phẩm 1",
    price: 1000,
  },
  {
    name: "Sản phẩm 2",
    price: 5000,
  },
];
