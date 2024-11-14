import { TableSchema } from "../types/table";

// Định nghĩa schema cho bảng exam
export const examSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "id",
    type: "number",
  },
  {
    label: "Tên đề thi",
    prop: "title",
    type: "text",
  },
  {
    label: "Thời gian bắt đầu",
    prop: "startTime",
    type: "datetime",
  },
  {
    label: "Thời gian kết thúc",
    prop: "endTime",
    type: "datetime",
  },
  {
    label: "Trạng thái",
    prop: "showResult",
    type: "badge",
    getBadge: (value) => {
      if (value) {
        return { value: "Hiển thị kết quả", severity: "success" };
      } else {
        return { value: "Không hiển thị kết quả", severity: "danger" };
      }
    },
  },
];

// Dữ liệu mẫu cho bảng exam
export const exams = [
  {
    id: 1,
    examName: "Đề thi giữa kỳ",
    majorName: "Toán học",
    classGroup: "Nhóm A",
    startTime: "2024-10-10T09:00:00Z",
    endTime: "2024-10-10T11:00:00Z",
    examType: "multiple-choice",
    status: "notStarted",
  },
  {
    id: 2,
    examName: "Đề thi cuối kỳ",
    majorName: "Vật lý",
    classGroup: "Nhóm B",
    startTime: "2024-11-20T14:00:00Z",
    endTime: "2024-11-20T16:00:00Z",
    examType: "essay",
    status: "started",
  },
];
