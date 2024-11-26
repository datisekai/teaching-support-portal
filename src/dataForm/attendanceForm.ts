import { apiConfig } from "../apis";
import { IForm, IFormItem } from "../types/form-item";

export const AttendanceForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "title",
        type: "text",
        label: "Tiêu đề",
        col: 6,
      },
      {
        prop: "classId",
        type: "select-ajax",
        apiUrl: apiConfig.class.getAll.endpoint,
        label: "Lớp học",
        col: 6,
        getOptions: (data = []) => {
          console.log("data", data);
          return data.map((item: any) => {
            return {
              title: `${item.major.name} - ${item.name}`,
              value: item.id,
            };
          });
        },
      },
      {
        prop: "time",
        type: "date-time",
        label: "Ngày điểm danh",
        description: "Là ngày điểm danh để hiện thị tại quản lý điểm",
        col: 6,
      },
      {
        prop: "expirationTime",
        type: "number",
        label: "Thời gian",
        description:
          "Là thời gian để QRCode thay đổi liên tục (recommend: 3000ms)",
        col: 6,
      },
    ],
  },
];
