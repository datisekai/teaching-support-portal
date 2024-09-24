import { IForm } from "../types/form-item";

export const NotificationForm: IForm[] = [
  {
    title: "Thông tin thông báo",
    attributes: [
      {
        prop: "title",
        type: "text",
        label: "Tên thông báo",
        col: 12,
      },
      {
        prop: "image",
        type: "image",
        label: "Ảnh thông báo",
        col: 12,
      },
      {
        prop: "content",
        type: "textarea",
        label: "Nội dung thông báo",
        col: 12,
      },
      {
        prop: "classGroup",
        type: "select",
        label: "Nhóm lớp",
        col: 12,
        options: [
          { title: "Nhóm A", value: "A" },
          { title: "Nhóm B", value: "B" },
          { title: "Nhóm C", value: "C" },
          { title: "Tất cả nhóm", value: "" },
        ],
      },
      {
        prop: "subject",
        type: "select",
        label: "Môn học",
        col: 12,
        options: [
          {
            title: "Lập trình web",
            value: "ltw",
          },
          {
            title: "Java",
            value: "jv",
          },
        ],
      },
    ],
  },
];
