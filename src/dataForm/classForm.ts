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
      {
        prop: "teacherCodes",
        type: "multi-select-ajax",
        label: "Giảng viên",
        apiUrl: apiConfig.teacher.getPublicTeachers.endpoint,
        col: 6,
        getOptions: (data = []) => {
          return data.map((item: any) => {
            return {
              title: `${item.code} - ${item.name}`,
              value: item.code,
            };
          });
        },
      },
      {
        prop: "majorId",
        type: "multi-select-ajax",
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
        prop: "dueDate",
        type: "text",
        label: "Năm học",
        col: 6,
      },
    ],
  },
];
