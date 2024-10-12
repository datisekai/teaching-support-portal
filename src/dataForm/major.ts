import { IForm, IFormItem } from "../types/form-item";

export const MajorForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "code",
        type: "number",
        label: "Mã môn học",
        col: 6,
      },
      {
        prop: "name",
        type: "text",
        label: "Tên",
        col: 6,
      },
      {
        prop: "facultyId",
        type: "select",
        label: "Ngành học",
        col: 6,
        options: [],
      },
    ],
  },
];
