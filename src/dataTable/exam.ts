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
    prop: "examName",
    type: "text",
  },
  {
    label: "Tên môn học",
    prop: "subjectName",
    type: "text",
  },
  {
    label: "Nhóm lớp",
    prop: "classGroup",
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
    prop: "status",
    type: "badge",
    getBadge: (value) => {
      switch (value) {
        case "notStarted":
          return { value: "Chưa bắt đầu", severity: "warning" };
        case "started":
          return { value: "Đang thực hiện", severity: "info" };
        default:
          return { value: "Lỗi", severity: "danger" };
      }
    },
  },
  {
    label: "Loại đề thi",
    prop: "examType",
    type: "text",
  },
];

// Dữ liệu mẫu cho bảng exam
export const exams = [
  {
    id: 1,
    examName: "Đề thi giữa kỳ",
    subjectName: "Toán học",
    classGroup: "Nhóm A",
    startTime: "2024-10-10T09:00:00Z",
    endTime: "2024-10-10T11:00:00Z",
    examType: "multiple-choice",
    status: "notStarted",
  },
  {
    id: 2,
    examName: "Đề thi cuối kỳ",
    subjectName: "Vật lý",
    classGroup: "Nhóm B",
    startTime: "2024-11-20T14:00:00Z",
    endTime: "2024-11-20T16:00:00Z",
    examType: "essay",
    status: "started",
  },
];
