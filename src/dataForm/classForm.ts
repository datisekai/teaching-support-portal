import { apiConfig } from "../apis";
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
      // {
      //   prop: "teacherCodes",
      //   type: "smart-select",
      //   label: "Giảng viên",
      //   apiUrl: apiConfig.user.search.endpoint,
      //   query: { type: "teacher" },
      //   col: 6,
      // },
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
      {
        prop: "duration",
        type: "text",
        label: "Năm học",
        col: 6,
      },
    ],
  },
];
