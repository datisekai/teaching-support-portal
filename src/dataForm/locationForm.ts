import { IForm } from "../types/form-item";

export const LocationForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "name",
        type: "text",
        label: "Tên vị trí",
        description: "Ví dụ: DHSG CSC Khu A",
        col: 6,
      },
      {
        prop: "accuracy",
        type: "text",
        label: "Độ chính xác (mét)",
        description: "Là khoảng cách có thể chấp nhận được (recommend: >50m)",
        col: 6,
      },
    ],
  },
];
