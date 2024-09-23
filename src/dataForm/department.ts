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
      // {
      //   prop: "count",
      //   type: "number",
      //   label: "Số",
      //   col: 12,
      // },
      // {
      //   prop: "checked",
      //   type: "switch",
      //   label: "Kích hoạt",
      // },
      // {
      //   prop: "teacher",
      //   type: "select",
      //   label: "Giảng viên",
      //   options: [
      //     {
      //       title: "Giảng viên 1",
      //       value: "gv1",
      //     },
      //     {
      //       title: "Giảng viên 2",
      //       value: "gv2",
      //     },
      //   ],
      // },
      // {
      //   prop: "teacher_ajax",
      //   type: "select-ajax",
      //   label: "Giảng viên Ajax",
      //   apiUrl: "/teacher",
      // },
      // {
      //   prop: "dateee",
      //   type: "date",
      //   label: "Lịch",
      // },
    ],
  },
];
