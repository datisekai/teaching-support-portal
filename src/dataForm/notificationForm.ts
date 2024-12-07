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
        col: 12,
      },

      {
        prop: "classIds",
        type: "multi-select-ajax",
        apiUrl: apiConfig.class.getAll.endpoint,
        label: "Nhóm lớp",
        col: 6,
        getOptions: (data = []) => {
          return data.map((item: any) => {
            return {
              title: `${item?.major?.code} - ${item?.major?.name} - ${item?.name}`,
              value: item.id,
            };
          });
        },
      },
      {
        prop: "content",
        type: "editor",
        label: "Nội dung thông báo",
        col: 12,
      },
    ],
  },
];
