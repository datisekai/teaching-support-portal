import { IForm } from "../types/form-item";

export const ExamForm: IForm[] = [
  {
    title: "Thông tin bài thi",
    attributes: [
      {
        prop: "examTitle",
        type: "text",
        label: "Tiêu đề bài thi",
        col: 6,
      },
      {
        prop: "subject",
        type: "select",
        label: "Môn học",
        col: 6,
        options: [
          { title: "Toán học", value: "math" },
          { title: "Vật lý", value: "physics" },
          { title: "Hóa học", value: "chemistry" },
        ],
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
        prop: "startTime",
        type: "date-time",
        label: "Thời gian bắt đầu",
        col: 6,
      },
      {
        prop: "endTime",
        type: "date-time",
        label: "Thời gian kết thúc",
        col: 6,
      },
      {
        prop: "type",
        type: "select",
        label: "Loại đề thi",
        col: 6,
        options: [
          { title: "Tự luận", value: "essay" },
          { title: "Trắc nghiệm", value: "multiple-choice" },
        ],
      },
    ],
  },
];
