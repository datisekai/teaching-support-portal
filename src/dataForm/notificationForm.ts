import { apiConfig } from "../apis";
import { IForm } from "../types/form-item";

export const NotificationForm: IForm[] = [
  {
    title: "Thông tin thông báo",
    attributes: [
      {
        prop: "name",
        type: "text",
        label: "Tên thông báo",
        col: 6,
      },
      {
        prop: "image",
        type: "image",
        label: "Ảnh thông báo",
        col: 6,
      },
      {
        prop: "content",
        type: "textarea",
        label: "Nội dung thông báo",
        col: 6,
      },
      {
        prop: "classIds",
        type: "multi-select-ajax",
        apiUrl: apiConfig.class.getAll.endpoint,
        label: "Nhóm lớp",
        col: 6,
        getOptions: (data = []) => {
          console.log("values: ", data);
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
