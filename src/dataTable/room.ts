import { TableSchema } from "../types/table";

export const roomSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "id",
    type: "number",
  },
  {
    label: "Môn học",
    prop: "groupName",
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
    prop: "teacherName",
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
    groupName: "Toán học",
    title: "Phương pháp tính",
    status: "ready", // trạng thái: Chưa bắt đầu
    teacherName: "Nguyễn Văn A",
    updatedAt: "2024-09-24T10:15:00",
  },
  {
    id: 2,
    groupName: "Vật lý",
    title: "Cơ học lượng tử",
    status: "scan", // trạng thái: Đang điểm danh
    teacherName: "Trần Thị B",
    updatedAt: "2024-09-23T09:00:00",
  },
  {
    id: 3,
    groupName: "Hóa học",
    title: "Hóa hữu cơ",
    status: "stop", // trạng thái: Kết thúc
    teacherName: "Lê Thanh C",
    updatedAt: "2024-09-22T15:30:00",
  },
  {
    id: 4,
    groupName: "Lịch sử",
    title: "Chiến tranh thế giới thứ hai",
    status: "ready", // trạng thái: Chưa bắt đầu
    teacherName: "Phạm Hoàng D",
    updatedAt: "2024-09-21T08:45:00",
  },
  {
    id: 5,
    groupName: "Sinh học",
    title: "Di truyền học",
    status: "scan", // trạng thái: Đang điểm danh
    teacherName: "Hoàng Văn E",
    updatedAt: "2024-09-20T13:20:00",
  },
  {
    id: 6,
    groupName: "Địa lý",
    title: "Địa lý tự nhiên",
    status: "stop", // trạng thái: Kết thúc
    teacherName: "Nguyễn Thị F",
    updatedAt: "2024-09-19T11:10:00",
  },
  {
    id: 7,
    groupName: "Ngữ văn",
    title: "Thơ hiện đại Việt Nam",
    status: "ready", // trạng thái: Chưa bắt đầu
    teacherName: "Lê Minh G",
    updatedAt: "2024-09-18T10:05:00",
  },
  {
    id: 8,
    groupName: "Công nghệ",
    title: "Lập trình JavaScript",
    status: "scan", // trạng thái: Đang điểm danh
    teacherName: "Trần Ngọc H",
    updatedAt: "2024-09-17T16:50:00",
  },
  {
    id: 9,
    groupName: "Giáo dục thể chất",
    title: "Kỹ năng bóng đá",
    status: "stop", // trạng thái: Kết thúc
    teacherName: "Nguyễn Quang I",
    updatedAt: "2024-09-16T07:40:00",
  },
  {
    id: 10,
    groupName: "Ngoại ngữ",
    title: "Tiếng Anh giao tiếp",
    status: "ready", // trạng thái: Chưa bắt đầu
    teacherName: "Phạm Thị J",
    updatedAt: "2024-09-15T14:35:00",
  },
];
