import { IForm, IFormItem } from "../types/form-item";

export const DepartmentForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "name",
        type: "text",
        label: "Tên ngành",
      },
      {
        prop: "description",
        type: "text",
        label: "Mô tả",
      },
    ],
  },
  {
    title: "abc",
    attributes: [
      {
        prop: "name",
        type: "text",
        label: "Tên ngành",
      },
      {
        prop: "description",
        type: "text",
        label: "Mô tả",
      },
    ],
  },
];
