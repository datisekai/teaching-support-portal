import { apiConfig } from "../apis";
import { IForm, IFormItem } from "../types/form-item";

export const ChapterForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "name",
        type: "text",
        label: "Tên chương",
        col: 6,
      },
      {
        prop: "majorId",
        type: "select-ajax",
        label: "Môn học",
        col: 6,
        apiUrl: apiConfig.major.getAll.endpoint,
        getOptions: (data = []) => {
          return data.map((item: any) => {
            return {
              title: `${item.code} - ${item.name}`,
              value: item.id,
            };
          });
        },
      },
    ],
  },
];
