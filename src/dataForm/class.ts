import { IForm, IFormItem } from "../types/form-item";

export const ClassForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "name",
        type: "text",
        label: "Tên",
        col: 12,
      },
      {
        prop: "teacher",
        type: "select",
        label: "Giảng viên",
        options: [
          {
            title: "Nguyễn Văn A",
            value: "nva",
          },
          {
            title: "Nguyễn Văn B",
            value: "nvb",
          },
        ],
      },
      {
        prop: "subject",
        type: "select",
        label: "Môn học",
        options: [
          {
            title: "Lập trình web",
            value: "ltw",
          },
          {
            title: "Java",
            value: "jv",
          },
        ],
      },
      {
        prop: "dueDate",
        type: "text",
        label: "Năm học",
        col: 12,
      },
    ],
  },
];
