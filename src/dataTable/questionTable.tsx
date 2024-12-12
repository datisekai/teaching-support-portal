import { QuestionType } from "../constants";
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
    label: "Thông tin",
    prop: "major",
    type: "text",
    render(data) {
      return (
        <div>
          <p>
            Môn học:{" "}
            <strong>
              {data.major.code} - {data.major.name}
            </strong>
          </p>
          <p>
            Chương: <strong>{data.chapter.name}</strong>
          </p>
          <p>
            Độ khó: <strong>{data.difficulty.level}</strong>
          </p>
        </div>
      );
    },
  },
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
    type: "badge",
    getBadge: (value) => {
      if (value === QuestionType.MULTIPLE_CHOICE) {
        return { value: "Trắc nghiệm", severity: "info" };
      }
      if (value === QuestionType.CODE_HTML)
        return { value: "Code HTML", severity: "success" };
      return { value: "Code", severity: "warning" };
    },
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
