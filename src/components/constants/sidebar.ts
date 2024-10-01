export const sidebarData: IMenuItem[] = [
  {
    title: "Điểm danh",
    icon: "",
    path: "/attendance",
    children: [
      {
        title: "Danh sách phòng",
        icon: "pi pi-list-check",
        path: "/attendance",
        permission: "view-attendance",
      },
    ],
  },
  {
    title: "Câu hỏi",
    icon: "",
    path: "/exam",
    children: [
      {
        title: "Quản lý câu hỏi",
        icon: "pi pi-receipt",
        path: "/exam",
        permission: "view-exam",
      },
    ],
  },
  {
    title: "Thông báo",
    icon: "",
    path: "/notification",
    children: [
      {
        title: "Danh sách thông báo",
        icon: "pi pi-bell",
        path: "/notification",
        permission: "view-notification",
      },
    ],
  },
  {
    title: "Đơn từ",
    icon: "",
    path: "/letter",
    children: [
      {
        title: "Danh sách đơn từ",
        icon: "pi pi-envelope",
        path: "/letter",
        permission: "view-letter",
      },
    ],
  },
  {
    title: "Lớp học",
    icon: "",
    path: "/class",
    children: [
      {
        title: "Danh sách lớp",
        icon: "pi pi-graduation-cap",
        path: "/class",
        permission: "view-class",
      },
    ],
  },
  {
    title: "Môn học",
    icon: "",
    path: "/subject",
    children: [
      {
        title: "Danh sách môn",
        icon: "pi pi-book",
        path: "/subject",
        permission: "view-subject",
      },
    ],
  },
  {
    title: "Ngành học",
    icon: "",
    path: "/department",
    children: [
      {
        title: "Danh sách ngành",
        icon: "pi pi-th-large",
        path: "/department",
        permission: "view-department",
      },
    ],
  },
  {
    title: "Người dùng",
    icon: "",
    path: "/user",
    children: [
      {
        title: "Danh sách người dùng",
        icon: "pi pi-user",
        path: "/user",
        permission: "view-user",
      },
      {
        title: "Danh sách phân quyền",
        icon: "pi pi-key",
        path: "/permission",
        permission: "view-permission",
      },
    ],
  },
  {
    title: "Giao diện",
    icon: "",
    path: "/interface",
    children: [
      {
        title: "Quản lý giao diện",
        icon: "pi pi-cog",
        path: "/interface",
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
