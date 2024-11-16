import { IForm, IFormItem } from "../types/form-item";

export const StudentForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "code",
        type: "text",
        label: "Mã",
        col: 6,
      },
      {
        prop: "name",
        type: "text",
        label: "Tên",
        col: 6,
      },
      // {
      //   prop: "email",
      //   type: "text",
      //   label: "Email",
      //   col: 6,
      // },
      // {
      //   prop: "phone",
      //   type: "text",
      //   label: "Số điện thoại",
      //   col: 6,
      // },
      // {
      //   prop: "password",
      //   type: "text",
      //   label: "Mật khẩu",
      //   col: 6,
      // },
    ],
  },
];
