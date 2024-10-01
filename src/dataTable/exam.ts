import { TableSchema } from "../types/table";

// Định nghĩa schema cho bảng exam
export const examSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "id",
    type: "number",
  },
  {
    label: "Đề bài",
    prop: "topic",
    type: "text",
  },
  {
    label: "Chương",
    prop: "chapter",
    type: "text",
  },
  {
    label: "Độ khó",
    prop: "level",
    type: "badge",
    getBadge: (value) => {
      switch (value) {
        case "easy":
          return { value: "Dễ", severity: "info" };
        case "medium":
          return { value: "Trung bình", severity: "warning" };
        case "difficult":
          return { value: "Khó", severity: "danger" };
        default:
          return { value: "Lỗi", severity: "danger" };
      }
    },
  },
  {
    label: "Giảng viên",
    prop: "teacher",
    type: "text",
  },
  {
    label: "Loại câu hỏi",
    prop: "type",
    type: "text",
  },
  {
    label: "Ngày tạo",
    prop: "created_at",
    type: "datetime",
  },
  {
    label: "Ngày sửa",
    prop: "updated_at",
    type: "datetime",
  },
];

// Dữ liệu mẫu cho bảng exam
export const exams = [
  {
    id: 1,
    topic: "<a></a> là gì?",
    chapter: "Chương 1",
    level: "easy",
    teacher: "Nguyễn Văn A",
    type: "multiple-choice",
    content: "<p>a. a</p><p>b. b</p><p>c. c</p><p>d. d</p>",
    created_at: "2024-08-15T09:00:00Z",
    updated_at: "2024-08-10T08:00:00Z",
  },
  {
    id: 1,
    topic: "<div></div> là gì?",
    chapter: "Chương 1",
    level: "medium",
    type: "essay",
    teacher: "Nguyễn Văn B",
    content: "<p>a. a</p><p>b. b</p><p>c. c</p><p>d. d</p>",
    created_at: "2024-08-15T09:00:00Z",
    updated_at: "2024-08-10T08:00:00Z",
  },
];
