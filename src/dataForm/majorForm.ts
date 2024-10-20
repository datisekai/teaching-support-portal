import { apiConfig } from "../apis";
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
        type: "select-ajax",
        label: "Ngành học",
        apiUrl: apiConfig.faculty.getAll.endpoint,
        col: 6,
        getOptions: (data = []) => {
          return data.map((item: any) => {
            return {
              title: `${item.name}`,
              value: item.id,
            };
          });
        },
      },
    ],
  },
];
