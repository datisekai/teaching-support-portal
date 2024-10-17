import { IForm } from "../types/form-item";

export const NotificationForm: IForm[] = [
  {
    title: "Thông tin thông báo",
    attributes: [
      {
        prop: "title",
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
        prop: "classId",
        type: "select-ajax",
        label: "Nhóm lớp",
        col: 6,
        getOptions: (data = []) => {
          return data.map((item: any) => {
            return {
              title: `${item.class.name} - ${item.name}`,
              value: item.id,
            };
          });
        },
      },
      {
        prop: "majorId",
        type: "select",
        label: "Môn học",
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
