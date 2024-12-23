import { TableSchema } from "../types/table";

export const detailRoomSchemas: TableSchema[] = [
  {
    label: "#",
    prop: "id",
    type: "number",
  },
  {
    label: "Mã",
    prop: "code",
    type: "number",
  },
  {
    label: "Tên",
    prop: "name",
    type: "text",
  },
  {
    label: "Email",
    prop: "email",
    type: "text",
  },
  {
    label: "Số điện thoại",
    prop: "phone",
    type: "text",
  },
  {
    label: "Trạng thái",
    prop: "isSuccess",
    type: "text",

    getBadge: (value) => {
      switch (value) {
        case true:
          return { value: "Thành công", severity: "success" };
        case false:
          return { value: "Thất bại", severity: "danger" };
        default:
          return { value: "Lỗi", severity: "warning" };
      }
    },
  },
  {
    label: "Thời gian",
    prop: "createdAt",
    type: "datetime",
  },
];

export const detailRooms = [
  {
    id: 1,
    code: "312041014",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phoneNumber: "0123456789",
    status: "success",
    createdAt: "2024-08-01T10:00:00Z",
  },
  {
    id: 2,
    code: "312041013",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phoneNumber: "0987654321",
    status: "failed",
    createdAt: "2024-08-02T11:00:00Z",
  },
];
