import { apiConfig } from "../apis";
import { IForm, IFormItem } from "../types/form-item";

export const UserForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "code",
        type: "text",
        label: "Mã SV/GV",
        col: 6,
      },
      {
        prop: "name",
        type: "text",
        label: "Tên",
        col: 6,
      },
      {
        prop: "email",
        type: "text",
        label: "Email",
        col: 6,
      },
      {
        prop: "phone",
        type: "text",
        label: "Số điện thoại",
        col: 6,
      },
      {
        prop: "roleId",
        type: "select-ajax",
        label: "Loại quyền",
        apiUrl: apiConfig.role.getAll.endpoint,
        getOptions: (data = []) => {
          console.log("data", data);
          return data.map((item: any) => {
            return {
              title: item.name,
              value: item.id,
            };
          });
        },
        col: 6,
      },
    ],
  },
];
