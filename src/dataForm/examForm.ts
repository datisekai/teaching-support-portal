import { apiConfig } from "../apis";
import { IForm } from "../types/form-item";

export const ExamForm: IForm[] = [
  {
    title: "Thông tin bài thi",
    attributes: [
      {
        prop: "title",
        type: "text",
        label: "Tiêu đề bài thi",
        col: 6,
      },

      {
        prop: "description",
        type: "editor",
        label: "Mô tả",
        col: 12,
      },

      {
        prop: "classId",
        type: "select-ajax",
        apiUrl: apiConfig.class.getAll.endpoint,
        label: "Lớp học",
        col: 6,
        getOptions: (data = []) => {
          return data.map((item: any) => {
            return {
              title: `${item.major.name} - ${item.name}`,
              value: item.id,
            };
          });
        },
      },
    ],
  },
  {
    title: "Thời gian làm bài",
    attributes: [
      {
        prop: "startTime",
        type: "date-time",
        label: "Thời gian bắt đầu",
        col: 6,
      },
      {
        prop: "endTime",
        type: "date-time",
        label: "Thời gian kết thúc",
        col: 6,
      },
      {
        prop: "duration",
        type: "number",
        label: "Thời gian làm bài (phút)",
        col: 6,
      },
    ],
  },
  {
    title: "Cài đặt",
    attributes: [
      {
        prop: "showResult",
        type: "switch",
        label: "Hiển thị kết quả",
        col: 6,
      },
      {
        prop: "logOutTab",
        type: "switch",
        label: "Ghi nhận chuyển tab",
        col: 6,
      },
      {
        prop: "blockMouseRight",
        type: "switch",
        label: "Chặn chuột phải",
        col: 6,
      },
      {
        prop: "blockControlCVX",
        type: "switch",
        label: "Chặn Copy, Paste",
        col: 6,
      },
    ],
  },
];
