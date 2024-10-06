import { IForm, IFormItem } from "../types/form-item";

export const MajorForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "code",
        type: "number",
        label: "Mã môn học",
        col: 6,
      },
      {
        prop: "name",
        type: "text",
        label: "Tên",
        col: 6,
      },
      {
        prop: "description",
        type: "editor",
        label: "Mô tả",
        col: 6,
      },
      {
        prop: "faculty",
        type: "select",
        label: "Ngành học",
        col: 6,
        options: [
          {
            title: "Kỹ thuật phần mềm",
            value: "ktpm",
          },
          {
            title: "Khoa học máy tính",
            value: "khmt",
          },
        ],
      },
      {
        prop: "teacher",
        type: "multi-select",
        label: "Giảng viên",
        options: [
          {
            title: "Nguyễn Văn A",
            value: "nva",
          },
          {
            title: "Nguyễn Văn B",
            value: "nvb",
          },
        ],
      },
    ],
  },
];
