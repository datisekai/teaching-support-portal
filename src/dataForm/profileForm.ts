import { IForm } from "../types/form-item";

export const ProfileForm: IForm[] = [
  {
    title: "Thông tin cá nhân",
    attributes: [
      {
        prop: "code",
        type: "text",
        label: "Mã số",
        col: 6,
        disabled: true,
      },
      {
        prop: "name",
        type: "text",
        label: "Họ và tên",
        col: 6,
      },
      {
        prop: "email",
        type: "text",
        label: "Email",
        col: 6,
      },
      {
        prop: "phone",
        type: "text",
        label: "Số điện thoại",
        col: 6,
      },
    ],
  },
];

export const ProfileFormModal: IForm = {
  title: "",
  attributes: [
    {
      prop: "code",
      type: "text",
      label: "Mã số",
      col: 12,
      disabled: true,
    },
    {
      prop: "name",
      type: "text",
      label: "Họ và tên",
      col: 12,
    },
    {
      prop: "email",
      type: "text",
      label: "Email",
      col: 12,
    },
  ],
};
