import { IForm, IFormItem } from "../types/form-item";

export const DepartmentForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "name",
        type: "text",
        label: "Tên ngành",
        col: 12,
      },
      {
        prop: "description",
        type: "editor",
        label: "Mô tả",
        col: 12,
      },
      {
        prop: "count",
        type: "number",
        label: "Số",
        col: 12,
      },
    ],
  },
];
