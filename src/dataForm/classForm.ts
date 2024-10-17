import { IForm, IFormItem } from "../types/form-item";

export const ClassForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "name",
        type: "text",
        label: "Tên",
        col: 6,
      },
      {
        prop: "teacher",
        type: "select-ajax",
        label: "Giảng viên",
        col: 6,
        getOptions: (data = []) => {
          return data.map((item: any) => {
            return {
              title: `${item.user.name} - ${item.name}`,
              value: item.id,
            };
          });
        },
      },
      {
        prop: "major",
        type: "select-ajax",
        label: "Môn học",
        col: 6,
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
        col: 6,
      },
    ],
  },
];
