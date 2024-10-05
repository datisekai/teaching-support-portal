import { pathNames } from "./pathname";

export const sidebarData: IMenuItem[] = [
  {
    title: "Điểm danh",
    icon: "",
    path: pathNames.ATTENDANCE,
    children: [
      {
        title: "Danh sách phòng",
        icon: "pi pi-list-check",
        path: pathNames.ATTENDANCE,
        permission: "view-attendance",
      },
    ],
  },
  {
    title: "Đề thi",
    icon: "",
    path: "/exam",
    children: [
      {
        title: "Quản lý đề thi",
        icon: "pi pi-desktop",
        path: "/exam",
        permission: "view-exam",
      },
    ],
  },
  {
    title: "Câu hỏi",
    icon: "",
    path: "/question",
    children: [
      {
        title: "Quản lý câu hỏi",
        icon: "pi pi-receipt",
        path: "/question",
        permission: "view-question",
      },
      {
        title: "Quản lý câu hỏi của tôi",
        icon: "pi pi-receipt",
        path: "/my-question",
        permission: "view-my-question",
      },
    ],
  },
  {
    title: "Thông báo",
    icon: "",
    path: pathNames.NOTIFICATION,
    children: [
      {
        title: "Danh sách thông báo",
        icon: "pi pi-bell",
        path: pathNames.NOTIFICATION,
        permission: "view-notification",
      },
    ],
  },
  {
    title: "Đơn từ",
    icon: "",
    path: pathNames.LETTER,
    children: [
      {
        title: "Danh sách đơn từ",
        icon: "pi pi-envelope",
        path: pathNames.LETTER,
        permission: "view-letter",
      },
    ],
  },
  {
    title: "Lớp học",
    icon: "",
    path: pathNames.CLASS,
    children: [
      {
        title: "Danh sách lớp",
        icon: "pi pi-graduation-cap",
        path: pathNames.CLASS,
        permission: "view-class",
      },
    ],
  },
  {
    title: "Môn học",
    icon: "",
    path: pathNames.SUBJECT,
    children: [
      {
        title: "Danh sách môn",
        icon: "pi pi-book",
        path: pathNames.SUBJECT,
        permission: "view-subject",
      },
    ],
  },
  {
    title: "Ngành học",
    icon: "",
    path: pathNames.DEPARTMENT,
    children: [
      {
        title: "Danh sách ngành",
        icon: "pi pi-th-large",
        path: pathNames.DEPARTMENT,
        permission: "view-department",
      },
    ],
  },
  {
    title: "Người dùng",
    icon: "",
    path: pathNames.USER,
    children: [
      {
        title: "Danh sách người dùng",
        icon: "pi pi-user",
        path: pathNames.USER,
        permission: "view-user",
      },
      {
        title: "Danh sách phân quyền",
        icon: "pi pi-key",
        path: pathNames.PERMISSION,
        permission: "view-permission",
      },
    ],
  },
  {
    title: "Giao diện",
    icon: "",
    path: pathNames.THEME,
    children: [
      {
        title: "Quản lý giao diện",
        icon: "pi pi-cog",
        path: pathNames.THEME,
        permission: "view-interface",
      },
    ],
  },
];

interface IMenuItem {
  title: string;
  icon?: string;
  path?: string;
  hidden?: boolean;
  children?: IMenuItem[];
  permission?: string;
}
