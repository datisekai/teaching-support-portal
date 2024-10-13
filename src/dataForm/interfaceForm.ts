import { IForm, IFormItem } from "../types/form-item";

export const interfaceForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "name",
        type: "text",
        label: "Tên website",
        col: 6,
      },
      {
        prop: "logo",
        type: "image",
        label: "Logo",
        col: 6,
      },
      {
        prop: "favicon",
        type: "image",
        label: "Favicon",
        col: 6,
      },
    ],
  },
];
