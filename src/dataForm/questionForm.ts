import { apiConfig } from "../apis";
import { IForm } from "../types/form-item";

export const QuestionCodeForm: IForm[] = [
  {
    title: "Thông tin câu hỏi",
    attributes: [
      {
        prop: "title",
        type: "text",
        label: "Tiêu đề",
        col: 6,
      },
      {
        prop: "content",
        type: "textarea",
        label: "Nội dung câu hỏi",
        col: 6,
      },
      {
        prop: "isPublic",
        type: "switch",
        label: "Public",
        col: 6,
      },
      {
        prop: "majorId",
        type: "select-ajax",
        label: "Môn học",
        apiUrl: apiConfig.major.getAll.endpoint,
        col: 6,
        getOptions(data = []) {
          return data.map((item) => ({ title: item.name, value: item.id }));
        },
      },
      {
        prop: "difficultyId",
        type: "select-ajax",
        label: "Độ khó",
        apiUrl: apiConfig.difficulty.getAll.endpoint,
        col: 6,
        getOptions(data = []) {
          return data.map((item) => ({ title: item.level, value: item.id }));
        },
      },
      {
        prop: "chapterId",
        type: "select-ajax",
        label: "Chương",
        col: 6,
        apiUrl: apiConfig.chapter.getAll.endpoint,
        getOptions(data = []) {
          return data.map((item) => ({ title: item.name, value: item.id }));
        },
        preConditionProp: "majorId",
      },

      {
        prop: "acceptedLanguages",
        type: "multi-select-ajax",
        label: "Ngôn ngữ thực hiện",
        col: 6,
        apiUrl: apiConfig.language.getAll.endpoint,
        getOptions(data = []) {
          return data.map((item) => ({ title: item.name, value: item.id }));
        },
      },
    ],
  },
];

export const QuestionMultiChoiceForm: IForm[] = [
  {
    title: "Thông tin câu hỏi",
    attributes: [
      {
        prop: "question",
        type: "text",
        label: "Câu hỏi",
        col: 6,
      },
      {
        prop: "content",
        type: "textarea",
        label: "Nội dung câu hỏi",
        col: 6,
      },
      {
        prop: "correctAnswer",
        type: "select",
        label: "Đáp án đúng",
        col: 6,
        options: [
          { title: "Đáp án A", value: "A" },
          { title: "Đáp án B", value: "B" },
          { title: "Đáp án C", value: "C" },
          { title: "Đáp án D", value: "D" },
        ],
      },
      {
        prop: "major",
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
        prop: "chapter",
        type: "select",
        label: "Chương",
        col: 6,
        options: [
          { title: "Chương 1", value: "chapter1" },
          { title: "Chương 2", value: "chapter2" },
          { title: "Chương 3", value: "chapter3" },
        ],
      },
      {
        prop: "difficulty",
        type: "select",
        label: "Độ khó",
        col: 6,
        options: [
          { title: "Dễ", value: "easy" },
          { title: "Trung bình", value: "medium" },
          { title: "Khó", value: "hard" },
        ],
      },
      {
        prop: "status",
        type: "select",
        label: "Trạng thái",
        col: 6,
        options: [
          { title: "Private", value: "private" },
          { title: "Public", value: "public" },
        ],
      },
    ],
  },
];
