import { IForm } from "../types/form-item";

export const ExamForm: IForm[] = [
  {
    title: "Thông tin câu hỏi",
    attributes: [
      {
        prop: "title",
        type: "text",
        label: "Tên câu hỏi",
        col: 6,
      },
      {
        prop: "image",
        type: "image",
        label: "Ảnh câu hỏi",
        col: 6,
      },
      {
        prop: "content",
        type: "textarea",
        label: "Nội dung câu hỏi",
        col: 6,
      },
      {
        prop: "classGroup",
        type: "select",
        label: "Nhóm lớp",
        col: 6,
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
        col: 6,
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
