import { IForm, IFormItem } from "../types/form-item";

export const RoomForm: IForm[] = [
  {
    title: "Thông tin cơ bản",
    attributes: [
      {
        prop: "name",
        type: "text",
        label: "Tên ngành",
        col: 6,
      },
      {
        prop: "description",
        type: "editor",
        label: "Mô tả",
        col: 6,
      },
      {
        prop:'group_id',
        type:'select-ajax',
        label:'Lớp học',
        col:6
      }
   
    ],
  },
];
