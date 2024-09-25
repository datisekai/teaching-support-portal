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
        icon: "pi pi-bell",
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
        icon: "pi pi-user",
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
        icon: "pi pi-user",
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
