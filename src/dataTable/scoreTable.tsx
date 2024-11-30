import { TableSchema } from "../types/table";

// Định nghĩa schema cho bảng exam results
export const scoreSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "index",
    type: "number",
  },
  {
    label: "MSSV",
    prop: "code",
    type: "text",
  },
  {
    label: "Tên sinh viên",
    prop: "name",
    type: "text",
  },
  {
    label: "Số điểm",
    prop: "grade",
    type: "text",
    render(data) {

      return `${data?.grade?.toFixed(2) || 0} điểm`;
    },
  },
  {
    label: "Hành động",
    prop: "action",
    type: "text",
    render(data) {
      const { outTabCount = 0, mouseRight = 0, controlCVX = 0 } = data;
      return (
        <>
          <p>
            <strong>{outTabCount} lần</strong> chuyển tab.
          </p>
          <p>
            <strong>{mouseRight} lần</strong> click chuột phải.
          </p>
          <p>
            <strong>{controlCVX} lần</strong> control C, V, X.
          </p>
        </>
      );
    },
  },
  // {
  //   label: "Thời gian vào làm bài",
  //   prop: "startTime",
  //   type: "datetime",
  // },
  // {
  //   label: "Trạng thái",
  //   prop: "status",
  //   type: "badge",
  //   getBadge: (value) => {
  //     switch (value) {
  //       case "cheat":
  //         return { value: "Cảnh báo gian lận", severity: "warning" };
  //       case "normal":
  //         return { value: "Bình thường", severity: "info" };
  //       default:
  //         return { value: "Lỗi", severity: "danger" };
  //     }
  //   },
  // },
];


export const exportScoreSchemas: TableSchema[] = [
  {
    label: "STT",
    prop: "index",
    type: "number",
  },
  {
    label: "Mã sinh viên",
    prop: "code",
    type: "text",
  },
  {
    label: "Tên sinh viên",
    prop: "name",
    type: "text",
  },
  {
    label: "Điểm",
    prop: "grade",
    type: "text",
    render(data) {
      return `${data?.grade?.toFixed(2) || 0}`;
    },
  },
  {
    label: "Số lần out tab",
    prop: "outTabCount",
    type: "number",
    render(data) {
      return `${data?.outTabCount || 0}`;
    },

  },
  {
    label: "Số lần chuột phải",
    prop: "mouseRight",
    type: "number",
    render(data) {
      return `${data?.mouseRight || 0}`;
    },
  },
  {
    label: "Số lần control CVX",
    prop: "controlCVX",
    type: "number",
    render(data) {
      return `${data?.controlCVX || 0}`;
    },
  },
];

// Dữ liệu mẫu cho bảng exam results
export const scores = [
  {
    id: 1,
    studentId: "SV001",
    studentName: "Nguyễn Văn A",
    examName: "Đề thi giữa kỳ Toán học",
    score: 2.5,
    startTime: "2024-10-01T09:00:00Z",
    status: "cheat",
  },
  {
    id: 2,
    studentId: "SV002",
    studentName: "Trần Thị B",
    examName: "Đề thi cuối kỳ Vật lý",
    score: 7.5,
    startTime: "2024-10-02T10:00:00Z",
    status: "normal",
  },
];
