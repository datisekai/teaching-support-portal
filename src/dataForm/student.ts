import { IForm, IFormItem } from "../types/form-item";

export const StudentForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "code",
        type: "number",
        label: "Mã",
        col: 6,
      },
      {
        prop: "name",
        type: "text",
        label: "Tên",
        col: 6,
      },
      {
        prop: "email",
        type: "text",
        label: "Email",
        col: 6,
      },
      {
        prop: "phoneNumber",
        type: "text",
        label: "Số điện thoại",
        col: 6,
      },
    ],
  },
];
