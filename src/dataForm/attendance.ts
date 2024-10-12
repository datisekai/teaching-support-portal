import { apiConfig } from "../apis";
import { IForm, IFormItem } from "../types/form-item";

export const AttendanceForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "name",
        type: "text",
        label: "Tiêu đề",
        col: 6,
      },
      {
        prop: "classId",
        type: "select-ajax",
        apiUrl: apiConfig.class.getAllOwn.endpoint,
        label: "Lớp học",
        col: 6,
        getOptions: (data = []) => {
          console.log("data", data);
          return data.map((item: any) => {
            return {
              title: `${item.major.name} - ${item.name}`,
              value: item.id,
            };
          });
        },
      },
    ],
  },
];
