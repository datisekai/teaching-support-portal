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
        permission: "attendance:view",
      },
    ],
  },
  {
    title: "Đề thi",
    icon: "",
    path: pathNames.EXAM,
    children: [
      {
        title: "Quản lý đề thi",
        icon: "pi pi-desktop",
        path: pathNames.EXAM,
        permission: "exam:view",
      },
    ],
  },
  {
    title: "Câu hỏi",
    icon: "",
    path: pathNames.QUESTION,
    children: [
      {
        title: "Quản lý câu hỏi",
        icon: "pi pi-receipt",
        path: pathNames.QUESTION,
        permission: "question:view",
      },
      // {
      //   title: "Quản lý câu hỏi của tôi",
      //   icon: "pi pi-receipt",
      //   path: "/my-question",
      //   permission: "question:view_own",
      // },
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
        permission: "notification:view",
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
        permission: "letter:view",
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
        permission: "class:view",
      },
    ],
  },
  {
    title: "Môn học",
    icon: "",
    path: pathNames.MAJOR,
    children: [
      {
        title: "Danh sách môn",
        icon: "pi pi-book",
        path: pathNames.MAJOR,
        permission: "major:view",
      },
    ],
  },
  {
    title: "Ngành học",
    icon: "",
    path: pathNames.FACULTY,
    children: [
      {
        title: "Danh sách ngành",
        icon: "pi pi-th-large",
        path: pathNames.FACULTY,
        permission: "faculty:view",
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
        permission: "user:view",
      },
      {
        title: "Danh sách phân quyền",
        icon: "pi pi-key",
        path: pathNames.PERMISSION,
        permission: "permission:view",
      },
    ],
  },
  // {
  //   title: "Giao diện",
  //   icon: "",
  //   path: pathNames.THEME,
  //   children: [
  //     {
  //       title: "Quản lý giao diện",
  //       icon: "pi pi-cog",
  //       path: pathNames.THEME,
  //       permission: "theme:view",
  //     },
  //   ],
  // },
];

interface IMenuItem {
  title: string;
  icon?: string;
  path?: string;
  hidden?: boolean;
  children?: IMenuItem[];
  permission?: string;
}
