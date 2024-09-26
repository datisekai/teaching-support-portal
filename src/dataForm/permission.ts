import { IForm, IFormItem } from "../types/form-item";

export const PermissionForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "name",
        type: "text",
        label: "Tên",
        col: 6,
      },
    ],
  },
];
