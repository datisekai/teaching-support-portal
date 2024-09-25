import { TableSchema } from "../types/table";

export const roomSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "id",
    type: "number",
  },
  {
    label: "Môn học",
    prop: "group_name",
    type: "text",
    minWidth: "100px",
  },
  {
    label: "Tiêu đề",
    prop: "title",
    type: "text",
  },
  {
    label: "Trạng thái",
    prop: "status",
    type: "badge",
    getBadge: (value) => {
      switch (value) {
        case "ready":
          return { severity: "warning", value: "Chưa bắt đầu" };
        case "scan":
          return { severity: "info", value: "Đang điểm danh" };
        case "stop":
          return { severity: "success", value: "Kết thúc" };
      }
      return { severity: "danger", value: "Không xác định" };
    },
  },
  {
    label: "Giảng viên",
    prop: "teacher_name",
    type: "text",
  },
  {
    label: "Ngày cập nhật",
    prop: "updatedAt",
    type: "datetime",
  },
];

export const rooms = [
  {
    id: 1,
    group_name: "Toán học",
    title: "Phương pháp tính",
    status: "ready", // trạng thái: Chưa bắt đầu
    teacher_name: "Nguyễn Văn A",
    updatedAt: "2024-09-24T10:15:00",
  },
  {
    id: 2,
    group_name: "Vật lý",
    title: "Cơ học lượng tử",
    status: "scan", // trạng thái: Đang điểm danh
    teacher_name: "Trần Thị B",
    updatedAt: "2024-09-23T09:00:00",
  },
  {
    id: 3,
    group_name: "Hóa học",
    title: "Hóa hữu cơ",
    status: "stop", // trạng thái: Kết thúc
    teacher_name: "Lê Thanh C",
    updatedAt: "2024-09-22T15:30:00",
  },
  {
    id: 4,
    group_name: "Lịch sử",
    title: "Chiến tranh thế giới thứ hai",
    status: "ready", // trạng thái: Chưa bắt đầu
    teacher_name: "Phạm Hoàng D",
    updatedAt: "2024-09-21T08:45:00",
  },
  {
    id: 5,
    group_name: "Sinh học",
    title: "Di truyền học",
    status: "scan", // trạng thái: Đang điểm danh
    teacher_name: "Hoàng Văn E",
    updatedAt: "2024-09-20T13:20:00",
  },
  {
    id: 6,
    group_name: "Địa lý",
    title: "Địa lý tự nhiên",
    status: "stop", // trạng thái: Kết thúc
    teacher_name: "Nguyễn Thị F",
    updatedAt: "2024-09-19T11:10:00",
  },
  {
    id: 7,
    group_name: "Ngữ văn",
    title: "Thơ hiện đại Việt Nam",
    status: "ready", // trạng thái: Chưa bắt đầu
    teacher_name: "Lê Minh G",
    updatedAt: "2024-09-18T10:05:00",
  },
  {
    id: 8,
    group_name: "Công nghệ",
    title: "Lập trình JavaScript",
    status: "scan", // trạng thái: Đang điểm danh
    teacher_name: "Trần Ngọc H",
    updatedAt: "2024-09-17T16:50:00",
  },
  {
    id: 9,
    group_name: "Giáo dục thể chất",
    title: "Kỹ năng bóng đá",
    status: "stop", // trạng thái: Kết thúc
    teacher_name: "Nguyễn Quang I",
    updatedAt: "2024-09-16T07:40:00",
  },
  {
    id: 10,
    group_name: "Ngoại ngữ",
    title: "Tiếng Anh giao tiếp",
    status: "ready", // trạng thái: Chưa bắt đầu
    teacher_name: "Phạm Thị J",
    updatedAt: "2024-09-15T14:35:00",
  },
];
