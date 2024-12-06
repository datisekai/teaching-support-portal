import { IForm } from "../types/form-item";

export const DifficultyForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "level",
        type: "text",
        label: "Độ khó",
        col: 6,
      },
    ],
  },
];
