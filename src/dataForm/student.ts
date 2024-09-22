import { IForm, IFormItem } from "../types/form-item";

export const StudentForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "code",
        type: "number",
        label: "Mã",
        col: 12,
      },
      {
        prop: "name",
        type: "text",
        label: "Tên",
        col: 12,
      },
      {
        prop: "email",
        type: "text",
        label: "Email",
        col: 12,
      },
      {
        prop: "phoneNumber",
        type: "text",
        label: "Số điện thoại",
        col: 12,
      },
    ],
  },
];
