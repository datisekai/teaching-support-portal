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
        prop: "title",
        type: "text",
        label: "Câu hỏi",
        col: 6,
      },
      {
        prop: "content",
        type: "editor",
        label: "Nội dung câu hỏi",
        col: 6,
      },
      {
        prop: "majorId",
        type: "select-ajax",
        label: "Môn học",
        apiUrl: apiConfig.major.getAll.endpoint,
        col: 6,
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
        prop: "chapterId",
        type: "select-ajax",
        label: "Chương",
        apiUrl: apiConfig.chapter.getAll.endpoint,
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
      {
        prop: "difficultyId",
        type: "select-ajax",
        label: "Độ khó",
        apiUrl: apiConfig.difficulty.getAll.endpoint,
        col: 6,
        getOptions: (data = []) => {
          return data.map((item: any) => {
            return {
              title: `${item.level}`,
              value: item.id,
            };
          });
        },
      },
      {
        prop: "isPublic",
        type: "select",
        label: "Trạng thái",
        col: 6,
        options: [
          { title: "Private", value: false },
          { title: "Public", value: true },
        ],
      },
    ],
  },
];
