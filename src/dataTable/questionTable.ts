import { TableSchema } from "../types/table";

// Định nghĩa schema cho bảng question
export const questionSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "id",
    type: "number",
  },
  {
    label: "Đề bài",
    prop: "title",
    type: "text",
  },
  {
    label: "Nội dung",
    prop: "content",
    type: "text",
  },
  // {
  //   label: "Chương",
  //   prop: "chapter",
  //   type: "text",
  // },
  // {
  //   label: "Độ khó",
  //   prop: "level",
  //   type: "badge",
  //   getBadge: (value) => {
  //     switch (value) {
  //       case "easy":
  //         return { value: "Dễ", severity: "info" };
  //       case "medium":
  //         return { value: "Trung bình", severity: "warning" };
  //       case "difficult":
  //         return { value: "Khó", severity: "danger" };
  //       default:
  //         return { value: "Lỗi", severity: "danger" };
  //     }
  //   },
  // },
  {
    label: "Trạng thái",
    prop: "isPublic",
    type: "badge",
    getBadge: (value) => {
      if (value) {
        return { value: "Công khai", severity: "success" };
      }
      return { value: "Riêng tư", severity: "danger" };
    },
  },
  {
    label: "Loại câu hỏi",
    prop: "type",
    type: "text",
  },
  {
    label: "Ngày tạo",
    prop: "createdAt",
    type: "datetime",
  },
  {
    label: "Ngày sửa",
    prop: "updatedAt",
    type: "datetime",
  },
];

// Dữ liệu mẫu cho bảng question
export const questions = [
  {
    id: 1,
    topic:
      "<a></a> là gì?<a></a> là gì?<a></a> là gì?<a></a> là gì?<a></a> là gì?<a></a> là gì?<a></a> là gì?<a></a> là gì?<a></a> là gì?<a></a> là gì?",
    chapter: "Chương 1",
    level: "easy",
    teacher: "Nguyễn Văn A",
    type: "multiple-choice",
    content: "<p>a. a</p><p>b. b</p><p>c. c</p><p>d. d</p>",
    correctAnswer: "b",
    createdAt: "2024-08-15T09:00:00Z",
    updatedAt: "2024-08-10T08:00:00Z",
  },
  {
    id: 2,
    topic: "<div></div> là gì?",
    chapter: "Chương 1",
    level: "medium",
    type: "essay",
    teacher: "Nguyễn Văn B",
    content: "<p>a. a</p><p>b. b</p><p>c. c</p><p>d. d</p>",
    correctAnswer: "a",
    createdAt: "2024-08-15T09:00:00Z",
    updatedAt: "2024-08-10T08:00:00Z",
  },
];
